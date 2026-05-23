import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { HomeStackParamList } from '../navigation/types';
import { CAMPAIGNS } from '../data/mockData';
import { THEME } from '../theme';
import { useCampaignStore } from '../stores/savedStore';
import { useDetailStore } from '../stores/itemsStore';
import { Bookmark, BookmarkPlus, ShieldCheck, Users, Target, Activity } from 'lucide-react-native';

type DetailRouteProp = RouteProp<HomeStackParamList, 'CampaignDetail'>;

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { campaignId } = route.params;
  const { savedCampaigns, addCampaign, removeCampaign } = useCampaignStore();
  const { setSelectedCampaign } = useDetailStore();

  const campaign = CAMPAIGNS.find((c) => c.id === campaignId);
  const isSaved = savedCampaigns.some((c) => c.id === campaignId);

  useEffect(() => {
    if (campaign) {
      setSelectedCampaign(campaign);
    }
    return () => setSelectedCampaign(null);
  }, [campaign]);

  if (!campaign) {
    return (
      <View style={styles.centered}>
        <Text>Campaign not found</Text>
      </View>
    );
  }

  const handleToggleSave = () => {
    if (isSaved) {
      removeCampaign(campaign.id);
    } else {
      addCampaign(campaign);
    }
  };

  return (
    <ScrollView style={styles.container} bounces={false}>
      <Image source={{ uri: campaign.image }} style={styles.image} />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.category}>{campaign.category.toUpperCase()}</Text>
            <Text style={styles.title}>{campaign.name}</Text>
          </View>
          <TouchableOpacity 
            style={[styles.saveFab, isSaved && styles.saveFabActive]} 
            onPress={handleToggleSave}
          >
            {isSaved ? (
              <Bookmark color="#fff" size={24} fill="#fff" />
            ) : (
              <BookmarkPlus color={THEME.colors.primary} size={24} />
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Activity color={THEME.colors.primary} size={20} />
            <Text style={styles.statLabel}>Success</Text>
            <Text style={styles.statValue}>{campaign.successRate}%</Text>
          </View>
          <View style={styles.statItem}>
            <ShieldCheck color={THEME.colors.success} size={20} />
            <Text style={styles.statLabel}>Status</Text>
            <Text style={styles.statValue}>{campaign.status}</Text>
          </View>
          <View style={styles.statItem}>
            <Users color={THEME.colors.secondary} size={20} />
            <Text style={styles.statLabel}>Type</Text>
            <Text style={styles.statValue}>{campaign.type}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Campaign</Text>
          <Text style={styles.description}>{campaign.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Audience</Text>
          <View style={styles.targetBox}>
            <Target color={THEME.colors.textSecondary} size={20} />
            <Text style={styles.targetText}>{campaign.targetAudience}</Text>
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.mainButton, isSaved ? styles.removeBtn : styles.addBtn]}
          onPress={handleToggleSave}
        >
          <Text style={styles.mainButtonText}>
            {isSaved ? 'Remove from My List' : 'Add to My List'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: THEME.spacing.lg,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: THEME.spacing.lg,
  },
  category: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.primary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: THEME.colors.text,
  },
  saveFab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    ...THEME.shadow.medium,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  saveFabActive: {
    backgroundColor: THEME.colors.saved,
    borderColor: THEME.colors.saved,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.xl,
    padding: THEME.spacing.md,
    backgroundColor: THEME.colors.background,
    borderRadius: THEME.borderRadius.lg,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    marginVertical: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.text,
  },
  section: {
    marginBottom: THEME.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: THEME.colors.text,
    marginBottom: THEME.spacing.sm,
  },
  description: {
    fontSize: 16,
    color: THEME.colors.textSecondary,
    lineHeight: 24,
  },
  targetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: THEME.spacing.md,
    backgroundColor: '#f1f5f9',
    borderRadius: THEME.borderRadius.md,
  },
  targetText: {
    marginLeft: 10,
    fontSize: 15,
    color: THEME.colors.text,
    fontWeight: '500',
  },
  mainButton: {
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.lg,
    alignItems: 'center',
    marginTop: THEME.spacing.md,
  },
  addBtn: {
    backgroundColor: THEME.colors.primary,
  },
  removeBtn: {
    backgroundColor: THEME.colors.error,
  },
  mainButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
