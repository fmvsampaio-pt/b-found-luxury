import React, { createContext, useContext, useState, type ReactNode } from "react";

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
      title1: "Tecnologia Invisível Experiências Memoráveis",
      title2: "",
      title3: "",
      description: "Projetamos e instalamos soluções de controlo e automação, áudio‑vídeo, rede e segurança que funcionam em perfeita harmonia. Somos especialistas em home cinemas de referência, criando ambientes imersivos que elevam o seu estilo de vida e valorizam o seu espaço.",
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
          services: [
            { name: "Rede & Wi-Fi", desc: "Infraestrutura de rede robusta e cobertura Wi-Fi total em toda a habitação." },
            { name: "Áudio Multiroom", desc: "Música em qualquer divisão, controlada de forma centralizada ou independente." },
            { name: "Hi-Fi Audio", desc: "Sistemas de áudio de alta fidelidade para os mais exigentes audiófilos." },
            { name: "Automação e Controlo", desc: "Controlo centralizado de iluminação, climatização, estores e muito mais." },
            { name: "Home Cinema", desc: "Salas de cinema privadas com projeção, som imersivo e acústica otimizada." },
            { name: "Media Rooms", desc: "Espaços multimédia versáteis para entretenimento e convívio familiar." },
            { name: "Segurança", desc: "Sistemas de videovigilância, alarmes e monitorização remota." },
            { name: "Suporte Técnico", desc: "Assistência técnica contínua, manutenção preventiva e suporte remoto." },
          ],
        },
        commercial: {
          title: "Soluções Comerciais",
          services: [
            { name: "Consultoria IT", desc: "Análise e planeamento de infraestruturas tecnológicas empresariais." },
            { name: "Rede e Wi-Fi", desc: "Redes empresariais de alta performance e cobertura Wi-Fi profissional." },
            { name: "Soluções AV", desc: "Equipamentos audiovisuais para salas de reuniões, espaços corporativos, auditórios, lojas e restaurantes." },,
            { name: "Automação e Controlo", desc: "Gestão inteligente de iluminação, climatização e acessos no edifício." },
            { name: "Segurança", desc: "Videovigilância, controlo de acessos e sistemas de alarme." },
            { name: "Suporte Técnico", desc: "Manutenção e suporte técnico dedicado ao seu negócio." },
          ],
        },
        marine: {
          title: "Soluções Marítimas",
          services: [
            { name: "Rede & Wi-Fi", desc: "Conectividade estável e segura a bordo, mesmo em alto mar." },
            { name: "Automação e Controlo", desc: "Controlo integrado de sistemas de bordo, iluminação e climatização." },
            { name: "Áudio", desc: "Sistemas de som de alta qualidade para interior e exterior da embarcação." },
            { name: "Home Cinema", desc: "Experiência cinematográfica imersiva adaptada ao ambiente marítimo." },
            { name: "Media Rooms", desc: "Espaços de entretenimento multimédia a bordo." },
            { name: "Segurança", desc: "Sistemas de vigilância e segurança adaptados ao ambiente náutico." },
            { name: "Suporte Técnico", desc: "Assistência técnica especializada para embarcações." },
          ],
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
    wizard: {
      backToSite: "Voltar ao site",
      prev: "Anterior",
      next: "Seguinte",
      submit: "Enviar Pedido",
      submitting: "A enviar...",
      thankYou: "Obrigado!",
      thankYouP1: "O seu pedido de orçamento foi enviado com sucesso.",
      thankYouP2: "Entraremos em contacto brevemente com uma proposta detalhada.",
      backToHome: "Voltar ao Site",
      errorMsg: "Ocorreu um erro. Por favor tente novamente.",
      steps: ["Espaço", "Tipo", "Sistemas", "Cronograma", "Dados", "Resumo"],
      step0: { title: "Qual é o tipo de espaço?", subtitle: "Selecione o tipo de espaço para o seu projeto." },
      step1: { title: "É uma construção nova ou uma renovação?", subtitle: "Indique a natureza do seu projeto." },
      step2: { title: "Que sistemas lhe interessam?", subtitle: "Selecione todos os que pretende." },
      step3: { title: "Quando pretende iniciar o projeto?", subtitle: "Selecione o prazo ideal." },
      step4: { title: "Os seus dados", subtitle: "Para recebermos o seu pedido e enviar-lhe a proposta.", nameLabel: "Nome (opcional)", namePlaceholder: "O seu nome", emailLabel: "Email *", emailPlaceholder: "email@exemplo.com", notesLabel: "Notas adicionais (opcional)", notesPlaceholder: "Detalhes extra sobre o seu projecto..." },
      step5: { title: "Resumo do Planeamento" },
      spaceTypes: { residential: "Residência", marine: "Barco / Iate", commercial: "Espaço Comercial" },
      buildTypes: { "new-build": "Construção Nova", renovation: "Renovação" },
      systems: { "home-automation": "Automação e Controlo", "multiroom-audio": "Áudio Multiroom", "outdoor-audio": "Áudio Exterior", "hi-fi": "Hi‑Fi", "wifi-networking": "Wi‑Fi e Rede", "cctv-security": "CCTV / Segurança", "access-control": "Controlo de Acessos", "home-cinema": "Home Cinema", "lighting-control": "Controlo de Iluminação" },
      timelines: ["Nos próximos 3 meses", "Dentro de 3 a 6 meses", "Sem data definida / Em fase de planeamento"],
      summaryLabels: { spaceType: "Tipo de Espaço", buildType: "Tipo de Projeto", systems: "Sistemas", timeline: "Cronograma", contact: "Contacto", notes: "Notas" },
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
      title1: "Invisible Technology Memorable Experiences",
      title2: "",
      title3: "",
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
          services: [
            { name: "Networks & Wi-Fi", desc: "Robust network infrastructure and full Wi-Fi coverage throughout your home." },
            { name: "Multiroom Audio", desc: "Music in every room, centrally or independently controlled." },
            { name: "Hi-Fi Audio", desc: "High-fidelity audio systems for the most demanding audiophiles." },
            { name: "Automation & Control", desc: "Centralised control of lighting, climate, blinds and more." },
            { name: "Home Cinema", desc: "Private cinema rooms with projection, immersive sound and optimised acoustics." },
            { name: "Media Rooms", desc: "Versatile multimedia spaces for entertainment and family gatherings." },
            { name: "Security", desc: "Video surveillance, alarms and remote monitoring systems." },
            { name: "Technical Support", desc: "Ongoing technical assistance, preventive maintenance and remote support." },
          ],
        },
        commercial: {
          title: "Commercial Solutions",
          services: [
            { name: "IT Consulting", desc: "Analysis and planning of enterprise technology infrastructure." },
            { name: "Network Infrastructure", desc: "High-performance enterprise networks and professional Wi-Fi coverage." },
            { name: "AV Solutions", desc: "Audiovisual equipment for meeting rooms, corporate spaces, auditoriums, retail stores, and restaurants." },,
            { name: "Automation & Control", desc: "Intelligent management of lighting, climate and building access." },
            { name: "Security", desc: "Video surveillance, access control and alarm systems." },
            { name: "Technical Support", desc: "Dedicated maintenance and technical support for your business." },
          ],
        },
        marine: {
          title: "Marine Solutions",
          services: [
            { name: "Networks & Wi-Fi", desc: "Stable and secure connectivity on board, even at sea." },
            { name: "Automation & Control", desc: "Integrated control of onboard systems, lighting and climate." },
            { name: "Audio", desc: "High-quality sound systems for interior and exterior areas." },
            { name: "Home Cinema", desc: "Immersive cinematic experience adapted to the marine environment." },
            { name: "Media Rooms", desc: "Onboard multimedia entertainment spaces." },
            { name: "Security", desc: "Surveillance and security systems adapted to the nautical environment." },
            { name: "Technical Support", desc: "Specialised technical assistance for vessels." },
          ],
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
    wizard: {
      backToSite: "Back to site",
      prev: "Previous",
      next: "Next",
      submit: "Submit Request",
      submitting: "Submitting...",
      thankYou: "Thank You!",
      thankYouP1: "Your quote request has been submitted successfully.",
      thankYouP2: "We will get in touch shortly with a detailed proposal.",
      backToHome: "Back to Site",
      errorMsg: "An error occurred. Please try again.",
      steps: ["Space", "Type", "Systems", "Timeline", "Details", "Summary"],
      step0: { title: "What type of space?", subtitle: "Select the type of space for your project." },
      step1: { title: "Is it a new build or a renovation?", subtitle: "Indicate the nature of your project." },
      step2: { title: "Which systems interest you?", subtitle: "Select all that apply." },
      step3: { title: "When do you plan to start?", subtitle: "Select your ideal timeframe." },
      step4: { title: "Your details", subtitle: "So we can receive your request and send you a proposal.", nameLabel: "Name (optional)", namePlaceholder: "Your name", emailLabel: "Email *", emailPlaceholder: "email@example.com", notesLabel: "Additional notes (optional)", notesPlaceholder: "Extra details about your project..." },
      step5: { title: "Planning Summary" },
      spaceTypes: { residential: "Residence", marine: "Boat / Yacht", commercial: "Commercial Space" },
      buildTypes: { "new-build": "New Build", renovation: "Renovation" },
      systems: { "home-automation": "Automation & Control", "multiroom-audio": "Multiroom Audio", "outdoor-audio": "Outdoor Audio", "hi-fi": "Hi‑Fi", "wifi-networking": "Wi‑Fi & Network", "cctv-security": "CCTV / Security", "access-control": "Access Control", "home-cinema": "Home Cinema", "lighting-control": "Lighting Control" },
      timelines: ["Within the next 3 months", "3 to 6 months", "No set date / Planning phase"],
      summaryLabels: { spaceType: "Space Type", buildType: "Project Type", systems: "Systems", timeline: "Timeline", contact: "Contact", notes: "Notes" },
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
