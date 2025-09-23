import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TelaIntroducao = () => {
  const navigation = useNavigation(); // hook do React Navigation

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

      <ScrollView contentContainerStyle={styles.chatContainer}>
        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>Você já viu aquelas lixeiras coloridas?</Text>
        </View>

        <View style={styles.mensagemUser}>
          <Text style={styles.textoUser}>Já vi, mas para que servem?</Text>
        </View>

        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>Isso é coleta seletiva! ♻️</Text>
        </View>

        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>
            Separamos em categorias: plástico, papel, vidro, metal e orgânico.
            Reaproveitando e diminuindo o lixo
          </Text>
        </View>

        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>
            Isso significa economizar água, energia e reciclar materiais sempre
            que possível
          </Text>
        </View>

        <View style={styles.mensagemUser}>
          <Text style={styles.textoUser}>
            Ahh! Agora entendi, por isso as cores diferentes
          </Text>
        </View>

        {/* Botão que leva para TelaTutorial */}
        <TouchableOpacity
          style={styles.mensagemfinalBot}
          onPress={() => navigation.navigate('TelaTutorial')}
        >
          <Text style={styles.textofinalBot}>
            Vamos ver essas cores!
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Teclado fake (imagem fixa embaixo) */}
      <Image
        source={require('../../assets/Teclado.png')}
        style={styles.teclado}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hud: {
    width: '100%',
    height: 40,
  },
  hudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: 75,
  },
  chatContainer: {
    padding: 12,
    paddingBottom: 80,
  },
  mensagemBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#579B26',
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
  },
  textoBot: {
    color: '#fff',
    fontSize: 20,
  },
  mensagemUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
  },
  textoUser: {
    color: '#000000ff',
    fontSize: 20,
  },
  mensagemfinalBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#579B26',
    padding: 10,
    borderRadius: 16,
    marginTop: 4,
    marginBottom: 280,
    maxWidth: '80%',
  },
  textofinalBot: {
    color: '#0059FF',
    fontSize: 20,
    textDecorationLine: 'underline',
  },
  teclado: {
    width: '100%',
    height: 340,
    resizeMode: 'stretch',
    position: 'absolute',
    bottom: 0,
  },
});

export default TelaIntroducao;
