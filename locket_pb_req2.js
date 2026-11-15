// ============================================================
// Locket Request RAW - AI Filter + 4-shot Photobooth (10 frames)
// Worker: https://locketsever.lehuynhgiabao71.workers.dev
// Replace both token placeholders with your Cloudflare Secret values.
// ============================================================
(function () {
  "use strict";

  var WORKER_HOST = "https://locketsever.lehuynhgiabao71.workers.dev";
  var API_TOKEN = "LHGBNAT2011";
  var ADMIN_TOKEN = "LHGBNAT2011"; // for admin frame-upload helper only

  var DEFAULT_FRAME_ID = "summer-1";
  var PB_STATE_KEY = "LOCKET_PB_SESSION_V3";

  // Exact frame IDs supported by this RAW.
  var FRAME_IDS = [
    "frame_anh_dao",
    "frame_galaxy",
    "frame_coki",
    "frame_sweet",
    "frame_milk",
    "frame_mery_christmas",
    "summer-1",
    "summer-2",
    "frame_thu",
    "frame_flower"
  ];

  function parseJson(value) {
    if (!value) return {};
    if (typeof value === "object") return value;
    try { return JSON.parse(value); } catch (e) { return {}; }
  }

  function readState() {
    try { return parseJson($persistentStore.read(PB_STATE_KEY)); }
    catch (e) { return {}; }
  }
  function writeState(value) {
    try { $persistentStore.write(JSON.stringify(value), PB_STATE_KEY); } catch (e) {}
  }
  function clearState() {
    try { $persistentStore.write("", PB_STATE_KEY); } catch (e) {}
  }

  function responseUrl(obj) {
    var r = obj && obj.result ? obj.result : (obj || {});
    var d = r.data || {};
    return r.outputUrl || r.output_url || r.url || r.imageUrl || r.image_url ||
      d.outputUrl || d.output_url || d.url || d.imageUrl || d.image_url || "";
  }

  function finishUrl(url, extra) {
    var result = Object.assign({}, extra || {}, {
      outputUrl: url, output_url: url, url: url, imageUrl: url, image_url: url
    });
    result.data = {
      outputUrl: url, output_url: url, url: url, imageUrl: url, image_url: url
    };
    $done({
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ success: true, result: result })
    });
  }

  function fail(message, status) {
    $done({
      status: status || 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ success: false, error: String(message || "Worker request failed") })
    });
  }

  function postWorker(path, payload, callback) {
    if (!API_TOKEN || API_TOKEN === "PASTE_YOUR_API_TOKEN_HERE") {
      callback(new Error("Chưa nhập API_TOKEN trong RAW Request."));
      return;
    }
    $httpClient.post({
      url: WORKER_HOST + path,
      headers: {
        "Content-Type": "application/json",
        "X-API-Token": API_TOKEN
      },
      body: JSON.stringify(payload)
    }, function (error, response, body) {
      if (error) return callback(error);
      var parsed = parseJson(body);
      if (!response || response.status < 200 || response.status >= 300 || parsed.success === false) {
        return callback(new Error(parsed.error || ("Worker HTTP " + (response ? response.status : "unknown"))));
      }
      callback(null, parsed);
    });
  }

  function pickFrameId(data, state) {
    var candidates = [
      data.photobooth_id, data.photoboothId, data.frame_id, data.frameId,
      data.filter_id, data.filterId, data.selected_frame, data.selectedFrame
    ];
    for (var i = 0; i < candidates.length; i++) {
      var id = String(candidates[i] || "").trim();
      if (FRAME_IDS.indexOf(id) !== -1) return id;
    }
    if (state && FRAME_IDS.indexOf(String(state.frameId || "")) !== -1) return state.frameId;
    return DEFAULT_FRAME_ID;
  }

  function isPhotobooth(data) {
    var prompt = String(data.prompt || data.mode || data.filter_mode || "").toLowerCase();
    var idFields = [
      data.photobooth_id, data.photoboothId, data.frame_id, data.frameId,
      data.filter_id, data.filterId, data.selected_frame, data.selectedFrame
    ];
    if (/^pb[_-]/.test(prompt) || prompt === "photobooth") return true;
    for (var i = 0; i < idFields.length; i++) {
      if (FRAME_IDS.indexOf(String(idFields[i] || "").trim()) !== -1) return true;
    }
    return false;
  }

  function getImage(data) {
    return {
      imageUrl: data.image_url || data.imageUrl || data.photo_url ||
        data.photoUrl || data.input_url || data.inputUrl || "",
      imageBase64: data.imageBase64 || data.image_base64 || data.base64 || ""
    };
  }

  function doPhotobooth(data) {
    var state = readState();
    var frameId = pickFrameId(data, state);

    // If the user changes frame, start a fresh 4-shot sequence.
    if (state.frameId && state.frameId !== frameId) state = {};

    var step = Number(state.step || 1);
    if (step < 1 || step > 4) step = 1;

    var photo = getImage(data);
    if (!photo.imageUrl && !photo.imageBase64) {
      fail("Không tìm thấy image_url hoặc imageBase64 trong request Locket.", 400);
      return;
    }

    var payload = {
      step: step,
      frameId: frameId,
      imageUrl: photo.imageUrl,
      imageBase64: photo.imageBase64
    };
    if (step > 1 && state.sessionId) payload.sessionId = state.sessionId;

    postWorker("/api/photobooth/capture", payload, function (error, result) {
      if (error) return fail(error.message);
      var url = responseUrl(result);
      var meta = result.result || result;
      if (!url) return fail("Worker không trả về outputUrl.");

      var sessionId = meta.sessionId || state.sessionId || "";
      if (step < 4) {
        writeState({ frameId: frameId, sessionId: sessionId, step: step + 1 });
      } else {
        clearState();
      }

      finishUrl(url, {
        mode: "photobooth",
        frameId: frameId,
        sessionId: sessionId,
        step: step,
        completed: step === 4
      });
    });
  }

  function doAi(data) {
    var photo = getImage(data);
    if (!photo.imageUrl && !photo.imageBase64) {
      fail("Không tìm thấy image_url hoặc imageBase64 trong request Locket.", 400);
      return;
    }

    var prompt = data.ai_prompt || data.filter_prompt || data.edit_prompt || data.prompt_text || "";
    if (!prompt) {
      var sticker = String(data.filter_id || data.filterId || data.prompt || "creative photo filter");
      var presets = {
        "stk_dio_disco": "Add colorful disco lights and a lively dance-floor atmosphere. Preserve the person's face and identity.",
        "stk_dio_cash": "Add floating banknotes around the subject in a playful style. Preserve the person's face and identity.",
        "stk_dio_wedding": "Apply elegant wedding-inspired styling and soft romantic lighting. Preserve the person's face and identity.",
        "stk_dio_orange_wig": "Add a bright orange wig naturally. Preserve the person's face and identity."
      };
      prompt = presets[sticker] ||
        ("Apply this visual filter: " + sticker.replace(/^stk_/, "").replace(/[_-]+/g, " ") +
         ". Preserve the person's face, identity, facial features and pose.");
    }

    postWorker("/api/ai-edit", {
      prompt: String(prompt),
      imageUrl: photo.imageUrl,
      imageBase64: photo.imageBase64
    }, function (error, result) {
      if (error) return fail(error.message);
      var url = responseUrl(result);
      if (!url) return fail("Worker không trả về outputUrl.");
      finishUrl(url, { mode: "ai" });
    });
  }

  // Request endpoint filter.
  var requestUrl = String($request.url || "");
  if (requestUrl.indexOf("generateFilteredImage") === -1 ||
      String($request.method || "POST").toUpperCase() !== "POST") {
    $done({});
    return;
  }

  var root = parseJson($request.body);
  var data = root.data && typeof root.data === "object" ? root.data : root;

  if (isPhotobooth(data)) doPhotobooth(data);
  else doAi(data);
})();
