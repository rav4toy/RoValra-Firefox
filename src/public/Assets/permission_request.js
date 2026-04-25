/*!
 * rovalra v2.4.15.1
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
(function() {
  const params = new URLSearchParams(location.search), permission = params.get("permission"), requestId = params.get("requestId");
  document.getElementById("permName").textContent = permission || "(unknown)";
  function respond(granted) {
    chrome.runtime.sendMessage(
      { action: "permissionRequestResult", requestId, granted },
      function() {
        window.close();
      }
    );
  }
  __name(respond, "respond"), document.getElementById("grantBtn").addEventListener("click", function() {
    chrome.permissions.request({ permissions: [permission] }, function(granted) {
      respond(!!granted);
    });
  }), document.getElementById("denyBtn").addEventListener("click", function() {
    respond(!1);
  });
})();
