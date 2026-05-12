import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from "react-native";

// Router do Expo
import { router } from "expo-router";

// Banco de dados
import db, { createTable } from "./database/database";

// Cria tabela quando abrir tela
createTable();

export default function Login() {

  // Estado do email
  const [email, setEmail] = useState("");

  // Estado da senha
  const [senha, setSenha] = useState("");

  // Função de login
  function login() {

    // Verifica se os campos estão vazios
    if (!email || !senha) {

      Alert.alert(
        "Erro",
        "Preencha todos os campos!"
      );

      return;
    }

    // Procura usuário no banco
    const result = db.getAllSync(

      // SQL
      "SELECT * FROM users WHERE email = ? AND senha = ?",

      // Valores
      [email, senha]
    );

    // Verifica se encontrou usuário
    if (result.length > 0) {

      // Pega primeiro usuário encontrado
      const usuario: any = result[0];

      // Vai para tela Home
      router.push({

        pathname: "/home",

        // Envia dados para Home
        params: {
          nome: usuario.nome,
          sobrenome: usuario.sobrenome,
          email: usuario.email
        }
      });

    } else {

      // Caso login esteja errado
      Alert.alert(
        "Erro",
        "Email ou senha incorretos!"
      );
    }
  }

  return (

    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.title}>
        Login
      </Text>

      {/* Input Email */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Input Senha */}
      <TextInput
        placeholder="Senha"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      {/* Botão Login */}
      <Button
        title="Entrar"
        onPress={login}
      />

      {/* Espaço */}
      <View style={{ marginTop: 10 }}>

        {/* Botão Cadastro */}
        <Button
          title="Criar Conta"
          onPress={() => router.push("/cadastro")}
        />

      </View>

    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff"
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    borderRadius: 10
  }

});