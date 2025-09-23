import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Array com todas as mensagens na ordem correta
const mensagens = [
  { tipo: 'bot', texto: 'Você já viu aquelas lixeiras coloridas?' },
  { tipo: 'user', texto: 'Já vi, mas para que servem?' },
  { tipo: 'bot', texto: 'Isso é coleta seletiva! ♻️' },
  { tipo: 'bot', texto: 'Separamos em categorias: plástico, papel, vidro, metal e orgânico. Reaproveitando e diminuindo o lixo' },
  { tipo: 'bot', texto: 'Isso significa economizar água, energia e reciclar materiais sempre que possível' },
  { tipo: 'user', texto: 'Ahh! Agora entendi, por isso as cores diferentes' },
];

const TelaIntroducao = () => {
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
        setTimeout(mostrarMensagem, 1500); // delay de 1 segundo entre cada mensagem
      } else {
        setMostrarLink(true); // exibe última mensagem clicável
      }
    };

    mostrarMensagem();
  }, []);

  // Scroll automático para a última mensagem
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
            onPress={() => navigation.navigate('TelaTutorial')}
          >
            <Text style={styles.textofinalBot}>
              Vamos ver essas cores!
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

export default TelaIntroducao;