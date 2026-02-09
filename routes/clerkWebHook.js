const express = require("express");
const { Webhook } = require("svix");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail");

const router = express.Router();

router.post("/clerk", async (req, res) => {
  const payload = req.body;
  const headers = req.headers;

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt;

  try {
    evt = wh.verify(
      payload,
      headers["svix-id"],
      headers["svix-timestamp"],
      headers["svix-signature"]
    );
  } catch (err) {
    console.error("❌ Webhook verification failed:", err.message);
    return res.status(400).send("Invalid signature");
  }

  console.log("🔔 Verified Clerk Event:", evt.type);

  if (evt.type === "user.created") {
    const email =
      evt.data.email_addresses?.[0]?.email_address;

    if (email) {
      await sendWelcomeEmail(email);
      console.log("✅ Welcome email sent to:", email);
    }
  }

  res.status(200).json({ ok: true });
});

module.exports = router;
