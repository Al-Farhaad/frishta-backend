const nodemailer = require("nodemailer");

 async function sendWelcomeEmail(email) {
  try {
    console.log("📧 Sending welcome email to:", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("🔐 Gmail user:", process.env.EMAIL_USER);

    await transporter.sendMail({
      from: `"Frishta" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Frishta 🎶",
      html: "<h2>Welcome to Frishta</h2>",
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY");
  } catch (err) {
    console.error("❌ EMAIL FAILED:", err.message);
  }
};

module.exports = {sendWelcomeEmail};