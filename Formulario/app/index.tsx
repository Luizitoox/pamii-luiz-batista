// Importa o objeto 'router' para realizar o redirecionamento e navegação entre telas
import { router } from "expo-router";
// Importa os hooks do React para gerenciar o ciclo de vida (useEffect) e estados locais (useState)
import { useEffect, useState } from "react";
// Importa componentes visuais e utilitários nativos do React Native
import { Alert, Button, Platform, StyleSheet, Text, TextInput, View } from "react-native";
// Importa a instância do banco e a função de criar tabela (o Expo decide se lê do .tsx ou do .web.tsx)
import db, { createTable } from "../database/database.web";

// Declara a função/componente principal da tela de Login
export default function Login() {
  // Cria um estado chamado 'email' e a função para alterá-lo 'setEmail', iniciando vazio ""
  const [email, setEmail] = useState("");
  // Cria um estado chamado 'senha' e a função para alterá-lo 'setSenha', iniciando vazio ""
  const [senha, setSenha] = useState("");

  // Hook que executa uma ação automaticamente assim que a tela acaba de renderizar pela primeira vez
  useEffect(() => {
    // Bloco de tentativa para evitar que o app trave se houver problemas ao criar a tabela
    try {
      // Dispara a função para garantir que a tabela de usuários exista no banco
      createTable();
    } catch (e) { // Caso ocorra um erro na criação
      // Mostra o erro detalhado no console do terminal para debug
      console.log(e);
    } // Fecha o bloco catch
  }, []); // O array vazio garante que o useEffect rode apenas 1 vez na inicialização

  // Função interna que valida e executa o processo de login do usuário
  function login() {
    // Verifica se o campo de e-mail OU o campo de senha estão vazios (o operador ! inverte para verdadeiro se for vazio)
    if (!email || !senha) {
      // Condicional: Se o sistema operacional que estiver rodando for a Web
      if (Platform.OS === "web") alert("Preencha todos os campos!"); // Dispara o alerta padrão do navegador
      // Caso contrário (se for Android ou iOS)
      else Alert.alert("Erro", "Preencha todos os campos!"); // Dispara o componente de alerta nativo do celular
      // Interrompe a execução da função de login para não consultar o banco sem dados
      return;
    } // Fecha a validação de campos vazios

    // Bloco de tentativa para processar a busca no banco de dados com segurança
    try {
      // Faz uma busca síncrona no banco de dados buscando usuários com o e-mail E senha fornecidos
      const result = db.getAllSync(
        "SELECT * FROM users WHERE email = ? AND senha = ?", // Comando SQL com variáveis ocultas (?)
        [email, senha] // Array de parâmetros que substitui as interrogações na ordem exata
      );

      // Verifica se o resultado da consulta retornou alguma linha válida do banco
      if (result && result.length > 0) {
        // Captura o primeiro objeto encontrado na lista e tipa como 'any' (qualquer tipo)
        const usuario: any = result[0];
        // Comanda o roteador do Expo a empurrar o usuário para a tela '/home'
        router.push({
          pathname: "/home", // Caminho de destino
          params: { // Envia os dados deste usuário via parâmetros de rota para a próxima tela
            nome: usuario.nome, // Envia o nome que veio do banco
            sobrenome: usuario.sobrenome, // Envia o sobrenome que veio do banco
            email: usuario.email // Envia o e-mail que veio do banco
          } // Fecha os parâmetros
        }); // Fecha a função router.push
      } else { // Caso o resultado do banco retorne um array vazio (dados incorretos)
        // Se estiver rodando na Web
        if (Platform.OS === "web") alert("Email ou senha incorretos!"); // Alerta nativo do navegador
        // Se estiver rodando no celular
        else Alert.alert("Erro", "Email ou senha incorretos!"); // Alerta nativo do celular
      } // Fecha a verificação de sucesso/erro de login
    } catch (error) { // Se houver um colapso/erro de código ou de banco durante a execução
      // Printa o erro detalhado no console do sistema
      console.error(error);
    } // Fecha o bloco catch
  } // Fecha a função login

  // Define a estrutura visual que será mostrada ao usuário na tela
  return (
    // Caixa principal que encapsula todos os elementos visuais da tela aplicando os estilos de container
    <View style={styles.container}>
      {/* Exibe o texto de título fixo "Login" aplicando estilização de tamanho e peso */}
      <Text style={styles.title}>Login</Text>
      {/* Campo de inserção de texto para o e-mail */}
      <TextInput
        placeholder="Email" // Texto de fundo invisível quando o campo está vazio
        style={styles.input} // Aplica a estilização de bordas e espaçamentos do input
        keyboardType="email-address" // Configura o teclado do celular para exibir o botão "@" de forma facilitada
        autoCapitalize="none" // Desativa a primeira letra maiúscula automática para não quebrar e-mails
        value={email} // Vincula o texto visível ao estado 'email' do React
        onChangeText={setEmail} // Toda vez que o usuário digitar uma letra, atualiza o estado correspondente
      /> {/* Fecha o campo de e-mail */}
      {/* Campo de inserção de texto para a senha */}
      <TextInput
        placeholder="Senha" // Texto de fundo do campo de senha
        secureTextEntry // Oculta os caracteres digitados transformando-os em bolinhas por privacidade
        style={styles.input} // Aplica os mesmos estilos de borda e tamanho
        value={senha} // Vincula o texto digitado ao estado 'senha'
        onChangeText={setSenha} // Atualiza o estado da senha a cada clique do teclado
      /> {/* Fecha o campo de senha */}
      {/* Botão padrão que ao ser clicado (onPress) executa a função de validação e login */}
      <Button title="Entrar" onPress={login} />
      {/* Caixa de espaçamento criada apenas para desgrudar o botão "Criar Conta" do botão "Entrar" */}
      <View style={{ marginTop: 10 }}>
        {/* Botão secundário que direciona o fluxo do usuário diretamente para a tela de cadastro */}
        <Button title="Criar Conta" onPress={() => router.push("/cadastro")} />
      </View> {/* Fecha a caixa de espaçamento */}
    </View> // Fecha o container principal
  ); // Termina o retorno visual
} // Termina a função do componente Login

// Objeto JavaScript que contém todas as regras de estilização CSS aplicadas nos componentes acima
const styles = StyleSheet.create({
  // Estilo do container: Preenche a tela toda (flex: 1), centraliza o conteúdo e adiciona margens internas
  container: { flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#fff" },
  // Estilo do título: Letras grandes (30), negrito forte, margem abaixo e alinhado no meio da tela
  title: { fontSize: 30, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  // Estilo dos inputs: Cria uma borda cinza fina, adiciona preenchimento interno e cantos arredondados
  input: { borderWidth: 1, borderColor: "#ccc", padding: 12, marginBottom: 12, borderRadius: 10 }
}); // Fecha o objeto StyleSheet