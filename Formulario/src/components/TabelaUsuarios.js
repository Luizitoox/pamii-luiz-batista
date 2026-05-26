// src/components/TabelaUsuarios.js
import React from 'react';
// Importa 'TouchableOpacity' e 'Alert' para criar o botão de deletar com segurança
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { excluirUsuarioService } from '../services/usuarioService';

export default function TabelaUsuarios({ dados }) {

  // Função interna que gerencia o aviso de confirmação antes de apagar
  const confirmarExclusao = (id, nome) => {
    // Se estiver rodando no navegador Web, usa o confirm nativo do browser
    if (Platform.OS === 'web') {
      const aceitou = window.confirm(`Tem certeza que deseja excluir o usuário ${nome}?`);
      if (aceitou) executarExclusao(id);
    } else {
      // Se estiver no celular (Android/iOS), exibe o Alert customizado do React Native
      Alert.alert(
        "Excluir Usuário",
        `Tem certeza que deseja excluir o usuário ${nome}?`,
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Excluir", style: "destructive", onPress: () => executarExclusao(id) }
        ]
      );
    }
  };

  // Função assíncrona que de fato dispara o serviço de exclusão do Firebase
  const executarExclusao = async (id) => {
    try {
      await excluirUsuarioService(id);
      // Nota: Não precisamos atualizar o estado manualmente aqui! 
      // O 'onSnapshot' no App.js vai detectar que o documento sumiu e atualizará a tabela na hora.
    } catch (error) {
      if (Platform.OS === 'web') alert("Erro ao tentar excluir o usuário.");
      else Alert.alert("Erro", "Não foi possível excluir o usuário.");
    }
  };

  // Renderização de cada linha da tabela (Modificada para incluir a coluna de ação)
  const renderItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 2 }]}>{item.nome}</Text>
      <Text style={[styles.tableCell, { flex: 3 }]}>{item.email}</Text>
      
      {/* Botão de Excluir posicionado no final da linha */}
      <TouchableOpacity 
        style={styles.deleteButton} 
        onPress={() => confirmarExclusao(item.id, item.nome)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.table}>
      {/* Cabeçalho da Tabela atualizado com a coluna 'Ação' */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, { flex: 2 }]}>Nome</Text>
        <Text style={[styles.headerCell, { flex: 3 }]}>E-mail</Text>
        <Text style={[styles.headerCell, { flex: 1, textAlign: 'center' }]}>Ação</Text>
      </View>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum usuário cadastrado.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  table: { flex: 1, backgroundColor: '#fff', borderRadius: 8, overflow: 'hidden', elevation: 2 },
  tableHeader: { flexDirection: 'row', backgroundColor: '#007BFF', padding: 10 },
  headerCell: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  tableRow: { flexDirection: 'row', padding: 12, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  tableCell: { fontSize: 14, color: '#333' },
  emptyText: { textAlign: 'center', padding: 20, color: '#999' },
  // Estilos do novo botão de exclusão
  deleteButton: { flex: 1, backgroundColor: '#DC3545', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 4, alignItems: 'center', justifyContent: 'center' },
  deleteButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 }
});