import React, { useState } from "react";
import { View, Text, Button, Modal, TextInput, StyleSheet, Image } from "react-native";
import { signUpUser, signInUser } from '../services/firebaseService';

export default function TelaCarregamento({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = () => {
    if (nome.trim() !== "" && email.trim() !== "" && senha.trim() !== "") {
      setModalVisible(false);
      // leva para a tela do Quiz passando os dados
      navigation.navigate("TelaHistoria", { usuario: nome, email: email });
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <View style={styles.container}>
      {/* Mascote */}
      <Image
        source={require("../../assets/planeta.png")}
        style={styles.imagem}
      />

      {/* Botão Jogar */}
      <Button title="Jogar" onPress={() => setModalVisible(true)} />

      {/* Modal Login */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.titulo}>Insira seus dados:</Text>

            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              style={styles.input}
              placeholder="Digite seu email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Digite sua senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry={true} // esconde a senha
            />

            <Button title="Entrar" onPress={entrar} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },
  imagem: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  titulo: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    marginBottom: 15,
    borderRadius: 5,
  },
});
