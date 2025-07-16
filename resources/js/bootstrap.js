/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from "axios";
window.axios = axios;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

function extractPlainText(htmlString) {
    if (htmlString === "<p>&nbsp;</p>") {
        return "The note content will be displayed here...";
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // Hapus elemen yang tidak ingin ditampilkan (img, table, dll)
    const unwantedTags = doc.querySelectorAll(
        "img, table, iframe, video, audio"
    );
    unwantedTags.forEach((el) => el.remove());

    // Hapus script
    const scripts = doc.querySelectorAll("script");
    scripts.forEach((el) => el.remove());

    // Hapus style
    const styles = doc.querySelectorAll("style");
    styles.forEach((el) => el.remove());

    // Ambil textContent saja
    return doc.body.textContent || "";
}

window.extractPlainText = extractPlainText;

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// import Pusher from 'pusher-js';
// window.Pusher = Pusher;

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? 'mt1',
//     wsHost: import.meta.env.VITE_PUSHER_HOST ? import.meta.env.VITE_PUSHER_HOST : `ws-${import.meta.env.VITE_PUSHER_APP_CLUSTER}.pusher.com`,
//     wsPort: import.meta.env.VITE_PUSHER_PORT ?? 80,
//     wssPort: import.meta.env.VITE_PUSHER_PORT ?? 443,
//     forceTLS: (import.meta.env.VITE_PUSHER_SCHEME ?? 'https') === 'https',
//     enabledTransports: ['ws', 'wss'],
// });
