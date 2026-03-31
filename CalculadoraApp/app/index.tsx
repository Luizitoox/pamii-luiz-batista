import React, { useState } from 'react'; // Importa React e o hook useState para gerenciar estados
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'; // Componentes básicos do React Native

// Interface que define as propriedades do componente Botao
interface BotaoProps {
  titulo: string;        // Texto exibido no botão
  corFundo?: string;     // Cor de fundo opcional
  corTexto?: string;     // Cor do texto opcional
}

// Componente principal da calculadora
export default function Index() {
  // Estado que guarda a expressão digitada (ex: "2+2")
  const [expressao, setExpressao] = useState<string>('');

  // Estado que guarda o resultado exibido
  const [resultado, setResultado] = useState<string>('0');

  // Lista de operadores matemáticos
  const operadores = ['+', '-', 'x', '÷', '.'];

  // Estrutura dos botões organizados por linhas
  const linhasDeBotoes = [
    ['AC', '(', ')', '÷'],  // Primeira linha
    ['7', '8', '9', 'x'],   // Segunda linha
    ['4', '5', '6', '-'],   // Terceira linha
    ['1', '2', '3', '+'],   // Quarta linha
    ['0', '.', '⌫', '=']    // Quinta linha
  ];

  // Função que define a cor de fundo de cada botão
  const obterCorFundo = (botao: string): string => {
    if (botao === 'AC') return '#add'; // Botão limpar
    if (botao === '=') return '#2e7d32'; // Botão igual
    if (['+', '-', 'x', '÷', '(', ')'].includes(botao)) return '#add8e6'; // Operadores
    return '#666666'; // Botões numéricos padrão
  };

  // Função chamada quando um botão é pressionado
  const lidarComToque = (valor: string): void => {

    // Se clicar em "C", limpa tudo
    if (valor === 'AC') {
      setExpressao('');
      setResultado('0');

    // Se clicar em "⌫", remove o último caractere
    } else if (valor === '⌫') {
      const novaExpressao = expressao.slice(0, -1); // Remove último caractere
      setExpressao(novaExpressao);
      setResultado(novaExpressao.length > 0 ? novaExpressao : '0'); // Atualiza display

    // Se clicar em "=", calcula o resultado
    } else if (valor === '=') {
      try {
        // Substitui símbolos visuais pelos operadores reais do JS
        const expressaoFormatada = expressao
          .replace(/x/g, '*')   // Multiplicação
          .replace(/÷/g, '/');  // Divisão

        // Avalia a expressão (ex: "2+2")
        const resultadoCalculado = eval(expressaoFormatada);

        // Atualiza estados com o resultado
        setResultado(String(resultadoCalculado));
        setExpressao(String(resultadoCalculado));

      } catch (e) {
        // Caso ocorra erro na conta
        setResultado('Erro');
      }

    } else {
      // Se for operador
      if (operadores.includes(valor)) {

        // Evita começar expressão com operador (exceto "-")
        if (expressao === '' && valor !== '-') return;

        const ultimoCaractere = expressao.slice(-1); // Pega último caractere

        // Evita dois operadores seguidos (substitui o anterior)
        if (operadores.includes(ultimoCaractere)) {
          const novaExpressao = expressao.slice(0, -1) + valor;
          setExpressao(novaExpressao);
          setResultado(novaExpressao);
          return;
        }
      }

      // Adiciona o valor digitado na expressão
      const novaExpressao = expressao + valor;
      setExpressao(novaExpressao);
      setResultado(novaExpressao);
    }
  };

  // Componente reutilizável de botão
  const Botao: React.FC<BotaoProps> = ({
    titulo,
    corFundo = '#666666', // Cor padrão
    corTexto = '#ffffff'  // Cor padrão do texto
  }) => (
    <TouchableOpacity
      style={[styles.botao, { backgroundColor: corFundo }]} // Aplica estilo e cor
      onPress={() => lidarComToque(titulo)} // Chama função ao clicar
    >
      <Text style={[styles.textoBotao, { color: corTexto }]}>
        {titulo} {/* Texto do botão */}
      </Text>
    </TouchableOpacity>
  );

  // Renderização da interface
  return (
    <SafeAreaView style={styles.container}>
      
      {/* Área do display (resultado) */}
      <View style={styles.displayContainer}>
        <Text
          style={styles.textoDisplay}
          numberOfLines={1} // Limita a 1 linha
          adjustsFontSizeToFit // Ajusta tamanho automaticamente
        >
          {resultado} {/* Mostra o resultado */}
        </Text>
      </View>

      {/* Área dos botões */}
      <View style={styles.tecladoContainer}>
        {linhasDeBotoes.map((linha, indexLinha) => (
          <View key={indexLinha} style={styles.linha}>
            
            {/* Renderiza cada botão da linha */}
            {linha.map((botao) => (
              <Botao
                key={botao}
                titulo={botao}
                corFundo={obterCorFundo(botao)} // Define cor dinamicamente
              />
            ))}

          </View>
        ))}
      </View>

    </SafeAreaView>
  );
}

// Estilos da aplicação
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda a tela
    backgroundColor: '#fff', // Fundo preto
  },

  displayContainer: {
    flex: 1, // Área do display ocupa parte superior
    justifyContent: 'flex-end', // Alinha conteúdo embaixo
    alignItems: 'flex-end', // Alinha à direita
    padding: 20,
  },

  textoDisplay: {
    fontSize: 70, // Texto grande
    color: '#000', // Branco
    fontWeight: '600', // Fonte mais forte
  },

  tecladoContainer: {
    paddingBottom: 20,
    paddingHorizontal: 10,
  },

  linha: {
    flexDirection: 'row', // Botões em linha
    justifyContent: 'space-between', // Espaço entre eles
    marginBottom: 20,
  },

  botao: {
    width: 80,
    height: 80,
    borderRadius: 40, // Botão redondo
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoBotao: {
    fontSize: 35,
    fontWeight: '600',
  },
});