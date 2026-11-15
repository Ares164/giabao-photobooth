// ============================================================
// Locket Request RAW - AI Filter + 4-shot Photobooth
// Shadowrocket: HTTP Request Script
//
// Worker: https://locketsever.lehuynhgiabao71.workers.dev
// Endpoints: POST /api/ai-edit, POST /api/photobooth/capture
//
// IMPORTANT:
// 1) Replace API_TOKEN with your Cloudflare API_TOKEN Secret.
// 2) ADMIN_TOKEN is only used by the optional frame-upload helper below.
// 3) Upload each PNG frame to the Worker first; frameId must match exactly.
// ============================================================

(function () {
  "use strict";

  var WORKER_HOST = "https://locketsever.lehuynhgiabao71.workers.dev";
  var API_TOKEN = "LHGBNAT2011";
  var ADMIN_TOKEN = "LHGBNAT2011";

  var DEFAULT_FRAME_ID = "summer-1";
  var PB_STATE_KEY = "LOCKET_PB_SESSION_V3";

  function readState() {
    try {
      var raw = $persistentStore.read(PB_STATE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function writeState(state) {
    try {
      $persistentStore.write(JSON.stringify(state), PB_STATE_KEY);
    } catch (e) {}
  }

  function clearState() {
    try { $persistentStore.write("", PB_STATE_KEY); } catch (e) {}
  }

  function finishWithUrl(url, extra) {
    var result = Object.assign({}, extra || {});
    result.outputUrl = url;
    result.output_url = url;
    result.url = url;
    result.imageUrl = url;
    result.image_url = url;

    var payload = {
      success: true,
      result: Object.assign({}, result, {
        data: {
          outputUrl: url,
          output_url: url,
          url: url,
          imageUrl: url,
          image_url: url
        }
      })
    };
    $done({ body: JSON.stringify(payload) });
  }

  function finishError(message, status) {
    $done({
      status: status || 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        success: false,
        error: String(message || "WORKER_REQUEST_FAILED")
      })
    });
  }

  function parseBody(raw) {
    if (!raw) return {};
    if (typeof raw === "object") return raw;
    try { return JSON.parse(raw); } catch (e) { return {}; }
  }

  function getUrlFromResponse(obj) {
    if (!obj) return "";
    var r = obj.result || obj;
    var d = r.data || {};
    return r.outputUrl || r.output_url || r.url || r.imageUrl ||
      r.image_url || d.outputUrl || d.output_url || d.url ||
      d.imageUrl || d.image_url || "";
  }

  function postWorker(path, body, callback) {
    if (!API_TOKEN || API_TOKEN === "PASTE_YOUR_API_TOKEN_HERE") {
      callback(new Error("Bạn chưa điền API_TOKEN trong RAW."));
      return;
    }

    $httpClient.post({
      url: WORKER_HOST + path,
      headers: {
        "Content-Type": "application/json",
        "X-API-Token": API_TOKEN
      },
      body: JSON.stringify(body)
    }, function (error, response, data) {
      if (error) {
        callback(error);
        return;
      }
      var parsed = parseBody(data);
      if (!response || response.status < 200 || response.status >= 300 ||
          parsed.success === false) {
        callback(new Error(parsed.error || ("Worker HTTP " +
          (response ? response.status : "unknown"))));
        return;
      }
      callback(null, parsed);
    });
  }

  function isPhotobooth(data) {
    var prompt = String(data.prompt || "").toLowerCase();
    var filterId = String(data.filter_id || data.filterId || "").toLowerCase();
    var mode = String(data.mode || data.filter_mode || "").toLowerCase();

    return mode === "photobooth" ||
      /^pb[_-]/.test(prompt) ||
      /^frame[_-]/.test(filterId);
  }

  function getFrameId(data, state) {
    var selected = data.photobooth_id || data.photoboothId ||
      data.frame_id || data.frameId || data.filter_id ||
      data.filterId || "";
    selected = String(selected || "").trim();

    // Sticker IDs are not frame IDs. Only accept a real frame ID here.
    if (/^frame[_-]/i.test(selected) || selected === DEFAULT_FRAME_ID) {
      return selected;
    }
    if (state && state.frameId) return state.frameId;
    return DEFAULT_FRAME_ID;
  }

  function getImageFields(data) {
    return {
      imageUrl: data.image_url || data.imageUrl || data.photo_url ||
        data.photoUrl || data.input_url || data.inputUrl || "",
      imageBase64: data.imageBase64 || data.image_base64 ||
        data.base64 || ""
    };
  }

  function makeAiPrompt(data) {
    var prompt = data.ai_prompt || data.filter_prompt ||
      data.edit_prompt || data.prompt_text || "";

    if (prompt) return String(prompt);

    var sticker = String(data.filter_id || data.filterId ||
      data.prompt || "creative photo filter");

    var known = {
      "stk_dio_disco": "Add a vibrant disco style with colorful party lights and a fun dance-floor atmosphere. Keep the person's face and identity recognizable.",
      "stk_dio_cash": "Create a playful money-themed effect with floating banknotes around the subject. Keep the person's face and identity recognizable.",
      "stk_dio_wedding": "Apply an elegant wedding-inspired look with soft romantic lighting and tasteful details. Keep the person's face and identity recognizable.",
      "stk_dio_orange_wig": "Add a bright orange wig naturally to the subject. Keep the person's face and identity recognizable."
    };

    if (known[sticker]) return known[sticker];

    return "Apply this visual filter concept: " +
      sticker.replace(/^stk_/, "").replace(/[_-]+/g, " ") +
      ". Keep the original person's face, identity, facial features and pose recognizable. Do not replace the person.";
  }

  function handlePhotobooth(data) {
    var state = readState();
    var selectedFrameId = getFrameId(data, state);

    // A changed frame starts a new 4-photo session.
    if (state.frameId && state.frameId !== selectedFrameId) {
      state = {};
    }

    var step = Number(state.step || 1);
    if (step < 1 || step > 4) step = 1;

    var image = getImageFields(data);
    if (!image.imageUrl && !image.imageBase64) {
      finishError("Không tìm thấy image_url hoặc imageBase64 trong request Locket.", 400);
      return;
    }

    var payload = {
      step: step,
      frameId: selectedFrameId,
      imageUrl: image.imageUrl,
      imageBase64: image.imageBase64
    };

    if (step > 1 && state.sessionId) {
      payload.sessionId = state.sessionId;
    }

    postWorker("/api/photobooth/capture", payload, function (error, result) {
      if (error) {
        finishError(error.message, 502);
        return;
      }

      var outputUrl = getUrlFromResponse(result);
      var meta = result.result || result;
      if (!outputUrl) {
        finishError("Worker không trả về outputUrl.", 502);
        return;
      }

      var returnedSession = meta.sessionId || state.sessionId || "";
      if (step < 4) {
        writeState({
          frameId: selectedFrameId,
          sessionId: returnedSession,
          step: step + 1
        });
      } else {
        clearState();
      }

      finishWithUrl(outputUrl, {
        mode: "photobooth",
        frameId: selectedFrameId,
        sessionId: returnedSession,
        step: step,
        completed: step === 4,
        message: meta.message || ""
      });
    });
  }

  function handleAi(data) {
    var image = getImageFields(data);
    if (!image.imageUrl && !image.imageBase64) {
      finishError("Không tìm thấy image_url hoặc imageBase64 trong request Locket.", 400);
      return;
    }

    postWorker("/api/ai-edit", {
      prompt: makeAiPrompt(data),
      imageUrl: image.imageUrl,
      imageBase64: image.imageBase64
    }, function (error, result) {
      if (error) {
        finishError(error.message, 502);
        return;
      }

      var outputUrl = getUrlFromResponse(result);
      if (!outputUrl) {
        finishError("Worker không trả về outputUrl.", 502);
        return;
      }

      finishWithUrl(outputUrl, {
        mode: "ai",
        id: (result.result && result.result.id) || result.id || ""
      });
    });
  }

  // Optional helper: upload a PNG frame from a base64 data URL/string.
  // This helper is intentionally not called automatically during normal Locket use.
  // To upload a frame, use a separate one-time RAW/script with this same endpoint.
  function uploadFrameToWorker(frameId, pngBase64, slots, callback) {
    if (!ADMIN_TOKEN || ADMIN_TOKEN === "PASTE_YOUR_ADMIN_TOKEN_HERE") {
      callback(new Error("Bạn chưa điền ADMIN_TOKEN."));
      return;
    }

    var clean = String(pngBase64 || "").replace(/^data:image\/png;base64,/i, "");
    var binary;
    try { binary = atob(clean); } catch (e) {
      callback(new Error("Base64 PNG không hợp lệ."));
      return;
    }

    var bytes = [];
    for (var i = 0; i < binary.length; i++) bytes.push(binary.charCodeAt(i));

    $httpClient.post({
      url: WORKER_HOST + "/api/photobooth/upload-frame",
      headers: {
        "Content-Type": "image/png",
        "X-Admin-Token": ADMIN_TOKEN,
        "X-Frame-Id": frameId,
        "X-Frame-Slots": JSON.stringify(slots || [])
      },
      body: bytes
    }, function (error, response, data) {
      if (error) callback(error);
      else if (!response || response.status < 200 || response.status >= 300) {
        callback(new Error(data || "Upload frame failed"));
      } else callback(null, parseBody(data));
    });
  }

  // Only intercept Locket's generateFilteredImage request.
  var requestUrl = String($request.url || "");
  if (requestUrl.indexOf("generateFilteredImage") === -1) {
    $done({});
    return;
  }

  if (String($request.method || "POST").toUpperCase() !== "POST") {
    $done({});
    return;
  }

  var root = parseBody($request.body);
  var data = root.data && typeof root.data === "object" ? root.data : root;

  if (isPhotobooth(data)) {
    handlePhotobooth(data);
  } else {
    handleAi(data);
  }
})();
