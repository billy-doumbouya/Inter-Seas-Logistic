import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

/**
 * Send quote confirmation to client
 */
export async function sendQuoteConfirmation(quote) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; }
        .header { background: #0A2D5E; padding: 32px; text-align: center; }
        .header h1 { color: #fff; margin: 0; font-size: 22px; }
        .header p { color: #94A3B8; margin: 8px 0 0; font-size: 14px; }
        .body { padding: 32px; }
        .body h2 { color: #0A2D5E; font-size: 18px; margin-top: 0; }
        .detail-row { display: flex; padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
        .detail-label { color: #64748B; width: 160px; font-size: 14px; flex-shrink: 0; }
        .detail-value { color: #1E293B; font-size: 14px; font-weight: 600; }
        .badge { display: inline-block; background: #FEF3C7; color: #92400E; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .footer { background: #f8fafc; padding: 24px 32px; border-top: 1px solid #e2e8f0; }
        .footer p { color: #64748B; font-size: 13px; margin: 0; line-height: 1.6; }
        .accent { color: #C8102E; font-weight: 700; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚢 Inter Seas Logistic</h1>
          <p>Demande de devis reçue — Réf: #${quote.id.slice(-8).toUpperCase()}</p>
        </div>
        <div class="body">
          <h2>Bonjour ${quote.fullName},</h2>
          <p>Nous avons bien reçu votre demande de devis. Notre équipe vous contactera dans les <strong>24 à 48 heures</strong>.</p>
          <br/>
          <h2>Récapitulatif de votre demande</h2>
          <div class="detail-row"><span class="detail-label">Service</span><span class="detail-value">${quote.serviceType}</span></div>
          <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${quote.email}</span></div>
          ${quote.phone ? `<div class="detail-row"><span class="detail-label">Téléphone</span><span class="detail-value">${quote.phone}</span></div>` : ""}
          ${quote.company ? `<div class="detail-row"><span class="detail-label">Entreprise</span><span class="detail-value">${quote.company}</span></div>` : ""}
          ${quote.origin ? `<div class="detail-row"><span class="detail-label">Origine</span><span class="detail-value">${quote.origin}</span></div>` : ""}
          ${quote.destination ? `<div class="detail-row"><span class="detail-label">Destination</span><span class="detail-value">${quote.destination}</span></div>` : ""}
          ${quote.cargoType ? `<div class="detail-row"><span class="detail-label">Type de cargaison</span><span class="detail-value">${quote.cargoType}</span></div>` : ""}
          <div class="detail-row"><span class="detail-label">Statut</span><span class="detail-value"><span class="badge">En attente</span></span></div>
          <br/>
          <p style="color:#64748B; font-size:14px;">Description: <em>${quote.description}</em></p>
        </div>
        <div class="footer">
          <p>
            <span class="accent">Inter Seas Logistic</span> — Logistique, Transport & Consignation Maritime<br/>
            📍 En ville Kaloum, Conakry, Guinée<br/>
            📞 (+224) 664 20 80 80 | ✉️ contact@interseaslogistic.com
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: quote.email,
    subject: `✅ Demande de devis reçue — Inter Seas Logistic #${quote.id.slice(-8).toUpperCase()}`,
    html,
  });
}

/**
 * Send quote notification to admin
 */
export async function sendQuoteToAdmin(quote) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; color: #333; background: #f5f5f5; }
        .container { max-width: 600px; margin: 0 auto; background: #fff; }
        .header { background: #C8102E; padding: 24px 32px; }
        .header h1 { color: #fff; margin: 0; font-size: 18px; }
        .body { padding: 32px; }
        .detail-row { padding: 8px 0; border-bottom: 1px solid #f1f5f9; display: flex; }
        .detail-label { color: #64748B; width: 160px; font-size: 14px; flex-shrink: 0; }
        .detail-value { color: #1E293B; font-size: 14px; font-weight: 600; }
        .link { color: #0A2D5E; font-weight: 700; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 Nouvelle demande de devis — #${quote.id.slice(-8).toUpperCase()}</h1>
        </div>
        <div class="body">
          <div class="detail-row"><span class="detail-label">Nom</span><span class="detail-value">${quote.fullName}</span></div>
          <div class="detail-row"><span class="detail-label">Email</span><span class="detail-value">${quote.email}</span></div>
          <div class="detail-row"><span class="detail-label">Téléphone</span><span class="detail-value">${quote.phone || "—"}</span></div>
          <div class="detail-row"><span class="detail-label">Entreprise</span><span class="detail-value">${quote.company || "—"}</span></div>
          <div class="detail-row"><span class="detail-label">Service</span><span class="detail-value">${quote.serviceType}</span></div>
          <div class="detail-row"><span class="detail-label">Origine</span><span class="detail-value">${quote.origin || "—"}</span></div>
          <div class="detail-row"><span class="detail-label">Destination</span><span class="detail-value">${quote.destination || "—"}</span></div>
          <div class="detail-row"><span class="detail-label">Cargaison</span><span class="detail-value">${quote.cargoType || "—"}</span></div>
          <div class="detail-row"><span class="detail-label">Poids</span><span class="detail-value">${quote.weight || "—"}</span></div>
          <div class="detail-row"><span class="detail-label">Volume</span><span class="detail-value">${quote.volume || "—"}</span></div>
          <br/>
          <p><strong>Description:</strong><br/>${quote.description}</p>
          <br/>
          <p><a class="link" href="${process.env.NEXT_PUBLIC_SITE_URL}/admin/quotes">→ Voir dans le dashboard</a></p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 Nouvelle demande de devis — ${quote.fullName} — ${quote.serviceType}`,
    html,
  });
}

/**
 * Send contact message to admin
 */
export async function sendContactMessage({
  name,
  email,
  phone,
  subject,
  message,
}) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    replyTo: email,
    subject: `📩 Message contact: ${subject} — ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
        <div style="background:#0A2D5E;padding:24px;color:#fff">
          <h2 style="margin:0">Nouveau message de contact</h2>
        </div>
        <div style="padding:32px;background:#fff">
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Téléphone:</strong> ${phone || "—"}</p>
          <p><strong>Sujet:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="background:#f8fafc;padding:16px;border-left:4px solid #C8102E">${message}</p>
        </div>
      </div>
    `,
  });
}
