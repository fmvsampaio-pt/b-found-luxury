import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAILS = ["fvs@b-found.pt", "geral@b-found.pt"];

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, name, rooms, systems, projectType, budget, timeline, notes } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: "Email required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const summaryHtml = `
      <h2 style="color:#C49A6C;">Resumo do Planeamento</h2>
      <p><strong>Nome:</strong> ${name || "—"}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Tipo de Projecto:</strong> ${projectType}</p>
      <p><strong>Sistemas:</strong> ${(systems || []).join(", ")}</p>
      <p><strong>Cronograma:</strong> ${timeline}</p>
      ${notes ? `<p><strong>Notas:</strong> ${notes}</p>` : ""}
    `;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY not configured");
      return new Response(JSON.stringify({ error: "Email service not configured" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Email to client
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "B-Found <noreply@b-found.pt>",
        to: [email],
        subject: "O seu planeamento de casa inteligente – B-Found",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0B0B0C;color:#fff;padding:40px;">
            <h1 style="color:#C49A6C;">Obrigado, ${name || ""}!</h1>
            <p>Recebemos o seu pedido de orçamento. Abaixo encontra o resumo das suas selecções:</p>
            ${summaryHtml}
            <hr style="border-color:#222;margin:20px 0;" />
            <p style="color:#8A8F9A;font-size:14px;">Entraremos em contacto brevemente com uma proposta detalhada.</p>
            <p style="color:#C49A6C;">— Equipa B-Found</p>
          </div>
        `,
      }),
    });

    // Email to admin (both addresses)
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "B-Found System <noreply@b-found.pt>",
        to: ADMIN_EMAILS,
        subject: `Novo pedido de planeamento – ${name || email}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;">
            <h1>Novo Pedido de Planeamento</h1>
            ${summaryHtml}
            <hr style="border-color:#ddd;margin:20px 0;" />
            <p style="font-size:14px;color:#666;">Responder directamente para: <a href="mailto:${email}">${email}</a></p>
          </div>
        `,
      }),
    });

    return new Response(JSON.stringify({ success: true }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("Error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});
