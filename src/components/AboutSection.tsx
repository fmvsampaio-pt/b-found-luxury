import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const stats = [
    { number: "2009", label: t.about.stats.founded },
    { number: "25+", label: t.about.stats.experience },
    { number: "100+", label: t.about.stats.projects },
    { number: "3", label: t.about.stats.sectors },
  ];

  return (
    <section id="about" className="pt-24 md:pt-32 pb-16 md:pb-20 bg-luxury-gradient scroll-mt-24">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-body">
            {t.about.label}
          </p>
          <div className="line-gold-center mb-10" />

          <h2 className="font-display text-4xl md:text-5xl mb-10 text-foreground">
            {t.about.title} <span className="text-gradient-gold italic">{t.about.titleHighlight}</span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light">
            {t.about.p1}
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            {t.about.p2}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-3xl md:text-4xl text-gradient-gold mb-2">
                {stat.number}
              </div>
              <div className="text-sm tracking-[0.15em] uppercase text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
