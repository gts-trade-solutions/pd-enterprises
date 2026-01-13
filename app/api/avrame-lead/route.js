import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const resend = new Resend(process.env.RESEND_API_KEY);

function bad(msg, code = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status: code });
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) return bad("Invalid JSON");

    const source = String(body.source || "avrame-page");
    const model_name = String(body.model_name || "").trim();
    const customerEmail = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    const message = String(body.message || "").trim();

    if (!model_name) return bad("Model name required");
    if (!customerEmail) return bad("Email required");
    if (!phone) return bad("Phone required");
    if (!message) return bad("Message required");

    const mailFrom = process.env.MAIL_FROM || "PD Enterprise <info@pdenterprise.co.za>";
    const mailTo = process.env.MAIL_TO || "info@pdenterprise.co.za";

    // ✅ 1) Save to DB
    const { error: dbErr } = await supabaseAdmin.from("avrame_leads").insert([
      {
        source,
        model_name,
        email: customerEmail,
        phone,
        message,
        user_agent: req.headers.get("user-agent") || null,
        ip:
          req.headers.get("x-forwarded-for") ||
          req.headers.get("x-real-ip") ||
          null,
      },
    ]);

    if (dbErr) return bad(dbErr.message, 500);

    // ✅ 2) Send internal notification to PD Enterprise
    const subjectAdmin = `Avrame Lead: ${model_name}`;
    const htmlAdmin = `
      <h2>New customization request</h2>
      <p><b>Model:</b> ${escapeHtml(model_name)}</p>
      <p><b>Customer Email:</b> ${escapeHtml(customerEmail)}</p>
      <p><b>Phone:</b> ${escapeHtml(phone)}</p>
      <p><b>Description:</b><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      <hr/>
      <p><b>Source:</b> ${escapeHtml(source)}</p>
      <p><b>Time:</b> ${new Date().toISOString()}</p>
    `;

    await resend.emails.send({
      from: mailFrom,          // ✅ FROM info@pdenterprise.co.za
      to: mailTo,              // ✅ TO info@pdenterprise.co.za
      subject: subjectAdmin,
      html: htmlAdmin,
      replyTo: customerEmail,  // ✅ when you hit reply, it goes to customer
    });

    // ✅ 3) Send confirmation email to customer
    const subjectCustomer = `We received your request — ${model_name}`;
    const htmlCustomer = `
      <p>Hi,</p>
      <p>Thanks for contacting <b>PD Enterprise</b>. We received your customization request for:</p>
      <p><b>${escapeHtml(model_name)}</b></p>
      <p><b>Your message:</b><br/>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      <br/>
      <p>We’ll contact you shortly.</p>
      <p>Regards,<br/>PD Enterprise</p>
    `;

    await resend.emails.send({
      from: mailFrom,             // ✅ FROM info@pdenterprise.co.za
      to: customerEmail,          // ✅ TO customer email
      subject: subjectCustomer,
      html: htmlCustomer,
      replyTo: mailTo,            // ✅ customer reply goes to info@
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return bad(e?.message || "Server error", 500);
  }
}
