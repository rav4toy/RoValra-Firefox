(async () => {
  const params = new URLSearchParams(window.location.search);
  const permission = params.get("permission");
  const requestId = params.get("requestId");

  const label = document.getElementById("perm-label");
  const status = document.getElementById("status");
  const btnAllow = document.getElementById("btn-allow");
  const btnDeny = document.getElementById("btn-deny");

  if (!permission) {
    label.textContent = "unknown";
    status.textContent = "Error: No permission specified.";
    return;
  }

  label.textContent = permission;

  async function finish(granted) {
    // Notify the background script of the result
    try {
      await browser.runtime.sendMessage({
        action: "permissionRequestResult",
        requestId,
        granted
      });
    } catch (e) {
      // background might have already handled it
    }
    window.close();
  }

  btnAllow.addEventListener("click", async () => {
    btnAllow.disabled = true;
    btnDeny.disabled = true;
    status.textContent = "Requesting permission…";
    try {
      const granted = await browser.permissions.request({ permissions: [permission] });
      status.textContent = granted ? "✅ Permission granted!" : "❌ Permission was denied.";
      setTimeout(() => finish(granted), 800);
    } catch (e) {
      status.textContent = "Error: " + e.message;
      setTimeout(() => finish(false), 1200);
    }
  });

  btnDeny.addEventListener("click", () => finish(false));
})();
