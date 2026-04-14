import React from 'react';
// Importa React

import { Modal, StyleSheet, Text, View } from 'react-native';
// Modal → janela

import BotaoCustom from './BotaoCustom';
// Importa botão

export default function ModalCustom(props: any) {
    // Recebe props

    return (
        <Modal
            visible={props.visivel}
            // Mostra ou esconde

            transparent
            // Fundo transparente

            animationType="fade"
        // Animação
        >
            <View // Fundo escuro
                style={styles.overlay}>

                <View // Caixa do modal
                    style={styles.modal}>

                    <Text //titulo 
                        style={styles.titulo}>Confirmação ou Cancelar
                    </Text>

                    <BotaoCustom
                        // Botão confirmar
                        texto="Botão Confirmar"
                        cor="green"
                        aoPressionar={props.aoConfirmar}
                    />

                    <BotaoCustom
                        // Botão cancelar
                        texto="Botão Cancelar"
                        cor="red"
                        aoPressionar={props.aoCancelar}
                    />

                </View>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        // Ocupa tela toda

        backgroundColor: 'rgba(0,0,0,0.5)',
        // Fundo escuro

        justifyContent: 'center',
        // Centraliza vertical

        alignItems: 'center',
        // Centraliza horizontal
    },

    modal: {
        width: '80%',
        // Largura

        backgroundColor: '#fff',
        // Fundo branco

        padding: 20,
        // Espaço interno

        borderRadius: 10,
        // Bordas arredondadas
    },

    titulo: {
        fontSize: 20,
        // Tamanho texto

        marginBottom: 10,
        // Espaço abaixo

        fontWeight: 'bold',
        // Negrito
    },
});