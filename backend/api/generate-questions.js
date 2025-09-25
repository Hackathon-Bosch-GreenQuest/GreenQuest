import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const FIXED_TOPIC = "Sustentabilidade e coleta seletiva de lixo";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    // Instrução Aprimorada: Reforçando para não usar Markdown!
    const prompt = `
Você é um gerador de perguntas de múltipla escolha.
Sua única saída DEVE ser o objeto JSON, sem texto explicativo, formatação, ou blocos de código (ex: não use \`\`\`json).
Gere exatamente 5 perguntas sobre ${FIXED_TOPIC}.
O formato do array JSON deve ser:
[
  {
    "pergunta": "...",
    "opcoes": ["A) ...", "B) ...", "C) ...", "D) ..."],
    "correta": "letra",
    "explicacao": "..."
  },
  // ... 4 mais
]
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    // 1. Tenta extrair o bloco de código Markdown (se houver)
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      text = jsonMatch[1];
    } else {
        // 2. Se não encontrou o bloco, tenta extrair pelo array/objeto
        const firstBracket = text.indexOf('['); // O JSON que você quer começa com um array
        const lastBracket = text.lastIndexOf(']');
        if (firstBracket !== -1 && lastBracket !== -1) {
          text = text.substring(firstBracket, lastBracket + 1);
        }
    }

    // 3. CORREÇÃO CRÍTICA: Aplica o trim() na string FINAL para remover qualquer espaço/lixo restante.
    text = text.trim(); 

    let perguntas;
    try {
      // Tenta o parse com a string o mais limpa possível
      perguntas = JSON.parse(text);
    } catch (e) {
      // Retorna um erro 500 detalhado, mas agora com a string limpa para análise
      return res.status(500).json({ 
            error: "Erro ao converter JSON após limpeza. O JSON final ainda é inválido.", 
            details: e.message, 
            textEnviadoParaParse: text 
        });
    }

    res.status(200).json(perguntas);
  } catch (err) {
    // Trata erros como Falha de Rede ou Quota Excedida
    res.status(500).json({ error: "Erro ao gerar perguntas: " + err.message });
  }
}