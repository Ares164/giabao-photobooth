// Locket Response RAW - normalize AI / Photobooth output URLs
(function () {
  "use strict";
  var requestUrl = String(($request && $request.url) || "");
  if (requestUrl.indexOf("generateFilteredImage") === -1) {
    $done({});
    return;
  }
  var raw = ($response && $response.body) || "";
  var obj;
  try { obj = typeof raw === "string" ? JSON.parse(raw) : raw; }
  catch (e) { $done({}); return; }
  if (!obj || typeof obj !== "object") { $done({}); return; }

  var result = obj.result && typeof obj.result === "object" ? obj.result : obj;
  var nested = result.data && typeof result.data === "object" ? result.data : {};
  var url = result.outputUrl || result.output_url || result.url ||
    result.imageUrl || result.image_url || nested.outputUrl ||
    nested.output_url || nested.url || nested.imageUrl || nested.image_url || "";

  if (!url || typeof url !== "string") { $done({}); return; }

  result.outputUrl = url;
  result.output_url = url;
  result.url = url;
  result.imageUrl = url;
  result.image_url = url;
  result.data = Object.assign({}, nested, {
    outputUrl: url, output_url: url, url: url, imageUrl: url, image_url: url
  });
  obj.success = obj.success !== false;
  obj.result = result;
  $done({
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(obj)
  });
})();


  $done({
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(obj)
  });
})();
