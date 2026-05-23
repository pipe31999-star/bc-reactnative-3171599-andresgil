import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Dimensions 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../navigation/types';
import { CAMPAIGNS } from '../data/mockData';
import { THEME } from '../theme';
import { useCampaignStore } from '../stores/savedStore';
import { Bookmark, BookmarkPlus, ArrowRight } from 'lucide-react-native';
import { Campaign } from '../types';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'HomeList'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { savedCampaigns, addCampaign, removeCampaign } = useCampaignStore();

  const isSaved = (id: string) => savedCampaigns.some((c) => c.id === id);

  const toggleSave = (campaign: Campaign) => {
    if (isSaved(campaign.id)) {
      removeCampaign(campaign.id);
    } else {
      addCampaign(campaign);
    }
  };

  const renderItem = ({ item }: { item: Campaign }) => {
    const saved = isSaved(item.id);
    
    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('CampaignDetail', { campaignId: item.id })}
        activeOpacity={0.9}
      >
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.cardContent}>
          <View style={styles.headerRow}>
            <Text style={styles.category}>{item.category.toUpperCase()}</Text>
            <TouchableOpacity onPress={() => toggleSave(item)} style={styles.saveButton}>
              {saved ? (
                <Bookmark color={THEME.colors.saved} size={20} fill={THEME.colors.saved} />
              ) : (
                <BookmarkPlus color={THEME.colors.textSecondary} size={20} />
              )}
            </TouchableOpacity>
          </View>
          
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description} numberOfLines={2}>{item.description}</Text>
          
          <View style={styles.footerRow}>
            <View style={[styles.badge, { backgroundColor: item.type === 'Inbound' ? '#dcfce7' : '#fef9c3' }]}>
              <Text style={[styles.badgeText, { color: item.type === 'Inbound' ? '#166534' : '#854d0e' }]}>
                {item.type}
              </Text>
            </View>
            <View style={styles.stats}>
              <Text style={styles.statsLabel}>Success: </Text>
              <Text style={styles.statsValue}>{item.successRate}%</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={CAMPAIGNS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <Text style={styles.welcome}>Welcome back, Manager</Text>
            <Text style={styles.subtitle}>Explore current call center campaigns</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  list: {
    padding: THEME.spacing.md,
  },
  header: {
    marginBottom: THEME.spacing.lg,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '800',
    color: THEME.colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: THEME.colors.textSecondary,
    marginTop: THEME.spacing.xs,
  },
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.borderRadius.lg,
    marginBottom: THEME.spacing.md,
    overflow: 'hidden',
    ...THEME.shadow.medium,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardContent: {
    padding: THEME.spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.xs,
  },
  category: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.primary,
    letterSpacing: 1,
  },
  saveButton: {
    padding: THEME.spacing.xs,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.text,
    marginBottom: THEME.spacing.xs,
  },
  description: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    lineHeight: 20,
    marginBottom: THEME.spacing.md,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: 2,
    borderRadius: THEME.borderRadius.sm,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsLabel: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
  },
  statsValue: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.success,
  },
});
