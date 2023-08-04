import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { Session } from '@supabase/supabase-js';
import { supabase } from './lib/supabase';

import Home from './screens/home'; 
import ProbationReport from './screens/probation-report'; 
import LoginScreen from './screens/login'; 

const Stack = createStackNavigator();

export default function AppStack() {
  const [ session, setSession ] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session }}) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

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
        { session && session.user ? (
          <>
            <Stack.Screen name="Station Operations" component={Home} initialParams={{ session }} />
            <Stack.Screen name="Probation Report" component={ProbationReport} initialParams={{ session }} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{
            headerLeft: () => null,
          }} />
        )}
      </Stack.Navigator>

      <StatusBar style="light" />
    </NavigationContainer>
  );
}
