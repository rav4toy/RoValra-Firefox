/*!
 * rovalra v2.4.10
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */
window.addEventListener("rovalra-extract-serverid-request", function(event) {
  const { extractionId } = event.detail;
  try {
    const element = document.querySelector(`[data-rovalra-extraction-id="${extractionId}"]`);
    if (!element) {
      window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
        detail: { extractionId, serverId: null, error: "Element not found" }
      }));
      return;
    }
    if (typeof angular > "u" || !angular.element) {
      window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
        detail: { extractionId, serverId: null, error: "Angular not available" }
      }));
      return;
    }
    const angularElement = angular.element(element), context = angularElement.context || angularElement[0];
    if (!context) {
      window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
        detail: { extractionId, serverId: null, error: "No context" }
      }));
      return;
    }
    const contextKeys = Object.keys(context);
    if (contextKeys.length === 0) {
      window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
        detail: { extractionId, serverId: null, error: "Context has no keys" }
      }));
      return;
    }
    const reactKey = contextKeys.find((key) => key.startsWith("__reactFiber")) || contextKeys[0], AngularInfo = context[reactKey];
    if (!AngularInfo) {
      window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
        detail: { extractionId, serverId: null, error: "No AngularInfo" }
      }));
      return;
    }
    if (!AngularInfo.return || !AngularInfo.return.memoizedProps) {
      window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
        detail: { extractionId, serverId: null, error: "No memoizedProps" }
      }));
      return;
    }
    const serverProps = AngularInfo.return.memoizedProps, serverId = serverProps.id, accessCode = serverProps.accessCode, privateServerId = serverProps.vipServerId;
    if (accessCode && element.setAttribute("data-access-code", accessCode), privateServerId && element.setAttribute("data-private-server-id", privateServerId), !serverId) {
      if (accessCode || privateServerId) {
        window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
          detail: { extractionId, serverId: null, accessCode, privateServerId }
        }));
        return;
      }
      window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
        detail: { extractionId, serverId: null, error: "No id in props" }
      }));
      return;
    }
    window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
      detail: { extractionId, serverId, accessCode, privateServerId }
    }));
  } catch (e) {
    window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
      detail: { extractionId, serverId: null, error: e.message }
    }));
  }
});
