// App.js
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import FormUsuario from '../src/components/FormUsuario';
import TabelaUsuarios from '../src/components/TabelaUsuarios';
import { escutarUsuariosService } from '../src/services/usuarioService';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    // Passamos setUsuarios como callback. Sempre que o banco mudar, o estado atualiza aqui.
    const unsubscribe = escutarUsuariosService(setUsuarios);

    // Desliga o listener ao sair do app/tela
    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Painel de Controle</Text>
      
      <FormUsuario />
      
      <Text style={styles.subtitle}>Usuários Ativos</Text>
      <TabelaUsuarios dados={usuarios} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', marginTop: 40 },
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 }
});