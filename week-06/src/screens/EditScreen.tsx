import React, { useEffect } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { FormField } from '../components/FormField';
import { agentSchema, AgentFormData } from '../schemas/itemSchema';
import { useItemById, useUpdateItem } from '../hooks/useItems';

export default function EditScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Edit'>>();
  const route = useRoute<StackScreenProps<RootStackParamList, 'Edit'>['route']>();
  const { id } = route.params;
  const { data, isLoading } = useItemById(id);
  const updateItem = useUpdateItem();

  const { control, handleSubmit, reset, formState: { isSubmitting } } = useForm<AgentFormData>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: '',
      campaign: '',
      client: '',
      calls: 0,
      status: 'Active',
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        campaign: data.campaign,
        client: data.client,
        calls: data.calls,
        status: data.status,
      });
    }
  }, [data, reset]);

  const onSubmit = async (values: AgentFormData) => {
    await updateItem.mutateAsync({ id, payload: values });
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar agente</Text>

      <FormField control={control} name="name" label="Nombre" placeholder="Ej. Ana Morales" />
      <FormField control={control} name="campaign" label="Campaña" placeholder="Ej. Soporte premium" />
      <FormField control={control} name="client" label="Cliente" placeholder="Ej. Banco Pacifico" />
      <FormField control={control} name="calls" label="Llamadas" placeholder="0" keyboardType="number-pad" />
      <FormField control={control} name="status" label="Estado" placeholder="Active / Break / Offline" />

      <Pressable style={[styles.button, isSubmitting && styles.buttonDisabled]} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        {isSubmitting ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Actualizar agente</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16, color: '#111827' },
  button: { marginTop: 8, backgroundColor: '#2563eb', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  buttonDisabled: { opacity: 0.7 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
