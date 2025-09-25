import React, { useState } from "react";
import { View, Text, Button, Modal, TextInput, StyleSheet, Image } from "react-native";
import { signInOrSignUpUser } from '../services/apiService';

export default function TelaCarregamento({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState("");

  const entrar = async () => {
    if (nome.trim() === "") {
        alert("Digite seu nome!");
        return;
    }

    try {
        // Chama a função que faz o LOGIN OU CADASTRO
        const user = await signInOrSignUpUser(nome); 
        
        // Sucesso: fecha o modal e navega, passando o ID e Nome
        setModalVisible(false);
        navigation.navigate("TelaHistoria", { 
            usuarioId: user.id, 
            nome: user.nome 
        }); 

    } catch (error) {
        alert("Erro ao conectar com a API. Verifique o JSON Server.");
        console.error(error);
    }
};

  return (
    <View style={styles.container}>
      {/* Mascote */}
      <Image
        source={require("../../assets/planeta.png")} // coloca sua imagem do planeta na pasta assets
        style={styles.imagem}
      />

      {/* Botão Jogar */}
      <Button title="Jogar" onPress={() => setModalVisible(true)} />

      {/* Modal Login */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalBox}>
            <Text style={styles.titulo}>Insira seu nome de usuário:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome"
              value={nome}
              onChangeText={setNome}
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