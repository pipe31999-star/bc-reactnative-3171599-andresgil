import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MOCK_AGENTS } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';
import { HomeStackScreenProps } from '../navigation/types';
import { Agent } from '../types';

const HomeScreen: React.FC<HomeStackScreenProps<'AgentList'>> = ({ navigation }) => {
  const renderAgent = ({ item }: { item: Agent }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('AgentDetail', { id: item.id, name: item.name })}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role} • {item.department}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(item.status) }]} />
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.callsContainer}>
        <Text style={styles.callsNumber}>{item.callsToday}</Text>
        <Text style={styles.callsLabel}>Calls</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>ConnectFlow Agents</Text>
      <FlatList
        data={MOCK_AGENTS}
        keyExtractor={(item) => item.id}
        renderItem={renderAgent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const getStatusColor = (status: Agent['status']) => {
  switch (status) {
    case 'Available': return COLORS.success;
    case 'On Call': return COLORS.warning;
    case 'Busy': return COLORS.danger;
    case 'Offline': return COLORS.textSecondary;
    default: return COLORS.textSecondary;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: SPACING.xl,
  },
  headerTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.md,
  },
  listContent: {
    paddingHorizontal: SPACING.md,
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: SPACING.md,
  },
  info: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  role: {
    ...TYPOGRAPHY.caption,
    marginTop: 2,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SPACING.xs,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    fontSize: 12,
  },
  callsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: SPACING.sm,
  },
  callsNumber: {
    ...TYPOGRAPHY.h2,
    color: COLORS.primary,
  },
  callsLabel: {
    ...TYPOGRAPHY.caption,
    fontSize: 10,
    textTransform: 'uppercase',
  },
});

export default HomeScreen;
