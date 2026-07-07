import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-bfound.png";

const content = {
  pt: {
    docTitle: "Termos e Condições · B-Found",
    back: "Voltar ao início",
    title: "Termos e Condições",
    updated: "Última atualização: julho de 2026",
    sections: [
      {
        h: "1. Objeto",
        p: "Os presentes termos regem a utilização do website b-found.pt, propriedade da B-Found, e o pedido de informação ou orçamento através do formulário de planeamento disponibilizado.",
      },
      {
        h: "2. Utilização do website",
        p: "O utilizador compromete-se a fazer uso lícito do site, abstendo-se de qualquer conduta que possa danificar a imagem, interesses ou direitos da B-Found ou de terceiros.",
      },
      {
        h: "3. Pedidos de orçamento",
        p: "Os pedidos submetidos através do formulário não constituem contrato. Após receção, a B-Found entrará em contacto para clarificar requisitos e apresentar uma proposta formal, sujeita a aceitação escrita de ambas as partes.",
      },
      {
        h: "4. Propriedade intelectual",
        p: "Todos os conteúdos do site (textos, imagens, logótipos, gráficos, código) são propriedade da B-Found ou dos seus licenciantes e encontram-se protegidos por legislação nacional e internacional de propriedade intelectual. É proibida a reprodução sem autorização escrita.",
      },
      {
        h: "5. Limitação de responsabilidade",
        p: "A B-Found envida os melhores esforços para manter a informação do site atualizada e correta, mas não garante a ausência de erros ou interrupções. Não é responsável por danos indiretos decorrentes do uso do site.",
      },
      {
        h: "6. Ligações externas",
        p: "O site pode conter ligações para páginas de terceiros. A B-Found não é responsável pelo conteúdo ou práticas de privacidade desses sites.",
      },
      {
        h: "7. Lei aplicável e foro",
        p: "Os presentes termos regem-se pela lei portuguesa. Para a resolução de qualquer litígio, as partes elegem o foro do Tribunal da Comarca de Lisboa, com renúncia expressa a qualquer outro.",
      },
      {
        h: "8. Contacto",
        p: "Para qualquer questão sobre estes termos, contacte-nos por email para geral@b-found.pt ou por telefone +351 210 939 977.",
      },
    ],
  },
  en: {
    docTitle: "Terms & Conditions · B-Found",
    back: "Back to home",
    title: "Terms & Conditions",
    updated: "Last updated: July 2026",
    sections: [
      {
        h: "1. Purpose",
        p: "These terms govern the use of b-found.pt, owned by B-Found, and any request for information or quote submitted through the planning form.",
      },
      {
        h: "2. Use of the website",
        p: "The user agrees to use the site lawfully, refraining from any conduct that could harm the image, interests or rights of B-Found or third parties.",
      },
      {
        h: "3. Quote requests",
        p: "Requests submitted through the form do not constitute a contract. Upon receipt, B-Found will get in touch to clarify requirements and present a formal proposal, subject to written acceptance by both parties.",
      },
      {
        h: "4. Intellectual property",
        p: "All content on the site (text, images, logos, graphics, code) is the property of B-Found or its licensors and is protected under national and international intellectual property law. Reproduction without written authorisation is prohibited.",
      },
      {
        h: "5. Limitation of liability",
        p: "B-Found makes every effort to keep the information on the site up to date and accurate but does not guarantee the absence of errors or interruptions. It is not liable for indirect damages arising from the use of the site.",
      },
      {
        h: "6. External links",
        p: "The site may contain links to third-party pages. B-Found is not responsible for the content or privacy practices of those sites.",
      },
      {
        h: "7. Governing law and jurisdiction",
        p: "These terms are governed by Portuguese law. For the resolution of any dispute, the parties elect the Court of Lisbon, expressly waiving any other jurisdiction.",
      },
      {
        h: "8. Contact",
        p: "For any question regarding these terms, contact us at geral@b-found.pt or +351 210 939 977.",
      },
    ],
  },
};

const Terms = () => {
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

export default Terms;
