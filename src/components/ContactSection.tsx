import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const items = [
    { icon: MapPin, ...t.contact.address },
    { icon: Clock, ...t.contact.hours },
    { icon: Phone, ...t.contact.phone },
    { icon: Mail, ...t.contact.email },
  ];

  return (
    <section id="contact" className="py-28 md:py-32 scroll-mt-24">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-body">
            {t.contact.label}
          </p>
          <div className="line-gold-center mb-10" />
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            {t.contact.title} <span className="text-gradient-gold italic">{t.contact.titleHighlight}</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {items.map((item) => (
            <div
              key={item.title}
              className="text-center p-8 border border-border hover:border-primary/30 transition-all duration-500"
            >
              <item.icon className="w-6 h-6 text-primary mx-auto mb-4" />
              <h3 className="font-display text-lg mb-3 text-foreground">{item.title}</h3>
              {item.lines.map((line) => (
                <p key={line} className="text-sm text-muted-foreground font-light">
                  {line}
                </p>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
