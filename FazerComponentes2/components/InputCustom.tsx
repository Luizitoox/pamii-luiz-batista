import React from 'react';
// Importa React

import { StyleSheet, TextInput } from 'react-native';
// TextInput → campo de texto

export default function InputCustom(props: any) {
    // Recebe props (usando any para simplificar)

    return (
        <TextInput
            style={styles.input}
            // Aplica estilo

            value={props.valor}
            // Valor do input

            onChangeText={props.aoAlterar}
            // Atualiza ao digitar

            placeholder={props.placeholder}
        // Texto de ajuda
        />
    );
}

const styles = StyleSheet.create({
    input: {
        textAlign: 'center',
        color: '#aaaaaa',
        fontSize: 20,
        borderWidth: 1,          // Borda
        borderColor: '#000',     // Cor da borda
        padding: 20,             // Espaço interno
        borderRadius: 8,         // Bordas arredondadas
        marginVertical: 8,       // Espaçamento vertical
    },
});