import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração da IA
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔹 Rota de gerar perguntas
app.get("/api/generate-questions", async (req, res) => {
  try {
    const prompt = `
Você é um gerador de perguntas de múltipla escolha.
Gere exatamente 1 pergunta sobre sustentabilidade.
Formato JSON:
{
  "id": "id-unico",
  "texto": "pergunta",
  "opcoes": ["opção A", "opção B", "opção C", "opção D"],
  "respostaCorreta": "opção correta"
}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // 🔹 Limpa blocos de ```json ... ```
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      text = jsonMatch[1].trim();
    } else {
      const firstBrace = text.indexOf("{");
      const lastBrace = text.lastIndexOf("}");
      if (firstBrace !== -1 && lastBrace !== -1) {
        text = text.substring(firstBrace, lastBrace + 1);
      }
    }

    const pergunta = JSON.parse(text);
    res.json(pergunta);
  } catch (err) {
    console.error("Erro ao gerar pergunta:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Rota de explicar resposta
app.post("/api/explain-answer", async (req, res) => {
  try {
    const { perguntaId, escolha, texto, respostaCorreta } = req.body;

    const prompt = `
Explique de forma clara e resumida porque a resposta correta para a pergunta "${texto}" é "${respostaCorreta}".
A resposta escolhida foi "${escolha}".
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const explicacao = result.response.text();

    res.json({
      correto: escolha === respostaCorreta,
      feedback: explicacao,
    });
  } catch (err) {
    console.error("Erro ao explicar resposta:", err);
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Start do servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
