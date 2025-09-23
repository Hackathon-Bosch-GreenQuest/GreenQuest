import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TelaIntroducao = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo ao GreenQuest!</Text>
            <Text style={styles.subtitle}>Sua jornada sustentável começa aqui.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e6f5e6',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#228B22',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
    },
});

export default TelaIntroducao;