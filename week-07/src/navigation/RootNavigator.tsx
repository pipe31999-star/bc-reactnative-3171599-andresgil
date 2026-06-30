import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { HomeScreen } from '../screens/HomeScreen';
import { CreateScreen } from '../screens/CreateScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import type { RootStackParamList } from './types';

const Tab = createBottomTabNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'Agenda' }} />
        <Tab.Screen name="Create" component={CreateScreen} options={{ title: 'Nuevo' }} />
        <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'Ajustes' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
