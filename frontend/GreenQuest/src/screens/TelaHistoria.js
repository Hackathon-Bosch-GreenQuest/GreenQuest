import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Importar navigation


const TelaHistoria = () => {
  const navigation = useNavigation(); // Hook do React Navigation

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
            Isso significa economizar água, energia e usar os recursos de forma responsável. Assim, garantimos que a Terra continue saudável para todos!
          </Text>
        </View>

        <View style={styles.mensagemUser}>
          <Text style={styles.textoUser}>Uau! Que legal!</Text>
        </View>

        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>Afinal, se não cuidarmos do nosso Planeta agora, como ele ficará para nossas próximas gerações?</Text>
        </View>

        <View style={styles.mensagemBot}>
          <Text style={styles.textoBot}>Agora que já te ensinei o que é sustentabilidade, vamos dar o próximo passo na nossa jornada!</Text>
        </View>

        {/* Nova mensagem clicável do bot */}
        <TouchableOpacity
          style={styles.mensagemfinalBot}
          onPress={() => navigation.navigate('TelaIntroducao')} // Nome da tela deve ser o mesmo do seu Navigator
        >
          <Text style={styles.textofinalBot}>
            Clique aqui para começar a introdução!
          </Text>
        </TouchableOpacity>

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

export default TelaHistoria;
