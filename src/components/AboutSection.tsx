import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 bg-luxury-gradient scroll-mt-24">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-body">
            Quem Somos
          </p>
          <div className="line-gold-center mb-10" />

          <h2 className="font-display text-4xl md:text-5xl mb-10 text-foreground">
            Excelência em <span className="text-gradient-gold italic">Tecnologia</span>
          </h2>

          <p className="text-muted-foreground text-lg leading-relaxed mb-8 font-light">
            Fundada em 2009, a B-Found é uma empresa dedicada ao design e implementação de
            soluções integradas de entretenimento para o mercado residencial premium e de luxo.
            Estendemos os nossos serviços aos setores marítimo, corporativo e hoteleiro.
          </p>

          <p className="text-muted-foreground text-lg leading-relaxed font-light">
            A nossa equipa de técnicos certificados possui mais de 25 anos de experiência no
            setor audiovisual, networking, iluminação, segurança e integração de sistemas.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {[
            { number: "2009", label: "Fundação" },
            { number: "25+", label: "Anos Experiência" },
            { number: "100+", label: "Projetos" },
            { number: "3", label: "Setores" },
          ].map((stat) => (
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
