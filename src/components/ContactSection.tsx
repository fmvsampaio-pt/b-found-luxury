import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-body">
            Contacto
          </p>
          <div className="line-gold-center mb-10" />
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            Fale <span className="text-gradient-gold italic">Connosco</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {[
            {
              icon: MapPin,
              title: "Morada",
              lines: ["Av. Amália Rodrigues 36B", "2650-445 Amadora, Portugal"],
            },
            {
              icon: Clock,
              title: "Horário",
              lines: ["9:00 – 18:00", "Segunda – Sexta"],
            },
            {
              icon: Phone,
              title: "Telefone",
              lines: ["+351 210 939 977"],
            },
            {
              icon: Mail,
              title: "Email",
              lines: ["geral@b-found.pt"],
            },
          ].map((item) => (
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
