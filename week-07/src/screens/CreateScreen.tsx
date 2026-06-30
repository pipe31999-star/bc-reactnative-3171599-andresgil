import React, { useState } from 'react';
import { Alert, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FormField } from '../components/FormField';
import { theme } from '../theme';
import type { CallCenterItem } from '../types';

export function CreateScreen() {
  const [agentName, setAgentName] = useState('');
  const [clientName, setClientName] = useState('');
  const [campaignName, setCampaignName] = useState('');
  const [notes, setNotes] = useState('');

  const handleSave = () => {
    const item: CallCenterItem = {
      id: Date.now().toString(),
      agentName,
      clientName,
      campaignName,
      status: 'En espera',
      priority: 'Media',
      notes,
      createdAt: new Date().toISOString(),
    };

    Alert.alert('Registro guardado', `${item.agentName} quedó en seguimiento para ${item.clientName}`);
    setAgentName('');
    setClientName('');
    setCampaignName('');
    setNotes('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registrar seguimiento de llamada</Text>
        <Text style={styles.subtitle}>Capture el estado del cliente, el agente responsable y la campaña activa.</Text>
        <FormField label="Agente asignado" value={agentName} placeholder="Ej. Ana Torres" onChangeText={setAgentName} />
        <FormField label="Cliente atendido" value={clientName} placeholder="Ej. Carla Díaz" onChangeText={setClientName} />
        <FormField label="Campaña asociada" value={campaignName} placeholder="Ej. Fidelización" onChangeText={setCampaignName} />
        <FormField label="Notas del seguimiento" value={notes} placeholder="Detalle del avance o requerimiento" multiline onChangeText={setNotes} />
        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar seguimiento de llamada</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.lg },
  title: { fontSize: 24, fontWeight: '700', color: theme.colors.text },
  subtitle: { color: theme.colors.muted, marginBottom: theme.spacing.lg },
  button: { backgroundColor: theme.colors.primary, paddingVertical: theme.spacing.md, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
});
