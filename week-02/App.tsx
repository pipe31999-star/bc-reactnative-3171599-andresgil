import React from 'react';
import { SafeAreaView } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import { COLORS } from './src/theme';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <HomeScreen />
    </SafeAreaView>
  );
}
