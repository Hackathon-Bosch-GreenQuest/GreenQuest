// frontend/src/screens/TelaQuiz.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function TelaQuiz() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Quiz</Text>
      </View>

      {/* Pergunta */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>
          Qual cor de lixeira deve ser usada para descartar garrafas de plástico?
        </Text>
      </View>

      {/* Opções */}
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>A - Magenta</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>B - Amarelo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>C - Azul</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>D - Vermelho</Text>
      </TouchableOpacity>
    </View>
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
    backgroundColor: "#4CAF50",
    padding: 15,
    marginTop: 12,
    borderRadius: 8,
  },
  optionText: { color: "#fff", fontSize: 16, textAlign: "center" },
});
