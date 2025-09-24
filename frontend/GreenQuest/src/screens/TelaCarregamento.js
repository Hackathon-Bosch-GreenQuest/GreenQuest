import React, { useState } from "react";
import { View, Text, Button, Modal, TextInput, StyleSheet, Image } from "react-native";
import { signInUser, CriaPerfil } from "../../services/firebaseService"; 

export default function TelaCarregamento({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const entrar = async () => {
    if (nome.trim() !== "" && email.trim() !== "" && senha.trim() !== "") {
      try {
       
        const credencial = await signInUser(email, senha);
        // Navega passando dados do usuário autenticado
        navigation.navigate("TelaHistoria", {
          usuario: nome,
          email: credencial.user.email,
          uid: credencial.user.uid,
        });

        setModalVisible(false);
      } catch (error) {
        // Se não existe, cria conta nova
        try {
          const novoUsuario = await CriaPerfil(email, senha, nome);

          navigation.navigate("TelaHistoria", {
            usuario: nome,
            email: novoUsuario.email,
            uid: novoUsuario.uid,
          });

          setModalVisible(false);
        } catch (e) {
          console.error("Erro no cadastro:", e);
          alert("Erro ao criar usuário. Verifique os dados.");
        }
      }
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
              secureTextEntry={true}
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
