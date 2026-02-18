export function trackMetaEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq("track", eventName, params);
}
