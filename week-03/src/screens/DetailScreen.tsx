import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MOCK_AGENTS } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';
import { HomeStackParamList } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

const DetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'AgentDetail'>>();
  const { id } = route.params;
  
  const agent = MOCK_AGENTS.find(a => a.id === id);

  if (!agent) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Agent not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: agent.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{agent.name}</Text>
        <Text style={styles.role}>{agent.role} Agent</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(agent.status) }]}>
          <Text style={styles.statusText}>{agent.status}</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <StatCard icon="call" label="Calls Today" value={agent.callsToday.toString()} color={COLORS.primary} />
        <StatCard icon="time" label="Experience" value={agent.experience} color={COLORS.success} />
        <StatCard icon="business" label="Department" value={agent.department} color={COLORS.warning} />
      </View>

      <View style={styles.detailsSection}>
        <DetailItem label="Email" value={agent.email} icon="mail-outline" />
        <DetailItem label="Extension" value={agent.extension} icon="phone-portrait-outline" />
        <DetailItem label="Current Shift" value="08:00 AM - 05:00 PM" icon="time-outline" />
      </View>

      <TouchableOpacity style={styles.callButton}>
        <Ionicons name="call" size={24} color={COLORS.background} />
        <Text style={styles.callButtonText}>Contact Agent</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const StatCard = ({ icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <View style={styles.statCard}>
    <Ionicons name={icon} size={24} color={color} />
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const DetailItem = ({ label, value, icon }: { label: string, value: string, icon: any }) => (
  <View style={styles.detailItem}>
    <Ionicons name={icon} size={20} color={COLORS.textSecondary} style={styles.detailIcon} />
    <View>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  </View>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Available': return COLORS.success;
    case 'On Call': return COLORS.warning;
    case 'Busy': return COLORS.danger;
    default: return COLORS.textSecondary;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  errorText: {
    ...TYPOGRAPHY.body,
    color: COLORS.danger,
  },
  header: {
    alignItems: 'center',
    padding: SPACING.xl,
    backgroundColor: COLORS.card,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: SPACING.md,
    borderWidth: 4,
    borderColor: COLORS.primary,
  },
  name: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
  },
  role: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  statusBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: COLORS.text,
    fontWeight: 'bold',
    fontSize: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    marginTop: -SPACING.lg,
  },
  statCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.md,
    alignItems: 'center',
    width: '30%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  statValue: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
    marginTop: SPACING.xs,
  },
  statLabel: {
    ...TYPOGRAPHY.caption,
    textAlign: 'center',
  },
  detailsSection: {
    padding: SPACING.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  detailIcon: {
    marginRight: SPACING.md,
  },
  detailLabel: {
    ...TYPOGRAPHY.caption,
  },
  detailValue: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
    fontWeight: '500',
  },
  callButton: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: SPACING.lg,
    padding: SPACING.md,
    borderRadius: 12,
  },
  callButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: SPACING.sm,
  },
});

export default DetailScreen;
