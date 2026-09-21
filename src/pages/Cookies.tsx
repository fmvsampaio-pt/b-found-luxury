import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import logo from "@/assets/logo-bfound.png";

const content = {
  pt: {
    docTitle: "Política de Cookies · B-Found",
    back: "Voltar ao início",
    title: "Política de Cookies",
    updated: "Última atualização: setembro de 2026",
    manage: "Gerir preferências de cookies",
    tableHead: ["Nome", "Finalidade", "Duração", "Categoria"],
    sections: [
      {
        h: "1. O que são cookies",
        p: "Cookies são pequenos ficheiros de texto guardados no seu dispositivo quando visita um website. Nesta política incluímos também tecnologias equivalentes, como o armazenamento local do navegador (localStorage).",
      },
      {
        h: "2. Como utilizamos cookies",
        p: "O site b-found.pt utiliza um número mínimo de tecnologias de armazenamento. Não utilizamos ferramentas de análise de tráfego nem píxeis publicitários de terceiros. Os tipos de letra são servidos a partir do nosso próprio servidor, pelo que a sua navegação não é comunicada a terceiros.",
      },
      {
        h: "3. Consentimento",
        p: "Só são ativadas tecnologias não essenciais após o seu consentimento explícito. Pode aceitar, rejeitar ou escolher por categoria, e alterar a sua decisão a qualquer momento através do botão abaixo ou do link no rodapé do site. O registo do seu consentimento (data, versão e escolhas) fica guardado no seu próprio navegador.",
      },
      {
        h: "4. Cookies e armazenamento utilizados",
        p: "",
      },
      {
        h: "5. Como bloquear ou eliminar cookies",
        p: "Pode em qualquer momento apagar ou bloquear cookies e o armazenamento local através das definições do seu navegador (Chrome, Safari, Firefox, Edge). Ao bloquear tecnologias essenciais, algumas funcionalidades do site poderão deixar de funcionar corretamente.",
      },
      {
        h: "6. Contacto",
        p: "Para qualquer questão sobre esta política ou sobre o tratamento dos seus dados, contacte-nos para geral@b-found.pt ou +351 210 939 977. Consulte também a nossa Política de Privacidade.",
      },
    ],
    rows: [
      ["bfound_cookie_consent", "Guarda as suas escolhas de consentimento de cookies e a versão da política.", "Persistente (até eliminação)", "Necessário"],
      ["bfound_language", "Memoriza o idioma escolhido (PT/EN).", "Persistente (até eliminação)", "Preferências"],
      ["sb-*-auth-token", "Sessão de autenticação, apenas na área reservada de administração.", "Sessão / até terminar sessão", "Necessário"],
    ],
  },
  en: {
    docTitle: "Cookie Policy · B-Found",
    back: "Back to home",
    title: "Cookie Policy",
    updated: "Last updated: September 2026",
    manage: "Manage cookie preferences",
    tableHead: ["Name", "Purpose", "Duration", "Category"],
    sections: [
      {
        h: "1. What cookies are",
        p: "Cookies are small text files stored on your device when you visit a website. This policy also covers equivalent technologies such as browser local storage.",
      },
      {
        h: "2. How we use cookies",
        p: "b-found.pt uses a minimal number of storage technologies. We do not use traffic analytics tools or third-party advertising pixels. Fonts are served from our own server, so your browsing is not disclosed to third parties.",
      },
      {
        h: "3. Consent",
        p: "Non-essential technologies are only activated after your explicit consent. You can accept, reject or choose by category, and change your decision at any time using the button below or the link in the site footer. The record of your consent (date, version and choices) is stored in your own browser.",
      },
      {
        h: "4. Cookies and storage used",
        p: "",
      },
      {
        h: "5. How to block or delete cookies",
        p: "You can delete or block cookies and local storage at any time through your browser settings (Chrome, Safari, Firefox, Edge). Blocking essential technologies may stop parts of the site from working correctly.",
      },
      {
        h: "6. Contact",
        p: "For any question about this policy or the processing of your data, contact us at geral@b-found.pt or +351 210 939 977. Please also see our Privacy Policy.",
      },
    ],
    rows: [
      ["bfound_cookie_consent", "Stores your cookie consent choices and the policy version.", "Persistent (until deleted)", "Necessary"],
      ["bfound_language", "Remembers your chosen language (PT/EN).", "Persistent (until deleted)", "Preferences"],
      ["sb-*-auth-token", "Authentication session, only in the restricted admin area.", "Session / until sign-out", "Necessary"],
    ],
  },
};

const Cookies = () => {
  const { language } = useLanguage();
  const { openPreferences } = useCookieConsent();
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
          {c.sections.map((s, i) => (
            <section key={s.h}>
              <h2 className="font-display text-xl md:text-2xl mb-3 text-primary">{s.h}</h2>
              {s.p && <p className="text-muted-foreground leading-relaxed">{s.p}</p>}

              {i === 3 && (
                <div className="overflow-x-auto mt-4 border border-border">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-border">
                        {c.tableHead.map((h) => (
                          <th key={h} className="px-3 py-3 font-body uppercase tracking-widest text-primary/80 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {c.rows.map((r) => (
                        <tr key={r[0]} className="border-b border-border/50 last:border-0 align-top">
                          {r.map((cell, ci) => (
                            <td key={ci} className="px-3 py-3 text-muted-foreground">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        <button
          onClick={openPreferences}
          className="mt-12 px-6 py-3 border border-primary/50 text-primary text-xs tracking-[0.2em] uppercase font-body hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
        >
          {c.manage}
        </button>
      </div>
    </main>
  );
};

export default Cookies;
