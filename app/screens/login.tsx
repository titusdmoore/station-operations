import { View, Text, TextInput, Pressable, ActivityIndicator } from 'react-native';
import IndicatorPressable from '../components/IndicatorPressable';
import { useState, useEffect, useRef } from 'react'; 
import type { ICredentials } from '../lib/types';
import { login } from '../lib/supabase';
import Svg, { Circle, Path } from 'react-native-svg';

export default function LoginScreen({ navigation }) {
  const [ credentials, setCredentials ] = useState({ email: '', password: '' });
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ errors, setErrors ] = useState<string | null>(null);

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const res = await login(credentials);

    if (res !== true) {
      console.log(res)
      setErrors("Sorry, we couldn't log you in. Please try again.");
      setIsLoading(false);

      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      e.preventDefault();
    });
  }, [])

  return (
    <View className="px-2 pt-4 bg-gray-700 h-full">
      { errors ? (
        <View className="flex flex-row justify-center bg-red-500 mb-4 rounded-md px-4 py-2">
          <Text className="text-white text-md">{ errors }</Text>
        </View>
      ) : null }
      <TextInput className="border-[1px] border-white p-2 rounded-md text-white" placeholder="Email Address" placeholderTextColor={'white'} textContentType='emailAddress' autoCapitalize='none' onChangeText={(val) => {
        setCredentials({ ...credentials, email: val });
      }}/> 
      <TextInput className="border-[1px] border-white mt-4 p-2 rounded-md text-white" textContentType='password' placeholder="Password" placeholderTextColor={'white'} secureTextEntry={true} autoCapitalize='none' onChangeText={(val) => {
        setCredentials({ ...credentials, password: val });
      }} /> 
      <IndicatorPressable isLoading={isLoading} onPress={handleLogin} className="mt-4">
        <Text className="text-white text-center">Login</Text>
      </IndicatorPressable>
    </View>
  );
}
