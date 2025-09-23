import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const FIXED_TOPIC = "Sustentabilidade";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const prompt = `
Você é um gerador de perguntas de múltipla escolha.
Gere exatamente 5 perguntas sobre ${FIXED_TOPIC}.
Cada pergunta deve ter:
- "pergunta": texto da pergunta
- "opcoes": ["A) ...", "B) ...", "C) ...", "D) ..."]
- "correta": letra da resposta correta
- "explicacao": explicação da resposta correta
Responda apenas em JSON válido, sem texto fora do JSON.
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();

    // Lógica final e mais robusta para extrair o JSON
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      text = jsonMatch[1].trim();
    } else {
      const firstBrace = text.indexOf('{');
      const lastBrace = text.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1) {
        text = text.substring(firstBrace, lastBrace + 1);
      }
    }

    let perguntas;
    try {
      perguntas = JSON.parse(text);
    } catch (e) {
      return res.status(500).json({ error: "Erro ao converter JSON: " + e.message, rawText: text });
    }

    res.status(200).json(perguntas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}