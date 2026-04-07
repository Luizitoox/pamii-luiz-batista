import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Botao from '../components/BotaoProps'; // Importa o botãoooo

export default function Index() {
  const [expressao, setExpressao] = useState<string>('');
  const [resultado, setResultado] = useState<string>('0');

  const operadores = ['+', '-', 'x', '÷', '.'];

  const linhasDeBotoes = [
    ['AC', '(', ')', '÷'],
    ['7', '8', '9', 'x'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '⌫', '=']
  ];

  const obterCorFundo = (botao: string): string => {
    if (botao === 'AC') return '#add';
    if (botao === '=') return '#2e7d32';
    if (['+', '-', 'x', '÷', '(', ')'].includes(botao)) return '#add8e6';
    return '#666666';
  };

  const lidarComToque = (valor: string): void => {
    if (valor === 'AC') {
      setExpressao('');
      setResultado('0');
    } else if (valor === '⌫') {
      const novaExpressao = expressao.slice(0, -1);
      setExpressao(novaExpressao);
      setResultado(novaExpressao.length > 0 ? novaExpressao : '0');
    } else if (valor === '=') {
      try {
        const expressaoFormatada = expressao.replace(/x/g, '*').replace(/÷/g, '/');
        const resultadoCalculado = eval(expressaoFormatada);
        setResultado(String(resultadoCalculado));
        setExpressao(String(resultadoCalculado));
      } catch {
        setResultado('Erro');
      }
    } else {
      if (operadores.includes(valor)) {
        if (expressao === '' && valor !== '-') return;
        const ultimoCaractere = expressao.slice(-1);
        if (operadores.includes(ultimoCaractere)) {
          const novaExpressao = expressao.slice(0, -1) + valor;
          setExpressao(novaExpressao);
          setResultado(novaExpressao);
          return;
        }
      }
      const novaExpressao = expressao + valor;
      setExpressao(novaExpressao);
      setResultado(novaExpressao);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.displayContainer}>
        <Text style={styles.textoDisplay} numberOfLines={1} adjustsFontSizeToFit>
          {resultado}
        </Text>
      </View>

      <View style={styles.tecladoContainer}>
        {linhasDeBotoes.map((linha, indexLinha) => (
          <View key={indexLinha} style={styles.linha}>
            {linha.map((botao) => (
              <Botao
                key={botao}
                titulo={botao}
                corFundo={obterCorFundo(botao)}
                onPress={lidarComToque}
              />
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  displayContainer: { flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', padding: 20 },
  textoDisplay: { fontSize: 70, color: '#000', fontWeight: '600' },
  tecladoContainer: { paddingBottom: 20, paddingHorizontal: 10 },
  linha: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
});