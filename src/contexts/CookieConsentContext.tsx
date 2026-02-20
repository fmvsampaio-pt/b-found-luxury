import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type ConsentCategory = "necessary" | "analytics" | "marketing" | "preferences";

export interface ConsentState {
  necessary: true; // always true — cannot be disabled
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export interface ConsentRecord {
  version: string;
  timestamp: string;
  consents: ConsentState;
}

interface CookieConsentContextType {
  consentRecord: ConsentRecord | null;
  showBanner: boolean;
  showPreferences: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (consents: Omit<ConsentState, "necessary">) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  hasConsented: (category: ConsentCategory) => boolean;
}

const CONSENT_KEY = "bfound_cookie_consent";
const CONSENT_VERSION = "1.0"; // bump this to re-trigger banner on policy changes

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const buildRecord = (consents: ConsentState): ConsentRecord => ({
  version: CONSENT_VERSION,
  timestamp: new Date().toISOString(),
  consents,
});

export const CookieConsentProvider = ({ children }: { children: React.ReactNode }) => {
  const [consentRecord, setConsentRecord] = useState<ConsentRecord | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Load persisted consent on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (raw) {
        const parsed: ConsentRecord = JSON.parse(raw);
        // Re-show banner if policy version changed
        if (parsed.version !== CONSENT_VERSION) {
          setShowBanner(true);
        } else {
          setConsentRecord(parsed);
        }
      } else {
        // Small delay so the banner doesn't flash during initial render
        const timer = setTimeout(() => setShowBanner(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      setShowBanner(true);
    }
  }, []);

  const persist = useCallback((record: ConsentRecord) => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    setConsentRecord(record);
    setShowBanner(false);
    setShowPreferences(false);
  }, []);

  const acceptAll = useCallback(() => {
    persist(buildRecord({ necessary: true, analytics: true, marketing: true, preferences: true }));
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist(buildRecord({ necessary: true, analytics: false, marketing: false, preferences: false }));
  }, [persist]);

  const savePreferences = useCallback(
    (partial: Omit<ConsentState, "necessary">) => {
      persist(buildRecord({ necessary: true, ...partial }));
    },
    [persist]
  );

  const openPreferences = useCallback(() => {
    setShowPreferences(true);
    setShowBanner(false);
  }, []);

  const closePreferences = useCallback(() => {
    setShowPreferences(false);
    if (!consentRecord) setShowBanner(true);
  }, [consentRecord]);

  const hasConsented = useCallback(
    (category: ConsentCategory) => {
      if (category === "necessary") return true;
      return consentRecord?.consents[category] ?? false;
    },
    [consentRecord]
  );

  return (
    <CookieConsentContext.Provider
      value={{
        consentRecord,
        showBanner,
        showPreferences,
        acceptAll,
        rejectAll,
        savePreferences,
        openPreferences,
        closePreferences,
        hasConsented,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
};
