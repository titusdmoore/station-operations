import { View, Text, TextInput, Pressable } from 'react-native';
import { useState, useEffect } from 'react'; 
import type { ICredentials } from '../lib/types';
import { login } from '../lib/supabase';

export default function LoginScreen({ navigation }) {
  const [ credentials, setCredentials ] = useState({ email: '', password: '' });
  const [ isLoading, setIsLoading ] = useState<boolean>(false);

  const handleLogin = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const res = await login(credentials);

    if (res !== true) {
      console.log(res)
      alert("Login failed. Please try again.");
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
      <TextInput className="border-[1px] border-white p-2 rounded-md text-white" placeholder="Email Address" placeholderTextColor={'white'} textContentType='emailAddress' autoCapitalize='none' onChangeText={(val) => {
        setCredentials({ ...credentials, email: val });
      }}/> 
      <TextInput className="border-[1px] border-white mt-4 p-2 rounded-md text-white" textContentType='password' placeholder="Password" placeholderTextColor={'white'} secureTextEntry={true} autoCapitalize='none' onChangeText={(val) => {
        setCredentials({ ...credentials, password: val });
      }} /> 
      <Pressable className="bg-red-600 p-2 rounded-md relative z-[-10] mt-4" disabled={isLoading} onPress={handleLogin}> 
        <Text className="text-white text-center">Login</Text>
      </Pressable>
    </View>
  );
}
