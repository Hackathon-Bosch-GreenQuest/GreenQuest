import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function explainAnswer(req, res) {
  const { question, correctAnswer } = req.body;
  if (!question || !correctAnswer) {
    throw new Error("Faltam parâmetros");
  }

  try {
    const prompt = `
Explique de forma clara e resumida por que a resposta correta para a pergunta "${question}" é "${correctAnswer}".
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const explicacao = result.response.text();

    return { explicacao };
  } catch (err) {
    console.error(err);
    throw new Error("Erro ao gerar explicação: " + err.message);
  }
}
