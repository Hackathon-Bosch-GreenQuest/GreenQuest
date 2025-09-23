import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Todas as mensagens na ordem correta
const mensagens = [
  { tipo: 'bot', texto: 'Agora que você já sabe sobre sustentabilidade e coleta seletiva, que tal colocar seus conhecimentos em prática?' },
  { tipo: 'user', texto: 'Colocar em prática?' },
  { tipo: 'bot', texto: 'Isso! Você irá responder as perguntas, isso vai somando seus pontos para o ranking' },
  { tipo: 'bot', texto: 'E no final veremos seu nível! ♻️' },
];

const TelaPreQuiz = () => {
  const navigation = useNavigation();
  const scrollRef = useRef(null);
  const [mensagensVisiveis, setMensagensVisiveis] = useState([]);
  const [mostrarLink, setMostrarLink] = useState(false);

  useEffect(() => {
    let i = 0;

    const mostrarMensagem = () => {
      if (i < mensagens.length) {
        const msgAtual = mensagens[i];
        if (msgAtual) {
          setMensagensVisiveis(prev => [...prev, msgAtual]);
        }
        i++;
        setTimeout(mostrarMensagem, 1500);
      } else {
        setMostrarLink(true);
      }
    };

    mostrarMensagem();
  }, []);

  // Scroll automático sempre que aparecer mensagem nova
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
  }, [mensagensVisiveis, mostrarLink]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Hud.png')} style={styles.hud} />

      <View style={styles.hudContainer}>
        <Image source={require('../../assets/ConversaHud.png')} style={styles.avatar} />
      </View>

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={[styles.chatContainer, { paddingBottom: 360 }]}
      >
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

        {mostrarLink && (
          <TouchableOpacity
            style={styles.mensagemfinalBot}
            onPress={() => navigation.navigate('Quiz')}
          >
            <Text style={styles.textofinalBot}>
              Jogar!
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

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

export default TelaPreQuiz;
