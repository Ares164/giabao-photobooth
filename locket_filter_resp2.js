// Safe response normalizer for Locket Worker AI / Photobooth results.
// This script does not alter account subscriptions, Gold entitlements, or access locks.
(function () {
  try {
    if (typeof $response === "undefined" || !$response.body) return $done({});
    const reqUrl = (typeof $request !== "undefined" && $request.url) ? $request.url : "";
    if (!/generateFilteredImage/i.test(reqUrl)) return $done({});
    const obj = JSON.parse($response.body);
    const result = obj.result && typeof obj.result === "object" ? obj.result : null;
    if (!result) return $done({});
    const outputUrl = result.outputUrl || result.output_url || result.url || result.imageUrl || result.image_url;
    if (!outputUrl) return $done({});
    result.outputUrl = outputUrl;
    result.output_url = outputUrl;
    result.url = outputUrl;
    result.imageUrl = outputUrl;
    result.image_url = outputUrl;
    if (result.data && typeof result.data === "object") {
      result.data.outputUrl = outputUrl;
      result.data.output_url = outputUrl;
      result.data.url = outputUrl;
      result.data.imageUrl = outputUrl;
      result.data.image_url = outputUrl;
    }
    const headers = Object.assign({}, $response.headers || {});
    delete headers["Content-Encoding"];
    delete headers["content-encoding"];
    delete headers["Content-Length"];
    delete headers["content-length"];
    headers["Content-Type"] = "application/json; charset=utf-8";
    return $done({ status: $response.status || 200, headers: headers, body: JSON.stringify(obj) });
  } catch (_) {
    return $done({});
  }
})();
