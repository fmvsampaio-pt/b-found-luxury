import { Link } from "react-router-dom";
import logo from "@/assets/logo-bfound.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

const labels = {
  pt: {
    cookies: "Preferências de Cookies",
    privacy: "Política de Privacidade",
    terms: "Termos e Condições",
  },
  en: {
    cookies: "Cookie Preferences",
    privacy: "Privacy Policy",
    terms: "Terms & Conditions",
  },
};

const Footer = () => {
  const { t, language } = useLanguage();
  const { openPreferences } = useCookieConsent();
  const l = labels[language];

  return (
    <footer className="py-10 border-t border-border bg-luxury-gradient-alt">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="B-Found — voltar ao topo"
          className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
        >
          <img src={logo} alt="B-Found" className="h-12 w-auto" />
        </a>

        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            <Link
              to="/privacidade"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {l.privacy}
            </Link>
            <span className="text-muted-foreground/40">·</span>
            <Link
              to="/termos"
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {l.terms}
            </Link>
            <span className="text-muted-foreground/40">·</span>
            <button
              onClick={openPreferences}
              className="text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {l.cookies}
            </button>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} B-Found. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
