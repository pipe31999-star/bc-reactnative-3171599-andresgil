import React from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { useAgent } from '../hooks/useAgents'
import { COLORS, SPACING, TYPOGRAPHY } from '../theme'

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'>

const statusColors: Record<string, string> = {
  active: COLORS.success,
  busy: COLORS.warning,
  offline: COLORS.textSecondary,
}

export default function DetailScreen({ route }: Props) {
  const { id } = route.params
  const { data: agent, isLoading, isError, refetch } = useAgent(id)

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Cargando detalle...</Text>
      </View>
    )
  }

  if (isError || !agent) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorIcon}>⚠</Text>
        <Text style={styles.errorText}>Error al cargar el agente</Text>
        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.name}>{agent.name}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusColors[agent.status] || COLORS.textSecondary },
          ]}
        >
          <Text style={styles.statusText}>{agent.status}</Text>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Rol</Text>
        <Text style={styles.value}>{agent.role}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Departamento</Text>
        <Text style={styles.value}>{agent.department}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Teléfono</Text>
        <Text style={styles.value}>{agent.phone}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{agent.email}</Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Registrado</Text>
        <Text style={styles.value}>
          {new Date(agent.createdAt).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: SPACING.lg,
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    marginTop: SPACING.sm,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: SPACING.md,
  },
  errorText: {
    ...TYPOGRAPHY.subtitle,
    color: COLORS.error,
    marginBottom: SPACING.md,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
  },
  retryText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  name: {
    ...TYPOGRAPHY.title,
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: SPACING.sm + 4,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  statusText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  field: {
    backgroundColor: COLORS.card,
    padding: SPACING.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.sm,
  },
  label: {
    ...TYPOGRAPHY.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    ...TYPOGRAPHY.body,
    fontSize: 16,
  },
})
