/**
 * 💾 通用表单自动保存模块
 * 用法: <script src="../shared/autosave.js" defer></script>
 *
 * 自动检测页面中 class="form" 或 id="form" 的表单。
 * 每次 input/change 事件触发后，将所有 input/textarea/select 的值序列化到 localStorage。
 * 页面加载时自动恢复。
 *
 * 存储键: autosave_{projectId}  (从 URL 路径自动推导)
 */
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form") || document.querySelector(".form");
    if (!form) return;

    // Derive storage key from project folder name
    const pathParts = location.pathname.split("/").filter(Boolean);
    const projectId = pathParts.find(p => /^P\d/.test(p)) || "unknown";
    const STORAGE_KEY = "autosave_" + projectId;

    function safeGetItem(key) {
      try {
        return localStorage.getItem(key);
      } catch (_e) {
        return null;
      }
    }

    function safeSetItem(key, value) {
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (_e) {
        return false;
      }
    }

    function safeRemoveItem(key) {
      try {
        localStorage.removeItem(key);
      } catch (_e) {}
    }

    function getFields() {
      return form.querySelectorAll("input, textarea, select");
    }

    function shouldPersistField(el) {
      if (!el || !el.id || el.disabled) return false;
      if (el.dataset.autosave === "false") return false;
      if (el.type === "file" || el.type === "password") return false;
      return true;
    }

    function dispatchFieldEvents(el) {
      ["input", "change"].forEach((type) => {
        el.dispatchEvent(new Event(type, { bubbles: true }));
      });
    }

    function save() {
      const data = {};
      getFields().forEach(el => {
        if (!shouldPersistField(el)) return;
        if (el.type === "checkbox") {
          data[el.id] = el.checked;
        } else {
          data[el.id] = el.value;
        }
      });
      return safeSetItem(STORAGE_KEY, JSON.stringify(data));
    }

    function restore() {
      try {
        const raw = safeGetItem(STORAGE_KEY);
        if (!raw) return;
        const data = JSON.parse(raw);
        const restoredIds = [];
        getFields().forEach(el => {
          if (!shouldPersistField(el) || !(el.id in data)) return;
          if (el.type === "checkbox") {
            el.checked = data[el.id];
          } else {
            el.value = data[el.id];
          }
          restoredIds.push(el.id);
        });

        restoredIds.forEach((id) => {
          const el = document.getElementById(id);
          if (el) dispatchFieldEvents(el);
        });
        if (typeof window.applyAutosaveState === "function") {
          try {
            window.applyAutosaveState(data);
          } catch (_e) {}
        }
        window.dispatchEvent(
          new CustomEvent("autosave-restored", {
            detail: { storageKey: STORAGE_KEY, state: data, restoredIds }
          })
        );

        // Show subtle indicator
        const statusEl = document.getElementById("status");
        if (statusEl) {
          const orig = statusEl.textContent;
          statusEl.textContent = "💾 已恢复上次编辑内容";
          setTimeout(() => { statusEl.textContent = orig; }, 2000);
        }
      } catch (_) {}
    }

    // Debounced save
    let saveTimer = null;
    function debouncedSave() {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(save, 500);
    }

    window.persistAutosaveState = save;
    window.clearAutosaveState = function () {
      safeRemoveItem(STORAGE_KEY);
    };

    form.addEventListener("input", debouncedSave);
    form.addEventListener("change", debouncedSave);

    // Restore on load
    restore();
  });
})();
