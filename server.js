// server.js

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// 🔑 API KEY (BURAYA KENDİNİ KOY)
const API_KEY = "YOUR_OPENAI_API_KEY";

// 🔥 TEST ROUTE
app.get("/", (req, res) => {
  res.send("SnapTools AI Server Çalışıyor 🚀");
});

// 🧠 AI ÖZETLEME
app.post("/summarize", async (req, res) => {
  try {
    const text = req.body.text;

    if (!text) {
      return res.status(400).json({ error: "Metin boş" });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `Summarize this text briefly and clearly:\n${text}`
      })
    });

    const data = await response.json();

    // Güvenli çekim
    let summary = "Özet alınamadı";

    if (data.output && data.output[0] && data.output[0].content[0].text) {
      summary = data.output[0].content[0].text;
    }

    res.json({ summary });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Sunucu hatası" });
  }
});

// 🚀 PORT
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server çalışıyor: http://localhost:${PORT}`);
});
