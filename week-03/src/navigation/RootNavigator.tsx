import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../theme';
import { RootTabParamList, HomeStackParamList } from './types';

// Screens
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.secondary },
        headerTintColor: COLORS.text,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen 
        name="AgentList" 
        component={HomeScreen} 
        options={{ title: 'Agents Dashboard' }} 
      />
      <Stack.Screen 
        name="AgentDetail" 
        component={DetailScreen} 
        options={({ route }) => ({ title: route.params.name })} 
      />
    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'Favorites',
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: COLORS.secondary,
          borderTopWidth: 0,
          elevation: 0,
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'help-circle';

          if (route.name === 'HomeStack') {
            iconName = 'people';
          } else if (route.name === 'Favorites') {
            iconName = 'star';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen 
        name="HomeStack" 
        component={HomeStack} 
        options={{ tabBarLabel: 'Agents' }} 
      />
      <Tab.Screen 
        name="Favorites" 
        component={FavoritesScreen} 
        options={{ 
          tabBarLabel: 'Top Performers',
          headerStyle: { backgroundColor: COLORS.secondary },
          headerTintColor: COLORS.text,
        }} 
      />
    </Tab.Navigator>
  );
};

export default RootNavigator;
