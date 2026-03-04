import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const PlanningCTA = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <section id="planning" className="py-28 md:py-32 relative overflow-hidden scroll-mt-24 bg-luxury-gradient">
      <div className="absolute inset-0 bg-luxury-radial opacity-60" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-body">
            {t.planning.label}
          </p>
          <div className="line-gold-center mb-10" />
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="text-gradient-gold">{t.planning.title1}</span> {t.planning.title2}
            <br />{t.planning.title3}
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
            {t.planning.description}
          </p>

          <button
            onClick={() => navigate("/planeamento")}
            className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-primary text-primary text-sm tracking-[0.2em] uppercase font-body hover:bg-primary hover:text-primary-foreground transition-all duration-500"
          >
            {t.planning.cta}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanningCTA;
