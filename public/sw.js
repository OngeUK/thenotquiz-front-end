// https://developers.google.com/web/tools/workbox/
importScripts("https://storage.googleapis.com/workbox-cdn/releases/5.1.4/workbox-sw.js");

// workbox.setConfig({
// 	debug: false,
// });

// Can't use ES6 imports, so have to destructure from the workbox object that comes via the script above
const { NetworkFirst, CacheFirst } = workbox.strategies;
const { registerRoute } = workbox.routing;
const { googleAnalytics } = workbox;
const { precacheAndRoute } = workbox.precaching;

// Capture analytics when user is offline and sync when they get a connection
googleAnalytics.initialize();

// HTML cache, always go to the network first (to ensure it's the latest content)
registerRoute(
	({ request }) => request.destination === "document",
	new NetworkFirst({
		cacheName: "html-cache",
		cacheExpiration: {
			maxEntries: 10,
		},
	}),
);

// API cache, always go to the network first (to ensure it's the latest content)
registerRoute(
	/.*\.json/,
	new NetworkFirst({
		cacheName: "api-cache",
		cacheExpiration: {
			maxEntries: 10,
		},
	}),
);

// JS cache, go to the cache first only use network if no matching file is cached
registerRoute(
	({ request }) => request.destination === "script",
	new CacheFirst({
		cacheName: "js-cache",
		cacheExpiration: {
			maxEntries: 10,
		},
	}),
);

// CSS cache, go to the cache first only use network if no matching file is cached
registerRoute(
	({ request }) => request.destination === "style",
	new CacheFirst({
		cacheName: "css-cache",
		cacheExpiration: {
			maxEntries: 10,
		},
	}),
);

// Placeholder to inject precache files to the SW
precacheAndRoute(self.__WB_MANIFEST);
