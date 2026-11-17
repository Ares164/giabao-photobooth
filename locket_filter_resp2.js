// Locket Worker Response RAW — converts Worker JSON into Locket's outputUrl response.
// Shadowrocket HTTP-response rule must match the rewritten Worker URLs:
//   https://locketsever.lehuynhgiabao71.workers.dev/api/ai-edit
//   https://locketsever.lehuynhgiabao71.workers.dev/api/photobooth/capture
(function () {
  "use strict";

  const PB_STATE_KEY = "LOCKET_PB_SESSION_V3";
  const PENDING_PREFIX = "LOCKET_WORKER_PENDING_V1_";
  const PENDING_LATEST_KEY = "LOCKET_WORKER_PENDING_LATEST_V1";

  function readStore(key) {
    try {
      if (typeof $persistentStore !== "undefined") return $persistentStore.read(key) || "";
      if (typeof $prefs !== "undefined") return $prefs.valueForKey(key) || "";
    } catch (_) {}
    return "";
  }

  function writeStore(key, value) {
    try {
      if (typeof $persistentStore !== "undefined") $persistentStore.write(String(value), key);
      else if (typeof $prefs !== "undefined") $prefs.setValueForKey(String(value), key);
    } catch (_) {}
  }

  function parseBody(raw) {
    if (!raw) return {};
    if (typeof raw === "object") return raw;
    try { return JSON.parse(raw); } catch (_) { return {}; }
  }

  function getHeader(headers, wanted) {
    if (!headers || typeof headers !== "object") return "";
    const target = String(wanted).toLowerCase();
    for (const key of Object.keys(headers)) {
      if (String(key).toLowerCase() === target) return String(headers[key] || "");
    }
    return "";
  }

  function clearPending(traceId) {
    if (traceId) writeStore(PENDING_PREFIX + traceId, "");
    const latest = readStore(PENDING_LATEST_KEY);
    if (!traceId || latest === traceId) writeStore(PENDING_LATEST_KEY, "");
  }

  function response(status, payload) {
    return $done({
      status: status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      },
      body: JSON.stringify(payload)
    });
  }

  function getOutputUrl(payload) {
    const result = payload && payload.result && typeof payload.result === "object"
      ? payload.result : {};
    return result.outputUrl || result.output_url || result.url || result.imageUrl || result.image_url ||
      payload.outputUrl || payload.output_url || payload.url || "";
  }

  function makeLocketResponse(outputUrl, extra) {
    const urls = {
      outputUrl: outputUrl,
      output_url: outputUrl,
      url: outputUrl,
      imageUrl: outputUrl,
      image_url: outputUrl
    };
    const result = Object.assign({}, urls, {
      status: 200,
      data: Object.assign({}, urls)
    }, extra || {});
    return { success: true, result: result };
  }

  try {
    if (typeof $response === "undefined") return $done({});

    const requestHeaders = (typeof $request !== "undefined" && $request.headers) || {};
  // Chỉ xử lý phản hồi có mã trace chính xác.
const traceId = getHeader(requestHeaders, "X-Locket-Trace");

// Không có trace thì giữ nguyên phản hồi gốc.
if (!traceId) return $done({});

const pendingRaw = readStore(PENDING_PREFIX + traceId);

// Không có pending tương ứng thì không can thiệp.
if (!pendingRaw) return $done({});

    const pendingRaw = traceId ? readStore(PENDING_PREFIX + traceId) : "";
    if (!pendingRaw) return $done({});

    let pending;
    try { pending = JSON.parse(pendingRaw); } catch (_) { pending = null; }
    if (!pending || !pending.kind) {
      clearPending(traceId);
      return response(502, { success: false, error: "PENDING_CONTEXT_INVALID" });
    }

    const status = Number($response.status || $response.statusCode || 200);
    const workerPayload = parseBody($response.body);
    if (status < 200 || status >= 300 || workerPayload.success === false) {
      clearPending(traceId);
      return response(status >= 400 ? status : 502, {
        success: false,
        error: workerPayload.error || workerPayload.message || ("WORKER_HTTP_" + status)
      });
    }

    const outputUrl = getOutputUrl(workerPayload);
    if (!outputUrl || !/^https:\/\//i.test(outputUrl)) {
      clearPending(traceId);
      return response(502, { success: false, error: "WORKER_OUTPUT_URL_MISSING_OR_INVALID" });
    }

    const workerResult = workerPayload.result && typeof workerPayload.result === "object"
      ? workerPayload.result : {};
    const top = workerPayload;

    if (pending.kind === "photobooth") {
      const step = Number(pending.step || workerResult.step || top.step || 1);
      const sessionId = workerResult.sessionId || top.sessionId || pending.previousSessionId || "";
      const completed = typeof workerResult.completed === "boolean"
        ? workerResult.completed
        : (typeof top.completed === "boolean" ? top.completed : step >= 4);
      const nextStep = Number(workerResult.nextStep || top.nextStep || (completed ? 1 : step + 1));

      // The paired loketsever-index.js currently enforces four captures/four slots.
      // Keep local state aligned with that exact Worker contract.
      if (!completed && nextStep >= 1 && nextStep <= 4 && sessionId) {
        writeStore(PB_STATE_KEY, JSON.stringify({
          sessionId: sessionId,
          step: nextStep,
          photoCount: 4,
          frameId: pending.frameId || "summer-1",
          photoboothId: pending.photoboothId || "",
          updatedAt: Date.now()
        }));
      } else {
        writeStore(PB_STATE_KEY, "");
      }

      clearPending(traceId);
      return response(200, makeLocketResponse(outputUrl, {
        mode: "photobooth",
        frameId: pending.frameId || "summer-1",
        step: step,
        photoCount: 4,
        completed: completed,
        nextStep: completed ? 1 : nextStep,
        sessionId: sessionId,
        message: workerResult.message || top.message || ""
      }));
    }

    if (pending.kind === "ai") {
      clearPending(traceId);
      return response(200, makeLocketResponse(outputUrl, {
        mode: "ai",
        stickerId: pending.stickerId || "",
        filterId: pending.filterId || ""
      }));
    }

    clearPending(traceId);
    return $done({});
  } catch (error) {
    return response(502, {
      success: false,
      error: String(error && error.message || error)
    });
  }
})();
