import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaScreen from './src/screens/ListaScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Lista"
          component={ListaScreen}
          options={{ title: 'Minhas Despesas' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}