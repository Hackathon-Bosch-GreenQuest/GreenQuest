// frontend/src/screens/TelaQuiz.js
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import axios from "axios";

export default function TelaQuiz() {
  const [pergunta, setPergunta] = useState(null);
  const [pontos, setPontos] = useState(0);
  const [opcaoSelecionada, setOpcaoSelecionada] = useState(null);
  const [feedback, setFeedback] = useState("");

  // URL do backend
  const BASE_URL = "http://10.0.10.217:3000/api"; // IP do seu PC na rede


  // Pegar pergunta da API
  const pegarPergunta = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/generate-questions`);
      console.log("Pergunta recebida:", res.data);
      setPergunta(res.data);
      setOpcaoSelecionada(null);
      setFeedback("");
    } catch (err) {
      console.error("Erro ao buscar pergunta:", err);
      Alert.alert("Erro", "Não foi possível carregar a pergunta.");
    }
  };

  // Enviar resposta para a API de explicação
  const enviarResposta = async (opcao) => {
    try {
      setOpcaoSelecionada(opcao);

      const res = await axios.post(`${BASE_URL}/explain-answer`, {
        question: pergunta.texto,
        correctAnswer: pergunta.respostaCorreta,
      });

      console.log("Resposta da API:", res.data);

      setFeedback(res.data.explicacao || "");

      if (opcao === pergunta.respostaCorreta) {
        setPontos(pontos + 1);
      }

      // Próxima pergunta após 2 segundos
      setTimeout(() => {
        pegarPergunta();
      }, 2000);
    } catch (err) {
      console.error("Erro ao enviar resposta:", err);
      Alert.alert("Erro", "Não foi possível enviar a resposta.");
    }
  };

  useEffect(() => {
    pegarPergunta();
  }, []);

  if (!pergunta)
    return (
      <Text style={{ textAlign: "center", marginTop: 50, fontSize: 18 }}>
        Carregando...
      </Text>
    );

  const letras = ["A", "B", "C", "D"];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Quiz</Text>
        <Text style={{ color: "#fff", marginTop: 5 }}>Pontuação: {pontos}</Text>
      </View>

      {/* Pergunta */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{pergunta.texto}</Text>
      </View>

      {/* Opções */}
      {pergunta.opcoes.map((opcao, index) => {
        let backgroundColor = "#4CAF50"; // cor padrão
        if (opcaoSelecionada) {
          if (opcao === pergunta.respostaCorreta) backgroundColor = "#4CAF70"; // verde
          else if (opcao === opcaoSelecionada) backgroundColor = "#F44336"; // vermelho
        }

        return (
          <TouchableOpacity
            key={index}
            style={[styles.option, { backgroundColor }]}
            disabled={!!opcaoSelecionada}
            onPress={() => enviarResposta(opcao)}
          >
            <Text style={styles.optionText}>
              {letras[index]} - {opcao}
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Feedback */}
      {feedback ? <Text style={styles.feedbackText}>{feedback}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  header: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  headerText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  questionBox: {
    backgroundColor: "#4CAF50",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
  },
  questionText: { color: "#fff", fontSize: 16, textAlign: "center" },
  option: {
    padding: 15,
    marginTop: 12,
    borderRadius: 8,
  },
  optionText: { color: "#fff", fontSize: 16, textAlign: "center" },
  feedbackText: {
    marginTop: 15,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
});
