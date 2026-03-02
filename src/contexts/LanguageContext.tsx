import React, { createContext, useContext, useState } from "react";

export type Language = "pt" | "en";

export const translations = {
  pt: {
    nav: {
      about: "Sobre Nós",
      services: "Serviços",
      process: "Processo",
      planning: "Guia de Planeamento",
      contact: "Contacto",
    },
    hero: {
      tagline: "Soluções Premium & Luxo",
      title1: "Integração Completa",
      title2: "de Sistemas",
      title3: "Residenciais e Comerciais",
      description: "Projetamos e instalamos soluções de automação, AV, iluminação, rede e segurança que funcionam em perfeita harmonia para elevar o seu estilo de vida ou melhorar os seus negócios.",
      cta: "Descobrir Mais",
    },
    about: {
      label: "Quem Somos",
      title: "Excelência em",
      titleHighlight: "Tecnologia",
      p1: "Fundada em 2009, a B-Found é uma empresa dedicada ao design e implementação de soluções integradas de entretenimento para o mercado residencial premium e de luxo. Estendemos os nossos serviços aos setores marítimo, corporativo e hoteleiro.",
      p2: "A nossa equipa de técnicos certificados possui mais de 25 anos de experiência no setor audiovisual, networking, iluminação, segurança e integração de sistemas.",
      stats: {
        founded: "Fundação",
        experience: "Anos Experiência",
        projects: "Projetos",
        sectors: "Setores",
      },
    },
    services: {
      label: "Serviços",
      title: "O Que",
      titleHighlight: "Fazemos",
      categories: {
        residential: {
          title: "Soluções Residenciais",
          services: ["Redes & Wi-Fi", "Áudio Multiroom", "Hi-Fi Audio", "Domótica", "Home Theater", "Segurança", "Controlo de Acessos"],
        },
        commercial: {
          title: "Soluções Comerciais",
          services: ["Consultoria IT", "Infraestrutura de Rede", "Soluções AV", "Automação", "Segurança", "Suporte Técnico"],
        },
        marine: {
          title: "Soluções Marítimas",
          services: ["Redes & Wi-Fi", "Automação", "Áudio", "Cinema", "Segurança"],
        },
      },
    },
    process: {
      label: "Processo",
      title: "Como",
      titleHighlight: "Trabalhamos",
      steps: [
        { title: "Consultoria", desc: "Análise detalhada das necessidades e objetivos do cliente." },
        { title: "Design", desc: "Projeto personalizado em colaboração com a equipa de arquitetura." },
        { title: "Instalação", desc: "Instalação e configuração profissional de todos os equipamentos." },
        { title: "Integração", desc: "Integração de sistemas para controlo centralizado." },
        { title: "Testes", desc: "Testes rigorosos de funcionamento e integração." },
        { title: "Suporte", desc: "Suporte técnico contínuo e manutenção preventiva." },
      ],
    },
    planning: {
      label: "Guia de Planeamento",
      title1: "Planeie",
      title2: "a sua",
      title3: "Casa Inteligente",
      description: "Utilize o nosso guia interactivo para configurar a tecnologia ideal para a sua casa e receba um orçamento personalizado.",
      cta: "Começar Planeamento",
    },
    contact: {
      label: "Contacto",
      title: "Fale",
      titleHighlight: "Connosco",
      address: { title: "Morada", lines: ["Av. Amália Rodrigues 36B", "2650-445 Amadora, Portugal"] },
      hours: { title: "Horário", lines: ["9:00 – 18:00", "Segunda – Sexta"] },
      phone: { title: "Telefone", lines: ["+351 210 939 977"] },
      email: { title: "Email", lines: ["geral@b-found.pt"] },
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
  },
  en: {
    nav: {
      about: "About Us",
      services: "Services",
      process: "Process",
      planning: "Planning Guide",
      contact: "Contact",
    },
    hero: {
      tagline: "Premium & Luxury Solutions",
      title1: "Complete Systems",
      title2: "Integration",
      title3: "Residential & Commercial",
      description: "We design and install automation, AV, lighting, networking, and security solutions that work in perfect harmony to elevate your lifestyle or enhance your business.",
      cta: "Discover More",
    },
    about: {
      label: "Who We Are",
      title: "Excellence in",
      titleHighlight: "Technology",
      p1: "Founded in 2009, B-Found is a company dedicated to the design and implementation of integrated entertainment solutions for the premium and luxury residential market. We extend our services to the marine, corporate, and hospitality sectors.",
      p2: "Our team of certified technicians has more than 25 years of experience in the audiovisual, networking, lighting, security and systems integration sectors.",
      stats: {
        founded: "Founded",
        experience: "Years Experience",
        projects: "Projects",
        sectors: "Sectors",
      },
    },
    services: {
      label: "Services",
      title: "What We",
      titleHighlight: "Do",
      categories: {
        residential: {
          title: "Residential Solutions",
          services: ["Networks & Wi-Fi", "Multiroom Audio", "Hi-Fi Audio", "Home Automation", "Home Theater", "Security", "Access Control"],
        },
        commercial: {
          title: "Commercial Solutions",
          services: ["IT Consulting", "Network Infrastructure", "AV Solutions", "Automation", "Security", "Technical Support"],
        },
        marine: {
          title: "Marine Solutions",
          services: ["Networks & Wi-Fi", "Automation", "Audio", "Cinema", "Security"],
        },
      },
    },
    process: {
      label: "Process",
      title: "How We",
      titleHighlight: "Work",
      steps: [
        { title: "Consulting", desc: "Detailed analysis of the client's needs and objectives." },
        { title: "Design", desc: "Custom project developed in collaboration with the architecture team." },
        { title: "Installation", desc: "Professional installation and configuration of all equipment." },
        { title: "Integration", desc: "Systems integration for centralised control." },
        { title: "Testing", desc: "Rigorous functionality and integration testing." },
        { title: "Support", desc: "Ongoing technical support and preventive maintenance." },
      ],
    },
    planning: {
      label: "Planning Guide",
      title1: "Plan",
      title2: "your",
      title3: "Smart Home",
      description: "Use our interactive guide to configure the ideal technology for your home and receive a personalised quote.",
      cta: "Start Planning",
    },
    contact: {
      label: "Contact",
      title: "Get in",
      titleHighlight: "Touch",
      address: { title: "Address", lines: ["Av. Amália Rodrigues 36B", "2650-445 Amadora, Portugal"] },
      hours: { title: "Hours", lines: ["9:00 – 18:00", "Monday – Friday"] },
      phone: { title: "Phone", lines: ["+351 210 939 977"] },
      email: { title: "Email", lines: ["geral@b-found.pt"] },
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
};

type Translations = typeof translations.pt;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const getBrowserLanguage = (): Language => {
    const lang = navigator.language.toLowerCase();
    return lang.startsWith("pt") ? "pt" : "en";
  };

  const [language, setLanguage] = useState<Language>(getBrowserLanguage);
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};
