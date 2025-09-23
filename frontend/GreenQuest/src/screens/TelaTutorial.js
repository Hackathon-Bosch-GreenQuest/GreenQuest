import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

const TelaTutorial = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>As Cores da Coleta Seletiva ♻️</Text>

      <View style={styles.card}>
        <View style={[styles.bin, { backgroundColor: "#0046ad" }]} />
        <Text style={styles.text}>Azul → Papel</Text>
      </View>

      <View style={styles.card}>
        <View style={[styles.bin, { backgroundColor: "#ff0000" }]} />
        <Text style={styles.text}>Vermelho → Plástico</Text>
      </View>

      <View style={styles.card}>
        <View style={[styles.bin, { backgroundColor: "#ffea00" }]} />
        <Text style={styles.text}>Amarelo → Metal</Text>
      </View>

      <View style={styles.card}>
        <View style={[styles.bin, { backgroundColor: "#008000" }]} />
        <Text style={styles.text}>Verde → Vidro</Text>
      </View>

      <View style={styles.card}>
        <View style={[styles.bin, { backgroundColor: "#654321" }]} />
        <Text style={styles.text}>Marrom → Orgânico</Text>
      </View>

      <View style={styles.card}>
        <View style={[styles.bin, { backgroundColor: "#808080" }]} />
        <Text style={styles.text}>Cinza → Resíduo Geral</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    width: "90%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  bin: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginRight: 15,
  },
  text: {
    fontSize: 18,
  },
});

export default TelaTutorial;
