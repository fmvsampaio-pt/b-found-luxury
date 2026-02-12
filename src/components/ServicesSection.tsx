import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Wifi, Music, Home, Shield, Monitor, Film, Lock, Headphones, Server, Settings, Wrench, Anchor } from "lucide-react";
import residentialImg from "@/assets/residential.jpg";
import commercialImg from "@/assets/commercial.jpg";
import marineImg from "@/assets/marine.jpg";

const categories = [
  {
    id: "residential",
    title: "Soluções Residenciais",
    image: residentialImg,
    services: [
      { icon: Wifi, name: "Redes & Wi-Fi" },
      { icon: Music, name: "Áudio Multiroom" },
      { icon: Headphones, name: "Hi-Fi Audio" },
      { icon: Home, name: "Domótica" },
      { icon: Film, name: "Home Theater" },
      { icon: Shield, name: "Segurança" },
      { icon: Lock, name: "Controlo de Acesso" },
    ],
  },
  {
    id: "commercial",
    title: "Soluções Comerciais",
    image: commercialImg,
    services: [
      { icon: Server, name: "Consultoria IT" },
      { icon: Wifi, name: "Infraestrutura de Rede" },
      { icon: Monitor, name: "Soluções AV" },
      { icon: Settings, name: "Automação" },
      { icon: Shield, name: "Segurança" },
      { icon: Wrench, name: "Suporte Técnico" },
    ],
  },
  {
    id: "marine",
    title: "Soluções Marítimas",
    image: marineImg,
    services: [
      { icon: Wifi, name: "Redes & Wi-Fi" },
      { icon: Settings, name: "Automação" },
      { icon: Music, name: "Áudio" },
      { icon: Film, name: "Cinema" },
      { icon: Shield, name: "Segurança" },
    ],
  },
];

const ServicesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState("residential");
  const current = categories.find((c) => c.id === active)!;

  return (
    <section id="services" className="py-32 relative">
      <div className="absolute inset-0 bg-luxury-radial pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.4em] uppercase text-primary mb-4 font-body">
            Serviços
          </p>
          <div className="line-gold-center mb-10" />
          <h2 className="font-display text-4xl md:text-5xl text-foreground">
            O Que <span className="text-gradient-gold italic">Fazemos</span>
          </h2>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="flex justify-center gap-4 md:gap-8 mb-16 flex-wrap"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`text-sm tracking-[0.15em] uppercase font-body px-6 py-3 border transition-all duration-500 ${
                active === cat.id
                  ? "border-primary text-primary bg-primary/5"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="relative overflow-hidden group">
            <img
              src={current.image}
              alt={current.title}
              className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>

          <div>
            <h3 className="font-display text-3xl mb-8 text-foreground">
              {current.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {current.services.map((service, i) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-4 p-4 border border-border hover:border-primary/40 transition-colors duration-300 group/item"
                >
                  <service.icon className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-sm tracking-wide text-muted-foreground group-hover/item:text-foreground transition-colors">
                    {service.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
