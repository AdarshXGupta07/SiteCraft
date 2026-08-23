import nodemailer from "nodemailer";
import type { ContactFormValues } from "./validation";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables. See .env.local.example.",
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendContactEmail(
  data: Omit<ContactFormValues, "company">,
) {
  const to = process.env.CONTACT_TO_EMAIL || process.env.GMAIL_USER;
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"SiteCraft Website" <${process.env.GMAIL_USER}>`,
    to,
    replyTo: data.email,
    subject: `New inquiry: ${data.projectType} — ${data.name}`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Project type: ${data.projectType}`,
      "",
      data.message,
    ].join("\n"),
  });
}
