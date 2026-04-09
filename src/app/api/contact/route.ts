import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const DEST_EMAIL = "info.ccmav@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...fields } = body;

    let subject = "";
    let html = "";

    if (type === "contact") {
      const { nom, email, sujet, message } = fields;
      subject = `[CCMAV] Nouveau message — ${sujet}`;
      html = `
        <h2 style="color:#C8102E">Nouveau message de contact</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:6px 12px;font-weight:bold">Nom</td><td style="padding:6px 12px">${nom}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Courriel</td><td style="padding:6px 12px">${email}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Sujet</td><td style="padding:6px 12px">${sujet}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top">Message</td><td style="padding:6px 12px;white-space:pre-wrap">${message}</td></tr>
        </table>
      `;
    } else if (type === "rejoindre") {
      const { prenom, nom, email, telephone, message } = fields;
      subject = `[CCMAV] Nouvelle demande d'adhésion — ${prenom} ${nom}`;
      html = `
        <h2 style="color:#C8102E">Nouvelle demande pour rejoindre le CCMAV</h2>
        <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td style="padding:6px 12px;font-weight:bold">Prénom</td><td style="padding:6px 12px">${prenom}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Nom</td><td style="padding:6px 12px">${nom}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Courriel</td><td style="padding:6px 12px">${email}</td></tr>
          <tr><td style="padding:6px 12px;font-weight:bold">Téléphone</td><td style="padding:6px 12px">${telephone || "—"}</td></tr>
          ${message ? `<tr><td style="padding:6px 12px;font-weight:bold;vertical-align:top">Message</td><td style="padding:6px 12px;white-space:pre-wrap">${message}</td></tr>` : ""}
        </table>
      `;
    } else {
      return NextResponse.json({ error: "Type invalide" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "CCMAV Site Web <onboarding@resend.dev>",
      to: DEST_EMAIL,
      subject,
      html,
      replyTo: fields.email,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
