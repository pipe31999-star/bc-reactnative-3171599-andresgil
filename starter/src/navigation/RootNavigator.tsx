import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomeStackParamList, RootTabParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import SavedScreen from '../screens/SavedScreen';
import { THEME } from '../theme';
import { LayoutGrid, Bookmark, Info } from 'lucide-react-native';
import { useCampaignStore } from '../stores/savedStore';

const Stack = createStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: THEME.colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="HomeList" 
        component={HomeScreen} 
        options={{ title: 'Campaigns' }} 
      />
      <Stack.Screen 
        name="CampaignDetail" 
        component={DetailScreen} 
        options={{ title: 'Campaign Details' }} 
      />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const savedCount = useCampaignStore((state) => state.savedCampaigns.length);

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'HomeStack') {
              return <LayoutGrid color={color} size={size} />;
            } else if (route.name === 'Saved') {
              return <Bookmark color={color} size={size} />;
            }
            return <Info color={color} size={size} />;
          },
          tabBarActiveTintColor: THEME.colors.primary,
          tabBarInactiveTintColor: THEME.colors.textSecondary,
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="HomeStack" 
          component={HomeStackNavigator} 
          options={{ title: 'Explore' }} 
        />
        <Tab.Screen 
          name="Saved" 
          component={SavedScreen} 
          options={{ 
            title: 'My List',
            tabBarBadge: savedCount > 0 ? savedCount : undefined,
            tabBarBadgeStyle: { backgroundColor: THEME.colors.accent },
            headerShown: true,
            headerStyle: { backgroundColor: THEME.colors.primary },
            headerTintColor: '#fff',
          }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
