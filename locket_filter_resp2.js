// ============================================================
// Locket Response RAW - normalize AI / Photobooth output URLs
// Shadowrocket: HTTP Response Script
//
// Use this as the response script for Locket's generateFilteredImage
// endpoint. The request RAW does the Worker call; this script only
// normalizes the returned JSON and preserves the original fields.
// ============================================================

(function () {
  "use strict";

  var requestUrl = String(($request && $request.url) || "");
  if (requestUrl.indexOf("generateFilteredImage") === -1) {
    $done({});
    return;
  }

  var raw = ($response && $response.body) || "";
  var obj;

  try {
    obj = typeof raw === "string" ? JSON.parse(raw) : raw;
  } catch (e) {
    $done({});
    return;
  }

  if (!obj || typeof obj !== "object") {
    $done({});
    return;
  }

  var result = obj.result && typeof obj.result === "object"
    ? obj.result
    : obj;

  var nested = result.data && typeof result.data === "object"
    ? result.data
    : {};

  var outputUrl = result.outputUrl || result.output_url ||
    result.url || result.imageUrl || result.image_url ||
    nested.outputUrl || nested.output_url || nested.url ||
    nested.imageUrl || nested.image_url || "";

  if (!outputUrl || typeof outputUrl !== "string") {
    $done({});
    return;
  }

  // Keep all fields Locket/client variants may read.
  result.outputUrl = outputUrl;
  result.output_url = outputUrl;
  result.url = outputUrl;
  result.imageUrl = outputUrl;
  result.image_url = outputUrl;

  result.data = Object.assign({}, nested, {
    outputUrl: outputUrl,
    output_url: outputUrl,
    url: outputUrl,
    imageUrl: outputUrl,
    image_url: outputUrl
  });

  obj.success = obj.success !== false;
  obj.result = result;

  $done({
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(obj)
  });
})();
