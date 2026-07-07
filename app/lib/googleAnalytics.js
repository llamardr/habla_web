export const GA_MEASUREMENT_ID = "G-BXN3RRLT1J";

const ATTRIBUTION_STORAGE_KEY = "habla_analytics_attribution";
const ATTRIBUTION_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "msclkid",
];

const getSessionStorage = () => {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage;
  } catch (error) {
    return null;
  }
};

const removeEmptyValues = (params = {}) =>
  Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      if (value === undefined || value === null || value === "") return false;
      return true;
    }),
  );

const isExternalUrl = (url) => {
  if (typeof window === "undefined" || !url) return false;

  try {
    return new URL(url).origin !== window.location.origin;
  } catch (error) {
    return false;
  }
};

export function persistAnalyticsAttribution() {
  if (typeof window === "undefined") return;

  const storage = getSessionStorage();
  if (!storage) return;

  const existing = getAnalyticsAttribution();
  const searchParams = new URLSearchParams(window.location.search);
  const capturedParams = {};

  ATTRIBUTION_PARAM_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) capturedParams[key] = value;
  });

  const referrer = document.referrer || "";
  const isExternalReferrer = isExternalUrl(referrer);

  const nextAttribution = removeEmptyValues({
    ...existing,
    ...capturedParams,
    referrer: existing.referrer || (isExternalReferrer ? referrer : ""),
    landing_page: existing.landing_page || window.location.href,
    captured_at: existing.captured_at || new Date().toISOString(),
  });

  if (Object.keys(nextAttribution).length === 0) return;
  storage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(nextAttribution));
}

export function getAnalyticsAttribution() {
  const storage = getSessionStorage();
  if (!storage) return {};

  try {
    return JSON.parse(storage.getItem(ATTRIBUTION_STORAGE_KEY) || "{}");
  } catch (error) {
    return {};
  }
}

export function getGoogleAnalyticsClientId() {
  if (typeof document === "undefined") return "";

  const gaCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("_ga="));

  if (!gaCookie) return "";

  const cookieValue = gaCookie.split("=").slice(1).join("=");
  const match = cookieValue.match(/^GA\d+\.\d+\.(.+)$/);

  return match?.[1] || "";
}

export function getAnalyticsContext(params = {}) {
  if (typeof window === "undefined") return params;

  return removeEmptyValues({
    page_title: document.title,
    page_location: window.location.href,
    page_path: window.location.pathname,
    ga_client_id: getGoogleAnalyticsClientId(),
    ...getAnalyticsAttribution(),
    ...params,
  });
}

export function trackGAEvent(eventName, params = {}) {
  if (typeof window === "undefined") return;

  const eventParams = getAnalyticsContext(params);

  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["event", eventName, eventParams]);
}
