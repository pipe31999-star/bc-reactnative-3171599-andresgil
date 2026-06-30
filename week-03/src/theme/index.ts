export const COLORS = {
  primary: '#61DAFB', // React Blue as requested
  secondary: '#1A2B48', // Deep Navy
  background: '#0F172A', // Slate Dark
  card: '#1E293B', // Lighter Slate
  text: '#F8FAFC', // Near White
  textSecondary: '#94A3B8', // Muted Slate
  success: '#10B981', // Emerald
  warning: '#F59E0B', // Amber
  danger: '#EF4444', // Red
  border: '#334155',
};

export const TYPOGRAPHY = {
  h1: {
    fontSize: 24,
    fontWeight: '700' as const,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600' as const,
  },
  body: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400' as const,
    color: COLORS.textSecondary,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
