import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const FIXED_TOPIC = "Sustentabilidade";

export default async function generateQuestions(req, res) {
  try {
    const prompt = `
Você é um gerador de perguntas de múltipla escolha.
Gere exatamente 5 perguntas sobre ${FIXED_TOPIC}.
Cada pergunta deve ter:
- "texto": texto da pergunta
- "opcoes": ["A) ...", "B) ...", "C) ...", "D) ..."]
- "respostaCorreta": letra da resposta correta
- "explicacao": explicação da resposta correta
Responda apenas em JSON válido.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Extrair JSON
    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.substring(firstBrace, lastBrace + 1);
    }

    const perguntas = JSON.parse(text);
    return perguntas;
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao gerar perguntas: " + err.message);
  }
}
