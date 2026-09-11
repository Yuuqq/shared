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
const CACHE_NAME = "journalism-tool-shared-v2";
// 共享仓库自身的页面仅 latest/index.html（内联样式的重定向页），
// 模板角色保持不变：各工具项目复制本文件后按需扩充此清单。
const CORE_ASSETS = [
  "./",
  "./latest/index.html"
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

  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  if (url.origin !== self.location.origin) {
    // Network-First for cross-origin API calls
    event.respondWith(
      fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(event.request, clone));
        }
        return response;
      }).catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-First for same-origin static assets
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
        event.waitUntil(fetchPromise);
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
