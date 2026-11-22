// ============================================================
// Shadow Request Bridge -> loketsever Worker
// ============================================================
var WORKER_HOST = "locketsever.lehuynhgiabao71.workers.dev";
var API_TOKEN = "nguyenanhthu25102009";

var url = $request.url || "";
var headers = Object.assign({}, $request.headers || {});
headers["X-API-Token"] = API_TOKEN;

// Nếu có request đang gọi nhầm đường dẫn cũ /frames/ thì trỏ sang /frame/ trên Worker
if (url.indexOf(WORKER_HOST + "/frames/") !== -1) {
    url = url.replace("/frames/", "/frame/");
}

$done({ url: url, headers: headers });
