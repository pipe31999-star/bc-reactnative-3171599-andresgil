import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigation/types'
import { useCreateAgent } from '../hooks/useCreateAgent'
import { COLORS, SPACING, TYPOGRAPHY } from '../theme'

type Props = NativeStackScreenProps<RootStackParamList, 'Create'>

const ROLES = ['Agente', 'Supervisor', 'Manager']
const DEPARTMENTS = ['Ventas', 'Soporte Técnico', 'Retención', 'Cobranzas']
const STATUSES = ['active', 'offline', 'busy'] as const

export default function CreateScreen({ navigation }: Props) {
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [department, setDepartment] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string>('active')

  const mutation = useCreateAgent()

  const handleSubmit = () => {
    if (!name.trim() || !role || !department || !phone.trim() || !email.trim()) {
      Alert.alert('Error', 'Todos los campos son obligatorios')
      return
    }

    mutation.mutate(
      { name, role, department, phone, email, status: status as 'active' | 'offline' | 'busy' },
      {
        onSuccess: () => {
          Alert.alert('Éxito', 'Agente creado correctamente', [
            { text: 'OK', onPress: () => navigation.goBack() },
          ])
        },
        onError: () => {
          Alert.alert('Error', 'No se pudo crear el agente')
        },
      }
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ej: Juan Pérez"
        placeholderTextColor={COLORS.textSecondary}
      />

      <Text style={styles.label}>Rol</Text>
      <View style={styles.optionsRow}>
        {ROLES.map((r) => (
          <TouchableOpacity
            key={r}
            style={[styles.option, role === r && styles.optionSelected]}
            onPress={() => setRole(r)}
          >
            <Text style={[styles.optionText, role === r && styles.optionTextSelected]}>
              {r}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Departamento</Text>
      <View style={styles.optionsRow}>
        {DEPARTMENTS.map((d) => (
          <TouchableOpacity
            key={d}
            style={[styles.option, department === d && styles.optionSelected]}
            onPress={() => setDepartment(d)}
          >
            <Text style={[styles.optionText, department === d && styles.optionTextSelected]}>
              {d}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Teléfono</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Ej: +52 55 1234 5678"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ej: juan@callcenter.com"
        placeholderTextColor={COLORS.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={styles.label}>Estado</Text>
      <View style={styles.optionsRow}>
        {STATUSES.map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.option, status === s && styles.optionSelected]}
            onPress={() => setStatus(s)}
          >
            <Text style={[styles.optionText, status === s && styles.optionTextSelected]}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, mutation.isPending && styles.submitDisabled]}
        onPress={handleSubmit}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.submitText}>Crear Agente</Text>
        )}
      </TouchableOpacity>
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
  label: {
    ...TYPOGRAPHY.caption,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: SPACING.xs,
    marginTop: SPACING.md,
  },
  input: {
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    padding: SPACING.sm + 4,
    fontSize: 16,
    color: COLORS.text,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  option: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  optionSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  optionText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  optionTextSelected: {
    color: COLORS.white,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: SPACING.lg,
  },
  submitDisabled: {
    opacity: 0.6,
  },
  submitText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '700',
  },
})
