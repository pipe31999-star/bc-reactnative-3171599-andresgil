import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import ItemCard from '../components/ItemCard';
import { mockAgents } from '../data/mockData';
import { Agent } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme';

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // useMemo para la lógica de filtrado
  const filteredAgents = useMemo<Agent[]>(() => {
    if (!searchQuery.trim()) {
      return mockAgents;
    }

    const lowerCaseQuery = searchQuery.toLowerCase();
    return mockAgents.filter((agent) => {
      return (
        agent.name.toLowerCase().includes(lowerCaseQuery) ||
        agent.phone.toLowerCase().includes(lowerCaseQuery) ||
        agent.status.toLowerCase().includes(lowerCaseQuery)
      );
    });
  }, [searchQuery]);

  // useCallback para renderItem
  const renderItem = useCallback<
    (info: { item: Agent; index: number }) => JSX.Element
  >(({ item }) => <ItemCard item={item} />, []);

  // useCallback para el keyExtractor
  const keyExtractor = useCallback((item: Agent) => item.id, []);

  // useCallback para el componente de estado vacío
  const renderEmptyState = useCallback(() => {
    if (searchQuery.trim() === '') {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Sin resultados</Text>
        <Text style={styles.emptyText}>
          No se encontraron agentes que coincidan con "{searchQuery}"
        </Text>
      </View>
    );
  }, [searchQuery]);

  // useCallback para el separador
  const renderSeparator = useCallback(
    () => <View style={styles.separator} />,
    []
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Call Center</Text>
        <Text style={styles.subtitle}>Gestión de Agentes</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar agente, teléfono o estado..."
          placeholderTextColor={COLORS.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
      </View>

      <FlatList<Agent>
        data={filteredAgents}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={renderEmptyState}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: SPACING.md,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    ...TYPOGRAPHY.heading1,
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
  },
  searchContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.surface,
  },
  searchInput: {
    backgroundColor: COLORS.background,
    borderRadius: BORDER_RADIUS.lg,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  listContent: {
    paddingVertical: SPACING.md,
    flexGrow: 1,
  },
  separator: {
    height: 0,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
  },
  emptyTitle: {
    ...TYPOGRAPHY.heading2,
    color: COLORS.text,
    marginBottom: SPACING.md,
    textAlign: 'center',
  },
  emptyText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
