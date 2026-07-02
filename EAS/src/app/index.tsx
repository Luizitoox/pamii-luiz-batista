import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [escalacao, setEscalacao] = useState<string[]>(Array(11).fill("Vazio"));

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Soberano da Copa</Text>
      <Text style={styles.subtitulo}>Monte seu 11 Inicial Histórico</Text>

      <ScrollView style={styles.campo}>
        {escalacao.map((jogador, index) => (
          <TouchableOpacity key={index} style={styles.posicaoBotao}>
            <Text style={styles.textoPosicao}>Posição {index + 1}: {jogador}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b4332', // Verde Copa/Gramado
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 16,
    color: '#d4af37', // Dourado Taça
    textAlign: 'center',
    marginBottom: 20,
  },
  campo: {
    flex: 1,
  },
  posicaoBotao: {
    backgroundColor: '#2d6a4f',
    padding: 15,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#d4af37',
  },
  textoPosicao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});