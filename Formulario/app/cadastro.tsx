import { useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert
} from "react-native";

// Router
import { router } from "expo-router";

// Banco de dados
import db from "./database/database";

export default function Cadastro() {

  // Estados dos inputs
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Função cadastrar
  function cadastrar() {

    // Verifica campos vazios
    if (!nome || !sobrenome || !email || !senha) {

      Alert.alert(
        "Erro",
        "Preencha todos os campos!"
      );

      return;
    }

    // Verifica se email já existe
    const usuarioExiste = db.getAllSync(

      "SELECT * FROM users WHERE email = ?",

      [email]
    );

    // Se existir
    if (usuarioExiste.length > 0) {

      Alert.alert(
        "Erro",
        "Esse email já está cadastrado!"
      );

      return;
    }

    // Insere usuário no banco
    db.runSync(

      "INSERT INTO users (nome, sobrenome, email, senha) VALUES (?, ?, ?, ?)",

      [nome, sobrenome, email, senha]
    );

    // Mensagem sucesso
    Alert.alert(
      "Sucesso",
      "Usuário cadastrado!"
    );

    // Volta para Login
    router.push("/");
  }

  return (

    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.title}>
        Cadastro
      </Text>

      {/* Input Nome */}
      <TextInput
        placeholder="Nome"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
      />

      {/* Input Sobrenome */}
      <TextInput
        placeholder="Sobrenome"
        style={styles.input}
        value={sobrenome}
        onChangeText={setSobrenome}
      />

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

      {/* Botão Cadastro */}
      <Button
        title="Cadastrar"
        onPress={cadastrar}
      />

      {/* Espaço */}
      <View style={{ marginTop: 10 }}>

        {/* Botão voltar */}
        <Button
          title="Voltar para Login"
          onPress={() => router.push("/")}
        />

      </View>

    </View>
  );
}

// Estilos
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