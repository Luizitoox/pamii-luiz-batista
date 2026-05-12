import {
  View,
  Text,
  Button,
  StyleSheet
} from "react-native";

// Router do Expo
import {
  router,
  useLocalSearchParams
} from "expo-router";

export default function Home() {

  // Recebe dados enviados pelo Login
  const {
    nome,
    sobrenome,
    email

  } = useLocalSearchParams();

  return (

    <View style={styles.container}>

      {/* Título */}
      <Text style={styles.title}>
        Bem-vindo!
      </Text>

      {/* Informações usuário */}
      <Text style={styles.info}>
        Nome: {nome}
      </Text>

      <Text style={styles.info}>
        Sobrenome: {sobrenome}
      </Text>

      <Text style={styles.info}>
        Email: {email}
      </Text>

      {/* Espaço */}
      <View style={{ marginTop: 20 }}>

        {/* Botão sair */}
        <Button
          title="Sair"
          onPress={() => router.replace("/")}
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
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },

  info: {
    fontSize: 18,
    marginBottom: 10
  }

});