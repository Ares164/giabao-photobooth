// ============================================================
// Locket Remote Config Rewrite (Response)
// Endpoint: firebaseremoteconfig.googleapis.com
// Dùng cho: Shadow / Shadowrocket / Loon / Quantumult X / Surge
// ============================================================

var WORKER_BASE = "https://locketsever.lehuynhgiabao71.workers.dev";
var obj = {};

try {
    obj = JSON.parse($response.body);
} catch (e) {
    obj = {};
}

if (!obj || typeof obj !== "object") {
    obj = {};
}

// Ép cập nhật & vô hiệu hóa cache cũ của iOS
obj.state = "UPDATE";
obj.templateVersion = String(Date.now());
obj.entries = obj.entries || {};
obj.entries.cache_ttl_seconds = "0";
obj.entries.client_cache_ttl_sec = "0";

// ============================================================
// 1. CẤU HÌNH GOLD, FEATURE GATES & PAYWALL
// ============================================================
Object.assign(obj.entries, {
    feature_gates: JSON.stringify({
        app_icon_picker: "enabled",
        camera_roll: "enabled",
        camera_roll_video: "enabled",
        camera_roll_video_30s: "enabled",
        camera_roll_video_upload: "enabled",
        camera_roll_video_upload_30s: "enabled",
        camera_roll_longer_video: "enabled",
        camera_roll_longer_video_30s: "enabled",
        camera_theme: "enabled",
        locket_views: "enabled",
        long_captions: "enabled",
        longer_video: "enabled",
        longer_video_30s: "enabled",
        extended_video_30s: "enabled",
        photo_library_video: "enabled",
        photo_library_video_30s: "enabled",
        gallery_video: "enabled",
        gallery_video_30s: "enabled",
        can_upload_30s_video: "enabled",
        can_record_30s_video: "enabled",
        allow_longer_video_upload: "enabled",
        longer_video_upload: "enabled",
        unlimited_friends: "enabled",
        priority_support: "enabled",
        profile_badge: "enabled",
        profileBadge: "enabled",
        gold_since_badge: "enabled",
        goldSinceBadge: "enabled",
        gold_badge_profile_menu: "enabled",
        remove_ads: "enabled",
        video: "enabled",
        video_15s: "enabled",
        video_30s: "enabled",
        video_40s: "enabled",
        video_60s: "enabled",
        video_upload: "enabled",
        video_upload_30s: "enabled",
        custom_widget_frames: "enabled",
        streak_recovery: "enabled",
        streakRecovery: "enabled",
        streaks: "enabled",
        streak: "enabled",
        streak_visualizations: "enabled",
        streak_badge: "enabled",
        groups: "enabled",
        private_mode: "enabled",
        viewer_mode: "enabled",
        close_friends: "enabled",
        camera_filter_sheet: "enabled",
        camera_filters: "enabled",
        camera_filter: "enabled",
        filter: "enabled",
        filters: "enabled",
        photo_filters: "enabled",
        ai_filters: "enabled",
        holiday_effects: "enabled",
        holiday_filters: "enabled",
        holiday_filter: "enabled",
        ar_filters: "enabled",
        face_filters: "enabled",
        profile_cover: "enabled",
        profile_cover_photo: "enabled",
        profile_customization: "enabled"
    }),
    upsell_features: JSON.stringify({
        app_icon_picker: false,
        camera_roll: false,
        camera_theme: false,
        locket_views: false,
        remove_ads: false,
        custom_widget_frames: false,
        filter: false,
        filters: false,
        camera_filter: false,
        camera_filters: false,
        holiday_filter: false,
        holiday_filters: false,
        holiday_effects: false,
        ai_filter: false,
        ai_filters: false
    }),
    paywall_presentation_config: JSON.stringify({
        uid: "paywall_testflight",
        onboarding: false,
        after_sent_moment: false,
        after_moment: false,
        after_capture: false,
        on_foreground: false,
        holiday_effects: false,
        camera_filters: false,
        camera_filter: false,
        filters: false,
        filter: false,
        ai_filter: false,
        ai_filters: false,
        filtered_image: false,
        filtered_images: false,
        generate_filtered_image: false,
        interval: 2592000,
        profile_banner: true
    }),
    feature_discovery_popup_config: JSON.stringify({
        tag: "LOCKET GOLD GB",
        tag_gradient: true,
        tag_style: "gold_gradient",
        title: "Đã Kich Hoạt 💛",
        feature_set: [
            {
                title: "LOCKET GOLD GB✨",
                body: "Đã lên gold rồi nhé chúc bạn ngày mới vui vẻ 💛",
                imageURL: "https://i.ibb.co/PsPP78CC/IMG-3103.jpg"
            }
        ],
        primary_button_title: "Xong",
        campaign: "locket_gold_welcome_v3",
        start_at: "2020-01-01T00:00:00",
        end_at: "2099-12-31T23:59:59",
        use_local_time_zone: true
    }),
    android_subscribe_gold_button_enabled: "false",
    profile_badge_visible: "true",
    lunar_new_year_app_icon_enabled: "true",

    country_code: "US",
    region_code: "US",
    is_us_user: "true",
    camera_filters_enabled: "true",
    camera_filter_enabled: "true",
    holiday_filters_enabled: "true",
    ai_filters_enabled: "true",
    camera_filter_gold_only: "false",
    camera_filters_gold_only: "false",
    holiday_filters_gold_only: "false",
    filter_gold_only: "false",
    filters_gold_only: "false",
    ai_filter_gold_only: "false",
    ai_filters_gold_only: "false",
    filter_paywall_enabled: "false",
    camera_filter_paywall_enabled: "false",
    filter_upsell_enabled: "false",
    require_gold_for_filters: "false",
    require_gold_for_filter: "false",
    requires_gold_for_filters: "false",
    requires_gold_for_filter: "false",
    requires_gold_for_camera_filters: "false",
    camera_filter_requires_gold: "false",
    camera_filters_require_gold: "false",
    ai_filter_requires_gold: "false",
    ai_filters_require_gold: "false",
    filter_requires_gold: "false",
    filters_require_gold: "false",
    filtered_image_requires_gold: "false",
    filtered_images_require_gold: "false",
    filtered_image_gold_only: "false",
    filtered_images_gold_only: "false",
    free_filters_enabled: "true",
    filter_selection_enabled: "true",
    camera_filter_sheet_selection_enabled: "true",
    sheet_filters_selectable: "true",
    dismiss_filter_sheet_on_select: "true",
    is_gold: "true",
    has_gold: "true",
    is_gold_user: "true",
    user_is_gold: "true",
    gold_user: "true",
    gold_active: "true",
    all_filters_free: "true",
    unlocked_filters: "true",
    camera_filter_max_count: "50",
    max_camera_filters: "50"
});

// ============================================================
// 2. CHẶN QUẢNG CÁO & TẮT TRACKING (SENTRY)
// ============================================================
Object.assign(obj.entries, {
    history_ads_mode: "off",
    history_ads_prefetch_count: "0",
    history_ads_prefetch_immediate: "false",
    history_ads_prefetch_reroute: "false",
    history_ads_dynamic_insertion: "false",
    history_ads_refresh_prefetch_on_foreground: "false",
    history_ads_floor_price: "0",
    history_ads_floor_price_att: "0",
    history_ad_log_displayed_on_background: "false",
    history_ads_debug_menu: "false",
    sentry_sample_rate: "0",
    sentry_network_tracing: "false",
    sentry_performance_tracking: "false",
    sentry_trace_sample_rate: "0",
    sentry_profiles_sample_rate: "0"
});

// ============================================================
// 3. CAMERA, VIDEO, FILTERS & UPLOAD QUALITY (45S & PHOTOBOOTH)
// ============================================================
var MY_VIDEO_DURATION = 45.0;
var QUALITY_MBPS = 0.6;
var durationStr = MY_VIDEO_DURATION.toString();
var MAX_SIZE_BYTES = 104857600;

var cameraConfig = {
    gold_max_duration: MY_VIDEO_DURATION,
    goldMaxDuration: MY_VIDEO_DURATION,
    max_duration: MY_VIDEO_DURATION,
    maxDuration: MY_VIDEO_DURATION,
    ultra_wide: true,
    ultraWide: true,
    volume_button: true,
    volumeButton: true,
    flash_button: true,
    telephoto: true,
    srgb: true,
    lanczos: true,
    quality_mbps: QUALITY_MBPS,
    qualityMbps: QUALITY_MBPS
};

var cameraRollConfig = {
    gold_max_duration: MY_VIDEO_DURATION,
    goldMaxDuration: MY_VIDEO_DURATION,
    video_max_duration: MY_VIDEO_DURATION,
    videoMaxDuration: MY_VIDEO_DURATION,
    max_duration: MY_VIDEO_DURATION,
    maxDuration: MY_VIDEO_DURATION,
    trim_max_duration: MY_VIDEO_DURATION,
    trimMaxDuration: MY_VIDEO_DURATION,
    camera_roll_max_duration: MY_VIDEO_DURATION,
    camera_roll_video_max_duration: MY_VIDEO_DURATION,
    max_file_size: MAX_SIZE_BYTES,
    max_upload_bytes: MAX_SIZE_BYTES,
    max_size_bytes: MAX_SIZE_BYTES,
    quality_mbps: QUALITY_MBPS,
    qualityMbps: QUALITY_MBPS,
    flash_button: true
};

obj.entries.camera = JSON.stringify(cameraConfig);
obj.entries.camera_roll = JSON.stringify(cameraRollConfig);

function makeStickerItem(uid, name, prompt, colors, sfSymbol, assetUrl) {
    return {
        uid: uid,
        id: uid,
        name: name,
        prompt: prompt,
        productUrl: null,
        colors: colors,
        captureButtonColors: colors,
        icon: {
            url: assetUrl,
            iconUrl: assetUrl,
            remoteImage: assetUrl,
            sfSymbol: sfSymbol,
            emoji: ""
        },
        textColor: "#FFFFFF",
        style: "cutout",
        overlay: true,
        overlayImageUrl: assetUrl,
        overlayImageURL: assetUrl,
        imageUrl: assetUrl,
        iconUrl: assetUrl,
        referenceImages: [],
        requires_gold: false,
        requiresGold: false,
        is_gold: false,
        isGold: false,
        unlocked: true,
        is_unlocked: true,
        isUnlocked: true,
        free: true,
        allowsTryFilter: true,
        allows_try_filter: true,
        tryButtonEnabled: true,
        try_button_enabled: true,
        type: "normal",
        filterType: "normal"
    };
}

function makeFrameItem(uid, name, tintColor, colors, frameUrl) {
    return {
        uid: uid,
        id: uid,
        name: name,
        category: "Photobooth",
        prompt: uid,
        style: "cutout",
        type: "normal",
        filterType: "normal",
        overlay: true,
        imageUrl: frameUrl,
        iconUrl: frameUrl,
        overlayImageUrl: frameUrl,
        overlayImageURL: frameUrl,
        tintColor: tintColor,
        colors: colors,
        captureButtonColors: colors,
        icon: {
            url: frameUrl,
            iconUrl: frameUrl,
            remoteImage: frameUrl,
            sfSymbol: "square.grid.2x2",
            symbol: "square.grid.2x2",
            emoji: ""
        },
        outputUrl: null,
        productUrl: null,
        textColor: "#FFFFFF",
        referenceImages: [],
        requires_gold: false,
        requiresGold: false,
        is_gold: false,
        isGold: false,
        unlocked: true,
        is_unlocked: true,
        isUnlocked: true,
        free: true,
        allowsTryFilter: true,
        allows_try_filter: true,
        tryButtonEnabled: true,
        try_button_enabled: true
    };
}

var stickerSpecs = [
    ["stk_rose_flower", "Ngậm Hoa Hồng", "Show the person in the photo with the exact same pose and background, but have them with a single rose in their mouth. If no person is present in the input, do not add anything to the output.", ["#E11D48", "#FB7185"], "camera.macro"],
    ["stk_shrek_ogre", "Tai Ogre Shrek", "Show the person in the photo with the exact same pose and background, but transform them into Shrek with rounded ears, and rustic clothing while preserving the pose. Keep their hairstyle, but make it look natural in the Shrek style.", ["#84CC16", "#65A30D"], "ear"],
    ["stk_superhero_cape", "Siêu Anh Hùng", "Show the person in the photo with the exact same pose and background, but suit them up like a superhero in a blue and red outfit with a flowing cape while keeping their pose and framing identical.", ["#DC2626", "#FBBF24"], "shield.fill"],
    ["stk_spooky_ghost", "Bóng Ma Nhỏ", "Show the person in the photo with the exact same pose, expression, and background, but subtly insert a realistic-looking ghost somewhere in the background. If no person is present, do not add any people to the output.", ["#38BDF8", "#818CF8"], "moon.stars.fill"],
    ["stk_pirate_hat", "Mũ Cướp Biển", "Show the person in the photo with the exact same pose and background, but dress them like a pirate from Pirates of the Caribbean while keeping their pose and facial expression identical.", ["#0F172A", "#E2E8F0"], "flag.fill"],
    ["stk_volcano_lava", "Núi Lửa Dung Nham", "Show the person in the photo with the exact same pose, background, and facial expression, but replace the ground with molten lava, glowing magma cracks, and volcanic sparks while keeping them rooted to the spot. If no face is present, do not show any people in the output, only ever show people who were in the original input image.", ["#EA580C", "#EF4444"], "flame.fill"],
    ["stk_rain_storm", "Mưa Bão Sấm Sét", "Retain the exact pose, facial features, distance, and background from the original image. Dress the subject as a character from the Wuthering Heights movie.\n\nFor Men: Dress them in the Jacob Elordi style with matching hair and outfit.\n\nFor Women: Dress them in the Margot Robbie style: A dramatic, historical-inspired red gown with a high-gloss, lacquered red skirt that is extremely voluminous and structured, forming a full bell shape from the waist down if that part is visible in the initial image. The skirt looks stiff and reflective, almost like polished vinyl. The bodice is corset-style, fitted tightly to the torso in the same glossy red material, with thin shoulder straps, a wide scoop rounded neckline, and the dress cinching the waist and creating a structured, corset-inspired silhouette WITHOUT visible boning, lacing or busks, and featuring a sheer billowing white long puffed sleeve shirt worn underneath with a scooped neckline for the white undershirt peeking out from behind the dress.\n\nConstraints: Do not modify the person's physical features, body shape, or positioning. Keep the framing and background 100% unchanged. If no person is present, return the image unaltered. Do not include Jacob Elordi or Margot Robbie themselves in the output image.", ["#3B82F6", "#6366F1"], "cloud.bolt.rain.fill"],
    ["stk_fortnite_llama", "Llama Fortnite", "Show the person in the photo with the exact same pose, expression, and background, but make the entire scene look like it was rendered inside a video game, similar to the style of Fortnite. Show no extra overlays or text on top of the photo. If no person is present, do not add any people to the output.", ["#A855F7", "#EC4899"], "gamecontroller.fill"],
    ["stk_watercolor_art", "Tranh Màu Nước", "Show the person in the photo with the exact same pose, expression, and background, but render the entire scene as a watercolor painting with flowing brush strokes. If no person is present, do not add any people to the output.", ["#06B6D4", "#F43F5E"], "paintpalette.fill"],
    ["stk_golden_hour", "Nắng Hoàng Hôn", "Show the person in the photo with the exact same pose, expression, and background, but make the scene look like it was captured during peak golden hour with warm sunlight and long shadows. If no person is present, do not add any people to the output.", ["#F59E0B", "#F97316"], "sun.max.fill"],
    ["stk_jungle_leaf", "Rừng Nhiệt Đới", "Show the person in the photo with the exact same pose, background, and facial expression, but with their background surroundings overgrown with plants in a seamless way. The person and their background should remain in the same positions. If no face is present, do not show any people in the output, only ever show people who were in the original input image.", ["#16A34A", "#15803D"], "leaf.fill"],
    ["stk_cute_zombie", "Zombie Chibi", "Show the person in the photo with the exact same pose and background, but turn them into a zombie while keeping their pose and expression identical.", ["#10B981", "#8B5CF6"], "person.fill"],
    ["stk_fireworks", "Pháo Hoa Rực Rỡ", "Show the person in the photo with the exact same pose and background, but fill the scene with fireworks exploding in the night sky and reflecting colorful light onto the subject. Ensure the person is in the exact same pose and positioning within the frame. If no face is present, do not show any people in the output, only ever show people who were in the original input image.", ["#EC4899", "#8B5CF6"], "sparkles"],
    ["stk_new_year_2026", "Năm Mới 2026", "Show the person in the photo with the exact same pose and background, but have them wearing decorative glasses that say Happy New Year 2026. Ensure the person is in the exact same pose and positioning within the frame. If no face is present, do not show any people in the output, only ever show people who were in the original input image.", ["#F59E0B", "#EF4444"], "party.popper.fill"],
    ["stk_harry_potter", "Phù Thủy Hogwarts", "Show the person in the photo with the exact same pose and background, but show them as a character from Harry Potter wearing a robe of one of the four houes. Keep the pose and framing identical and do not change the background.", ["#740001", "#D3A625"], "wand.and.stars"],
    ["stk_minecraft", "Minecraft 3D", "Show the person in the photo with the exact same pose, expression, and background, but make everything in the scene look like it was created from Minecraft-style blocks and show people as Minecraft characters. If no person is present, do not add any people to the output.", ["#22C55E", "#0EA5E9"], "cube.fill"],
    ["stk_fire_flame", "Ngọn Lửa Rực Cháy", "Show the persons in the photo with the exact same pose and background, but with a dramatic theatrical flame effect appearing just in front of the subject's face, as if they are performing a fantasy fire-breathing act, captured with a modern iPhone camera look.\n\nThe flame should appear as a staged visual effect, suspended in front of the mouth area without showing fire originating from inside the body. Keep the effect believable and cinematic, with a bright yellow-white core, orange and red edges, subtle motion blur, and gentle heat distortion in the nearby air.\n\nAdd a soft warm glow on nearby facial features and clothing, consistent with the flame's position, while preserving the original lighting of the scene. Do not show burns, smoke inhalation, injury, pain, damage, or distress. Do not alter the person's face, expression, identity, or pose.\n\nKeep the background, framing, depth of field, and image quality identical to the original, with the flame effect appearing as a safe staged performance element captured in-camera. Do not change the overall compsition of the photo, do not add new people to the photo, only show each person in the photo one time.", ["#F97316", "#EAB308"], "flame.fill"],
    ["stk_giant_spider", "Nhện Khổng Lồ", "Show the person in the photo with the exact same pose, expression, and background, but place a realistic spider perched on them somewhere, such as their shoulder or head. If no person is present, do not add any people to the output.", ["#334155", "#EF4444"], "ant.fill"],
    ["stk_ocean_underwater", "Thủy Cung Đại Dương", "Show the person in the photo with the exact same pose, background, and facial expression, but as if them and their surrounding environment was underwater. If no face is present, do not show any people in the output, only ever show people who were in the original input image.", ["#06B6D4", "#3B82F6"], "drop.fill"],
    ["stk_ufo_alien", "UFO & Alien", "Show the person in the photo with the exact same pose and background, but show a subtle UFO hovering in the sky or an alien somewhere hidden somewhere in the user's background. If no face is present, do not show any people in the output, only ever show people who were in the original input image.", ["#10B981", "#8B5CF6"], "sparkles"],
    ["stk_dio_pm2", "Practical Magic 2", "locket", ["#7C3AED", "#C4B5FD"], "sparkles"],
    ["stk_dio_looksmaxing", "Looks-Maxxing", "looks_maxxing", ["#F59E0B", "#FDE68A"], "sparkles"],
    ["stk_dio_influencer", "Influencer", "influencer", ["#EC4899", "#F9A8D4"], "sparkles"],
    ["stk_dio_toothless", "Toothless", "toothless", ["#0F172A", "#64748B"], "sparkles"],
    ["stk_dio_orange_wig", "Okay Wig", "okay_wig", ["#F97316", "#FDBA74"], "sparkles"],
    ["stk_dio_bye_brows", "Bye Brows", "bye_brows", ["#A8A29E", "#E7E5E4"], "sparkles"],
    ["stk_dio_braces", "Braces", "braces", ["#38BDF8", "#E0F2FE"], "sparkles"],
    ["stk_dio_tatted", "Tatted", "tatted", ["#111827", "#6B7280"], "sparkles"],
    ["stk_dio_bearded", "Beard", "beard", ["#78350F", "#D6A36A"], "sparkles"],
    ["stk_dio_buns", "Buns", "buns", ["#F472B6", "#FBCFE8"], "sparkles"],
    ["stk_dio_mohawk", "Mohawk", "mohawk", ["#EF4444", "#FCA5A5"], "sparkles"],
    ["stk_dio_bob", "Bob Cut", "bob_cut", ["#1F2937", "#9CA3AF"], "sparkles"],
    ["stk_dio_bowling_ball", "Bowling Ball", "bowling_ball", ["#111827", "#4B5563"], "sparkles"],
    ["stk_dio_bleached_hair", "Blond & Bleached", "blonde_bleached", ["#FACC15", "#FEF3C7"], "sparkles"],
    ["stk_dio_princess", "Princess", "princess", ["#F472B6", "#FDE68A"], "sparkles"],
    ["stk_dio_cash", "Ca$h Money", "cash_money", ["#22C55E", "#BBF7D0"], "sparkles"],
    ["stk_dio_slimed", "Slimed", "slimed", ["#84CC16", "#D9F99D"], "sparkles"],
    ["stk_dio_happy_birthday", "Happy Birthday", "happy_birthday", ["#F97316", "#FDE68A"], "sparkles"],
    ["stk_dio_flower_crown", "Flower Crown", "flower_crown", ["#FB7185", "#BBF7D0"], "sparkles"],
    ["stk_dio_cutesy", "Cutesy", "cutesy", ["#F9A8D4", "#FCE7F3"], "sparkles"],
    ["stk_dio_sticker_face", "Sticker Face", "sticker_face", ["#FBBF24", "#FDE68A"], "sparkles"],
    ["stk_dio_love_bug", "Love Bug", "love_bug", ["#F43F5E", "#FECDD3"], "sparkles"],
    ["stk_dio_cowboy", "Cowboy & Cowgirl", "cowboy_cowgirl", ["#B45309", "#FDE68A"], "sparkles"],
    ["stk_dio_giraffe", "Giraffe", "giraffe", ["#D97706", "#FDE68A"], "sparkles"],
    ["stk_dio_wedding", "Wedding", "wedding", ["#F8FAFC", "#E2E8F0"], "sparkles"],
    ["stk_dio_clown", "Clown", "clown", ["#EF4444", "#FDE68A"], "sparkles"],
    ["stk_dio_sweat_hearts", "Sweet Hearts", "sweet_hearts", ["#FB7185", "#FCE7F3"], "sparkles"],
    ["stk_dio_bearded_holiday", "Bearded", "bearded", ["#78350F", "#D6A36A"], "sparkles"],
    ["stk_dio_frosty", "Frosty", "frosty", ["#38BDF8", "#E0F2FE"], "sparkles"],
    ["stk_dio_elf", "Elf", "elf_cutout", ["#16A34A", "#FACC15"], "sparkles"],
    ["stk_dio_santa", "Santa", "santa_cutout", ["#DC2626", "#F8FAFC"], "sparkles"],
    ["stk_dio_easter_bunny", "Easter Bunny", "easter_bunney_cutout", ["#F9A8D4", "#E9D5FF"], "sparkles"],
    ["stk_dio_leprechaun", "Leprechaun", "leprechaun", ["#15803D", "#FACC15"], "sparkles"],
    ["stk_dio_easter_chick", "Easter Chick", "easter_chick_cutout", ["#FACC15", "#FDE68A"], "sparkles"],
    ["stk_dio_lucky_face", "Lucky Face", "lucky_face", ["#22C55E", "#BBF7D0"], "sparkles"]
];

var frameSpecs = [
    ["frame_anh_dao", "Photobooth Anh Đào", "#EC4899", ["#EC4899", "#F9A8D4"]],
    ["frame_galaxy", "Photobooth Galaxy", "#8B5CF6", ["#8B5CF6", "#C4B5FD"]],
    ["frame_coki", "Photobooth Coki", "#F59E0B", ["#F59E0B", "#FCD34D"]],
    ["frame_sweet", "Photobooth Sweet", "#F472B6", ["#F472B6", "#FBCFE8"]],
    ["frame_milk", "Photobooth Milk", "#38BDF8", ["#38BDF8", "#BAE6FD"]],
    ["frame_mery_christmas", "Photobooth Merry Christmas", "#16A34A", ["#16A34A", "#86EFAC"]],
    ["frame_happy_luna_new_year", "Photobooth Happy Luna New Year", "#EAB308", ["#EAB308", "#FDE68A"]],
    ["summer-1", "Photobooth Summer 1", "#F97316", ["#F97316", "#FDBA74"]],
    ["summer-2", "Photobooth Summer 2", "#06B6D4", ["#06B6D4", "#67E8F9"]],
    ["frame_thu", "Photobooth Mùa Thu", "#D97706", ["#D97706", "#FCD34D"]],
    ["frame_flower", "Photobooth Flower", "#EC4899", ["#EC4899", "#F9A8D4"]]
];

var customPhotoboothFilters = [];
for (var s = 0; s < stickerSpecs.length; s++) {
    var sp = stickerSpecs[s];
    customPhotoboothFilters.push(
        makeStickerItem(sp[0], sp[1], sp[2], sp[3], sp[4], WORKER_BASE + "/stickers/" + sp[0] + ".png")
    );
}
for (var f = 0; f < frameSpecs.length; f++) {
    var fr = frameSpecs[f];
    customPhotoboothFilters.push(
        makeFrameItem(fr[0], fr[1], fr[2], fr[3], WORKER_BASE + "/frame/" + fr[0] + ".png")
    );
}

var hot3dIds = [
    "stk_rose_flower", "stk_shrek_ogre", "stk_superhero_cape", "stk_spooky_ghost",
    "stk_pirate_hat", "stk_volcano_lava", "stk_rain_storm", "stk_fortnite_llama",
    "stk_watercolor_art", "stk_golden_hour", "stk_jungle_leaf", "stk_cute_zombie",
    "stk_fireworks", "stk_new_year_2026", "stk_harry_potter", "stk_minecraft",
    "stk_fire_flame", "stk_giant_spider", "stk_ocean_underwater", "stk_ufo_alien"
];

var photoboothFrameIds = [
    "frame_anh_dao", "frame_galaxy", "frame_coki", "frame_sweet", "frame_milk",
    "frame_mery_christmas", "frame_happy_luna_new_year", "summer-1", "summer-2",
    "frame_thu", "frame_flower"
];

var baseTrendIds = [
    "stk_rose_flower", "stk_shrek_ogre", "stk_superhero_cape", "stk_spooky_ghost",
    "stk_pirate_hat", "stk_volcano_lava", "stk_rain_storm", "stk_fortnite_llama",
    "stk_watercolor_art", "stk_golden_hour", "stk_jungle_leaf", "stk_cute_zombie",
    "stk_fireworks", "stk_new_year_2026"
];

function makeFilterGroup(id, viTitle, enTitle, ids) {
    return {
        id: id,
        title: { en: enTitle, vi: viTitle },
        filterIds: ids,
        filter_ids: ids,
        requires_gold: false,
        requiresGold: false,
        is_gold: false,
        isGold: false,
        unlocked: true,
        is_unlocked: true,
        isUnlocked: true,
        free: true
    };
}

var customFilterGroups = [
    makeFilterGroup("group_hot_ai_3d", "Hiệu Ứng AI 3D Hot 🔥", "Hiệu Ứng AI 3D Hot 🔥", hot3dIds),
    makeFilterGroup("group_photobooth", "Khung & Photobooth 📸", "Khung & Photobooth 📸", photoboothFrameIds),
    makeFilterGroup("group_frames", "Khung Viền & Hot Trend 🖼️", "Khung Viền & Hot Trend 🖼️", baseTrendIds),
    makeFilterGroup("group_event", "Sự kiện", "Sự kiện", baseTrendIds.concat(["stk_dio_pm2"])),
    makeFilterGroup("group_mischief", "Tinh nghịch", "Tinh nghịch", baseTrendIds.concat([
        "stk_dio_looksmaxing", "stk_dio_influencer", "stk_dio_toothless", "stk_dio_orange_wig"
    ])),
    makeFilterGroup("group_appearance", "Ngoại hình", "Ngoại hình", baseTrendIds.concat([
        "stk_dio_bye_brows", "stk_dio_braces", "stk_dio_tatted", "stk_dio_bearded",
        "stk_dio_buns", "stk_dio_mohawk", "stk_dio_bob", "stk_dio_bowling_ball", "stk_dio_bleached_hair"
    ])),
    makeFilterGroup("group_celebrate", "Ăn mừng", "Ăn mừng", baseTrendIds.concat([
        "stk_dio_princess", "stk_dio_cash", "stk_dio_slimed", "stk_dio_happy_birthday"
    ])),
    makeFilterGroup("group_cute", "Dễ thương", "Dễ thương", baseTrendIds.concat([
        "stk_dio_flower_crown", "stk_dio_cutesy", "stk_dio_sticker_face", "stk_dio_love_bug"
    ])),
    makeFilterGroup("group_costume", "Trang phục", "Trang phục", baseTrendIds.concat([
        "stk_dio_cowboy", "stk_dio_giraffe", "stk_dio_wedding", "stk_dio_clown"
    ])),
    makeFilterGroup("group_holiday", "Ngày lễ", "Ngày lễ", baseTrendIds.concat([
        "stk_dio_sweat_hearts", "stk_dio_bearded_holiday", "stk_dio_frosty", "stk_dio_elf",
        "stk_dio_santa", "stk_dio_easter_bunny", "stk_dio_leprechaun", "stk_dio_easter_chick", "stk_dio_lucky_face"
    ]))
];

var customPickerFilters = [];
for (var p = 0; p < customPhotoboothFilters.length; p++) {
    customPickerFilters.push(customPhotoboothFilters[p].id);
}

var locketCameraFilterConfig = {
    showFilterButton: true,
    allowsCustomFilters: true,
    referenceImageAttachmentEnabled: true,
    sheetEnabled: true,
    openSheetImmediately: false,
    pickerFilters: customPickerFilters,
    picker_filters: customPickerFilters,
    filterGroups: customFilterGroups,
    filter_groups: customFilterGroups,
    sheetFilters: customFilterGroups,
    sheet_filters: customFilterGroups,
    remoteFilters: customPhotoboothFilters,
    remote_filters: customPhotoboothFilters,
    filters: customPhotoboothFilters,
    show_filter_button: true,
    allows_custom_filters: true,
    reference_image_attachment_enabled: true,
    sheet_enabled: true,
    open_sheet_immediately: false
};

var locketCelebrityFilterConfig = {
    celebrityUid: "locket_admin_custom",
    cameraFilterConfig: locketCameraFilterConfig
};

Object.assign(obj.entries, {
    camera_filter_config: JSON.stringify(locketCameraFilterConfig),
    celebrity_filter_config: JSON.stringify(locketCelebrityFilterConfig),
    live_photos: JSON.stringify({
        capture: true,
        video: true,
        viewing: true,
        catch_up: true,
        widget_looping_mode: "never"
    }),
    camera_roll_preview_enabled: "true",
    camera_roll_video_enabled: "true",
    camera_roll_video_upload_enabled: "true",
    internal_camera_roll_video_upload_enabled: "true",
    longer_camera_roll_videos_enabled: "true",
    camera_roll_video_max_duration: durationStr,
    camera_roll_max_duration: durationStr,
    camera_roll_duration: durationStr,
    max_video_duration: durationStr,
    video_max_duration: durationStr,
    video_trim_max_duration: durationStr,
    trim_max_duration: durationStr,
    gold_max_duration: durationStr,
    goldMaxDuration: durationStr,
    max_file_size: MAX_SIZE_BYTES.toString(),
    max_upload_bytes: MAX_SIZE_BYTES.toString(),
    video_quality_mbps: QUALITY_MBPS.toString(),
    video_sound_enabled: "true",
    microphone_enabled: "true",
    camera_microphone_enabled: "true",
    audio_session_deactivation_enabled: "true",
    zoom_enabled: "true",
    upload_main: "false",
    upload_main_image_quality: "1.0",
    upload_main_image_size: "1440",
    upload_thumbnail_image_quality: "1.0",
    upload_thumbnail_image_size: "1020"
});

// ============================================================
// 4. BẠN BÈ, GIỚI HẠN & ĐỀ XUẤT KẾT BẠN
// ============================================================
Object.assign(obj.entries, {
    max_friends_count: "1000",
    friend_limit_mode: "disabled",
    soft_friend_limit_threshold_count: "1000",
    show_friend_limit_on_cam: "false",
    signup_max_friends_count: "1000",
    celebrity_inbox_limit: "999999",
    celebrity_inbox_enabled: "true",
    celebrity_vip_qr_redemption_enabled: "true",
    friend_limit_geo_override: JSON.stringify({ experiments: {}, area_code_overrides: {} }),
    friends_sheet_locket_count_config: JSON.stringify({
        items: [
            { threshold: 0, icon_name: "heart" },
            { threshold: 1, icon_name: "heart.fill" },
            { threshold: 10, emoji: "🤍" },
            { threshold: 100, emoji: "💛" },
            { threshold: 500, emoji: "❤️‍🔥" },
            { threshold: 1000, emoji: "🌟🫶🌟" },
            { threshold: 2000, emoji: "✨💟✨" },
            { threshold: 5000, emoji: "⚡️😵‍💫⚡" },
            { threshold: 10000, emoji: "✨⚡️😱⚡✨" }
        ]
    }),
    friend_locket_count_config: JSON.stringify({
        items: [
            { threshold: 0, icon_name: "heart" },
            { threshold: 1, icon_name: "heart.fill" },
            { threshold: 10, emoji: "🤍" },
            { threshold: 100, emoji: "💛" },
            { threshold: 500, emoji: "❤️‍🔥" },
            { threshold: 1000, emoji: "✨💗✨" },
            { threshold: 2000, emoji: "✨️⭐️✨" },
            { threshold: 5000, emoji: "✨💎✨" },
            { threshold: 10000, emoji: "✨🔐💛✨" }
        ]
    }),
    new_friends_monitoring_enabled: "true",
    improved_friend_suggestions: "false",
    show_friend_suggestions_by_default: "false",
    emoji_friend_suggestions: "false",
    prompt_contact_permissions_on_search: "false",
    populate_phone_numbers_from_suggest_friends: "false",
    hide_friends_enabled: "false",
    hide_invite_links: "false",
    hide_skip_contacts: "false",
    show_all_contacts: "true",
    show_invite_suggestions: "false",
    show_no_friends_bottom_sheet: "false",
    signup_allow_skip_add_friends: "true",
    signup_custom_profile_picture: "true",
    user_data_export_enabled: "true",
    username_suggestions_enabled: "true"
});

// ============================================================
// 5. MOMENTS, STREAK, CHAT & TƯƠNG TÁC
// ============================================================
try {
    var streak = JSON.parse(obj.entries.streak_config || "{}");
    streak.enabled = true;
    streak.show_streak = true;
    streak.minimum_recovery_count = 0;
    streak.minimum_display_count = 0;
    obj.entries.streak_config = JSON.stringify(streak);
} catch (e) { }

Object.assign(obj.entries, {
    moment_views_enabled: "true",
    moment_views_v2: "true",
    record_moment_views: "true",
    notify_moment_views: "true",
    get_moment_views_as_cloud_function: "true",
    moment_reactions_v2: "true",
    chat_reactions_enabled: "true",
    conversation_reactions: "true",
    typing_indicators_enabled: "true",
    unsend_message_enabled: "true",
    reply_prototype_enabled: "true",
    messages_integration: "true",
    conversations_enabled: "true",
    fetch_moments_in_conversation: "true",
    hide_chat_button: "false",
    groups_enabled: "true",
    group_contact_invites_enabled: "true",
    groups_onboarding_accept_invite_preview_enabled: "true",
    chat_hyperlink_enabled_mode: "always_enabled",
    conversation_drafts_enabled: "true",
    send_to_self_only_mode: "always_enabled",
    time_travel_rewind_v2_enabled: "true",
    calendar_delete_moment_enabled: "true",
    calendar_rewind_enabled: "false",
    locket_yearbook_story_sharing_encouraged: "true",
    rollcall_enabled: "true",
    rollcall_comment_actions: "true",
    rollcall_profile_button: "true",
    rollcall_prompt_export_after_share: "true",
    rollcall_confirm_skip_tagging: "false",
    rollcall_tap_to_tag_enabled: "false"
});

// ============================================================
// 6. WIDGET SỰ KIỆN MỚI, KHUNG HOÀNG GIA & ĐỊA CHỈ + FOCUS
// ============================================================
Object.assign(obj.entries, {
    widget_frame_event_max_images: "10",
    android_widget_frame_event_enabled: "true",
    widget_badge_enabled: "true",
    widget_badge_v2: "true",
    widget_stale_state_enabled: "false",
    widget_last_sent_indicator: "false",
    widget_sync_token_reload_mode: "clearTokenNever",
    widget_frame_event: JSON.stringify({
        uid: "custom_frame_event_2026",
        url: "https://i.ibb.co/7dXZMyBg/1.png",
        use_local_time_zone: true,
        placement: "below",
        start_at: "2020-01-01T00:00:00",
        end_at: "2099-12-31T23:59:59"
    }),
    custom_widget_frames: "enabled",
    custom_widget_frames_enabled: "true",
    widget_frames_config: JSON.stringify({
        enabled: true,
        allow_custom_frames: true,
        unlock_all_styles: true,
        default_style: "royal_gold_vip",
        styles: [
            {
                id: "royal_gold_vip",
                name: "👑 VIP Royal Gold",
                border_style: "ornate_gold",
                crown_badge: true,
                badge_text: "VIP",
                corner_radius: 28.0,
                glow_effect: true,
                glow_color: "#FFD700",
                overlay_asset: "royal_crown_frame"
            },
            {
                id: "verified_blue_vip",
                name: "💎 Tích Xanh Verified VIP",
                border_style: "ornate_gold",
                crown_badge: true,
                badge_text: "VERIFIED",
                corner_radius: 28.0,
                glow_effect: true,
                glow_color: "#1D9BF0",
                overlay_asset: WORKER_BASE + "/assets/verified_badge.png"
            }
        ]
    }),
    widget_frame_styles: JSON.stringify([
        "royal_gold_vip",
        "verified_blue_vip",
        "gold_luxury",
        "classic"
    ]),
    seasonal_frames_config: JSON.stringify({
        enabled: true,
        auto_rotate: false,
        override_default: true,
        current_season_theme: "royal_gold_vip"
    }),
    live_activity_onboarding: "true",
    live_activity_onboarding_variant: "friending",
    register_live_activity_push_to_start_token: "true",
    live_activity_remove_stale_start_token: "true",
    notification_preferences_live_activities: "true",
    notification_preferences: "true",
    notification_reply_body_visible: "true",
    prompt_notification_permissions_after_friending: "true",
    activity_bar_enabled: "true",
    journal_activity_bar_enabled: "true",
    journal_settings: JSON.stringify({
        debug_menu_enabled: false,
        focus_animation: true,
        compact_header: true,
        friends_button: true,
        reverse_scroll_direction: false,
        streak_visualization: true,
        streak_visualization_style: "gradient",
        streak_header_minimum_count: 0,
        streak_visualization_minimum_count: 1,
        overlay_indicators: {
            location: true,
            music: true,
            static_content: true,
            weather: true
        }
    }),
    qr_code_config: JSON.stringify({ profile_enabled: true, scanning_enabled: true }),
    custom_profile_pics: "true",
    profile_menu_v2_enabled: "true"
});

// ============================================================
// 7. CACHE & STORAGE
// ============================================================
Object.assign(obj.entries, {
    storage_bucket: "gs://locket-img",
    storage_bucket_video: "gs://locket-video",
    image_cache_max_age_sec: "157680000",
    image_cache_max_size: "400000000",
    history_cache_age_days: "1000",
    user_cache_max_age_sec: "0",
    friends_cache_max_age_sec: "0",
    image_fetch_cache: "true",
    image_cache_use_shared: "true",
    use_doc_dir_for_image_cache: "true",
    efficient_history_cache_invalidation: "true",
    timestamp_based_history_fetches: "true",
    get_latest_moment_v2: "true",
    fetch_users_from_cloud_function: "true",
    refresh_interval: "60",
    firestore_refresh_v2: "true",
    firestore_refresh_v3: "true",
    keychain_access_retries: "true",
    blocked_users_cached_sync_enabled: "true",
    beta_features_enabled: "true",
    join_testflight_enabled: "true",
    safety_center: "true",
    help_center: "true",
    support_v2: "true",
    privacy_choices_setting: "true",
    request_att_permission: "true",
    invite_link_preview_variant: "4",
    share_history_config: JSON.stringify({ prompt_enabled: false, fetching_enabled: true }),
    share_history_prompt_enabled: "false",
    use_thumbnails_for_sharing: "true",
    use_thumbnails_in_timeline: "true",
    persist_onboarding_step: "true",
    onboarding_contact_permission_step: "true"
});

// ============================================================
// 8. OVERLAY & CUSTOM CAPTIONS (ĐÃ KHỬ TRÙNG OVERLAY_ID)
// ============================================================
function makeStaticCaption(id, text, emoji, colors, textColor, localizedText, dailyStart, dailyEnd) {
    var caption = {
        background: { colors: colors },
        max_lines: 1,
        text: text,
        text_color: textColor,
        type: "static_content"
    };
    if (emoji) {
        caption.icon = { data: emoji, type: "emoji" };
    }
    if (localizedText) {
        caption.localized_text = localizedText;
    }
    var item = {
        overlay_id: id,
        source: "remote",
        caption: caption
    };
    if (typeof dailyStart === "number") item.daily_start_hour = dailyStart;
    if (typeof dailyEnd === "number") item.daily_end_hour = dailyEnd;
    return item;
}

var seenOverlayIds = {};
function addUniqueItem(list, item) {
    if (!item || !item.overlay_id || seenOverlayIds[item.overlay_id]) return;
    seenOverlayIds[item.overlay_id] = true;
    list.push(item);
}

function buildSection(sectionTitle, rawItems) {
    var out = [];
    for (var i = 0; i < rawItems.length; i++) {
        addUniqueItem(out, rawItems[i]);
    }
    return { section: sectionTitle, items: out };
}

var overlaySections = [
    {
        section: "🎨 General",
        items: [
            { overlay_id: "caption:standard", source: "local", caption: { type: "standard" } },
            { overlay_id: "caption:link", source: "local", caption: { type: "link" }, overlay_type: "caption" },
            { overlay_id: "caption:review", source: "local", caption: { type: "review" } },
            { overlay_id: "caption:music", source: "local", caption: { type: "music" } },
            { overlay_id: "caption:location", source: "local", caption: { type: "location" } },
            { overlay_id: "caption:weather", source: "local", caption: { type: "weather" } },
            { overlay_id: "caption:time", source: "local", caption: { type: "time" } },
            { overlay_id: "caption:streak", source: "local", caption: { type: "streak" } },
            { overlay_id: "caption:star_sign", source: "local", caption: { type: "star_sign" } },
            { overlay_id: "caption:poll", source: "local", caption: { type: "poll" } },
            { overlay_id: "caption:color_palette", source: "local", caption: { type: "color_palette" } },
            { overlay_id: "caption:live", source: "local", caption: { type: "live" } },
            { overlay_id: "caption:locket_count", source: "local", caption: { type: "locket_count" } }
        ]
    },
    buildSection("🎨 Tình yêu & Cơm chó 💕", [
        makeStaticCaption("caption:em_nho_anhh", "em nhớ anhh", "🥺", ["#FF6B81", "#FF8E9E", "#FFB3C6"], "#8C1938"),
        makeStaticCaption("caption:nho_anh_phien", "nhớ anh tới mức hơi phiền", "🥺", ["#F0B5CB", "#F6D0DF", "#DCCAF0"], "#70445A"),
        makeStaticCaption("caption:i_love_you", "i love you", "💗", ["#FF8FAB", "#FFC2D1", "#FFE5EC"], "#8A304F"),
        makeStaticCaption("caption:yeu_cuc_dang", "yêu cục dàng", "🎀", ["#F2B5C8", "#F8D5D9", "#F6E5D2"], "#754454"),
        makeStaticCaption("caption:yeu_emmm", "Yeu Emmm", "💗", ["#F2AFC6", "#F7C9D9", "#E5CFF4"], "#70445C"),
        makeStaticCaption("caption:yeu_anhhh", "Yeu Anhhh", "🫶", ["#B8C9F2", "#D5DDF8", "#E8CFF0"], "#414C72"),
        makeStaticCaption("caption:baby_love", "Baby Love 💖", "🧸", ["#FFB6C1", "#FF69B4", "#FF1493"], "#FFFFFFE6"),
        makeStaticCaption("caption:muon_duoc_om", "Muốn được ôm", "🫂", ["#FF9A9E", "#FECFEF"], "#FFFFFF"),
        makeStaticCaption("caption:cho_hun_mieng", "cho hun miếng coi", "😘", ["#F3AFC7", "#F8D0D8", "#F4C9BB"], "#754252"),
        makeStaticCaption("caption:me_anh_me_ngu", "mê anh hơn mê ngủ", "💤", ["#C4C8EF", "#DED3F4", "#EBCDE4"], "#4F4770"),
        makeStaticCaption("caption:be_be_can_do", "em bé cần được dỗ", "🎀", ["#FF8FAB", "#FFC2D1", "#FFE5EC"], "#812D4A"),
        makeStaticCaption("caption:iu_thi_noi", "iu thì nói, đừng có ngại", "🤭", ["#FFD166", "#FFE8A3", "#FFF3D0"], "#704510"),
        makeStaticCaption("caption:iu_hong_thi_bao", "iu hong thì bảo", "🎀", ["#FF6B6B", "#FF9999", "#FFD1C9"], "#812626"),
        makeStaticCaption("caption:anh_thuong_em", "anh có thương em thiệt hong", "🥹", ["#A0C4FF", "#BDE0FE", "#DFF3FF"], "#23466F"),
        makeStaticCaption("caption:yeu_em_nhiem_vu", "yêu em là nhiệm vụ cả đời", "🫡", ["#B7E4C7", "#D8F3DC", "#F0FFF1"], "#24563A"),
        makeStaticCaption("caption:crush_nhin", "crush nhìn em một cái là xong", "🫠", ["#CDB4DB", "#E2CFEA", "#F3E5F5"], "#593B68"),
        makeStaticCaption("caption:ngoai_le_cua_em", "anh là ngoại lệ của em", "🫶", ["#80CBC4", "#B2DFDB", "#E0F2F1"], "#205953"),
        makeStaticCaption("caption:dang_ban_tuong_tu", "Đang bận tương tư", "💭", ["#1A2980", "#26D0CE"], "#FFFFFF"),
        makeStaticCaption("caption:mac_bay_tinh_yeu", "Mắc bẫy tình yêu", "💘", ["#EE9CA7", "#FFDDE1"], "#000000E6"),
        makeStaticCaption("caption:minh_cuoi_nhau", "hông ấy mình cưới nhau đi", "💍", ["#F0B8CD", "#F7D4DF", "#E7C9EF"], "#70465B"),
        makeStaticCaption("caption:wedding_time", "Wedding Time!", "💍", ["#FFE4E1", "#E73C7E"], "#FFFFFFE6", { en: "Wedding Time!", vn: "Đám cưới nè!" }),
        makeStaticCaption("caption:dating_time", "Dating Time!", "💕", ["#E91E63", "#F44336"], "#FFFFFFE6"),
        makeStaticCaption("caption:tuong_love_hoa_ra_lop", "Tưởng love hoá ra lốp", "❤️🩹", ["#C9184A", "#FF4D6D", "#FFB3C6"], "#64152F"),
        makeStaticCaption("caption:cam_thay_hanh_phuc", "Cảm thấy hạnh phúc", "🇻🇳", ["#EC407A", "#F8BBD0"], "#FFFFFFE6", { en: "Feeling Happy", vn: "Cảm thấy hạnh phúc" })
    ]),
    buildSection("🎨 Holiday Caption", [
        makeStaticCaption("caption:halloween_2026", "Halloween", "🎃", ["#150804", "#C8540D"], "#FFB182", { en: "Halloween", vn: "Halloween" }),
        makeStaticCaption("caption:autumn_2026", "Xin chào Mùa Thu", "🍂", ["#FFE0A0", "#F6A53A"], "#FFFFFF", { en: "Xin chào Mùa Thu", vn: "Xin chào Mùa Thu" }),
        makeStaticCaption("caption:christmas_eve_2026", "Giáng sinh an lành", "🕯️", ["#2FA85F", "#176B3A"], "#FFFFFF", { en: "Giáng sinh an lành", vn: "Giáng sinh an lành" }),
        makeStaticCaption("caption:christmas_day_2026", "Giáng sinh an lành", "🎄", ["#E53935", "#A81818"], "#FFFFFF", { en: "Giáng sinh an lành", vn: "Giáng sinh an lành" }),
        makeStaticCaption("caption:new_years_eve_2026", "Xin chào 2027!", "🥂", ["#FFC64B", "#FFEDBF"], "#643F00", { en: "Xin chào 2027!", vn: "Xin chào 2027!" }),
        makeStaticCaption("caption:new_years_day_2027", "Xin chào 2027!", "💫", ["#3B00EC", "#823FFF"], "#FFFFFF", { en: "Xin chào 2027!", vn: "Xin chào 2027!" }),
        makeStaticCaption("caption:new_years_day_2027_alternate", "2027", null, ["#FF0062", "#FF783F"], "#FFFFFF")
    ]),
    buildSection("🎨 Decorative by Locket", [
        makeStaticCaption("caption:toi_nho_em", "보고 싶어 🥺", null, ["#FFFFFF", "#6D9EEB"], "#000000E6"),
        makeStaticCaption("caption:party_time", "Party Time!", "🪩", ["#5EFFF5", "#FCFF57"], "#000000E6"),
        makeStaticCaption("caption:good_morning", "Good morning", "☀️", ["#EF7402", "#EABF0F"], "#FFFFFFE5", null, 5, 10),
        makeStaticCaption("caption:goodnight", "Goodnight", "🌙", ["#370C6F", "#575CD4"], "#FFFFFFE6", null, 19.5, 24),
        makeStaticCaption("caption:ootd", "OOTD", "🕶", ["#FFFFFF", "#DBDBDB"], "#101010E6"),
        makeStaticCaption("caption:miss_you", "Miss you", "🥰", ["#EC0C00", "#FF493F"], "#FFFFFFDB")
    ]),
    buildSection("🎨 Decorative by MinhHiep08", [
        makeStaticCaption("caption:bunniesept nah", " bunniesept nah 🐰 ", null, ["#FF91B4", "#FFB9CF", "#FFE2ED"], "#77717A"),
        makeStaticCaption("caption:MinhHiep08", "💻 MinhHiep08", null, ["#B8E7FF", "#A8F5D0", "#DCCBFF"], "#183153"),
        makeStaticCaption("caption:Hieon", "Hieon", null, ["#B8E7FF", "#A8F5D0", "#DCCBFF"], "#183153"),
        makeStaticCaption("caption:feeling_cute", "Feeling Cute", "🌷", ["#F8BBD0", "#E91E63"], "#FFFFFFE5", { en: "Feeling Cute", vn: "Cảm thấy dthw" }),
        makeStaticCaption("caption:cu", "Cu 🐎", null, ["#FFD6A5", "#FFF1A8", "#FFC4D6"], "#633B24"),
        makeStaticCaption("caption:tuat", "Tuất", "🐕", ["#2C1A0E", "#5D4037", "#D7A86E"], "#FFFFFFE6"),
        makeStaticCaption("caption:coffee_time", "Coffee Time!", "☕", ["#4E342E", "#8D6E63"], "#FFFFFFE6", { en: "Coffee Time!", vn: "Giờ uống cà phê!" }),
        makeStaticCaption("caption:snake_vibes", "Snake Vibes", "🐍", ["#2E7D32", "#66BB6A"], "#FFFFFFE6", { en: "Snake Vibes", vn: "Chất rắn" }),
        makeStaticCaption("caption:mixue_time", "Mixue Time!", "🍦", ["#FFF9C4", "#F8BBD0"], "#000000E6", { en: "Mixue Time!", vn: "Giờ Mixue!" }),
        makeStaticCaption("caption:locket_time", "Locket Time!", "📷", ["#ECEFF1", "#B3E5FC"], "#000000E6"),
        makeStaticCaption("caption:cinema_time", "Cinema Time!", "🎬", ["#1A237E", "#455A64"], "#FFFFFFE6"),
        makeStaticCaption("caption:graduation_day", "Happy Graduation Day!", "🎓", ["#1A237E", "#283593"], "#FFFFFFE6", { en: "Happy Graduation Day!", vn: "Chúc mừng tốt nghiệp!" }),
        makeStaticCaption("caption:shopping_time", "Shopping Time!", "🛍️", ["#B3E5FC", "#FFFFFF"], "#000000E6", { en: "Shopping Time!", vn: "Giờ mua sắm!" }),
        makeStaticCaption("caption:dinner_time", "Dinner Time!", "🍽️", ["#FFCCBC", "#FF8A80"], "#FFFFFFE6", { en: "Dinner Time!", vn: "Giờ ăn tối!" }),
        makeStaticCaption("caption:chilling_time", "Chilling Time!", "🌴", ["#E1BEE7", "#F8BBD0"], "#FFFFFFE6", { en: "Chilling Time!", vn: "Giờ thư giãn!" })
    ]),
    buildSection("🎨 Độc lạ đời sống", [
        makeStaticCaption("caption:xin_vinh_biet_cu", "Xin vĩnh biệt cụ", "🕯️", ["#232526", "#414345"], "#FFFFFFE6"),
        makeStaticCaption("caption:chay_ngay_di", "Chạy ngay đi", "🏃💨", ["#D31027", "#EA384D"], "#FFFFFFE6"),
        makeStaticCaption("caption:luc_nao_co_tien_thi_moi_di_a", "Lúc nào có tiền thì mới đi á", "💸", ["#0F2027", "#203A43", "#2C5364"], "#FFFFFFE6"),
        makeStaticCaption("caption:cu_tu_tu_khoai_se_nhu", "Cứ từ từ khoai sẽ nhừ", "🥔", ["#56AB2F", "#A8E063"], "#000000E6"),
        makeStaticCaption("caption:kiem_tra_nhan_pham", "Kiểm tra nhân phẩm", "🎲", ["#654EA3", "#EAAFC8"], "#FFFFFFE6"),
        makeStaticCaption("caption:doc_so_tai_khoan", "đọc số tài khoản", "💳", ["#1E90FF", "#00D4FF"], "#FFFFFFE6"),
        makeStaticCaption("caption:ai_so_thi_di_ve", "ai sợ thì đi về", "🏃", ["#B71C1C", "#FF5722"], "#FFFFFFE6"),
        makeStaticCaption("caption:con_cai_nit", "còn cái nịt", "🧶", ["#D7CCC8", "#8D6E63"], "#FFFFFFE6"),
        makeStaticCaption("caption:canh_bao_co_hat", "cảnh báo có hát", "🎤", ["#9C27B0", "#E91E63"], "#FFFFFFE6"),
        makeStaticCaption("caption:than_chua_ma_don", "Thân chưa mà dỡn", "😔", ["#607D8B", "#37474F"], "#FFFFFFE6"),
        makeStaticCaption("caption:ai_muon", "Ai mượn?", "🤔", ["#E91E63", "#F44336"], "#FFFFFFE6"),
        makeStaticCaption("caption:hay_ra_de_qua_a", "Hay ra dẻ quá à!", "🥺", ["#FFF59D", "#80DEEA"], "#000000E6"),
        makeStaticCaption("caption:giam_suc_manh_con_tuong", "Giảm sức mạnh con tướng", "🎮", ["#4CAF50", "#00BCD4"], "#FFFFFFE6"),
        makeStaticCaption("caption:mac_co_qua_hai_oi", "Mắc cỡ quá hai ơi", "😭", ["#FFB74D", "#F8BBD0"], "#FFFFFFE6"),
        makeStaticCaption("caption:minh_la_lop", "Mình là lốp", "🛞", ["#263238", "#455A64"], "#FFFFFFE6"),
        makeStaticCaption("caption:dep_trai_co_gi_sai", "Đẹp trai có gì sai", "😎", ["#FF5722", "#FFC107"], "#000000E6"),
        makeStaticCaption("caption:mong_ton_hoa_sen", "Mong tôn hoa sen thấy cảnh này", "🪷", ["#D8B4E2", "#F8BBD0"], "#FFFFFFE6"),
        makeStaticCaption("caption:dam_nhau_khong", "đấm nhau không", "🥊", ["#E53935", "#FF7043"], "#FFFFFFE6"),
        makeStaticCaption("caption:sieu_cap_ba_khi", "siêu cấp bá khí", "🐉", ["#EC407A", "#F44336"], "#FFFFFFE6"),
        makeStaticCaption("caption:du_an_ma", "dự án ma", "👻", ["#263238", "#455A64"], "#FFFFFFE6"),
        makeStaticCaption("caption:doi_roi", "Dỗi rồi", "😤", ["#FF5F6D", "#FFC371"], "#FFFFFF"),
        makeStaticCaption("caption:mo_hon_nhung_tam_hien", "Mỏ hỗn nhưng tâm hiền", "🐤", ["#FFB75E", "#ED8F03"], "#FFFFFF")
    ]),
    buildSection("🎨 Trend TikTok (36 Caption)", [
        makeStaticCaption("caption:hoi_chieu_troi_mua", "Hồi chiều trời mưa...", "🌧️", ["#546E7A", "#263238"], "#FFFFFFE6"),
        makeStaticCaption("caption:con_vien_la_lan", "côn viên lá làn", "🍂", ["#12C2E9", "#F64F59"], "#FFFFFFE6"),
        makeStaticCaption("caption:gian_dang_iu_hong", "Gián đáng iu hong", "🪳", ["#3E2723", "#6D4C41", "#A1887F"], "#FFFFFFE6"),
        makeStaticCaption("caption:nau_xoi", "Nấu xói", "🙀", ["#7B1FA2", "#E91E63", "#FFB74D"], "#FFFFFFE6"),
        makeStaticCaption("caption:co_tien_lam_phien_thien_ha", "Có tiền làm phiền thiên hạ", "💰", ["#0F0C29", "#302B63", "#F7971E", "#FFD200"], "#FFFFFFE6"),
        makeStaticCaption("caption:nguoi_im_lang_gap_nguoi_hay_noi", "Người im lặng gặp người hay nói", "🤐", ["#232526", "#414345", "#6C7A89", "#B0BEC5"], "#FFFFFFE6"),
        makeStaticCaption("caption:roi_let_luon", "rồi lét luôn", "💅", ["#FF9A9E", "#FECFEF", "#FBC2EB", "#A6C1EE"], "#000000E6"),
        makeStaticCaption("caption:roi_gay_luon", "rồi gay luôn", "🌈", ["#FF6EC7", "#7873F5", "#4ADEDE", "#FFE66D"], "#FFFFFFE6"),
        makeStaticCaption("caption:tuyet_doi_khong_nghe", "Tuyệt đối không nghe", "🙉", ["#FF416C", "#FF4B2B"], "#FFFFFFE6"),
        makeStaticCaption("caption:cha_nay_tu_luyen_ghe", "Cha này tự luyến ghê", "🪞", ["#FFDEE9", "#B5FFFC", "#FAD0C4", "#FFD1FF"], "#000000E6"),
        makeStaticCaption("caption:co_bien_co_bien", "Có biến có biến", "🚨", ["#FF512F", "#F09819", "#FFD200"], "#FFFFFFE6"),
        makeStaticCaption("caption:hong_drama", "Hóng drama", "🍿", ["#8A2387", "#E94057", "#F27121"], "#FFFFFFE6"),
        makeStaticCaption("caption:cuoi_vcl_m_oi", "Cười vcl m oi", "😂", ["#F7971E", "#FFD200", "#FFEE58"], "#000000E6"),
        makeStaticCaption("caption:vl_m_oi", "vl m ơi?", "😳", ["#1F1C2C", "#928DAB", "#C9D6FF"], "#FFFFFFE6"),
        makeStaticCaption("caption:noi_het_bi_mat_thi_co_yeu_hong", "Nói hết bị mật thì có yêu hong", "🤫", ["#EE9CA7", "#FFDDE1", "#C6FFDD", "#FBD786"], "#000000E6"),
        makeStaticCaption("caption:flex_den_hoi_tho_cuoi", "Flex đến hơi thở cuối", "💎", ["#F7971E", "#FFD200"], "#000000E6"),
        makeStaticCaption("caption:overthinking_vai_chuong", "Overthinking vai chưởng", "🤯", ["#2C3E50", "#4CA1AF"], "#FFFFFFE6"),
        makeStaticCaption("caption:chan_bo_may_di", "Chan bố mày đi", "🙄", ["#870000", "#190A05"], "#FFFFFF"),
        makeStaticCaption("caption:oach_xa_lach", "oách xà lách", "🥬", ["#11998E", "#38EF7D"], "#FFFFFF"),
        makeStaticCaption("caption:lai_phai_lo", "lại phải lọ", "💔", ["#FBD3E9", "#BB377D", "#6A0572"], "#FFFFFFE6"),
        makeStaticCaption("caption:ua_alo_1", "Ủa alo", "📞", ["#8E2DE2", "#4A00E0"], "#FFFFFF"),
        makeStaticCaption("caption:ke_chuyen_nghe_choi", "Kể chuyện nghe chơi", "🍿", ["#8A2387", "#E94057"], "#FFFFFFE6"),
        makeStaticCaption("caption:hom_nay_toi_buon", "hôm nay tôi buồn", "🥀", ["#141E30", "#243B55"], "#FFFFFF"),
        makeStaticCaption("caption:xinh_dep_tuyet_voi", "Xinh đẹp tuyệt vời", "💅", ["#FC5C7D", "#6A82FB"], "#FFFFFFE6"),
        makeStaticCaption("caption:tram_cam_nhe", "Trầm cảm nhẹ", "🫠", ["#1F1C2C", "#928DAB"], "#FFFFFFE6"),
        makeStaticCaption("caption:chua_du_wow", "Chưa đủ wow", "⭐", ["#FF5349", "#EB0C00"], "#FFFFFFE6"),
        makeStaticCaption("caption:boc_trung_sit_rit", "Bóc trúng sít rịt", "🎁", ["#9C27B0", "#7B1FA2"], "#FFFFFFE6"),
        makeStaticCaption("caption:hen_lam_moi_xui_duoc_vay_a", "Hên lắm mới xui được vậy á", "😅", ["#00BCD4", "#0097A7"], "#FFFFFFE6"),
        makeStaticCaption("caption:ra_duong_ne_moi_anh", "Ra đường nể mỗi anh", "👤", ["#2196F3", "#1976D2"], "#FFFFFFE6"),
        makeStaticCaption("caption:cung_cung_di", "Cũng cứng đi", "🚀", ["#FFC107", "#FFA000"], "#FFFFFFE6"),
        makeStaticCaption("caption:tuyet_doi_dien_anh", "Tuyệt đối điện ảnh", "📷", ["#455A64", "#263238"], "#FFFFFFE6"),
        makeStaticCaption("caption:du_ba_khi_chua", "Đủ bá khí chưa", "⚡", ["#FF5722", "#E64A19"], "#FFFFFFE6"),
        makeStaticCaption("caption:ua_alo_2", "Ủa alo?", "❓", ["#9C27B0", "#7B1FA2"], "#FFFFFFE6"),
        makeStaticCaption("caption:cai_gi_vay_troi", "Cái gì vậy trời", "❗", ["#F44336", "#D32F2F"], "#FFFFFFE6"),
        makeStaticCaption("caption:nay_la_het_cuu", "Này là hết cứu", "❌", ["#607D8B", "#455A64"], "#FFFFFFE6"),
        makeStaticCaption("caption:qua_la_dien_anh", "Quá là điện ảnh", "📷", ["#26A69A", "#00897B"], "#FFFFFFE6")
    ]),
    buildSection("🎨 Gen Z Life 🩻", [
        makeStaticCaption("caption:hao_han", "Hảo hán", "🗡️", ["#114357", "#F29492"], "#FFFFFF"),
        makeStaticCaption("caption:cam_lanh", "Cảm lạnh", "🤧", ["#2193B0", "#6DD5ED"], "#FFFFFF"),
        makeStaticCaption("caption:bat_luc", "Bất lực", "🏳️", ["#2C3E50", "#3498DB"], "#FFFFFF"),
        makeStaticCaption("caption:xin_lui_duoc_chua", "Xin lũi được chưa", "🥺", ["#F6D365", "#FDA085"], "#000000"),
        makeStaticCaption("caption:rot_nuoc_mat", "Rớt nước mắt", "😭", ["#1CB5E0", "#000046"], "#FFFFFF"),
        makeStaticCaption("caption:guc_nga", "Gục ngã", "📉", ["#3A1C71", "#D76D77"], "#FFFFFF"),
        makeStaticCaption("caption:tien_dinh", "Tiền đình", "🌪️", ["#C33764", "#1D2671"], "#FFFFFF"),
        makeStaticCaption("caption:che_manh", "Chê mạnh", "👎", ["#FF4E50", "#F9D423"], "#FFFFFF"),
        makeStaticCaption("caption:xinh_gai_an_phim_1", "Xinh gái ấn phím 1", "💅", ["#F77062", "#FE5196"], "#FFFFFF"),
        makeStaticCaption("caption:di_lam_vi_dam_me", "Đi làm vì đam mê", "🤡", ["#FDC830", "#F37335"], "#FFFFFF")
    ]),
    buildSection("🎨 Meme vui nhộn", [
        makeStaticCaption("caption:cuoi_xiu", "Cười xỉu", "😎", ["#FFEB3B", "#FF9800"], "#000000E6"),
        makeStaticCaption("caption:toang_that_roi", "Toang thật rồi", "🐉", ["#F44336", "#B71C1C"], "#FFFFFFE6"),
        makeStaticCaption("caption:toi_roi_toi_roi", "Tới rồi tới rồi", "❗", ["#673AB7", "#512DA8"], "#FFFFFFE6"),
        makeStaticCaption("caption:khong_the_tin_noi", "Không thể tin nổi", "❓", ["#00BCD4", "#0097A7"], "#FFFFFFE6")
    ]),
    buildSection("🎨 Đời sống", [
        makeStaticCaption("caption:ngay_moi_vui_ve", "Ngày mới vui vẻ", "☀️", ["#4CAF50", "#2E7D32"], "#FFFFFFE6"),
        makeStaticCaption("caption:ngu_ngon", "Ngủ ngon", "🌙", ["#3F51B5", "#1A237E"], "#FFFFFFE6"),
        makeStaticCaption("caption:an_com_chua", "Ăn cơm chưa?", "🍽️", ["#FF9800", "#F57C00"], "#FFFFFFE6"),
        makeStaticCaption("caption:di_choi_khong", "Đi chơi không?", "✈️", ["#E91E63", "#C2185B"], "#FFFFFFE6")
    ]),
    buildSection("🎨 Gen Z Slay", [
        makeStaticCaption("caption:tinh_hoa_hoi_tu", "Tinh hoa hội tụ", "✨", ["#FFD700", "#FF8C00"], "#000000E6"),
        makeStaticCaption("caption:phu_tinh_khong_phu_ban", "Phụ tình không phụ bản", "🕶️", ["#8E2DE2", "#4A00E0"], "#FFFFFFE6"),
        makeStaticCaption("caption:ngoan_xinh_yeu", "Ngoan xinh yêu của ai?", "🌸", ["#FFAFBD", "#FFC3A0"], "#000000E6"),
        makeStaticCaption("caption:nhin_la_biet_uy_tin", "Nhìn là biết uy tín", "👌", ["#2980B9", "#2C3E50"], "#FFFFFFE6")
    ]),
    buildSection("🎨 Bất ổn & Khó đỡ", [
        makeStaticCaption("caption:luon_vui_tuoi", "Luôn vui tươi", "🤡", ["#00F2FE", "#4FACFE"], "#FFFFFFE6"),
        makeStaticCaption("caption:bat_on_that_su", "Bất ổn thật sự", "🫠", ["#636363", "#A2AB58"], "#FFFFFFE6"),
        makeStaticCaption("caption:khong_cam_xuc", "Không cảm xúc", "🗿", ["#434343", "#000000"], "#FFFFFFE6"),
        makeStaticCaption("caption:phu_huynh_dung_xem", "Phụ huynh đừng xem", "🙈", ["#FF0844", "#FFB199"], "#FFFFFFE6")
    ]),
    buildSection("🎨 Check VAR & Hóng hớt", [
        makeStaticCaption("caption:check_var", "Check VAR liền", "📺", ["#11998E", "#38EF7D"], "#FFFFFFE6"),
        makeStaticCaption("caption:qua_nhieu_su_de_thuong", "Quá nhiều sự dễ thương", "🎀", ["#F38181", "#FCE38A"], "#000000E6"),
        makeStaticCaption("caption:song_gio_phu_doi_trai", "Sóng gió phủ đời trai", "🌪️", ["#3A1C71", "#D76D77"], "#FFFFFFE6")
    ]),
    buildSection("🎨 Góc Deadline & Đi Làm", [
        makeStaticCaption("caption:deadline_ruot", "Deadline dí tụt quần", "🔥", ["#ED213A", "#93291E"], "#FFFFFFE6"),
        makeStaticCaption("caption:ca_o_ran_doc", "Cả ổ rắn độc", "🐍", ["#0F2027", "#1B5E20", "#66BB6A"], "#FFFFFFE6"),
        makeStaticCaption("caption:tien_dau_ma_tieu", "Tiền đâu mà tiêu", "💸", ["#11998E", "#38EF7D"], "#FFFFFFE6"),
        makeStaticCaption("caption:nghien_cuu_khoa_hoc", "Cần nạp cafein gấp", "☕", ["#0F2027", "#2C5364"], "#FFFFFFE6")
    ])
];

obj.entries.overlay_dynamic_captions = JSON.stringify([
    "standard", "poll", "color_palette", "review", "music", "location",
    "weather", "time", "streak", "star_sign", "party_time", "locket_count",
    "good_morning", "goodnight", "ootd", "miss_you", "custom", "phunu_2010", "halloween_2026"
]);
obj.entries.overlay_items = JSON.stringify(overlaySections);

// ============================================================
// 9 & 10. FORCE OVERRIDE GOLD + 45S + FIX BẠN BÈ
// ============================================================
function hamVaForceOverride(entries) {
    if (!entries || typeof entries !== "object") return;
    var durationKeys = [
        "max_video_duration", "video_max_duration", "camera_roll_max_duration",
        "camera_roll_video_max_duration", "camera_roll_duration",
        "video_trim_max_duration", "trim_max_duration", "gold_max_duration", "goldMaxDuration"
    ];
    for (var i = 0; i < durationKeys.length; i++) {
        entries[durationKeys[i]] = "45.0";
    }

    entries["is_gold"] = "true";
    entries["has_gold"] = "true";
    entries["is_gold_user"] = "true";
    entries["user_is_gold"] = "true";
    entries["gold_user"] = "true";
    entries["gold_active"] = "true";
    entries["all_filters_free"] = "true";
    entries["unlocked_filters"] = "true";
    entries["free_filters_enabled"] = "true";
    entries["filter_selection_enabled"] = "true";
    entries["require_gold_for_filters"] = "false";
    entries["requires_gold_for_filters"] = "false";
    entries["camera_filter_gold_only"] = "false";
    entries["camera_filters_gold_only"] = "false";
    entries["filter_gold_only"] = "false";
    entries["filters_gold_only"] = "false";
    entries["ai_filter_gold_only"] = "false";
    entries["ai_filters_gold_only"] = "false";
    entries["filter_paywall_enabled"] = "false";
    entries["camera_filter_paywall_enabled"] = "false";
    entries["filter_upsell_enabled"] = "false";
    entries["cache_ttl_seconds"] = "0";
    entries["client_cache_ttl_sec"] = "0";
}

function hamFixLoiMatBanBe(entries) {
    if (!entries || typeof entries !== "object") return;
    entries["friends_cache_max_age_sec"] = "0";
    entries["user_cache_max_age_sec"] = "0";
    entries["fetch_users_from_cloud_function"] = "true";
    entries["max_friends_count"] = "1000";
    entries["soft_friend_limit_threshold_count"] = "1000";
    entries["signup_max_friends_count"] = "1000";
    entries["hide_friends_enabled"] = "false";
    entries["show_all_contacts"] = "true";
    entries["new_friends_monitoring_enabled"] = "true";
}

hamVaForceOverride(obj.entries);
hamFixLoiMatBanBe(obj.entries);

$done({ body: JSON.stringify(obj) });
