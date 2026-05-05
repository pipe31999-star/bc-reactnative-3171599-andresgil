import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Agent } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, BORDER_RADIUS } from '../theme';

interface ItemCardProps {
  item: Agent;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const getStatusColor = (status: Agent['status']): string => {
    switch (status) {
      case 'available':
        return COLORS.available;
      case 'busy':
        return COLORS.busy;
      case 'offline':
        return COLORS.offline;
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusLabel = (status: Agent['status']): string => {
    switch (status) {
      case 'available':
        return 'Disponible';
      case 'busy':
        return 'Ocupado';
      case 'offline':
        return 'Sin conexión';
      default:
        return status;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{item.name}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{getStatusLabel(item.status)}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.label}>Teléfono:</Text>
          <Text style={styles.value}>{item.phone}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Llamadas gestionadas:</Text>
          <Text style={styles.value}>{item.calls_handled}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.surface,
    borderRadius: BORDER_RADIUS.lg,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.sm,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  name: {
    ...TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.md,
    marginLeft: SPACING.md,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.surface,
    fontWeight: 'bold',
  },
  content: {
    gap: SPACING.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  value: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.text,
    fontWeight: '500',
  },
});

export default ItemCard;
