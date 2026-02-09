require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const songRoutes = require("./routes/songRoutes");
const webhookRoutes = require("./routes/clerkWebHook");

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/songs", songRoutes);
app.use("/api/webhooks", webhookRoutes);

app.get("/", (req, res) => {
  res.send("Frishta Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
