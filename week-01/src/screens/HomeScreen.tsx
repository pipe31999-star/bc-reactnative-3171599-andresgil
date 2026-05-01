import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import ItemCard from '../components/ItemCard';
import {
  agentsMockData,
  callsMockData,
  clientsMockData,
  campaignsMockData,
} from '../data/mockData';
import { Agent, Call, Client, Campaign } from '../types';

const HomeScreen: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleCardPress = (item: Agent | Call | Client | Campaign) => {
    const itemId = (item as any).id;
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Centro Call Center</Text>
        <Text style={styles.headerSubtitle}>Gestión de Agentes, Llamadas, Clientes y Campañas</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={true}
      >
        {/* Sección Agentes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Agentes</Text>
          {agentsMockData.map((agent) => (
            <ItemCard
              key={agent.id}
              item={agent}
              type="agent"
              onPress={handleCardPress}
            />
          ))}
        </View>

        {/* Sección Llamadas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📞 Llamadas</Text>
          {callsMockData.map((call) => (
            <ItemCard
              key={call.id}
              item={call}
              type="call"
              onPress={handleCardPress}
            />
          ))}
        </View>

        {/* Sección Clientes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Clientes</Text>
          {clientsMockData.map((client) => (
            <ItemCard
              key={client.id}
              item={client}
              type="client"
              onPress={handleCardPress}
            />
          ))}
        </View>

        {/* Sección Campañas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Campañas</Text>
          {campaignsMockData.map((campaign) => (
            <ItemCard
              key={campaign.id}
              item={campaign}
              type="campaign"
              onPress={handleCardPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: '#D1D5DB',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginLeft: 16,
    marginBottom: 10,
  },
});

export default HomeScreen;
