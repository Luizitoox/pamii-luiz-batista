// Importa o direcionador de rotas do framework Expo
import { router } from "expo-router";
// Importa o hook useState para reter temporariamente os textos digitados nos inputs do formulário
import { useState } from "react";
// Importa as peças de interface e detecção de plataforma nativas do ecossistema do React Native
import { Alert, Button, Platform, StyleSheet, Text, TextInput, View } from "react-native";
// Importa o banco de dados simulado ou real unificado
import db from "../database/database.web";

// Declara a função/componente responsável pela tela de criação de novas contas
export default function Cadastro() {
  // Inicializa o estado 'nome' e seu modificador como string vazia
  const [nome, setNome] = useState("");
  // Inicializa o estado 'sobrenome' e seu modificador como string vazia
  const [sobrenome, setSobrenome] = useState("");
  // Inicializa o estado 'email' e seu modificador como string vazia
  const [email, setEmail] = useState("");
  // Inicializa o estado 'senha' e seu modificador como string vazia
  const [senha, setSenha] = useState("");

  // Função interna acionada ao clicar no botão para validar e gravar os dados
  function cadastrar() {
    // Validação estrita: Verifica se alguma das 4 variáveis está vazia ou sem preenchimento
    if (!nome || !sobrenome || !email || !senha) {
      // Se o usuário estiver acessando a aplicação pelo computador/navegador
      if (Platform.OS === "web") alert("Preencha todos os campos!"); // Dispara caixa de diálogo nativa da web
      // Se estiver em um dispositivo móvel real
      else Alert.alert("Erro", "Preencha todos os campos!"); // Dispara a caixa de mensagem do Android/iOS
      // Trava o avanço da função imediatamente
      return;
    } // Fecha a verificação de campos nulos

    // Bloco try para interceptar e mitigar erros de banco de dados ou chaves duplicadas
    try {
      // Executa um comando de busca síncrona para checar se o email inserido já consta gravado na tabela
      const usuarioExiste = db.getAllSync("SELECT * FROM users WHERE email = ?", [email]);

      // Se a consulta retornar um array preenchido (ou seja, tamanho maior que zero)
      if (usuarioExiste && usuarioExiste.length > 0) {
        // Valida se está rodando no ambiente Web
        if (Platform.OS === "web") alert("Esse email já está cadastrado!"); // Exibe alerta simples na aba
        // Se for dispositivo mobile
        else Alert.alert("Erro", "Esse email já está cadastrado!"); // Exibe alerta flutuante estilizado do celular
        // Encerra a função impedindo a inserção de e-mail duplicado
        return;
      } // Termina o tratamento de duplicidade de conta

      // Executa o comando SQL síncrono de inserção de dados na tabela 'users'
      db.runSync(
        "INSERT INTO users (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)", // Estrutura blindada contra invasão SQL Injection
        [nome, sobrenome, email, senha] // Injeta os estados capturados nos inputs substituindo as chaves "?" por ordem
      );

      // Se o cadastro finalizar com sucesso em ambiente de navegador
      if (Platform.OS === "web") alert("Usuário cadastrado!"); // Dá a confirmação textual na Web
      // Se finalizar no ambiente de aplicativo mobile
      else Alert.alert("Sucesso", "Usuário cadastrado!"); // Confirma de forma nativa no celular

      // Envia o usuário recém-cadastrado de volta para a tela raiz (Login) para ele fazer o primeiro acesso
      router.push("/");
    } catch (error) { // Trata qualquer eventual quebra física do banco ou erro de compilação
      // Cospe no console do terminal os detalhes do rastreamento de erro
      console.error(error);
    } // Finaliza o bloco catch
  } // Finaliza a função cadastrar

  // Define a árvore de componentes visuais do Cadastro
  return (
    // Elemento estrutural de tela cheia que organiza o formulário aplicando margens
    <View style={styles.container}>
      {/* Título textual da tela indicando a ação de Cadastro */}
      <Text style={styles.title}>Cadastro</Text>
      {/* Input para receber e monitorar o Nome do usuário */}
      <TextInput placeholder="Nome" style={styles.input} value={nome} onChangeText={setNome} />
      {/* Input para receber e monitorar o Sobrenome do usuário */}
      <TextInput placeholder="Sobrenome" style={styles.input} value={sobrenome} onChangeText={setSobrenome} />
      {/* Input configurado para coletar o endereço de Email tirando letras maiúsculas automáticas */}
      <TextInput placeholder="Email" style={styles.input} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
      {/* Input mascarado com pontos invisíveis dedicado à criação da Senha protetiva */}
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} value={senha} onChangeText={setSenha} />
      {/* Botão principal que submete as informações do formulário para a função 'cadastrar' */}
      <Button title="Cadastrar" onPress={cadastrar} />
      {/* Recipiente para espaçamento do botão inferior de retorno */}
      <View style={{ marginTop: 10 }}>
        {/* Botão secundário de navegação que devolve o usuário à tela de Login sem salvar nada */}
        <Button title="Voltar para Login" onPress={() => router.push("/")} />
      </View> {/* Fecha o recipiente de espaçamento */}
    </View> // Fecha o container principal
  ); // Termina o retorno do layout
} // Termina a função do componente Cadastro

// Declaração dos estilos css-in-js para organizar e pintar os elementos do Cadastro
const styles = StyleSheet.create({
  // Flex 1 faz o aplicativo preencher as bordas externas da tela inteira, centralizando o formulário no meio
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  // Estilo textual do título principal da tela com fonte em escala expandida (30) e peso negrito
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  // Formatação de caixa dos campos: Cria borda externa cinza, define preenchimento interno e cantos curvados em 10 pontos
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 12, borderRadius: 10 }
}); // Fecha a declaração do StyleSheet