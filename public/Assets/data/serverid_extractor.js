/*!
 * rovalra v2.4.15
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */
window.addEventListener("rovalra-extract-serverid-request", function(event) {
  let detail = event.detail;
  try {
    if (detail && detail._ff) detail = JSON.parse(detail._ff);
  } catch {}
  const extractionId = detail && detail.extractionId;

  function respond(serverId, error, extra) {
	/*__rav4*/
    const payload = Object.assign({ extractionId, serverId: serverId || null, error: error || null }, extra || {});
    window.dispatchEvent(new CustomEvent("rovalra-serverid-extracted", {
      detail: { _ff: JSON.stringify(payload) }
    }));
  }

  if (!extractionId) {
    respond(null, "No extractionId");
    return;
  }

  try {
    const element = document.querySelector(`[data-rovalra-extraction-id="${extractionId}"]`);
    if (!element) {
      respond(null, "Element not found");
      return;
    }
    if (typeof angular > "u" || !angular.element) {
      respond(null, "Angular not available");
      return;
    }
    const angularElement = angular.element(element), context = angularElement.context || angularElement[0];
    if (!context) {
      respond(null, "No context");
      return;
    }
    const contextKeys = Object.keys(context);
    if (contextKeys.length === 0) {
      respond(null, "Context has no keys");
      return;
    }
    const reactKey = contextKeys.find((key) => key.startsWith("__reactFiber")) || contextKeys[0], AngularInfo = context[reactKey];
    if (!AngularInfo) {
      respond(null, "No AngularInfo");
      return;
    }
    if (!AngularInfo.return || !AngularInfo.return.memoizedProps) {
      respond(null, "No memoizedProps");
      return;
    }
    const serverProps = AngularInfo.return.memoizedProps, serverId = serverProps.id, accessCode = serverProps.accessCode, privateServerId = serverProps.vipServerId;
    if (accessCode) element.setAttribute("data-access-code", accessCode);
    if (privateServerId) element.setAttribute("data-private-server-id", privateServerId);
    if (!serverId) {
      if (accessCode || privateServerId) {
        respond(null, null, { accessCode, privateServerId });
        return;
      }
      respond(null, "No id in props");
      return;
    }
    respond(serverId, null, { accessCode, privateServerId });
  } catch (e) {
    respond(null, e && e.message ? e.message : String(e));
  }
});
