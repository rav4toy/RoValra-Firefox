/*!
 * rovalra v2.5.4
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
(() => {
  const assignedAccessCodes = /* @__PURE__ */ new Set();
  window.addEventListener("rovalra-extract-serverid-request", function(event) {
    let eventDetail = event.detail;
    try {
      if (eventDetail && eventDetail._ff) eventDetail = JSON.parse(eventDetail._ff);
    } catch {
    }
    const { extractionId } = eventDetail || {}, sendExtracted = /* @__PURE__ */ __name((detail) => {
      let payload = detail;
      try {
        if (event.detail && event.detail._ff) payload = { _ff: JSON.stringify(detail) };
      } catch {
      }
      window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", { detail: payload }));
    }, "sendExtracted");
    try {
      const element = document.querySelector(
        `[data-rovalra-extraction-id="${extractionId}"]`
      );
      if (!element) return;
      if (element.querySelector(".icon-filled-person-play")) {
        sendExtracted({
          extractionId,
          serverId: null,
          accessCode: null
        });
        return;
      }
      const reactKey = Object.keys(element).find(
        (k) => k.startsWith("__reactFiber$")
      );
      if (!reactKey) throw new Error("No React Fiber");
      let fiber = element[reactKey], serverId = null, accessCode = null, vipServerId = null, isOwner = !1, isFriendServer = !1;
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, currentAssignedCode = element.getAttribute("data-access-code"), existingCodes = new Set(
        Array.from(document.querySelectorAll("[data-access-code]")).map((el) => el.getAttribute("data-access-code")).filter((c) => c && c !== currentAssignedCode)
      ), isUsedAccessCode = /* @__PURE__ */ __name((code) => assignedAccessCodes.has(code) || existingCodes.has(code), "isUsedAccessCode"), findUUID = /* @__PURE__ */ __name((obj, excludePredicate, maxDepth = 3, currentDepth = 0) => {
        if (!obj || currentDepth > maxDepth || typeof obj != "object")
          return typeof obj == "string" && uuidRegex.test(obj) ? excludePredicate(obj) ? null : obj : null;
        if (obj.$$typeof || obj instanceof HTMLElement) return null;
        const keys = Object.getOwnPropertyNames(obj);
        for (const key of keys)
          try {
            const val = obj[key];
            if (typeof val == "string" && uuidRegex.test(val)) {
              if (!excludePredicate(val)) return val;
            } else if (val && typeof val == "object") {
              const found = findUUID(
                val,
                excludePredicate,
                maxDepth,
                currentDepth + 1
              );
              if (found) return found;
            }
          } catch {
          }
        return null;
      }, "findUUID");
      let currentFiber = fiber, depth = 0;
      for (; currentFiber && depth < 15; ) {
        const props = currentFiber.memoizedProps;
        if (props) {
          const potentialCandidates = [
            props.accessCode,
            props.gameId,
            props.jobId,
            props.server?.accessCode,
            props.server?.id,
            props.item?.accessCode,
            props.item?.gameId
          ];
          for (const candidate of potentialCandidates)
            if (candidate && typeof candidate == "string" && uuidRegex.test(candidate) && !isUsedAccessCode(candidate)) {
              accessCode = candidate;
              break;
            }
          props.vipServerId && (vipServerId = props.vipServerId), props.isOwner && (isOwner = !!props.isOwner);
          const handlerName = props.onJoinClick ? "onJoinClick" : props.onClick ? "onClick" : props.onJoin ? "onJoin" : null, joinHandler = props[handlerName];
          if (!accessCode && joinHandler && !joinHandler.__rovalra_checked) {
            joinHandler.__rovalra_checked = !0;
            const handlerUUID = findUUID(
              joinHandler,
              isUsedAccessCode,
              2
            );
            handlerUUID && (accessCode = handlerUUID);
          }
          if (!accessCode) {
            const candidate = findUUID(props, isUsedAccessCode, 3);
            candidate && (accessCode = candidate);
          }
          if (!accessCode && currentFiber.memoizedState) {
            let hook = currentFiber.memoizedState;
            for (; hook; ) {
              const hookUUID = findUUID(
                hook.memoizedState,
                isUsedAccessCode,
                2
              );
              if (hookUUID) {
                accessCode = hookUUID;
                break;
              }
              hook = hook.next;
            }
          }
          if (typeof props.thumbnailTargetId == "number" && props.thumbnailTargetId > 0 && (isFriendServer = !0), !serverId) {
            let rawKey = currentFiber.key || props.id || props.server?.id;
            if (rawKey && typeof rawKey == "string") {
              const candidate = rawKey.startsWith(".") ? rawKey.slice(1) : rawKey;
              uuidRegex.test(candidate) && (serverId = candidate);
            }
          }
        }
        if (accessCode && serverId) break;
        currentFiber = currentFiber.return, depth++;
      }
      accessCode && assignedAccessCodes.add(accessCode), sendExtracted({
        extractionId,
        serverId,
        privateServerId: vipServerId,
        accessCode,
        isFriendServer,
        isOwner
      });
    } catch (e) {
      console.error("Extraction failed:", e), sendExtracted({ extractionId, serverId: null, error: e.message });
    }
  });
})();
