import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import logo from "@/assets/logo-bfound.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.process, href: "#process" },
    { label: t.nav.planning, href: "#planning" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    e.preventDefault();
    const target = document.querySelector(link.href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-5 px-6">
         <a href="#" className="flex items-center">
           <img src={logo} alt="B-Found" className="h-14 w-auto" />
         </a>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              className="text-sm font-body tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: Lang switcher + mobile toggle */}
        <div className="flex items-center gap-4">
          {/* Language switcher */}
          <button
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className="flex items-center gap-1.5 text-xs tracking-[0.2em] uppercase font-body border border-border hover:border-primary/50 px-3 py-1.5 transition-all duration-300 group"
            aria-label="Toggle language"
          >
            <span className={language === "pt" ? "text-primary" : "text-muted-foreground group-hover:text-foreground transition-colors"}>
              PT
            </span>
            <span className="text-border">|</span>
            <span className={language === "en" ? "text-primary" : "text-muted-foreground group-hover:text-foreground transition-colors"}>
              EN
            </span>
          </button>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-foreground"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile menu - Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="bg-background border-border w-[280px]">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="text-sm font-body tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </motion.header>
  );
};

export default Navbar;

