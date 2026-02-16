import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { LogOut, Eye, X } from "lucide-react";
import logo from "@/assets/logo-bfound.png";
import type { Tables } from "@/integrations/supabase/types";

type Submission = Tables<"planning_submissions">;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Submission | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate("/admin/login"); return; }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id);
      if (!roles?.some((r) => r.role === "admin")) { navigate("/admin/login"); return; }

      const { data } = await supabase.from("planning_submissions").select("*").order("created_at", { ascending: false });
      setSubmissions(data || []);
      setLoading(false);
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">A carregar...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <img src={logo} alt="B-Found" className="h-10 w-auto" />
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground tracking-wider uppercase">Admin</span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        <h1 className="font-display text-3xl mb-2">Submissões</h1>
        <p className="text-muted-foreground mb-8">{submissions.length} pedido(s) de orçamento</p>

        {submissions.length === 0 ? (
          <p className="text-muted-foreground">Ainda não existem submissões.</p>
        ) : (
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome / Email</TableHead>
                  <TableHead>Divisões</TableHead>
                  <TableHead>Sistemas</TableHead>
                  <TableHead>Orçamento</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div className="text-sm">{s.name || "—"}</div>
                      <div className="text-xs text-muted-foreground">{s.email}</div>
                    </TableCell>
                    <TableCell className="text-sm">{s.rooms.length} divisão(ões)</TableCell>
                    <TableCell className="text-sm">{s.systems.length} sistema(s)</TableCell>
                    <TableCell className="text-sm">{s.budget_range}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(s.created_at).toLocaleDateString("pt-PT")}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setSelected(s)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelected(null)}>
          <div className="bg-card border border-border rounded-lg max-w-lg w-full p-8 max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <h2 className="font-display text-2xl">Detalhes</h2>
              <button onClick={() => setSelected(null)}><X className="w-5 h-5 text-muted-foreground" /></button>
            </div>
            <div className="space-y-4 text-sm">
              <Detail label="Nome" value={selected.name || "—"} />
              <Detail label="Email" value={selected.email} />
              <Detail label="Divisões" value={selected.rooms.join(", ")} />
              <Detail label="Sistemas" value={selected.systems.join(", ")} />
              <Detail label="Tipo de Projecto" value={selected.project_type} />
              <Detail label="Orçamento" value={selected.budget_range} />
              <Detail label="Cronograma" value={selected.timeline} />
              <Detail label="Notas" value={selected.notes || "—"} />
              <Detail label="Data" value={new Date(selected.created_at).toLocaleString("pt-PT")} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }: { label: string; value: string }) => (
  <div>
    <span className="text-xs tracking-[0.15em] uppercase text-primary block mb-1">{label}</span>
    <span className="text-foreground">{value}</span>
  </div>
);

export default AdminDashboard;
