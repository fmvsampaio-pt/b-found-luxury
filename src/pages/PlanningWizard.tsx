import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Home, Anchor, Building2, Music, Wifi, Shield, Lock, Film, Lightbulb, Speaker, Monitor, Settings, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-bfound.png";

const SPACE_TYPES = [
  { id: "residential", label: "Residência", icon: Home },
  { id: "marine", label: "Barco / Iate", icon: Anchor },
  { id: "commercial", label: "Espaço Comercial", icon: Building2 },
];

const BUILD_TYPES = [
  { id: "new-build", label: "Construção Nova" },
  { id: "renovation", label: "Renovação" },
];

const SYSTEMS = [
  { id: "home-automation", label: "Automação e Controlo", icon: Settings },
  { id: "multiroom-audio", label: "Áudio Multiroom", icon: Music },
  { id: "outdoor-audio", label: "Áudio Exterior", icon: Speaker },
  { id: "hi-fi", label: "Hi‑Fi", icon: Speaker },
  { id: "wifi-networking", label: "Wi‑Fi e Rede", icon: Wifi },
  { id: "cctv-security", label: "CCTV / Segurança", icon: Shield },
  { id: "access-control", label: "Controlo de Acessos", icon: Lock },
  { id: "home-cinema", label: "Home Cinema", icon: Film },
  { id: "lighting-control", label: "Controlo de Iluminação", icon: Lightbulb },
];

const TIMELINES = [
  "Nos próximos 3 meses",
  "Dentro de 3 a 6 meses",
  "Sem data definida / Em fase de planeamento",
];

const STEPS = ["Espaço", "Tipo", "Sistemas", "Cronograma", "Dados", "Resumo"];

type FormData = {
  spaceType: string;
  buildType: string;
  systems: string[];
  timeline: string;
  name: string;
  email: string;
  notes: string;
};

const PlanningWizard = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    spaceType: "",
    buildType: "",
    systems: [],
    timeline: "",
    name: "",
    email: "",
    notes: "",
  });

  const progress = ((step + 1) / STEPS.length) * 100;

  const toggleSystem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      systems: prev.systems.includes(id)
        ? prev.systems.filter((i) => i !== id)
        : [...prev.systems, id],
    }));
  };

  const canNext = () => {
    switch (step) {
      case 0: return formData.spaceType !== "";
      case 1: return formData.buildType !== "";
      case 2: return formData.systems.length > 0;
      case 3: return formData.timeline !== "";
      case 4: return formData.email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("planning_submissions").insert({
        email: formData.email.trim(),
        name: formData.name.trim() || null,
        rooms: [formData.spaceType, formData.buildType],
        systems: formData.systems,
        project_type: `${SPACE_TYPES.find(s => s.id === formData.spaceType)?.label || formData.spaceType} – ${BUILD_TYPES.find(b => b.id === formData.buildType)?.label || formData.buildType}`,
        budget_range: "N/A",
        timeline: formData.timeline,
        notes: formData.notes.trim() || null,
      });
      if (error) throw error;

      try {
        await supabase.functions.invoke("send-planning-email", {
          body: {
            email: formData.email.trim(),
            name: formData.name.trim(),
            rooms: [formData.spaceType, formData.buildType],
            systems: formData.systems,
            projectType: `${SPACE_TYPES.find(s => s.id === formData.spaceType)?.label} – ${BUILD_TYPES.find(b => b.id === formData.buildType)?.label}`,
            budget: "N/A",
            timeline: formData.timeline,
            notes: formData.notes.trim(),
          },
        });
      } catch {}

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Ocorreu um erro. Por favor tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg">
          <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-8">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h1 className="font-display text-4xl mb-4">Obrigado!</h1>
          <p className="text-muted-foreground mb-2">O seu pedido de orçamento foi enviado com sucesso.</p>
          <p className="text-muted-foreground mb-8">Entraremos em contacto brevemente com uma proposta detalhada.</p>
          <Button onClick={() => navigate("/")} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Voltar ao Site
          </Button>
        </motion.div>
      </div>
    );
  }

  const variants = { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 } };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <motion.div key="space" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Qual é o tipo de espaço?</h2>
            <p className="text-muted-foreground mb-8">Selecione o tipo de espaço para o seu projeto.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
              {SPACE_TYPES.map((type) => {
                const Icon = type.icon;
                const selected = formData.spaceType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setFormData((p) => ({ ...p, spaceType: type.id }))}
                    className={`p-8 rounded-lg border text-center transition-all duration-300 ${
                      selected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card hover:border-primary/50 text-muted-foreground"
                    }`}
                  >
                    <Icon className={`w-8 h-8 mb-4 mx-auto ${selected ? "text-primary" : ""}`} />
                    <span className="text-sm font-body tracking-wide">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div key="build" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">É uma construção nova ou uma renovação?</h2>
            <p className="text-muted-foreground mb-8">Indique a natureza do seu projeto.</p>
            <div className="flex flex-col gap-4 max-w-md">
              {BUILD_TYPES.map((type) => {
                const selected = formData.buildType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => setFormData((p) => ({ ...p, buildType: type.id }))}
                    className={`p-5 rounded-lg border text-left transition-all duration-300 ${
                      selected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card hover:border-primary/50 text-muted-foreground"
                    }`}
                  >
                    <span className="text-sm font-body tracking-wide">{type.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="systems" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Que sistemas lhe interessam?</h2>
            <p className="text-muted-foreground mb-8">Selecione todos os que pretende.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SYSTEMS.map((sys) => {
                const Icon = sys.icon;
                const selected = formData.systems.includes(sys.id);
                return (
                  <button
                    key={sys.id}
                    onClick={() => toggleSystem(sys.id)}
                    className={`p-6 rounded-lg border text-left transition-all duration-300 ${
                      selected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card hover:border-primary/50 text-muted-foreground"
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-3 ${selected ? "text-primary" : ""}`} />
                    <span className="text-sm font-body tracking-wide">{sys.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="timeline" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Quando pretende iniciar o projeto?</h2>
            <p className="text-muted-foreground mb-8">Selecione o prazo ideal.</p>
            <div className="flex flex-col gap-4 max-w-md">
              {TIMELINES.map((t) => (
                <button
                  key={t}
                  onClick={() => setFormData((p) => ({ ...p, timeline: t }))}
                  className={`p-5 rounded-lg border text-left transition-all duration-300 ${
                    formData.timeline === t
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card hover:border-primary/50 text-muted-foreground"
                  }`}
                >
                  <span className="text-sm font-body tracking-wide">{t}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="contact" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Os seus dados</h2>
            <p className="text-muted-foreground mb-8">Para recebermos o seu pedido e enviar-lhe a proposta.</p>
            <div className="flex flex-col gap-5 max-w-md">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Nome (opcional)</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="O seu nome"
                  className="bg-card border-border"
                  maxLength={100}
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Email *</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="email@exemplo.com"
                  className="bg-card border-border"
                  maxLength={255}
                  required
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Notas adicionais (opcional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))}
                  placeholder="Detalhes extra sobre o seu projecto..."
                  className="flex w-full rounded-md border border-border bg-card px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px] md:text-sm"
                  maxLength={1000}
                />
              </div>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="summary" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Resumo do Planeamento</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <SummaryCard title="Tipo de Espaço" items={[SPACE_TYPES.find((x) => x.id === formData.spaceType)?.label || formData.spaceType]} />
              <SummaryCard title="Tipo de Projeto" items={[BUILD_TYPES.find((x) => x.id === formData.buildType)?.label || formData.buildType]} />
              <SummaryCard title="Sistemas" items={formData.systems.map((s) => SYSTEMS.find((x) => x.id === s)?.label || s)} />
              <SummaryCard title="Cronograma" items={[formData.timeline]} />
              <SummaryCard title="Contacto" items={[formData.name || "—", formData.email]} />
              {formData.notes && <SummaryCard title="Notas" items={[formData.notes]} />}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center">
            <img src={logo} alt="B-Found" className="h-10 w-auto" />
          </a>
          <button onClick={() => navigate("/")} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
            <ChevronLeft className="w-4 h-4" /> Voltar ao site
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground tracking-wider uppercase">{STEPS[step]}</span>
          <span className="text-xs text-muted-foreground">{step + 1} / {STEPS.length}</span>
        </div>
        <Progress value={progress} className="h-1 bg-secondary" />
      </div>

      <div className="container mx-auto px-6 py-8 md:py-16">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between">
          <Button
            variant="ghost"
            onClick={() => setStep((s) => s - 1)}
            disabled={step === 0}
            className="text-muted-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Anterior
          </Button>

          {step < STEPS.length - 1 ? (
            <Button
              onClick={() => setStep((s) => s + 1)}
              disabled={!canNext()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Seguinte <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {submitting ? "A enviar..." : "Enviar Pedido"} <Check className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ title, items }: { title: string; items: string[] }) => (
  <div className="p-5 rounded-lg border border-border bg-card">
    <h3 className="text-xs tracking-[0.2em] uppercase text-primary mb-3 font-body">{title}</h3>
    {items.map((item, i) => (
      <p key={i} className="text-sm text-foreground">{item}</p>
    ))}
  </div>
);

export default PlanningWizard;
