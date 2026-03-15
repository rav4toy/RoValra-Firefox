/*!
 * rovalra v2.4.10
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: !0 });
(function() {
  "use strict";
  if (window.__ROVALRA_INTERCEPTOR_SETUP__)
    return;
  window.__ROVALRA_INTERCEPTOR_SETUP__ = !0;
  const CATALOG_API_URL = "https://catalog.roblox.com/v1/catalog/items/details", CLIENT_STATUS_API_URL = "https://apis.roblox.com/matchmaking-api/v1/client-status", GAME_LAUNCH_SUCCESS_URL = "https://metrics.roblox.com/v1/games/report-event", GAME_SERVERS_API_URL = "https://games.roblox.com/v1/games/", GAMES_ROBLOX_API = "https://games.roblox.com/";
  let ASSET_TYPE_ACCESSORIES = [8, 41, 42, 43, 44, 45, 46, 47, 57, 58], ASSET_TYPE_LAYERED = [64, 65, 66, 67, 68, 69, 70, 71, 72];
  function dispatchCaptureEvent(url, method, body) {
    typeof url == "string" && (url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|mp3|ogg|wav|webm|mp4|json)$/i) && !url.includes("apis.roblox.com") && !url.includes("games.roblox.com") || !url.includes("roblox.com") && !url.includes("rovalra.com") || document.dispatchEvent(new CustomEvent("rovalra-traffic-capture", {
      detail: { url, method: method || "GET", body }
    })));
  }
  __name(dispatchCaptureEvent, "dispatchCaptureEvent");
  let streamerModeEnabled = !1, settingsPageInfoEnabled = !0;
  try {
    streamerModeEnabled = sessionStorage.getItem("rovalra_streamermode") === "true", settingsPageInfoEnabled = sessionStorage.getItem("rovalra_settingsPageInfo") !== "false";
  } catch {
  }
  document.addEventListener("rovalra-streamer-mode", (e) => {
    typeof e.detail == "object" ? (streamerModeEnabled = e.detail.enabled === !0, settingsPageInfoEnabled = e.detail.settingsPageInfo !== !1) : streamerModeEnabled = e.detail === !0;
  });
  const originalFetch = window.fetch;
  window.fetch = async function(...args) {
    const [url, config] = args, method = config?.method || "GET";
    try {
      dispatchCaptureEvent(url, method, config?.body);
    } catch {
    }
    let response = await originalFetch(...args);
    if (streamerModeEnabled && settingsPageInfoEnabled && typeof url == "string" && [
      "/my/settings/json",
      "accountinformation.roblox.com/v1/phone",
      "users.roblox.com/v1/birthdate",
      "apis.roblox.com/age-verification-service/v1/age-verification/verified-age",
      "accountsettings.roblox.com/v1/account/settings/account-country",
      "apis.roblox.com/user-settings-api/v1/account-insights/age-group",
      "apis.roblox.com/token-metadata-service/v1/sessions"
    ].some((path) => url.includes(path)))
      try {
        const data = await response.clone().json();
        url.includes("/my/settings/json") && (data.UserEmail = "RoValra Streamer Mode Enabled", data.UserEmailVerified = !0), url.includes("v1/phone") && (data.phone = data.prefix = data.countryCode = "RoValra Streamer Mode Enabled"), url.includes("v1/birthdate") && (data.birthMonth = data.birthDay = data.birthYear = 0), url.includes("verified-age") && (data.verifiedAge = 0, data.isSeventeenPlus = !1), url.includes("account-country") && data.value && (data.value.countryName = data.value.localizedName = "RoValra Streamer Mode Enabled", data.value.countryId = 1), url.includes("age-group") && (data.ageGroupTranslationKey = "RoValra Streamer Mode Enabled"), url.includes("sessions") && data.sessions && data.sessions.forEach((s) => {
          s.location && (s.location.city = s.location.subdivision = "", s.location.subdivision = "", s.location.country = 'To view your sessions please disable "RoValra streamer mode"'), s.agent && (s.agent.os = "RoValra streamer mode enabled", s.agent.type = "App"), s.lastAccessedIp = "Hidden", s.lastAccessedTimestampEpochMilliseconds = "0";
        });
        const newHeaders = new Headers(response.headers);
        newHeaders.delete("content-length"), response = new Response(JSON.stringify(data), {
          status: response.status,
          statusText: response.statusText,
          headers: newHeaders
        });
      } catch {
      }
    return typeof url == "string" && (url.includes(CATALOG_API_URL) && response.clone().json().then((d) => window.dispatchEvent(new CustomEvent("rovalra-catalog-details", { detail: d }))).catch(() => {
    }), url.includes(CATALOG_API_URL) && response.clone().json().then((d) => document.dispatchEvent(new CustomEvent("rovalra-catalog-details-response", { detail: d }))).catch(() => {
    }), url.includes(CLIENT_STATUS_API_URL) && response.clone().json().then((d) => document.dispatchEvent(new CustomEvent("rovalra-client-status-response", { detail: d }))).catch(() => {
    }), url.includes(GAME_LAUNCH_SUCCESS_URL) && url.includes("GameLaunchSuccessWeb_Win32") && document.dispatchEvent(new CustomEvent("rovalra-game-launch-success", { detail: { url } })), url.includes(GAME_SERVERS_API_URL) && url.includes("/servers/") && response.clone().json().then((d) => document.dispatchEvent(new CustomEvent("rovalra-game-servers-response", { detail: { url, data: d } }))).catch(() => {
    }), url.includes(GAMES_ROBLOX_API) && url.includes("/media") && response.clone().json().then((d) => document.dispatchEvent(new CustomEvent("rovalra-game-media-response", { detail: d }))).catch(() => {
    })), response;
  };
  const originalXhrOpen = XMLHttpRequest.prototype.open, originalXhrSend = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    return this._rovalra_url = url, this._rovalra_method = method, streamerModeEnabled && typeof url == "string" && settingsPageInfoEnabled && (url.includes("/my/settings/json") && (this._rovalra_spoof_settings = !0), url.includes("/v1/emails") && (this._rovalra_email_settings = !0), url.includes("v1/phone") && (this._rovalra_spoof_phone = !0), url.includes("v1/birthdate") && (this._rovalra_spoof_birthdate = !0), url.includes("verified-age") && (this._rovalra_spoof_age = !0), url.includes("account-country") && (this._rovalra_spoof_country = !0), url.includes("age-group") && (this._rovalra_spoof_age_group = !0), url.includes("sessions") && (this._rovalra_spoof_sessions = !0)), originalXhrOpen.apply(this, [method, url, ...rest]);
  }, XMLHttpRequest.prototype.send = function(...args) {
    const xhr = this;
    try {
      dispatchCaptureEvent(xhr._rovalra_url, xhr._rovalra_method, args[0]);
    } catch {
    }
    return (xhr._rovalra_spoof_settings || xhr._rovalra_spoof_phone || xhr._rovalra_spoof_birthdate || xhr._rovalra_spoof_age || xhr._rovalra_spoof_country || xhr._rovalra_spoof_age_group || xhr._rovalra_spoof_sessions) && (Object.defineProperty(xhr, "responseText", {
      configurable: !0,
      get: /* @__PURE__ */ __name(function() {
        const original = Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "responseText").get.call(this);
        if (this.readyState !== 4) return original;
        try {
          const data = JSON.parse(original);
          return xhr._rovalra_spoof_settings && (data.UserEmail = "RoValra Streamer Mode Enabled", data.UserEmailVerified = !0, data.PreviousUserNames = "RoValra Streamer Mode Enabled", data.UserEmailMasked = !1), xhr._rovalra_email_settings && (data.verifiedEmail = "RoValra Streamer Mode Enabled"), xhr._rovalra_spoof_phone && (data.countryCode = data.prefix = data.phone = "RoValra Streamer Mode Enabled"), xhr._rovalra_spoof_birthdate && (data.birthMonth = data.birthDay = data.birthYear = 0), xhr._rovalra_spoof_age && (data.isVerified = !0, data.verifiedAge = 0, data.isSeventeenPlus = !1), xhr._rovalra_spoof_country && data.value && (data.value.countryName = data.value.localizedName = "RoValra Streamer Mode Enabled", data.value.countryId = 1), xhr._rovalra_spoof_age_group && (data.ageGroupTranslationKey = "RoValra Streamer Mode Enabled"), xhr._rovalra_spoof_sessions && data.sessions && data.sessions.forEach((s) => {
            s.location && (s.location.city = s.location.subdivision = "", s.location.country = 'To view your sessions please disable "RoValra streamer mode"'), s.agent && (s.agent.os = "RoValra streamer mode enabled", s.agent.type = "App"), s.lastAccessedIp = "Hidden", s.lastAccessedTimestampEpochMilliseconds = "0";
          }), JSON.stringify(data);
        } catch {
          return original;
        }
      }, "get")
    }), Object.defineProperty(xhr, "response", {
      configurable: !0,
      get: /* @__PURE__ */ __name(function() {
        if (this.responseType === "json")
          try {
            return JSON.parse(this.responseText);
          } catch {
            return Object.getOwnPropertyDescriptor(XMLHttpRequest.prototype, "response").get.call(this);
          }
        return this.responseText;
      }, "get")
    })), xhr.addEventListener("load", function() {
      if (typeof xhr._rovalra_url == "string") {
        const triggerEvent = /* @__PURE__ */ __name((eventName, detail) => document.dispatchEvent(new CustomEvent(eventName, { detail })), "triggerEvent");
        try {
          const url = xhr._rovalra_url;
          url.includes(CATALOG_API_URL) && window.dispatchEvent(new CustomEvent("rovalra-catalog-details", { detail: JSON.parse(xhr.responseText) })), url.includes(CATALOG_API_URL) && triggerEvent("rovalra-catalog-details-response", JSON.parse(xhr.responseText)), url.includes(CLIENT_STATUS_API_URL) && triggerEvent("rovalra-client-status-response", JSON.parse(xhr.responseText)), url.includes(GAME_SERVERS_API_URL) && url.includes("/servers/") && triggerEvent("rovalra-game-servers-response", { url, data: JSON.parse(xhr.responseText) }), url.includes(GAMES_ROBLOX_API) && url.includes("/media") && triggerEvent("rovalra-game-media-response", JSON.parse(xhr.responseText));
        } catch {
        }
      }
    }), originalXhrSend.apply(this, args);
  };
  let multiAccessoryEnabled = !1;
  document.addEventListener("rovalra-multi-equip", (e) => {
    e.detail && (typeof e.detail.enabled == "boolean" && (multiAccessoryEnabled = e.detail.enabled), Array.isArray(e.detail.accessories) && (ASSET_TYPE_ACCESSORIES = e.detail.accessories), Array.isArray(e.detail.layered) && (ASSET_TYPE_LAYERED = e.detail.layered));
  });
  const patchAvatarService = /* @__PURE__ */ __name((service) => {
    if (!service || service.__rovalra_patched) return;
    service.__rovalra_patched = !0;
    const originalGetLimit = service.getAdvancedAccessoryLimit;
    service.getAdvancedAccessoryLimit = function(assetTypeId, ...args) {
      if (multiAccessoryEnabled) {
        const id = Number(assetTypeId);
        if (ASSET_TYPE_ACCESSORIES.includes(id) || ASSET_TYPE_LAYERED.includes(id))
          return 100;
      }
      return originalGetLimit ? originalGetLimit.call(this, assetTypeId, ...args) : 10;
    };
    const originalAddAsset = service.addAssetToAvatar;
    service.addAssetToAvatar = function(asset, currentAssets) {
      if (!multiAccessoryEnabled)
        return originalAddAsset.apply(this, arguments);
      const newAssetList = originalAddAsset.apply(this, arguments).filter((item) => {
        const typeId = item?.assetType?.id;
        return !ASSET_TYPE_ACCESSORIES.includes(typeId) && !ASSET_TYPE_LAYERED.includes(typeId);
      }), potentialAssets = [asset, ...currentAssets], uniqueMultiEquipAssets = [], seenIds = /* @__PURE__ */ new Set();
      for (const item of potentialAssets)
        if (item && item.id && !seenIds.has(item.id)) {
          const typeId = item?.assetType?.id;
          (ASSET_TYPE_ACCESSORIES.includes(typeId) || ASSET_TYPE_LAYERED.includes(typeId)) && (uniqueMultiEquipAssets.push(item), seenIds.add(item.id));
        }
      const counts = { accessory: 0, layered: 0 }, limits = { accessory: 10, layered: 10 };
      for (const item of uniqueMultiEquipAssets) {
        const typeId = item?.assetType?.id;
        ASSET_TYPE_ACCESSORIES.includes(typeId) ? counts.accessory < limits.accessory && (newAssetList.push(item), counts.accessory++) : ASSET_TYPE_LAYERED.includes(typeId) && counts.layered < limits.layered && (newAssetList.push(item), counts.layered++);
      }
      return newAssetList;
    }, console.log("RoValra: Multi-Accessory patch applied.");
  }, "patchAvatarService");
  (/* @__PURE__ */ __name(() => {
    let robloxObj = window.Roblox;
    const defineServiceProperty = /* @__PURE__ */ __name((obj) => {
      let serviceObj = obj.AvatarAccoutrementService;
      serviceObj && patchAvatarService(serviceObj), Object.defineProperty(obj, "AvatarAccoutrementService", {
        configurable: !0,
        enumerable: !0,
        get: /* @__PURE__ */ __name(() => serviceObj, "get"),
        set: /* @__PURE__ */ __name((val) => {
          serviceObj = val, patchAvatarService(val);
        }, "set")
      });
    }, "defineServiceProperty");
    robloxObj ? defineServiceProperty(robloxObj) : Object.defineProperty(window, "Roblox", {
      configurable: !0,
      enumerable: !0,
      get: /* @__PURE__ */ __name(() => robloxObj, "get"),
      set: /* @__PURE__ */ __name((val) => {
        robloxObj = val, val && typeof val == "object" && defineServiceProperty(val);
      }, "set")
    });
  }, "initializeHooks"))(), console.log("RoValra: Request capture, Privacy Spoofing, and Multi-Accessory loaded successfully.");
})();
