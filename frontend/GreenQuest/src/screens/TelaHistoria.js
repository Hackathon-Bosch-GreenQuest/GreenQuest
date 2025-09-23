import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const TelaHistoria = () => {
  return (
    <View style={styles.container}>

      {/* HUD da conversa */}
      <View style={styles.hudContainer}>
        <Image
          source={require('../../assets/ConversaHud.png')}
          style={styles.avatar}
        />
      </View>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>
            Que tal embarcar comigo nessa jornada para cuidar melhor do planeta
            onde você vive?
          </Text>
        </View>

        <View style={styles.mensagemUser}>
          <Text style={styles.textoUser}>Que jornada?</Text>
        </View>

        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>
            Minha missão é te ensinar sobre sustentabilidade e reciclagem
          </Text>
        </View>

        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>
            Sustentabilidade é quando a gente cuida do planeta sem atrapalhar o
            futuro
          </Text>
        </View>

        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>
            Isso significa economizar água, energia e reciclar materiais sempre
            que possível
          </Text>
        </View>
      </ScrollView>

      {/* Teclado fake (imagem fixa embaixo) */}
      <Image source={require('../../assets/Teclado.png')} style={styles.teclado} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  hudContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: '100%',
    height: 75,
  },
  hudTitulo: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    padding: 12,
    paddingBottom: 80, // espaço pro teclado
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
  teclado: {
    width: '100%',
    height: 340,
    resizeMode: 'stretch',
    marginBottom: 0,
    position: 'absolute',
    bottom: 0,
  },
});

export default TelaHistoria;
