/*!
 * rovalra v2.4.14 firefox permission hotfix
 */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
(function() {
  const params = new URLSearchParams(location.search),
    singlePermission = params.get("permission"),
    permissionsParam = params.get("permissions"),
    requestId = params.get("requestId");
  let permissions = [];
  try {
    permissions = permissionsParam ? JSON.parse(permissionsParam) : singlePermission ? [singlePermission] : [];
  } catch {
    permissions = singlePermission ? [singlePermission] : [];
  }
  permissions = permissions.map((permission) => permission === "contextMenus" ? "menus" : permission).filter(Boolean);
  const permNameEl = document.getElementById("permName");
  const permListEl = document.getElementById("permList");
  const prettyName = /* @__PURE__ */ __name((permission) => ({
    webNavigation: "webNavigation",
    webRequest: "webRequest",
    menus: "menus",
    contextMenus: "menus"
  }[permission] || permission), "prettyName");
  if (permissions.length <= 1) {
    permNameEl.textContent = prettyName(permissions[0] || "(unknown)");
    permListEl.style.display = "none";
  } else {
    permNameEl.textContent = permissions.length + " permissions";
    permListEl.innerHTML = "";
    permissions.forEach((permission) => {
      const item = document.createElement("li");
      item.textContent = prettyName(permission);
      permListEl.appendChild(item);
    });
    permListEl.style.display = "block";
  }
  function respond(granted) {
	/*__rav4*/
    chrome.runtime.sendMessage(
      { action: "permissionRequestResult", requestId, granted },
      function() {
        window.close();
      }
    );
  }
  __name(respond, "respond"), document.getElementById("grantBtn").addEventListener("click", function() {
    if (permissions.length === 0)
      return respond(!1);
    chrome.permissions.request({ permissions }, function(granted) {
      respond(!!granted);
    });
  }), document.getElementById("denyBtn").addEventListener("click", function() {
    respond(!1);
  });
})();
