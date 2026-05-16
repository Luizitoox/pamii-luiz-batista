// Importa os componentes estruturais e de interface fundamentais do React Native
import {
  View,
  Text,
  Button,
  StyleSheet
} from "react-native";

// Importa os recursos de gerenciamento de rotas e captura de parâmetros enviados entre telas do Expo Router
import {
  router,
  useLocalSearchParams
} from "expo-router";

// Declara a função/componente da tela principal do aplicativo (Home)
export default function Home() {

  // Executa uma desestruturação para capturar as strings de dados enviadas pela tela anterior
  const {
    nome,
    sobrenome,
    email
  } = useLocalSearchParams(); // O hook lê a URL/Parâmetros internos da navegação atual

  // Define o que será renderizado visualmente na tela do usuário
  return (

    // Caixa de visualização principal da tela inteira com fundo branco e preenchimentos
    <View style={styles.container}>

      {/* Exibe o cabeçalho de boas-vindas */}
      <Text style={styles.title}>
        Bem-vindo!
      </Text>

      {/* Exibe o rótulo fixo "Nome:" concatenado com a variável dinâmica recebida pelo parâmetro */}
      <Text style={styles.info}>
        Nome: {nome}
      </Text>

      {/* Exibe o rótulo "Sobrenome:" concatenado com o sobrenome recebido dinamicamente */}
      <Text style={styles.info}>
        Sobrenome: {sobrenome}
      </Text>

      {/* Exibe o rótulo "Email:" concatenado com o endereço de email do usuário logado */}
      <Text style={styles.info}>
        Email: {email}
      </Text>

      {/* Caixa utilitária para aplicar um espaçamento vertical acima do botão de saída */}
      <View style={{ marginTop: 20 }}>

        {/* Botão de ação para efetuar a desconexão */}
        <Button
          title="Sair" // Texto escrito na interface do botão
          // Redireciona o usuário de volta à raiz ("/") substituindo o histórico para ele não conseguir voltar arrastando a tela
          onPress={() => router.replace("/")}
        />

      </View> {/* Fecha a caixa de espaçamento */}

    </View> // Fecha o container principal
  ); // Termina o retorno estrutural
} // Termina a função do componente Home

// Lista de estilizações aplicadas exclusivamente na interface da Home
const styles = StyleSheet.create({

  // Organiza o layout para expandir, centralizar verticalmente e dar margem interna de 20 pontos
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },

  // Formata o título principal com tamanho 32, texto em negrito e espaçamento inferior
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  // Formata o texto das informações com tamanho amigável de 18 pontos e espaço entre linhas
  info: {
    fontSize: 18,
    marginBottom: 10
  }

}); // Fecha a criação dos estilos