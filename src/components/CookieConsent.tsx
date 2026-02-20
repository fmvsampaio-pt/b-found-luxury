import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ShieldCheck, BarChart2, Megaphone, SlidersHorizontal } from "lucide-react";
import { useCookieConsent, ConsentState } from "@/contexts/CookieConsentContext";
import { useLanguage } from "@/contexts/LanguageContext";

// ---------------------------------------------------------------------------
// Translations inline (cookie UI strings not in the main language context)
// ---------------------------------------------------------------------------
const copy = {
  pt: {
    bannerTitle: "A sua privacidade importa",
    bannerDesc:
      "Utilizamos cookies para melhorar a sua experiência, analisar o tráfego e personalizar conteúdo. Pode gerir as suas preferências a qualquer momento.",
    acceptAll: "Aceitar Todos",
    rejectAll: "Rejeitar Todos",
    manage: "Gerir Preferências",
    prefTitle: "Preferências de Cookies",
    prefDesc:
      "Escolha quais as categorias de cookies que aceita. Os cookies necessários não podem ser desactivados, pois são essenciais para o funcionamento do site.",
    save: "Guardar Preferências",
    alwaysOn: "Sempre activo",
    learnMore: "Saber mais",
    categories: {
      necessary: {
        title: "Cookies Necessários",
        desc: "Essenciais para o funcionamento do site (sessão, segurança, preferências de idioma). Não requerem consentimento.",
      },
      preferences: {
        title: "Cookies de Preferências",
        desc: "Guardam as suas preferências pessoais (idioma, layout) para melhorar a experiência nas próximas visitas.",
      },
      analytics: {
        title: "Cookies Analíticos",
        desc: "Ajudam-nos a compreender como os visitantes utilizam o site, permitindo melhorar o desempenho e conteúdo. Os dados são anonimizados.",
      },
      marketing: {
        title: "Cookies de Marketing",
        desc: "Utilizados para mostrar anúncios relevantes e medir a eficácia de campanhas publicitárias em plataformas externas.",
      },
    },
    policyLink: "Política de Privacidade",
    cookieLink: "Política de Cookies",
  },
  en: {
    bannerTitle: "Your privacy matters",
    bannerDesc:
      "We use cookies to enhance your experience, analyse traffic and personalise content. You can manage your preferences at any time.",
    acceptAll: "Accept All",
    rejectAll: "Reject All",
    manage: "Manage Preferences",
    prefTitle: "Cookie Preferences",
    prefDesc:
      "Choose which cookie categories you accept. Necessary cookies cannot be disabled as they are essential for the website to function.",
    save: "Save Preferences",
    alwaysOn: "Always on",
    learnMore: "Learn more",
    categories: {
      necessary: {
        title: "Necessary Cookies",
        desc: "Essential for the website to function (session, security, language preferences). No consent required.",
      },
      preferences: {
        title: "Preference Cookies",
        desc: "Store your personal preferences (language, layout) to improve your experience on future visits.",
      },
      analytics: {
        title: "Analytical Cookies",
        desc: "Help us understand how visitors use the site, enabling us to improve performance and content. Data is anonymised.",
      },
      marketing: {
        title: "Marketing Cookies",
        desc: "Used to display relevant adverts and measure the effectiveness of advertising campaigns on external platforms.",
      },
    },
    policyLink: "Privacy Policy",
    cookieLink: "Cookie Policy",
  },
};

// ---------------------------------------------------------------------------
// Category row
// ---------------------------------------------------------------------------
const categoryIcons = {
  necessary: ShieldCheck,
  preferences: SlidersHorizontal,
  analytics: BarChart2,
  marketing: Megaphone,
};

interface CategoryRowProps {
  id: keyof typeof categoryIcons;
  title: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  alwaysOnLabel: string;
  onChange: (id: string, value: boolean) => void;
}

const CategoryRow = ({ id, title, desc, checked, disabled, alwaysOnLabel, onChange }: CategoryRowProps) => {
  const [open, setOpen] = useState(false);
  const Icon = categoryIcons[id];

  return (
    <div className="border border-border hover:border-primary/20 transition-colors duration-300">
      <div className="flex items-center justify-between gap-4 p-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Icon className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-sm font-body tracking-wide text-foreground truncate">{title}</span>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {disabled ? (
            <span className="text-xs tracking-[0.15em] uppercase text-primary/70 font-body">{alwaysOnLabel}</span>
          ) : (
            /* Toggle switch */
            <button
              role="switch"
              aria-checked={checked}
              onClick={() => onChange(id, !checked)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                checked ? "bg-primary" : "bg-muted"
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-background shadow transition-transform duration-300 ${
                  checked ? "translate-x-[18px]" : "translate-x-[3px]"
                }`}
              />
            </button>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Toggle details"
          >
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-4 pb-4 text-xs text-muted-foreground leading-relaxed font-light border-t border-border pt-3">
              {desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Preferences panel
// ---------------------------------------------------------------------------
const PreferencesPanel = () => {
  const { savePreferences, closePreferences, consentRecord } = useCookieConsent();
  const { language } = useLanguage();
  const c = copy[language];

  const [consents, setConsents] = useState<Omit<ConsentState, "necessary">>({
    preferences: consentRecord?.consents.preferences ?? false,
    analytics: consentRecord?.consents.analytics ?? false,
    marketing: consentRecord?.consents.marketing ?? false,
  });

  const handleChange = (id: string, value: boolean) => {
    setConsents((prev) => ({ ...prev, [id]: value }));
  };

  const categories: Array<{ id: keyof typeof categoryIcons; title: string; desc: string; disabled?: boolean }> = [
    { id: "necessary", title: c.categories.necessary.title, desc: c.categories.necessary.desc, disabled: true },
    { id: "preferences", title: c.categories.preferences.title, desc: c.categories.preferences.desc },
    { id: "analytics", title: c.categories.analytics.title, desc: c.categories.analytics.desc },
    { id: "marketing", title: c.categories.marketing.title, desc: c.categories.marketing.desc },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-lg bg-card border border-border shadow-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-border flex-shrink-0">
          <div>
            <div className="line-gold mb-4" />
            <h2 className="font-display text-xl text-foreground">{c.prefTitle}</h2>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed font-light max-w-sm">
              {c.prefDesc}
            </p>
          </div>
          <button
            onClick={closePreferences}
            className="text-muted-foreground hover:text-foreground transition-colors ml-4 flex-shrink-0"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2">
          {categories.map((cat) => (
            <CategoryRow
              key={cat.id}
              id={cat.id}
              title={cat.title}
              desc={cat.desc}
              checked={cat.disabled ? true : consents[cat.id as keyof typeof consents]}
              disabled={cat.disabled}
              alwaysOnLabel={c.alwaysOn}
              onChange={handleChange}
            />
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex-shrink-0">
          <button
            onClick={() => savePreferences(consents)}
            className="w-full py-3 bg-primary text-primary-foreground text-sm tracking-[0.2em] uppercase font-body hover:bg-primary/90 transition-colors duration-300"
          >
            {c.save}
          </button>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2">
              {c.policyLink}
            </a>
            <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2">
              {c.cookieLink}
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Banner
// ---------------------------------------------------------------------------
const CookieBanner = () => {
  const { acceptAll, rejectAll, openPreferences } = useCookieConsent();
  const { language } = useLanguage();
  const c = copy[language];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      role="dialog"
      aria-modal="true"
      aria-label={c.bannerTitle}
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-border bg-card/95 backdrop-blur-md shadow-2xl"
    >
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
          {/* Text */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-8 bg-gradient-to-r from-primary to-transparent" />
              <p className="text-xs tracking-[0.3em] uppercase text-primary font-body">
                {c.bannerTitle}
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed font-light max-w-2xl">
              {c.bannerDesc}
            </p>
          </div>

          {/* Actions — equal visual weight for accept/reject per GDPR 2026 */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0 w-full lg:w-auto">
            <button
              onClick={rejectAll}
              className="px-6 py-2.5 border border-border text-muted-foreground text-xs tracking-[0.2em] uppercase font-body hover:border-primary/50 hover:text-foreground transition-all duration-300 whitespace-nowrap"
            >
              {c.rejectAll}
            </button>
            <button
              onClick={openPreferences}
              className="px-6 py-2.5 border border-border text-muted-foreground text-xs tracking-[0.2em] uppercase font-body hover:border-primary/50 hover:text-foreground transition-all duration-300 whitespace-nowrap"
            >
              {c.manage}
            </button>
            <button
              onClick={acceptAll}
              className="px-6 py-2.5 bg-primary text-primary-foreground text-xs tracking-[0.2em] uppercase font-body hover:bg-primary/90 transition-colors duration-300 whitespace-nowrap"
            >
              {c.acceptAll}
            </button>
          </div>
        </div>

        {/* Links */}
        <div className="flex gap-6 mt-4 pt-4 border-t border-border/50">
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2">
            {c.policyLink}
          </a>
          <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors underline underline-offset-2">
            {c.cookieLink}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Root export — renders banner or preferences panel
// ---------------------------------------------------------------------------
const CookieConsent = () => {
  const { showBanner, showPreferences } = useCookieConsent();

  return (
    <AnimatePresence mode="wait">
      {showPreferences && <PreferencesPanel key="prefs" />}
      {showBanner && !showPreferences && <CookieBanner key="banner" />}
    </AnimatePresence>
  );
};

export default CookieConsent;
