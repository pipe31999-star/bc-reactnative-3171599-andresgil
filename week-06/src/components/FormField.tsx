import React from 'react';
import { Control, Controller, FieldPath } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { AgentFormData } from '../schemas/itemSchema';

type FormFieldProps = {
  control: Control<AgentFormData>;
  name: FieldPath<AgentFormData>;
  label: string;
  placeholder?: string;
  keyboardType?: 'default' | 'number-pad' | 'decimal-pad';
  secureTextEntry?: boolean;
};

export function FormField({
  control,
  name,
  label,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
}: FormFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            style={[styles.input, error ? styles.inputError : null]}
            placeholder={placeholder}
            value={typeof value === 'number' ? String(value) : value ?? ''}
            onChangeText={(text) => onChange(name === 'calls' ? Number(text) || 0 : text)}
            onBlur={onBlur}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
          />
          {error ? <Text style={styles.errorText}>{error.message}</Text> : null}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 12 },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 6, color: '#1f2937' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  inputError: { borderColor: '#dc2626' },
  errorText: { color: '#dc2626', marginTop: 4, fontSize: 12 },
});
