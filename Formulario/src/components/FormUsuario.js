// src/components/FormUsuario.js
import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { cadastrarUsuarioService } from '../services/usuarioService';

export default function FormUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleCadastrar = async () => {
    if (!nome.trim() || !email.trim()) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      await cadastrarUsuarioService(nome, email);
      setNome('');
      setEmail('');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível cadastrar.");
    }
  };

  return (
    <View style={styles.form}>
      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="E-mail" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TouchableOpacity style={styles.button} onPress={handleCadastrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 20, elevation: 2 },
  input: { borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 8, marginBottom: 15, fontSize: 16 },
  button: { backgroundColor: '#007BFF', padding: 12, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});