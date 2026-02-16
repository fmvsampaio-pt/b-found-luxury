import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PlanningCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-luxury-radial opacity-50" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/5 mb-8">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-xs tracking-[0.2em] uppercase text-primary font-body">Novo</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="text-gradient-gold">Planeie</span> a sua
            <br />Casa Inteligente
          </h2>

          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 font-light leading-relaxed">
            Utilize o nosso guia interactivo para configurar a tecnologia ideal para a sua casa e receba um orçamento personalizado.
          </p>

          <button
            onClick={() => navigate("/planeamento")}
            className="group inline-flex items-center gap-3 px-10 py-5 border-2 border-primary text-primary text-sm tracking-[0.2em] uppercase font-body hover:bg-primary hover:text-primary-foreground transition-all duration-500"
          >
            Começar Planeamento
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default PlanningCTA;
