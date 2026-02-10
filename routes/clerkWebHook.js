const express = require("express");
const { Webhook } = require("svix");
const { sendWelcomeEmail } = require("../utils/sendWelcomeEmail");

const router = express.Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      const payload = req.body;
      const headers = req.headers;
      const secret = process.env.CLERK_WEBHOOK_SECRET;

      if (!secret) {
        console.error("❌ CLERK_WEBHOOK_SECRET is missing");
        return res.status(500).json({ error: "Server configuration missing" });
      }

      const wh = new Webhook(secret);
      const evt = wh.verify(payload, {
        "svix-id": headers["svix-id"],
        "svix-timestamp": headers["svix-timestamp"],
        "svix-signature": headers["svix-signature"],
      });

      console.log("✅ Clerk Webhook Verified:", evt.type);

      // It is safer to check for user.created so other events don't break your code
      if (evt.type === "user.created") {
        const email = evt.data.email_addresses?.[0]?.email_address;
        
        if (email) {
          console.log("📧 Attempting to send email to:", email);
          await sendWelcomeEmail(email);
          console.log("✅ Welcome email process finished for:", email);
        } else {
          console.warn("⚠️ No email address found in the user.created event data");
        }
      }

      return res.status(200).json({ success: true });
      
    } catch (err) {
      console.error("❌ Webhook verification or processing failed:", err.message);
      return res.status(400).json({ success: false, message: "Invalid signature or processing error" });
    }
  }
);

module.exports = router;