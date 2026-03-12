import logo from "@/assets/logo-bfound.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

const cookieLabels = { pt: "Preferências de Cookies", en: "Cookie Preferences" };

const Footer = () => {
  const { t, language } = useLanguage();
  const { openPreferences } = useCookieConsent();

  return (
    <footer className="py-10 border-t border-border bg-luxury-gradient-alt">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center"
        >
          <img src={logo} alt="B-Found" className="h-12 w-auto" />
        </a>

        <div className="flex items-center gap-8">
          {/* Social media links removed */}
        </div>

        <div className="flex flex-col items-center md:items-end gap-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} B-Found. {t.footer.rights}
          </p>
          <button
            onClick={openPreferences}
            className="text-xs text-muted-foreground hover:text-primary transition-colors duration-300 underline underline-offset-2"
          >
            {cookieLabels[language]}
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
