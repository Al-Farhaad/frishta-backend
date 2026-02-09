const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (toEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Frishta 🎵" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Welcome to Frishta 🎶",
    html: `
      <div style="font-family: Arial; padding: 20px;">
        <h2>Hey 👋 Welcome to Frishta</h2>
        <p>We're excited to have you on board.</p>
        <h3>🔥 Explore our 3 Trending Songs</h3>
        <ul>
          <li>Midnight Vibes – Frishta Beats</li>
          <li>Soulful Nights – DJ Noor</li>
          <li>Dream Waves – Alpha Sounds</li>
        </ul>
        <p>Open the app and start listening 🎧</p>
        <br />
        <b>— Team Frishta</b>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendWelcomeEmail;
