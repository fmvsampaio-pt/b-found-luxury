import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const steps = t.process.steps.map((step, i) => ({
    number: String(i + 1).padStart(2, "0"),
    ...step,
  }));

  return (
    <section id="process" className="py-16 md:py-20 bg-luxury-gradient-alt scroll-mt-24">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-body">
            {t.process.label}
          </p>
          <div className="line-gold-center mb-10" />
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            {t.process.title} <span className="text-gradient-gold italic">{t.process.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-8 border border-border hover:border-primary/30 transition-all duration-500 group"
            >
              <span className="font-display text-4xl text-gradient-gold opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                {step.number}
              </span>
              <h3 className="font-display text-xl mt-4 mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
