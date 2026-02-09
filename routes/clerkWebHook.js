const express = require("express");
const { Webhook } = require("svix");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail");

const router = express.Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    console.log("Received Clerk Webhook:",req);
    try {
      const payload = req.body;
      const headers = req.headers;
      const secret = process.env.CLERK_WEBHOOK_SECRET;

      console.log("headers:", headers);
      console.log("Secret length:", secret?.length);
      console.log("Payload type:", typeof payload, "is Buffer:", Buffer.isBuffer(payload));
    
      return res.status(200).json({ success: true });

      if (!secret) {
        console.error("CLERK_WEBHOOK_SECRET is missing");
        return res.status(500).json({ error: "Server configuration missing" });
      }

      const wh = new Webhook(secret);

      const evt = wh.verify(payload, {
        "svix-id": headers["svix-id"],
        "svix-timestamp": headers["svix-timestamp"],
        "svix-signature": headers["svix-signature"],
      });

      console.log("Clerk Webhook Verified:", evt.type);

      if (evt.type === "user.created") {
        await sendWelcomeEmail(evt.data);
      }

      return res.status(200).json({ success: true });
      
    } catch (err) {
      console.error("Webhook a verification failed:", err.message);
      console.log("req headers:", req.headers);
      console.log("Raw body:", req.body);
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  }
);

module.exports = router;