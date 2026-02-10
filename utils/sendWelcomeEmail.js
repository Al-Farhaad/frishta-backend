const nodemailer = require("nodemailer");

const SONGS = [
  {
    id: "1",
    title: "Midnight Vibes",
    image: "https://picsum.photos/300?1"
  },
  {
    id: "2",
    title: "Dream Waves",
    image: "https://picsum.photos/300?2"
  },
  {
    id: "3",
    title: "Soul Nights",
    image: "https://picsum.photos/300?3"
  }
];

module.exports = async (user) => {
  const email = user.email_addresses[0].email_address;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const html = `
    <h2>Welcome to Frishta 🎵</h2>
    <p>Tap a song to open it in the app</p>

    ${SONGS.map(
      s => `
        <a href="frishta://song/${s.id}">
          <img src="${s.image}" width="180" style="margin:10px;border-radius:8px" />
        </a>
      `
    ).join("")}

    <p>🎧 Happy Listening</p>
  `;

  await transporter.sendMail({
    from: `"Frishta" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Welcome to Frishta 🎶",
    html
  });

  console.log("✅ Welcome email sent to", email);
};
