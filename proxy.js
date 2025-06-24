const express = require("express");
const axios = require("axios");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/mav", async (req, res) => {
  try {
    const response = await axios.post(
      "https://emma.mav.hu/otp2-backend/otp/routers/default/index/graphql",
      req.body,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch from MÁV API" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Proxy server listening on http://0.0.0.0:${PORT}`);
});