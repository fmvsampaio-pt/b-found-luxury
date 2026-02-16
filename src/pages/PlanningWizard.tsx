import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Home, Music, Wifi, Shield, Lock, Film, Lightbulb, Speaker, Monitor, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-bfound.png";

const ROOMS = [
  { id: "living-room", label: "Sala de Estar", icon: Home },
  { id: "bedrooms", label: "Quartos", icon: Home },
  { id: "kitchen", label: "Cozinha", icon: Home },
  { id: "outdoor", label: "Exterior", icon: Home },
  { id: "cinema-room", label: "Sala de Cinema", icon: Film },
  { id: "office", label: "Escritório", icon: Monitor },
];

const SYSTEMS = [
  { id: "home-automation", label: "Domótica", icon: Home },
  { id: "multiroom-audio", label: "Áudio Multiroom", icon: Music },
  { id: "hi-fi", label: "Hi-Fi", icon: Speaker },
  { id: "wifi-networking", label: "Wi-Fi & Rede", icon: Wifi },
  { id: "cctv-security", label: "CCTV / Segurança", icon: Shield },
  { id: "access-control", label: "Controlo de Acessos", icon: Lock },
  { id: "home-cinema", label: "Home Cinema", icon: Film },
  { id: "lighting-control", label: "Controlo de Iluminação", icon: Lightbulb },
  { id: "outdoor-audio", label: "Áudio Exterior", icon: Speaker },
];

const PROJECT_TYPES = ["Construção Nova", "Renovação", "Upgrade"];
const BUDGETS = ["€5.000 – €20.000", "€20.000 – €50.000", "€50.000+"];
const TIMELINES = ["O mais rápido possível", "1–3 meses", "3–6 meses", "Sem pressa"];

const STEPS = ["Divisões", "Sistemas", "Projecto", "Orçamento", "Cronograma", "Dados", "Resumo"];

type FormData = {
  rooms: string[];
  systems: string[];
  projectType: string;
  budget: string;
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
    rooms: [],
    systems: [],
    projectType: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    notes: "",
  });

  const progress = ((step + 1) / STEPS.length) * 100;

  const toggleItem = (key: "rooms" | "systems", id: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(id) ? prev[key].filter((i) => i !== id) : [...prev[key], id],
    }));
  };

  const canNext = () => {
    switch (step) {
      case 0: return formData.rooms.length > 0;
      case 1: return formData.systems.length > 0;
      case 2: return formData.projectType !== "";
      case 3: return formData.budget !== "";
      case 4: return formData.timeline !== "";
      case 5: return formData.email.trim() !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("planning_submissions").insert({
        email: formData.email.trim(),
        name: formData.name.trim() || null,
        rooms: formData.rooms,
        systems: formData.systems,
        project_type: formData.projectType,
        budget_range: formData.budget,
        timeline: formData.timeline,
        notes: formData.notes.trim() || null,
      });
      if (error) throw error;

      // Try sending email (non-blocking)
      try {
        await supabase.functions.invoke("send-planning-email", {
          body: {
            email: formData.email.trim(),
            name: formData.name.trim(),
            rooms: formData.rooms,
            systems: formData.systems,
            projectType: formData.projectType,
            budget: formData.budget,
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

  const renderStep = () => {
    const variants = { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -30 } };

    switch (step) {
      case 0:
        return (
          <motion.div key="rooms" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Que divisões pretende equipar?</h2>
            <p className="text-muted-foreground mb-8">Selecione todas as que se aplicam.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {ROOMS.map((room) => {
                const Icon = room.icon;
                const selected = formData.rooms.includes(room.id);
                return (
                  <button
                    key={room.id}
                    onClick={() => toggleItem("rooms", room.id)}
                    className={`p-6 rounded-lg border text-left transition-all duration-300 ${
                      selected
                        ? "border-primary bg-primary/10 text-foreground"
                        : "border-border bg-card hover:border-primary/50 text-muted-foreground"
                    }`}
                  >
                    <Icon className={`w-6 h-6 mb-3 ${selected ? "text-primary" : ""}`} />
                    <span className="text-sm font-body tracking-wide">{room.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 1:
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
                    onClick={() => toggleItem("systems", sys.id)}
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
      case 2:
        return (
          <motion.div key="project" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Tipo de projecto</h2>
            <p className="text-muted-foreground mb-8">Qual a natureza do seu projecto?</p>
            <div className="flex flex-col gap-4 max-w-md">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData((p) => ({ ...p, projectType: type }))}
                  className={`p-5 rounded-lg border text-left transition-all duration-300 ${
                    formData.projectType === type
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card hover:border-primary/50 text-muted-foreground"
                  }`}
                >
                  <span className="text-sm font-body tracking-wide">{type}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="budget" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Orçamento estimado</h2>
            <p className="text-muted-foreground mb-8">Qual o intervalo de investimento previsto?</p>
            <div className="flex flex-col gap-4 max-w-md">
              {BUDGETS.map((b) => (
                <button
                  key={b}
                  onClick={() => setFormData((p) => ({ ...p, budget: b }))}
                  className={`p-5 rounded-lg border text-left transition-all duration-300 ${
                    formData.budget === b
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card hover:border-primary/50 text-muted-foreground"
                  }`}
                >
                  <span className="text-sm font-body tracking-wide">{b}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="timeline" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">Quando pretende iniciar?</h2>
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
      case 5:
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
      case 6:
        return (
          <motion.div key="summary" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-8">Resumo do Planeamento</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <SummaryCard title="Divisões" items={formData.rooms.map((r) => ROOMS.find((x) => x.id === r)?.label || r)} />
              <SummaryCard title="Sistemas" items={formData.systems.map((s) => SYSTEMS.find((x) => x.id === s)?.label || s)} />
              <SummaryCard title="Projecto" items={[formData.projectType]} />
              <SummaryCard title="Orçamento" items={[formData.budget]} />
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
      {/* Header */}
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

      {/* Progress */}
      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground tracking-wider uppercase">{STEPS[step]}</span>
          <span className="text-xs text-muted-foreground">{step + 1} / {STEPS.length}</span>
        </div>
        <Progress value={progress} className="h-1 bg-secondary" />
      </div>

      {/* Step Content */}
      <div className="container mx-auto px-6 py-8 md:py-16">
        <AnimatePresence mode="wait">
          {renderStep()}
        </AnimatePresence>
      </div>

      {/* Navigation */}
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
