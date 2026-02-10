const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendWelcomeEmail(email) {
  try {
    await resend.emails.send({
      from: "Frishta <onboarding@resend.dev>",
      to: email,
      subject: "Welcome to Frishta 🎶",
      html: `
  <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
    <h2 style="color: #4c669f;">Welcome to Frishta!</h2>
    <p>We are thrilled to have you join our music community.</p>
    <p>Start exploring and enjoy the rhythm!</p>
    <br />
    <p>Best regards,<br />The Frishta Team</p>
  </div>
`,
    });
    console.log("✅ EMAIL SENT VIA RESEND");
  } catch (error) {
    console.error("❌ RESEND FAILED:", error);
  }
}
