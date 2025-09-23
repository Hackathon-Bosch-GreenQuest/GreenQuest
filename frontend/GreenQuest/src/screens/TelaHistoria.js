import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const TelaHistoria = () => {
  return (
    <View style={styles.container}>

      <Image source={require('../../assets/Hud.png')} style={styles.hud} />

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
  hud: {
    width: '100%',
    height: 40, // ajuste de acordo com a altura real da imagem Hud.png
    resizeMode: 'stretch',
  },
  chatContainer: {
    padding: 12,
    paddingBottom: 80, // deixa espaço pro teclado
  },
  mensagemBot: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: '80%',
  },
  textoBot: {
    color: '#fff',
    fontSize: 14,
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
    color: '#000',
    fontSize: 14,
  },
  teclado: {
    width: '100%',
    height: 80,
    resizeMode: 'stretch',
  },
});

export default TelaHistoria;