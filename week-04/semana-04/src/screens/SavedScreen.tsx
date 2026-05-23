import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  SafeAreaView 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from '../navigation/types';
import { THEME } from '../theme';
import { useCampaignStore } from '../stores/savedStore';
import { Trash2, ChevronRight, Inbox } from 'lucide-react-native';
import { Campaign } from '../types';

type NavigationProp = BottomTabNavigationProp<RootTabParamList, 'Saved'>;

export default function SavedScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { savedCampaigns, removeCampaign, clearAll } = useCampaignStore();

  const renderItem = ({ item }: { item: Campaign }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.thumbnail} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.subtitle}>{item.type} • {item.category}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeBtn} 
        onPress={() => removeCampaign(item.id)}
      >
        <Trash2 color={THEME.colors.error} size={20} />
      </TouchableOpacity>
    </View>
  );

  if (savedCampaigns.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Inbox color={THEME.colors.textSecondary} size={64} strokeWidth={1} />
        <Text style={styles.emptyTitle}>Your list is empty</Text>
        <Text style={styles.emptySubtitle}>Save campaigns to access them quickly later.</Text>
        <TouchableOpacity 
          style={styles.exploreBtn}
          onPress={() => navigation.navigate('HomeStack', { screen: 'HomeList' })}
        >
          <Text style={styles.exploreText}>Explore Campaigns</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.count}>{savedCampaigns.length} items saved</Text>
        <TouchableOpacity onPress={clearAll}>
          <Text style={styles.clearText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={savedCampaigns}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  count: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textSecondary,
  },
  clearText: {
    fontSize: 14,
    color: THEME.colors.error,
    fontWeight: '600',
  },
  list: {
    padding: THEME.spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: THEME.spacing.sm,
    borderRadius: THEME.borderRadius.md,
    marginBottom: THEME.spacing.sm,
    ...THEME.shadow.light,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: THEME.borderRadius.sm,
  },
  info: {
    flex: 1,
    marginLeft: THEME.spacing.md,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  removeBtn: {
    padding: THEME.spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.xl,
    backgroundColor: THEME.colors.background,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: THEME.colors.text,
    marginTop: THEME.spacing.md,
  },
  emptySubtitle: {
    fontSize: 15,
    color: THEME.colors.textSecondary,
    textAlign: 'center',
    marginTop: THEME.spacing.xs,
    marginBottom: THEME.spacing.xl,
  },
  exploreBtn: {
    backgroundColor: THEME.colors.primary,
    paddingHorizontal: THEME.spacing.xl,
    paddingVertical: THEME.spacing.md,
    borderRadius: THEME.borderRadius.full,
  },
  exploreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
