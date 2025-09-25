import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function handler(req, res) {
  
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { question, correctAnswer } = req.body;
  
  if (!question || !correctAnswer) {
    return res.status(400).json({ error: "Parâmetros 'question' e 'correctAnswer' são obrigatórios." });
  }

  try {
    const prompt = `
Explique de forma clara e resumida por que a resposta correta para a pergunta "${question}" é "${correctAnswer}".
`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    
    const explicacao = result.response.text(); 

    return res.status(200).json({ explicacao }); 
    
  } catch (err) {
    console.error("Erro ao gerar explicação:", err);
    return res.status(500).json({ error: "Erro ao gerar explicação: " + err.message });
  }
}