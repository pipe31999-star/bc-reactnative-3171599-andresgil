import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { agentSchema, AgentFormData } from '../schemas/itemSchema';
import { useCreateItem } from '../hooks/useItems';

export default function CreateScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Create'>>();
  const createItem = useCreateItem();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: '',
      campaign: '',
      client: '',
      calls: 0,
      status: 'Active',
    },
  });

  const onSubmit = async (values: AgentFormData) => {
    await createItem.mutateAsync(values);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar agente</Text>

      <FormField control={control} name="name" label="Nombre" placeholder="Ej. Ana Morales" />
      <FormField control={control} name="campaign" label="Campaña" placeholder="Ej. Soporte premium" />
      <FormField control={control} name="client" label="Cliente" placeholder="Ej. Banco Pacifico" />
      <FormField control={control} name="calls" label="Llamadas" placeholder="0" keyboardType="number-pad" />
      <FormField control={control} name="status" label="Estado" placeholder="Active / Break / Offline" />

      <Pressable style={[styles.button, isSubmitting && styles.buttonDisabled]} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Guardar agente</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: '#111827' },
  button: { marginTop: 8, backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
