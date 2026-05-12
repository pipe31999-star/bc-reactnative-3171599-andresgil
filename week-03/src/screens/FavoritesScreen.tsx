import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FAVORITE_AGENTS } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen: React.FC = () => {
  const renderFavorite = ({ item }: { item: typeof FAVORITE_AGENTS[0] }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color={COLORS.warning} />
          <Ionicons name="star" size={16} color={COLORS.warning} />
          <Ionicons name="star" size={16} color={COLORS.warning} />
          <Ionicons name="star" size={16} color={COLORS.warning} />
          <Ionicons name="star" size={16} color={COLORS.warning} />
          <Text style={styles.ratingText}>Top Performer</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.iconButton}>
        <Ionicons name="heart" size={24} color={COLORS.danger} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Top Agents</Text>
        <Text style={styles.subtitle}>Our most efficient team members</Text>
      </View>
      <FlatList
        data={FAVORITE_AGENTS}
        keyExtractor={(item) => item.id}
        renderItem={renderFavorite}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SPACING.lg,
    paddingTop: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    marginTop: 4,
  },
  list: {
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: SPACING.md,
  },
  content: {
    flex: 1,
  },
  name: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text,
  },
  role: {
    ...TYPOGRAPHY.caption,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
    fontSize: 12,
    color: COLORS.success,
    fontWeight: 'bold',
  },
  iconButton: {
    padding: SPACING.sm,
  },
});

export default FavoritesScreen;
