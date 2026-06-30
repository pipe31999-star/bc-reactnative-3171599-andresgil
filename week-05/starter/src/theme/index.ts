export const COLORS = {
  primary: '#2563EB',
  error: '#DC2626',
  success: '#16A34A',
  warning: '#F59E0B',
  background: '#F8FAFC',
  card: '#FFFFFF',
  text: '#1E293B',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  white: '#FFFFFF',
}

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
}

export const TYPOGRAPHY = {
  title: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: COLORS.text,
  },
  body: {
    fontSize: 14,
    color: COLORS.text,
  },
  caption: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
}
