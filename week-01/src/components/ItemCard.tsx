import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';
import { Agent, Call, Client, Campaign } from '../types';

type ItemCardProps = {
  item: Agent | Call | Client | Campaign;
  type: 'agent' | 'call' | 'client' | 'campaign';
  onPress: (item: Agent | Call | Client | Campaign) => void;
};

const ItemCard: React.FC<ItemCardProps> = ({ item, type, onPress }) => {
  const getCardContent = () => {
    switch (type) {
      case 'agent': {
        const agent = item as Agent;
        return {
          title: agent.name,
          subtitle: agent.role,
          tertiary: `Llamadas: ${agent.callsHandled}`,
          actionText: `Estado: ${agent.status}`,
        };
      }
      case 'call': {
        const call = item as Call;
        return {
          title: call.clientName,
          subtitle: `Duración: ${call.duration}`,
          tertiary: call.date,
          actionText: `Estado: ${call.status}`,
        };
      }
      case 'client': {
        const client = item as Client;
        return {
          title: client.name,
          subtitle: client.email,
          tertiary: `Miembro desde: ${client.joinDate}`,
          actionText: `Tipo: ${client.status}`,
        };
      }
      case 'campaign': {
        const campaign = item as Campaign;
        return {
          title: campaign.name,
          subtitle: campaign.description,
          tertiary: `Progreso: ${campaign.progress}%`,
          actionText: `Estado: ${campaign.status}`,
        };
      }
    }
  };

  const content = getCardContent();

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: (item as any).image }}
        style={styles.image}
      />
      
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {content.title}
        </Text>
        
        <Text style={styles.subtitle} numberOfLines={1}>
          {content.subtitle}
        </Text>
        
        <Text style={styles.tertiary} numberOfLines={1}>
          {content.tertiary}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.actionButton,
          pressed && styles.actionButtonPressed,
        ]}
        onPress={() => {
          onPress(item);
          Alert.alert(`${type === 'agent' ? 'Agente' : type === 'call' ? 'Llamada' : type === 'client' ? 'Cliente' : 'Campaña'}`, `${content.actionText}`);
        }}
      >
        <Text style={styles.actionText}>{content.actionText}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingRight: 8,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 3,
  },
  tertiary: {
    fontSize: 11,
    fontWeight: '400',
    color: '#9CA3AF',
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#3B82F6',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  actionButtonPressed: {
    opacity: 0.7,
    backgroundColor: '#1E40AF',
  },
  actionText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default ItemCard;
