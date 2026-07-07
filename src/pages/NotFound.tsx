import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo-bfound.png";

const NotFound = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    document.title =
      language === "pt"
        ? "Página não encontrada · B-Found"
        : "Page not found · B-Found";
  }, [location.pathname, language]);

  const copy = {
    pt: {
      eyebrow: "Erro 404",
      title: "Página não encontrada",
      desc: "A página que procura não existe ou foi movida. Regresse ao início para continuar a explorar as nossas soluções.",
      cta: "Voltar ao início",
    },
    en: {
      eyebrow: "Error 404",
      title: "Page not found",
      desc: "The page you're looking for doesn't exist or has been moved. Return to the homepage to keep exploring our solutions.",
      cta: "Back to home",
    },
  }[language];

  return (
    <main className="min-h-screen bg-luxury-gradient-alt flex flex-col items-center justify-center px-6 py-20">
      <img src={logo} alt="B-Found" className="h-14 w-auto mb-12 opacity-90" />

      <div className="text-center max-w-xl">
        <p className="text-xs tracking-[0.3em] uppercase text-primary mb-6">
          {copy.eyebrow}
        </p>
        <h1 className="font-display text-5xl md:text-7xl leading-tight mb-6">
          {copy.title}
        </h1>
        <div className="mx-auto w-16 h-px bg-primary/60 mb-6" />
        <p className="text-muted-foreground text-base md:text-lg mb-10 leading-relaxed">
          {copy.desc}
        </p>

        <Button asChild size="lg" className="gap-2">
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            {copy.cta}
          </Link>
        </Button>
      </div>
    </main>
  );
};

export default NotFound;
