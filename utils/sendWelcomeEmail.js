const nodemailer = require("nodemailer");

async function sendWelcomeEmail(email) {
  try {
    // Basic validation
    if (!email) {
      console.error("❌ No email provided to sendWelcomeEmail");
      return;
    }

    console.log("📧 Sending welcome email to:", email);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Must be false for port 587
      requireTLS: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Verify connection configuration before sending
    await transporter.verify();
    console.log("🔗 SMTP Connection verified");

    await transporter.sendMail({
      from: `"Frishta" <${process.env.EMAIL_USER}>`,
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

    console.log("✅ EMAIL SENT SUCCESSFULLY");
  } catch (err) {
    console.error("❌ EMAIL FAILED:", err.message);
  }
}

module.exports = { sendWelcomeEmail };