export const GOOGLE_ADS_ID = "AW-18293956146";

/**
 * Fires a Google Ads Conversion event or custom event.
 * @param conversionLabel - Optional specific Google Ads conversion label (e.g. 'AbCdEfGhIjK')
 * @param value - Optional conversion value (e.g. 1)
 */
export const trackConversion = (conversionLabel?: string, value?: number) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    const payload: Record<string, any> = {
      send_to: conversionLabel
        ? `${GOOGLE_ADS_ID}/${conversionLabel}`
        : GOOGLE_ADS_ID,
    };
    if (value !== undefined) {
      payload.value = value;
      payload.currency = "INR";
    }
    (window as any).gtag("event", "conversion", payload);
  }
};

/**
 * Tracks a custom event in dataLayer/gtag
 */
export const trackCustomEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
