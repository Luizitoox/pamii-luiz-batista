// Botao.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Interface que define as propriedades do botão
interface BotaoProps {
  titulo: string;
  corFundo?: string;
  corTexto?: string;
  onPress: (valor: string) => void; // Recebe função de clique
}

// Componente Botão reutilizável
const Botao: React.FC<BotaoProps> = ({
  titulo,
  corFundo = '#666666',
  corTexto = '#ffffff',
  onPress
}) => {
  return (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: corFundo }]}
      onPress={() => onPress(titulo)}
    >
      <Text style={[styles.textoBotao, { color: corTexto }]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  botao: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotao: {
    fontSize: 35,
    fontWeight: '600',
  },
});

export default Botao;