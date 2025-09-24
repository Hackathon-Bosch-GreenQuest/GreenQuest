import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";


const rankingData = [
  { posicao: "1º", nome: "Carlos", pontos: "80pt" },
  { posicao: "2º", nome: "Descobra", pontos: "60pt" },
  { posicao: "3º", nome: "Alexandre", pontos: "22pt" },
  { posicao: "4º", nome: "Lalulu", pontos: "12pt" },
];

const TelaRanking = () => {
  return (
    <View style={styles.container}>
      {/* Barra superior com hora e bateria */}
      <Image source={require("../../assets/Hud.png")} style={styles.hud} />

      {/* Faixa de Ranking */}
      <Image source={require("../../assets/RankingHud.png")} style={styles.rankingHud} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Texto explicativo */}
        <Text style={styles.subtitulo}>
          Descubra seu nível de sustentabilidade {"\n"} de acordo com sua pontuação
        </Text>

        {/* Lista de Ranking */}
        {rankingData.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.posicao}>{item.posicao}</Text>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.pontos}>{item.pontos}</Text>
          </View>
        ))}

        {/* Troféu */}
        <Image source={require("../../assets/Trofeu.png")} style={styles.trofeu} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  hud: { width: "100%", height: 55, resizeMode: "stretch" },
  rankingHud: { width: "100%", height: 80, resizeMode: "stretch" },
  scrollContent: { alignItems: "center", padding: 16 },
  subtitulo: {
    textAlign: "center",
    fontSize: 24,
    color: "#2d2d2d",
    marginVertical: 16,
    fontWeight: "500",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#A8E18C",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: "85%",
    marginVertical: 6,
  },
  posicao: { fontSize: 18, fontWeight: "bold", color: "#000" },
  nome: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    flex: 1,
    textAlign: "center",
  },
  pontos: { fontSize: 18, fontWeight: "bold", color: "#000" },
  trofeu: {
    height: 385,
    resizeMode: "contain",
    Bottom: 0,
  },
});

export default TelaRanking;
