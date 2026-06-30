import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { RootStackParamList } from './types'
import HomeScreen from '../screens/HomeScreen'
import DetailScreen from '../screens/DetailScreen'
import CreateScreen from '../screens/CreateScreen'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#2563EB' },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: { fontWeight: '700' },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Call Center' }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{ title: 'Detalle del Agente' }}
      />
      <Stack.Screen
        name="Create"
        component={CreateScreen}
        options={{ title: 'Nuevo Agente' }}
      />
    </Stack.Navigator>
  )
}
