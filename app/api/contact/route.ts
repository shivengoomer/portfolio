import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, social } = body;

    if (!name || !email || !message) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const recipient = process.env.CONTACT_RECEIVER_EMAIL || "shivengoomer@gmail.com";
    const sender = process.env.CONTACT_SENDER_EMAIL || "onboarding@resend.dev";

    const { data, error } = await resend.emails.send({
      from: `Portfolio Contact <${sender}>`,
      to: [recipient],
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #ddd; padding-bottom: 10px;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${social ? `<p><strong>Social:</strong> <a href="${social}">${social}</a></p>` : ""}
          <p><strong>Message:</strong></p>
          <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0070f3; margin-top: 10px; white-space: pre-wrap;">${message}</div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Contact API route error:", error);
    return new NextResponse(error?.message || "Internal error", { status: 500 });
  }
}
