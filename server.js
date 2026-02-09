require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const songRoutes = require("./routes/songRoutes");
const clerkWebhook = require("./routes/clerkWebHook");

connectDB();

const app = express();
app.use(cors());

console.log("defining clerk webhook route");
app.use("/api/webhooks/clerk", clerkWebhook);
console.log("clerk webhook route defined");

app.use("/api/songs", express.json(), songRoutes);


app.get("/", (req, res) => {
  res.send("Frishta Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
