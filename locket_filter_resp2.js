// Locket Worker Response — synchronized with index.js + locket_pb_req3.js
// Shadowrocket HTTP-response script. Match ONLY the Worker POST endpoints listed below.
(function () {
  "use strict";

  const WORKER_HOST = "locketsever.lehuynhgiabao71.workers.dev";
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

  function getRequestUrl() {
    try {
      if (typeof $request !== "undefined" && $request) return String($request.url || $request.URL || "");
    } catch (_) {}
    return "";
  }

  function isTargetWorkerPost() {
    try {
      if (typeof $request === "undefined" || !$request) return false;
      const method = String($request.method || "GET").toUpperCase();
      if (method !== "POST") return false;
      const requestUrl = getRequestUrl();
      if (!requestUrl) return false;
      // Exact host + exact POST paths; never rewrite image GETs or unrelated APIs.
      return new RegExp("^https?:\\/\\/" + WORKER_HOST.replace(/\./g, "\\.") +
        "\\/api\\/(?:ai-edit|photobooth\\/capture)(?:\\?.*)?$", "i").test(requestUrl);
    } catch (_) {
      return false;
    }
  }

  function clearPending(traceId) {
    if (traceId) writeStore(PENDING_PREFIX + traceId, "");
    const latest = readStore(PENDING_LATEST_KEY);
    if (!traceId || latest === traceId) writeStore(PENDING_LATEST_KEY, "");
  }

  function finish(status, payload) {
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
    const result = payload && payload.result && typeof payload.result === "object" ? payload.result : {};
    const resultData = result.data && typeof result.data === "object" ? result.data : {};
    const topData = payload && payload.data && typeof payload.data === "object" ? payload.data : {};
    return result.outputUrl || result.output_url || result.url || result.imageUrl || result.image_url ||
      resultData.outputUrl || resultData.output_url || resultData.url || resultData.imageUrl || resultData.image_url ||
      (payload && (payload.outputUrl || payload.output_url || payload.url || payload.imageUrl || payload.image_url)) ||
      topData.outputUrl || topData.output_url || topData.url || topData.imageUrl || topData.image_url || "";
  }

  function makeLocketResponse(outputUrl, extra) {
    const urls = {
      outputUrl: outputUrl,
      output_url: outputUrl,
      url: outputUrl,
      imageUrl: outputUrl,
      image_url: outputUrl
    };
    return {
      success: true,
      result: Object.assign({}, urls, {
        status: 200,
        data: Object.assign({}, urls)
      }, extra || {})
    };
  }

  try {
    if (typeof $response === "undefined" || !$response || !$response.body) return $done({});
    if (!isTargetWorkerPost()) return $done({});

    const payload = parseBody($response.body);
    const reqHeaders = (typeof $request !== "undefined" && $request && $request.headers) || {};
    let traceId = getHeader(reqHeaders, "X-Locket-Trace");

    // Fallback is only used for this exact Worker POST response when the proxy omits request headers.
    if (!traceId) traceId = readStore(PENDING_LATEST_KEY);
    if (!traceId) return $done({});

    const pendingRaw = readStore(PENDING_PREFIX + traceId);
    if (!pendingRaw) return $done({});

    let pending;
    try { pending = JSON.parse(pendingRaw); } catch (_) { pending = null; }
    if (!pending || (pending.kind !== "ai" && pending.kind !== "photobooth")) {
      clearPending(traceId);
      return finish(502, { success: false, error: "PENDING_CONTEXT_INVALID" });
    }

    const httpStatus = Number($response.status || $response.statusCode || 200);
    if (httpStatus < 200 || httpStatus >= 300 || payload.success === false) {
      clearPending(traceId);
      const errorCode = payload.error || payload.message || ("WORKER_HTTP_" + httpStatus);
      return finish(httpStatus >= 400 ? httpStatus : 502, { success: false, error: errorCode });
    }

    const outputUrl = getOutputUrl(payload);
    if (typeof outputUrl !== "string" || !/^https?:\/\//i.test(outputUrl)) {
      clearPending(traceId);
      return finish(502, { success: false, error: "WORKER_OUTPUT_URL_MISSING_OR_INVALID" });
    }

    const workerResult = payload.result && typeof payload.result === "object" ? payload.result : {};
    if (pending.kind === "photobooth") {
      const step = Number(pending.step || workerResult.step || payload.step || 1);
      const photoCountRaw = Number(workerResult.photoCount || payload.photoCount || pending.photoCount || 4);
      const photoCount = photoCountRaw >= 1 && photoCountRaw <= 4 ? photoCountRaw : 4;
      const sessionId = workerResult.sessionId || workerResult.session_id ||
        payload.sessionId || payload.session_id || pending.previousSessionId || "";
      const completed = typeof workerResult.completed === "boolean" ? workerResult.completed :
        typeof payload.completed === "boolean" ? payload.completed : step >= photoCount;
      const nextStepRaw = Number(workerResult.nextStep || payload.nextStep || (completed ? 1 : step + 1));
      const nextStep = completed ? 1 : nextStepRaw;

      if (!completed) {
        if (!sessionId || nextStep < 2 || nextStep > photoCount) {
          clearPending(traceId);
          return finish(502, { success: false, error: "PHOTOBOOTH_SESSION_STATE_INVALID" });
        }
        writeStore(PB_STATE_KEY, JSON.stringify({
          sessionId: sessionId,
          step: nextStep,
          photoCount: photoCount,
          frameId: pending.frameId || workerResult.frameId || payload.frameId || "summer-1",
          photoboothId: pending.photoboothId || "",
          updatedAt: Date.now()
        }));
      } else {
        writeStore(PB_STATE_KEY, "");
      }

      clearPending(traceId);
      return finish(200, makeLocketResponse(outputUrl, {
        mode: "photobooth",
        frameId: pending.frameId || workerResult.frameId || payload.frameId || "summer-1",
        step: step,
        photoCount: photoCount,
        completed: completed,
        nextStep: nextStep,
        sessionId: sessionId,
        message: workerResult.message || payload.message || ""
      }));
    }

    if (pending.kind === "ai") {
      clearPending(traceId);
      return finish(200, makeLocketResponse(outputUrl, {
        mode: "ai",
        stickerId: pending.stickerId || "",
        filterId: pending.filterId || ""
      }));
    }

    clearPending(traceId);
    return $done({});
  } catch (error) {
    return finish(502, {
      success: false,
      error: String(error && error.message ? error.message : error)
    });
  }
})();
