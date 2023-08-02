import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Home from './screens/home'; 
import ProbationReport from './screens/probation-report'; 

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
          headerStyle: {
            backgroundColor:'#191d24',
            borderBottomWidth: 0,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: '#fff',
          },
      }}
      >
        <Stack.Screen name="Station Operations" component={Home} />
        <Stack.Screen name="Probation Report" component={ProbationReport} />
      </Stack.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
