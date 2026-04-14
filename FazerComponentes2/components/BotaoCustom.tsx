import React from 'react';
// Importa React

import { StyleSheet, Text, TouchableOpacity } from 'react-native';
// TouchableOpacity → botão clicável

export default function BotaoCustom(props: any) {
    // Recebe props

    return (
        <TouchableOpacity
            style={[styles.botao, { backgroundColor: props.cor }]}
            // Aplica estilo + cor dinâmica

            onPress={props.aoPressionar}
        // Executa função ao clicar
        >
            <Text // Mostra o texto
                style={styles.texto}>{props.texto}
            </Text>

        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    botao: {
        padding: 20,         // Espaço interno
        borderRadius: 8,     // Bordas arredondadas
        alignItems: 'center',// Centraliza conteúdo
        marginVertical: 5,   // Espaçamento
    },

    texto: {
        fontSize: 25,
        color: '#fff',       // Cor do texto
        fontWeight: 'bold',  // Negrito
    },
});