import React, { useMemo, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { usePreferences } from '../hooks/usePreferences';
import { useItems } from '../hooks/useItems';
import { theme } from '../theme';
import type { CallCenterItem, SortOrder } from '../types';

export function HomeScreen() {
  const { sortOrder, compactMode, itemsPerPage } = usePreferences();
  const { items, offline } = useItems();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const sortedItems = useMemo(() => {
    const data = [...items];
    switch (sortOrder as SortOrder) {
      case 'name':
        return data.sort((a, b) => a.agentName.localeCompare(b.agentName));
      case 'status':
        return data.sort((a, b) => a.status.localeCompare(b.status));
      case 'recent':
      default:
        return data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  }, [items, sortOrder]);

  const visibleItems = useMemo(() => sortedItems.slice(0, itemsPerPage), [sortedItems, itemsPerPage]);

  const renderItem = ({ item }: { item: CallCenterItem }) => {
    const isSelected = selectedId === item.id;
    return (
      <Pressable onPress={() => setSelectedId(item.id)}>
        <View style={[styles.card, isSelected && styles.cardSelected, compactMode && styles.cardCompact]}>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{item.agentName}</Text>
            <Text style={styles.badge}>{item.status}</Text>
          </View>
          <Text style={styles.subtitle}>Cliente activo: {item.clientName}</Text>
          <Text style={styles.subtitle}>Campaña asignada: {item.campaignName}</Text>
          {!compactMode && (
            <>
              <Text style={styles.notes}>Prioridad de atención: {item.priority}</Text>
              <Text style={styles.notes}>Observación: {item.notes}</Text>
            </>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Panel de seguimiento</Text>
        <Text style={styles.headerSubtitle}>Control en tiempo real de llamadas, clientes y campañas</Text>
      </View>
      {offline ? (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>⚠️ Mostrando datos sin red</Text>
        </View>
      ) : null}
      <FlatList
        data={visibleItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No hay seguimientos registrados en este momento.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  header: { padding: theme.spacing.lg, backgroundColor: theme.colors.primary },
  headerTitle: { color: '#fff', fontSize: 24, fontWeight: '700' },
  headerSubtitle: { color: '#dbeafe', marginTop: 4 },
  banner: { backgroundColor: theme.colors.warning, padding: theme.spacing.sm, marginHorizontal: theme.spacing.md, marginTop: theme.spacing.sm, borderRadius: 10 },
  bannerText: { color: '#fff', fontWeight: '600' },
  listContent: { padding: theme.spacing.md },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  cardSelected: { borderColor: theme.colors.primary, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6 },
  cardCompact: { paddingVertical: theme.spacing.sm },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 16, fontWeight: '700', color: theme.colors.text },
  subtitle: { color: theme.colors.muted, marginTop: 4 },
  notes: { color: theme.colors.text, marginTop: 6 },
  badge: { backgroundColor: '#dbeafe', color: theme.colors.primary, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, fontSize: 12, fontWeight: '700' },
  empty: { textAlign: 'center', color: theme.colors.muted, marginTop: 24 },
});
