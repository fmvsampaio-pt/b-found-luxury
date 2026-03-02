import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Home, Anchor, Building2, Music, Wifi, Shield, Lock, Film, Lightbulb, Speaker, Settings, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "@/assets/logo-bfound.png";

const SPACE_TYPE_IDS = ["residential", "marine", "commercial"] as const;
const SPACE_TYPE_ICONS = { residential: Home, marine: Anchor, commercial: Building2 };
const BUILD_TYPE_IDS = ["new-build", "renovation"] as const;

const SYSTEM_IDS = [
  "home-automation", "multiroom-audio", "outdoor-audio", "hi-fi",
  "wifi-networking", "cctv-security", "access-control", "home-cinema", "lighting-control",
] as const;
const SYSTEM_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  "home-automation": Settings, "multiroom-audio": Music, "outdoor-audio": Speaker,
  "hi-fi": Speaker, "wifi-networking": Wifi, "cctv-security": Shield,
  "access-control": Lock, "home-cinema": Film, "lighting-control": Lightbulb,
};

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
  const { t } = useLanguage();
  const w = t.wizard;
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    spaceType: "", buildType: "", systems: [], timeline: "", name: "", email: "", notes: "",
  });

  const progress = ((step + 1) / w.steps.length) * 100;

  const toggleSystem = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      systems: prev.systems.includes(id) ? prev.systems.filter((i) => i !== id) : [...prev.systems, id],
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

  const getSpaceLabel = (id: string) => (w.spaceTypes as Record<string, string>)[id] || id;
  const getBuildLabel = (id: string) => (w.buildTypes as Record<string, string>)[id] || id;
  const getSystemLabel = (id: string) => (w.systems as Record<string, string>)[id] || id;

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await supabase.from("planning_submissions").insert({
        email: formData.email.trim(),
        name: formData.name.trim() || null,
        rooms: [formData.spaceType, formData.buildType],
        systems: formData.systems,
        project_type: `${getSpaceLabel(formData.spaceType)} – ${getBuildLabel(formData.buildType)}`,
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
            projectType: `${getSpaceLabel(formData.spaceType)} – ${getBuildLabel(formData.buildType)}`,
            budget: "N/A",
            timeline: formData.timeline,
            notes: formData.notes.trim(),
          },
        });
      } catch {}

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert(w.errorMsg);
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
          <h1 className="font-display text-4xl mb-4">{w.thankYou}</h1>
          <p className="text-muted-foreground mb-2">{w.thankYouP1}</p>
          <p className="text-muted-foreground mb-8">{w.thankYouP2}</p>
          <Button onClick={() => navigate("/")} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            {w.backToHome}
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
            <h2 className="font-display text-3xl md:text-4xl mb-2">{w.step0.title}</h2>
            <p className="text-muted-foreground mb-8">{w.step0.subtitle}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl">
              {SPACE_TYPE_IDS.map((id) => {
                const Icon = SPACE_TYPE_ICONS[id];
                const selected = formData.spaceType === id;
                return (
                  <button key={id} onClick={() => setFormData((p) => ({ ...p, spaceType: id }))}
                    className={`p-8 rounded-lg border text-center transition-all duration-300 ${selected ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:border-primary/50 text-muted-foreground"}`}>
                    <Icon className={`w-8 h-8 mb-4 mx-auto ${selected ? "text-primary" : ""}`} />
                    <span className="text-sm font-body tracking-wide">{getSpaceLabel(id)}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 1:
        return (
          <motion.div key="build" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">{w.step1.title}</h2>
            <p className="text-muted-foreground mb-8">{w.step1.subtitle}</p>
            <div className="flex flex-col gap-4 max-w-md">
              {BUILD_TYPE_IDS.map((id) => {
                const selected = formData.buildType === id;
                return (
                  <button key={id} onClick={() => setFormData((p) => ({ ...p, buildType: id }))}
                    className={`p-5 rounded-lg border text-left transition-all duration-300 ${selected ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:border-primary/50 text-muted-foreground"}`}>
                    <span className="text-sm font-body tracking-wide">{getBuildLabel(id)}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="systems" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">{w.step2.title}</h2>
            <p className="text-muted-foreground mb-8">{w.step2.subtitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {SYSTEM_IDS.map((id) => {
                const Icon = SYSTEM_ICONS[id];
                const selected = formData.systems.includes(id);
                return (
                  <button key={id} onClick={() => toggleSystem(id)}
                    className={`p-6 rounded-lg border text-left transition-all duration-300 ${selected ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:border-primary/50 text-muted-foreground"}`}>
                    <Icon className={`w-6 h-6 mb-3 ${selected ? "text-primary" : ""}`} />
                    <span className="text-sm font-body tracking-wide">{getSystemLabel(id)}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="timeline" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">{w.step3.title}</h2>
            <p className="text-muted-foreground mb-8">{w.step3.subtitle}</p>
            <div className="flex flex-col gap-4 max-w-md">
              {w.timelines.map((t) => (
                <button key={t} onClick={() => setFormData((p) => ({ ...p, timeline: t }))}
                  className={`p-5 rounded-lg border text-left transition-all duration-300 ${formData.timeline === t ? "border-primary bg-primary/10 text-foreground" : "border-border bg-card hover:border-primary/50 text-muted-foreground"}`}>
                  <span className="text-sm font-body tracking-wide">{t}</span>
                </button>
              ))}
            </div>
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="contact" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-2">{w.step4.title}</h2>
            <p className="text-muted-foreground mb-8">{w.step4.subtitle}</p>
            <div className="flex flex-col gap-5 max-w-md">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">{w.step4.nameLabel}</label>
                <Input value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} placeholder={w.step4.namePlaceholder} className="bg-card border-border" maxLength={100} />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">{w.step4.emailLabel}</label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} placeholder={w.step4.emailPlaceholder} className="bg-card border-border" maxLength={255} required />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">{w.step4.notesLabel}</label>
                <textarea value={formData.notes} onChange={(e) => setFormData((p) => ({ ...p, notes: e.target.value }))} placeholder={w.step4.notesPlaceholder}
                  className="flex w-full rounded-md border border-border bg-card px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px] md:text-sm" maxLength={1000} />
              </div>
            </div>
          </motion.div>
        );
      case 5:
        return (
          <motion.div key="summary" {...variants}>
            <h2 className="font-display text-3xl md:text-4xl mb-8">{w.step5.title}</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl">
              <SummaryCard title={w.summaryLabels.spaceType} items={[getSpaceLabel(formData.spaceType)]} />
              <SummaryCard title={w.summaryLabels.buildType} items={[getBuildLabel(formData.buildType)]} />
              <SummaryCard title={w.summaryLabels.systems} items={formData.systems.map(getSystemLabel)} />
              <SummaryCard title={w.summaryLabels.timeline} items={[formData.timeline]} />
              <SummaryCard title={w.summaryLabels.contact} items={[formData.name || "—", formData.email]} />
              {formData.notes && <SummaryCard title={w.summaryLabels.notes} items={[formData.notes]} />}
            </div>
          </motion.div>
        );
      default: return null;
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
            <ChevronLeft className="w-4 h-4" /> {w.backToSite}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-muted-foreground tracking-wider uppercase">{w.steps[step]}</span>
          <span className="text-xs text-muted-foreground">{step + 1} / {w.steps.length}</span>
        </div>
        <Progress value={progress} className="h-1 bg-secondary" />
      </div>

      <div className="container mx-auto px-6 py-8 md:py-16">
        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4 flex justify-between">
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="text-muted-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" /> {w.prev}
          </Button>
          {step < w.steps.length - 1 ? (
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {w.next} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={submitting} className="bg-primary text-primary-foreground hover:bg-primary/90">
              {submitting ? w.submitting : w.submit} <Check className="w-4 h-4 ml-2" />
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
