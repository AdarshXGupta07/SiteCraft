import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/nodemailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // Honeypot tripped: pretend success so bots don't learn to avoid the field.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  try {
    const { company: _company, ...data } = parsed.data;
    void _company;
    await sendContactEmail(data);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 },
    );
  }
}
