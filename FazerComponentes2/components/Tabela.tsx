import React from 'react';
// Importa React

import { StyleSheet, Text, View } from 'react-native';
// Componentes básicos

export default function Tabela(props: any) {
    // Recebe dados via props

    return (
        <View // Container da tabela 
            style={styles.tabela}>

            {props.dados.map((item: any, index: number) => (
                // Percorre os dados

                <View key={index} style={styles.linha}>
        // Cada linha

                    <Text >{item.nome}</Text>
          // Mostra o nome

                    <Text>{item.valor}</Text>
          // Mostra o valor

                </View>
            ))}

        </View>
    );
}

const styles = StyleSheet.create({
    tabela: {
        marginVertical: 10,
        // Espaçamento
    },

    linha: {
        flexDirection: 'row',
        // Coloca lado a lado

        justifyContent: 'space-between',
        // Espaça os itens

        padding: 20,
        // Espaço interno

        borderBottomWidth: 1,
        // Linha separadora
    },
});