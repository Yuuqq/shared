/**
 * 🔗 URL 状态分享模块
 * 引入方式: <script src="../shared/url-state.js" defer></script>
 *
 * 提供两个全局函数：
 *   window.saveStateToURL(data)  — 将 JSON 编码到 URL hash
 *   window.loadStateFromURL()    — 从 URL hash 解码 JSON
 *
 * 同时在页面内注入"📋 复制分享链接"按钮。
 */
(function () {
  const HASH_PREFIX = "#state=";
  const SAFE_AUTO_APPLY_BUTTON_IDS = ["renderBtn", "calcBtn", "btnCalc", "buildBtn", "scanBtn", "genBtn"];

  function encodeText(text) {
    if (window.TextEncoder) {
      return new TextEncoder().encode(text);
    }
    const escaped = unescape(encodeURIComponent(text));
    return Uint8Array.from(escaped, (ch) => ch.charCodeAt(0));
  }

  function decodeText(bytes) {
    if (window.TextDecoder) {
      return new TextDecoder().decode(bytes);
    }
    let legacy = "";
    bytes.forEach((b) => {
      legacy += String.fromCharCode(b);
    });
    return decodeURIComponent(escape(legacy));
  }

  function bytesToBase64(bytes) {
    let binary = "";
    bytes.forEach((b) => {
      binary += String.fromCharCode(b);
    });
    return btoa(binary);
  }

  function base64ToBytes(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes;
  }

  function encodeState(data) {
    return bytesToBase64(encodeText(JSON.stringify(data)));
  }

  function decodeState(encoded) {
    return JSON.parse(decodeText(base64ToBytes(encoded)));
  }

  function copyText(text) {
    const value = String(text || "");
    if (!value) return Promise.resolve(false);
    if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
      return navigator.clipboard.writeText(value).then(() => true).catch(() => fallbackCopy(value));
    }
    return Promise.resolve(fallbackCopy(value));
  }

  function fallbackCopy(text) {
    try {
      const el = document.createElement("textarea");
      el.value = text;
      el.setAttribute("readonly", "readonly");
      el.style.cssText = "position:fixed;top:-9999px;left:-9999px;opacity:0;";
      document.body.appendChild(el);
      el.focus();
      el.select();
      const ok = document.execCommand("copy");
      el.remove();
      return ok;
    } catch (_e) {
      return false;
    }
  }

  function shouldShareField(el) {
    if (!el || el.disabled || !el.id) return false;
    if (el.dataset.share === "false") return false;
    if (el.type === "file" || el.type === "password") return false;

    const markers = `${el.id} ${el.name || ""} ${el.className || ""}`.toLowerCase();
    if (/(api[-_ ]?key|secret|token|password)/.test(markers)) return false;
    return true;
  }

  function readFieldValue(el) {
    if (el.type === "checkbox") return Boolean(el.checked);
    if (el.type === "radio") return el.checked ? el.value : undefined;
    if (el.tagName === "SELECT" && el.multiple) {
      return Array.from(el.selectedOptions).map((opt) => opt.value);
    }
    return el.value;
  }

  function writeFieldValue(el, value) {
    if (el.type === "checkbox") {
      el.checked = Boolean(value);
      return;
    }
    if (el.type === "radio") {
      el.checked = String(el.value) === String(value);
      return;
    }
    if (el.tagName === "SELECT" && el.multiple && Array.isArray(value)) {
      Array.from(el.options).forEach((opt) => {
        opt.selected = value.includes(opt.value);
      });
      return;
    }
    el.value = value == null ? "" : String(value);
  }

  function dispatchFieldEvents(el) {
    ["input", "change"].forEach((type) => {
      el.dispatchEvent(new Event(type, { bubbles: true }));
    });
  }

  function collectState() {
    const state = {};
    document.querySelectorAll("input, textarea, select").forEach((el) => {
      if (!shouldShareField(el)) return;
      const value = readFieldValue(el);
      if (value === undefined || value === null) return;
      if (Array.isArray(value) && value.length === 0) return;
      if (!Array.isArray(value) && value === "") return;
      state[el.id] = value;
    });

    if (typeof window.getShareState === "function") {
      try {
        const extra = window.getShareState();
        if (extra && typeof extra === "object") {
          Object.assign(state, extra);
        }
      } catch (_e) {}
    }

    return state;
  }

  function restoreState(state) {
    const restoredIds = [];
    Object.entries(state || {}).forEach(([key, value]) => {
      if (key.startsWith("_")) return;
      const el = document.getElementById(key);
      if (!el) return;
      writeFieldValue(el, value);
      restoredIds.push(key);
      dispatchFieldEvents(el);
    });

    if (typeof window.applySharedState === "function") {
      try {
        window.applySharedState(state);
      } catch (_e) {}
    }

    window.dispatchEvent(
      new CustomEvent("shared-state-restored", {
        detail: { state, restoredIds }
      })
    );

    return restoredIds;
  }

  function autoApplyState(restoredIds) {
    if (!restoredIds || restoredIds.length === 0) return false;
    const button = SAFE_AUTO_APPLY_BUTTON_IDS
      .map((id) => document.getElementById(id))
      .find((candidate) => candidate && !candidate.disabled);

    if (!button) return false;
    button.click();
    return true;
  }

  function findInjectionHost() {
    const selectors = [
      ".actions",
      ".toolbar",
      ".heroActions",
      ".panel-header",
      ".actions-section",
      ".question",
      ".form",
      "form",
      ".card"
    ];
    for (const selector of selectors) {
      const el = document.querySelector(selector);
      if (el) return el;
    }
    const firstButton = document.querySelector("button");
    return firstButton ? firstButton.parentElement : null;
  }

  function insertButton(host, button) {
    const statusEl = document.getElementById("status");
    if (statusEl && statusEl.parentElement === host) {
      host.insertBefore(button, statusEl);
      return;
    }
    host.appendChild(button);
  }

  function createShareButton() {
    const btn = document.createElement("button");
    btn.id = "shareStateBtn";
    btn.type = "button";
    btn.className = "btn-secondary ghost";
    btn.textContent = "📋 复制分享链接";
    btn.setAttribute("aria-label", "复制分享链接");
    btn.style.cssText = "font-size:12px;padding:6px 10px;";

    btn.addEventListener("click", function () {
      const state = collectState();
      if (!Object.keys(state).length) {
        if (window.showToast) {
          window.showToast("当前页面暂无可分享的输入状态", "warn", 2200);
        }
        return;
      }

      const url = window.saveStateToURL(state);
      if (!url) {
        if (window.showToast) {
          window.showToast("生成分享链接失败", "error", 2200);
        }
        return;
      }

      copyText(url).then((ok) => {
        if (ok && window.showToast) {
          window.showToast("分享链接已复制到剪贴板", "success", 2000);
        }
        btn.textContent = ok ? "✅ 已复制" : "📎 链接已生成";
        setTimeout(() => {
          btn.textContent = "📋 复制分享链接";
        }, 2000);
      });
    });

    return btn;
  }

  window.saveStateToURL = function (data) {
    try {
      history.replaceState(null, "", HASH_PREFIX + encodeState(data));
      return location.href;
    } catch (_e) {
      return null;
    }
  };

  window.loadStateFromURL = function () {
    try {
      const hash = location.hash || "";
      if (!hash.startsWith(HASH_PREFIX)) return null;
      return decodeState(hash.slice(HASH_PREFIX.length));
    } catch (_e) {
      return null;
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    const host = findInjectionHost();
    if (host && !document.getElementById("shareStateBtn")) {
      insertButton(host, createShareButton());
    }

    const savedState = window.loadStateFromURL();
    if (!savedState) return;

    const restoredIds = restoreState(savedState);
    autoApplyState(restoredIds);

    if (window.showToast) {
      window.showToast("已从分享链接恢复数据", "info", 2500);
    }
  });
})();
