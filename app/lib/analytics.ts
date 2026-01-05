type GTagEvent = {
  send_to?: string;
  value?: number;
  currency?: string;
  event_callback?: () => void;
  [key: string]: unknown;
};

declare global {
  interface Window {
    gtag?: (
      command: 'event',
      targetId: string,
      config?: GTagEvent
    ) => void;
  }
}

export const gtagReportConversion = (url: string) => {
  const callback = () => {
    if (typeof url !== 'undefined') {
      window.location.href = url;
    }
  };

  // Check if gtag is defined
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      'send_to': 'AW-17841375498/F6NtCLD7rN0bEIqSt7tC',
      'value': 1.0,
      'currency': 'AUD',
      'event_callback': callback
    });
    return false;
  } else {
    // If gtag is not loaded, still navigate
    window.location.href = url;
    return false;
  }
};
