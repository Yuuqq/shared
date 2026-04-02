/**
 * 🔌 通用 Service Worker — 缓存优先策略
 * 适用于全部 50 个新闻工具项目。
 *
 * 策略：
 * 1. 安装时预缓存当前项目的核心文件
 * 2. 缓存优先 (Cache-First) 获取静态资源
 * 3. 网络优先 (Network-First) 获取 API 请求
 * 4. 离线回退页面
 */
const CACHE_NAME = "journalism-tool-v1";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./pm-metrics.js",
  "../shared/design-tokens.css",
  "../shared/dark-toggle.js"
];

// Install: Pre-cache core assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CORE_ASSETS).catch(() => {
        // Silently skip missing optional files
        return Promise.allSettled(
          CORE_ASSETS.map((url) => cache.add(url).catch(() => {}))
        );
      });
    })
  );
  self.skipWaiting();
});

// Activate: Clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// Fetch: Cache-First for same-origin, Network-First for external
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Skip non-GET and cross-origin API calls
  if (event.request.method !== "GET") return;
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) {
        // Return cache, but also update in background (stale-while-revalidate)
        const fetchPromise = fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return response;
        }).catch(() => {});
        return cached;
      }
      return fetch(event.request).then((response) => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Offline fallback
        if (event.request.destination === "document") {
          return caches.match("./index.html");
        }
      });
    })
  );
});
