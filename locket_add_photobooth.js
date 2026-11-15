
// Locket - Add Photobooth Summer 4 ô
// Only modifies getFilters response.
// Keeps existing filters and avoids duplicate insertion.

(function () {
  try {
    if (typeof $response === "undefined" || !$response.body) {
      return $done({});
    }

    const data = JSON.parse($response.body);

    // Only handle the expected response structure.
    const result = data.result;
    if (!result || !result.data) return $done({});
    if (!Array.isArray(result.data.filters)) return $done({});

    const filters = result.data.filters;

    // Avoid adding the same filter more than once.
    if (filters.some(item =>
      item && (item.id === "photobooth_summer" ||
               item.filter_id === "photobooth_summer")
    )) {
      return $done({});
    }

    const frameUrl =
      "https://locketsever.lehuynhgiabao71.workers.dev/frames/summer-1.png";

    const photobooth = {
      id: "photobooth_summer",
      filter_id: "photobooth_summer",
      name: "Photobooth Summer 4 ô",
      title: "Photobooth Summer 4 ô",
      category: "Photobooth",
      prompt: "photobooth_summer",
      style: "cutout",
      type: "normal",
      filter_type: "normal",
      filterType: "normal",
      overlay: true,
      image: frameUrl,
      image_url: frameUrl,
      icon: frameUrl,
      icon_url: frameUrl,
      iconUrl: frameUrl,
      tint: "#38BDF8",
      colors: ["#38BDF8", "#93C5FD"],
      captureButtonColors: ["#38BDF8", "#93C5FD"]
    };

    filters.push(photobooth);

    return $done({
      body: JSON.stringify(data)
    });

  } catch (error) {
    // If parsing fails, leave the original response unchanged.
    return $done({});
  }
})();
