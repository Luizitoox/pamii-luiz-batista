import { useBatteryLevel } from 'expo-battery';
import { Platform, StyleSheet, Text, View } from 'react-native';

function BatteryLevelInfo() {
  const batteryLevel = useBatteryLevel();
  const readable = batteryLevel == null ? 'desconhecido' : `${Math.round(batteryLevel * 100)}%`;
  return <Text>Current Battery Level: {readable}</Text>;
}

export default function App() {
  const isWeb = Platform.OS === 'web';

  return (
    <View style={styles.container}>
      {isWeb ? (
        <Text>Bateria não suportada no web (use iOS/Android ou simulador físico).</Text>
      ) : (
        <BatteryLevelInfo />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});