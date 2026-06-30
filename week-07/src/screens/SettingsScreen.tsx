import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as SecureStore from 'expo-secure-store';
import { usePreferences } from '../hooks/usePreferences';
import { theme } from '../theme';

const SECURE_KEY = 'callcenter.accessCode';

export function SettingsScreen() {
  const { sortOrder, compactMode, itemsPerPage, updateSortOrder, updateCompactMode, updateItemsPerPage } = usePreferences();
  const [secureValue, setSecureValue] = useState('');

  const handleSaveSecureValue = async () => {
    if (!secureValue.trim()) {
      Alert.alert('Requerido', 'Ingresa un código de acceso para guardar.');
      return;
    }

    await SecureStore.setItemAsync(SECURE_KEY, secureValue.trim());
    Alert.alert('Seguridad', 'El dato sensible fue guardado correctamente.');
    setSecureValue('');
  };

  const handleReadSecureValue = async () => {
    const value = await SecureStore.getItemAsync(SECURE_KEY);
    if (value) {
      Alert.alert('Seguridad', 'Se encontró un dato sensible almacenado.');
    } else {
      Alert.alert('Seguridad', 'No hay un dato sensible guardado.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Ajustes del operador</Text>
        <Text style={styles.subtitle}>Personaliza cómo verás los seguimientos y protege el acceso del tablero.</Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Preferencias</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Vista compacta</Text>
            <Switch value={compactMode} onValueChange={updateCompactMode} />
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Seguimientos por pantalla</Text>
            <Picker selectedValue={itemsPerPage} style={styles.picker} onValueChange={(value) => updateItemsPerPage(Number(value))}>
              <Picker.Item label="4" value={4} />
              <Picker.Item label="6" value={6} />
              <Picker.Item label="8" value={8} />
            </Picker>
          </View>
          <View style={styles.rowColumn}>
            <Text style={styles.label}>Ordenar seguimientos por</Text>
            <Picker selectedValue={sortOrder} style={styles.picker} onValueChange={(value) => updateSortOrder(value as 'recent' | 'name' | 'status')}>
              <Picker.Item label="Más recientes" value="recent" />
              <Picker.Item label="Nombre del agente" value="name" />
              <Picker.Item label="Estado" value="status" />
            </Picker>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Seguridad del tablero</Text>
          <Text style={styles.helper}>Guarda un código de acceso de forma segura y sin mostrarlo en pantalla.</Text>
          <TextInput
            style={styles.input}
            value={secureValue}
            onChangeText={setSecureValue}
            placeholder="Código de acceso del operador"
            placeholderTextColor={theme.colors.muted}
            secureTextEntry
          />
          <Pressable style={styles.button} onPress={handleSaveSecureValue}>
            <Text style={styles.buttonText}>Guardar código de acceso</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.secondaryButton]} onPress={handleReadSecureValue}>
            <Text style={styles.buttonTextSecondary}>Leer dato seguro</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.lg },
  title: { fontSize: 24, fontWeight: '700', color: theme.colors.text },
  subtitle: { color: theme.colors.muted, marginBottom: theme.spacing.md },
  card: { backgroundColor: theme.colors.card, borderRadius: 14, padding: theme.spacing.md, marginBottom: theme.spacing.md, borderWidth: 1, borderColor: theme.colors.border },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: theme.colors.text, marginBottom: theme.spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: theme.spacing.sm },
  rowColumn: { marginBottom: theme.spacing.sm },
  label: { color: theme.colors.text, fontWeight: '600' },
  picker: { minWidth: 140, color: theme.colors.text },
  helper: { color: theme.colors.muted, marginBottom: theme.spacing.sm },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 10,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
    marginBottom: theme.spacing.sm,
  },
  button: { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.md, borderRadius: 12, alignItems: 'center', marginTop: theme.spacing.sm },
  secondaryButton: { backgroundColor: '#e2e8f0' },
  buttonText: { color: '#fff', fontWeight: '700' },
  buttonTextSecondary: { color: theme.colors.text, fontWeight: '700' },
});
