import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Array com todas as mensagens "normais" do chat
const mensagens = [
  { tipo: 'bot', texto: 'Que tal embarcar comigo nessa jornada para cuidar melhor do planeta onde você vive?' },
  { tipo: 'user', texto: 'Que jornada?' },
  { tipo: 'bot', texto: 'Minha missão é te ensinar sobre sustentabilidade e reciclagem' },
  { tipo: 'bot', texto: 'Sustentabilidade é quando a gente cuida do planeta sem atrapalhar o futuro' },
  { tipo: 'bot', texto: 'Isso significa economizar água, energia e usar os recursos de forma responsável. Assim, garantimos que a Terra continue saudável para todos!' },
  { tipo: 'user', texto: 'Uau! Que legal!' },
  { tipo: 'bot', texto: 'Afinal, se não cuidarmos do nosso Planeta agora, como ele ficará para nossas próximas gerações?' },
  { tipo: 'bot', texto: 'Agora que já te ensinei o que é sustentabilidade, vamos dar o próximo passo na nossa jornada!' },
];

const TelaHistoria = () => {
  const navigation = useNavigation();
  const [mensagensVisiveis, setMensagensVisiveis] = useState([]);
  const [mostrarLink, setMostrarLink] = useState(false); // controla a última mensagem clicável

  useEffect(() => {
    let i = 0;

    const mostrarMensagem = () => {
      if (i < mensagens.length) {
        setMensagensVisiveis(prev => [...prev, mensagens[i]]);
        i++;
        setTimeout(mostrarMensagem, 1000); // 1 segundo de delay
      } else {
        // Depois que todas as mensagens foram exibidas, mostrar a última mensagem clicável
        setMostrarLink(true);
      }
    };

    mostrarMensagem();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Hud.png')} style={styles.hud} />

      {/* HUD da conversa */}
      <View style={styles.hudContainer}>
        <Image
          source={require('../../assets/ConversaHud.png')}
          style={styles.avatar}
        />
      </View>

      {/* ScrollView com paddingBottom suficiente para o teclado */}
      <ScrollView contentContainerStyle={[styles.chatContainer, { paddingBottom: 360 }]}>
        {/* Renderiza todas as mensagens normais */}
        {mensagensVisiveis.map((msg, index) =>
          msg ? (
            <View
              key={index}
              style={msg.tipo === 'bot' ? styles.mensagemBot : styles.mensagemUser}
            >
              <Text style={msg.tipo === 'bot' ? styles.textoBot : styles.textoUser}>
                {msg.texto}
              </Text>
            </View>
          ) : null
        )}

        {/* Última mensagem clicável */}
        {mostrarLink && (
          <TouchableOpacity
            style={styles.mensagemfinalBot}
            onPress={() => navigation.navigate('TelaIntroducao')}
          >
            <Text style={styles.textofinalBot}>
              Clique aqui para começar a introdução!
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Teclado fake (imagem fixa embaixo) */}
      <Image source={require('../../assets/Teclado.png')} style={styles.teclado} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  hud: { width: '100%', height: 40 },
  hudContainer: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: '100%', height: 75 },
  chatContainer: { padding: 12 },
  mensagemBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#579B26',
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
  },
  textoBot: { color: '#fff', fontSize: 20 },
  mensagemUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
  },
  textoUser: { color: '#000000ff', fontSize: 20 },
  mensagemfinalBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#579B26',
    padding: 10,
    borderRadius: 16,
    marginTop: 4,
    maxWidth: '80%',
  },
  textofinalBot: {
    color: '#0059FF',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  teclado: { width: '100%', height: 340, resizeMode: 'stretch', position: 'absolute', bottom: 0 },
});

export default TelaHistoria;
