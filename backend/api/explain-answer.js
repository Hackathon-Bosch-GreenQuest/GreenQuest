import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { question, correctAnswer } = req.body;
    if (!question || !correctAnswer) {
      return res.status(400).json({ error: "Faltam parâmetros." });
    }

    const prompt = `
Explique de forma clara e resumida por que a resposta correta para a pergunta "${question}" é "${correctAnswer}".
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const explicacao = result.response.text();

    res.status(200).json({ explicacao });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
