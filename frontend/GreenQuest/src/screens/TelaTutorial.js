import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const lixeiras = [
  {
    cor: require("../../assets/vermelha.png"),
    explicacao: require("../../assets/explicacao_vermelha.png"),
  },
  {
    cor: require("../../assets/azul.png"),
    explicacao: require("../../assets/explicacao_azul.png"),
  },
  {
    cor: require("../../assets/verde.png"),
    explicacao: require("../../assets/explicacao_verde.png"),
  },
  {
    cor: require("../../assets/amarela.png"),
    explicacao: require("../../assets/explicacao_amarela.png"),
  },
  {
    cor: require("../../assets/marrom.png"),
    explicacao: require("../../assets/explicacao_marrom.png"),
  },
  {
    cor: require("../../assets/preta.png"),
    explicacao: require("../../assets/explicacao_preta.png"),
  },
  {
    cor: require("../../assets/laranja.png"),
    explicacao: require("../../assets/explicacao_laranja.png"),
  },
  {
    cor: require("../../assets/roxa.png"),
    explicacao: require("../../assets/explicacao_roxa.png"),
  },
  {
    cor: require("../../assets/cinza.png"),
    explicacao: require("../../assets/explicacao_cinza.png"),
  },
  {
    cor: require("../../assets/branca.png"),
    explicacao: require("../../assets/explicacao_branca.png"),
  },
];

const TelaTutorial = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [imagemSelecionada, setImagemSelecionada] = useState(null);

  const abrirPopup = (imagem) => {
    setImagemSelecionada(imagem);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* HUD topo */}
      <Image source={require("../../assets/Hud.png")} style={styles.hud} />
      <View style={styles.hudContainer}>
        <Image
          source={require("../../assets/ConversaHud.png")}
          style={styles.avatar}
        />
      </View>

      {/* Conteúdo estilo chat */}
      <ScrollView contentContainerStyle={styles.chatContainer}>
        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>Clique em cada lixeira para aprender!</Text>
        </View>

        {/* Lista de lixeiras */}
        {lixeiras.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.mensagemBot}
            onPress={() => abrirPopup(item.explicacao)}
          >
            <Image source={item.cor} style={styles.lixeira} />
          </TouchableOpacity>
        ))}

        {/* Botão de próximo passo */}
        <TouchableOpacity
          style={styles.mensagemfinalBot}
          onPress={() => navigation.navigate("TelaPreQuiz")}
        >
          <Text style={styles.textofinalBot}>Próximo passo</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Teclado fake */}
      <Image
        source={require("../../assets/Teclado.png")}
        style={styles.teclado}
      />

      {/* Popup com explicação */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Image source={imagemSelecionada} style={styles.modalImagem} />
          <Pressable style={styles.btnFechar} onPress={() => setModalVisible(false)}>
            <Text style={styles.btnTexto}>Fechar</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  hud: { width: "100%", height: 40 },
  hudContainer: { flexDirection: "row", alignItems: "center" },
  avatar: { width: "100%", height: 75 },
  chatContainer: { padding: 12, paddingBottom: 80 },
  mensagemBot: {
    alignSelf: "flex-start",
    backgroundColor: "#579B26",
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: "80%",
  },
  textoBot: { color: "#fff", fontSize: 20 },
  mensagemfinalBot: {
    alignSelf: "flex-start",
    backgroundColor: "#579B26",
    padding: 10,
    borderRadius: 16,
    marginTop: 4,
    marginBottom: 280,
    maxWidth: "80%",
  },
  textofinalBot: {
    color: "#0059FF",
    fontSize: 20,
    textDecorationLine: "underline",
  },
  teclado: {
    width: "100%",
    height: 340,
    resizeMode: "stretch",
    position: "absolute",
    bottom: 0,
  },
  lixeira: { width: 70, height: 70, resizeMode: "contain" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalImagem: { width: 300, height: 400, resizeMode: "contain" },
  btnFechar: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  btnTexto: { fontSize: 16, fontWeight: "bold", color: "#579B26" },
});

export default TelaTutorial;
