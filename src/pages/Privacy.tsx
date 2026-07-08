import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-bfound.png";

const content = {
  pt: {
    docTitle: "Política de Privacidade · B-Found",
    back: "Voltar ao início",
    title: "Política de Privacidade",
    updated: "Última atualização: julho de 2026",
    sections: [
      {
        h: "1. Responsável pelo tratamento",
        p: "A B-Found, com sede na Av. Amália Rodrigues 36B, 2650-437 Amadora, Portugal, é a entidade responsável pelo tratamento dos dados pessoais recolhidos através deste website. Contacto: geral@b-found.pt · +351 210 939 977.",
      },
      {
        h: "2. Dados que recolhemos",
        p: "Recolhemos apenas os dados que nos fornece voluntariamente através do formulário de planeamento e contacto: nome (opcional), email, tipo de espaço, sistemas de interesse, prazo previsto e notas adicionais. Não recolhemos dados sensíveis.",
      },
      {
        h: "3. Finalidade e base legal",
        p: "Os dados são utilizados exclusivamente para responder ao seu pedido de orçamento ou contacto, com base no seu consentimento e no interesse legítimo de dar seguimento a um pedido comercial (artigo 6.º do RGPD).",
      },
      {
        h: "4. Prazo de conservação",
        p: "Os dados são conservados durante o período necessário para responder ao pedido e, se aplicável, para a execução do contrato. Pedidos sem seguimento são eliminados no prazo máximo de 24 meses.",
      },
      {
        h: "5. Partilha com terceiros",
        p: "Não vendemos nem cedemos dados a terceiros. Os dados são processados por fornecedores tecnológicos que atuam como subcontratantes (alojamento cloud, envio de email transacional) sob acordo de tratamento de dados.",
      },
      {
        h: "6. Cookies",
        p: "Utilizamos cookies estritamente necessários ao funcionamento do site e, mediante o seu consentimento, cookies analíticos. Pode gerir as suas preferências a qualquer momento no rodapé do site.",
      },
      {
        h: "7. Os seus direitos",
        p: "Nos termos do RGPD, tem direito a aceder, retificar, apagar, limitar, opor-se ao tratamento e à portabilidade dos seus dados. Para exercer estes direitos contacte-nos por email para geral@b-found.pt. Tem ainda o direito de apresentar reclamação junto da CNPD (www.cnpd.pt).",
      },
      {
        h: "8. Segurança",
        p: "Adotamos medidas técnicas e organizativas adequadas para proteger os seus dados contra acesso não autorizado, perda ou destruição, incluindo cifra em trânsito, controlo de acessos e auditorias regulares.",
      },
    ],
  },
  en: {
    docTitle: "Privacy Policy · B-Found",
    back: "Back to home",
    title: "Privacy Policy",
    updated: "Last updated: July 2026",
    sections: [
      {
        h: "1. Data controller",
        p: "B-Found, based at Av. Amália Rodrigues 36B, 2650-437 Amadora, Portugal, is the entity responsible for processing personal data collected through this website. Contact: geral@b-found.pt · +351 210 939 977.",
      },
      {
        h: "2. Data we collect",
        p: "We only collect data you voluntarily provide through the planning and contact form: name (optional), email, space type, systems of interest, timeframe and additional notes. We do not collect sensitive data.",
      },
      {
        h: "3. Purpose and legal basis",
        p: "Data is used exclusively to respond to your quote or contact request, based on your consent and the legitimate interest of following up on a commercial request (Article 6 of the GDPR).",
      },
      {
        h: "4. Retention period",
        p: "Data is kept for the period necessary to answer the request and, where applicable, execute the contract. Requests without follow-up are deleted within a maximum of 24 months.",
      },
      {
        h: "5. Sharing with third parties",
        p: "We do not sell or share your data with third parties. Data is processed by technology providers acting as subprocessors (cloud hosting, transactional email) under a data processing agreement.",
      },
      {
        h: "6. Cookies",
        p: "We use strictly necessary cookies and, with your consent, analytics cookies. You can manage your preferences at any time from the site footer.",
      },
      {
        h: "7. Your rights",
        p: "Under the GDPR you have the right to access, rectify, erase, restrict, object to the processing and receive portability of your data. To exercise these rights email us at geral@b-found.pt. You may also lodge a complaint with the Portuguese Data Protection Authority (www.cnpd.pt).",
      },
      {
        h: "8. Security",
        p: "We implement appropriate technical and organisational measures to protect your data against unauthorised access, loss or destruction, including encryption in transit, access control and regular audits.",
      },
    ],
  },
};

const Privacy = () => {
  const { language } = useLanguage();
  const c = content[language];

  useEffect(() => {
    document.title = c.docTitle;
  }, [c.docTitle]);

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-16 md:py-24 max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {c.back}
        </Link>

        <img src={logo} alt="B-Found" className="h-10 w-auto mb-10 opacity-90" />

        <h1 className="font-display text-4xl md:text-5xl mb-3">{c.title}</h1>
        <p className="text-xs tracking-widest uppercase text-muted-foreground mb-12">
          {c.updated}
        </p>

        <div className="space-y-10">
          {c.sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-display text-xl md:text-2xl mb-3 text-primary">
                {s.h}
              </h2>
              <p className="text-muted-foreground leading-relaxed">{s.p}</p>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Privacy;
