import React from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { useItems } from '../hooks/useItems';

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();
  const { data, isLoading } = useItems();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>Agentes de call center</Text>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Create')}>
          <Text style={styles.buttonText}>Nuevo</Text>
        </Pressable>
      </View>

      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable style={styles.card} onPress={() => navigation.navigate('Edit', { id: item.id })}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardText}>Campaña: {item.campaign}</Text>
            <Text style={styles.cardText}>Cliente: {item.client}</Text>
            <Text style={styles.cardText}>Llamadas: {item.calls}</Text>
            <Text style={styles.cardText}>Estado: {item.status}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f3f4f6' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  button: { backgroundColor: '#2563eb', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8 },
  buttonText: { color: '#fff', fontWeight: '600' },
  list: { gap: 12 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 12, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardText: { color: '#4b5563', marginTop: 2 },
});
