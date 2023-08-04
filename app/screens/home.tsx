import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { supabase } from '../lib/supabase';
import { useEffect } from 'react';

export default function Home(props) {
  const { navigation } = props;
  const { session } = props.route.params;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  }

  return (
    <View className="px-2 pt-4 bg-gray-700 h-full">
      <TouchableOpacity className="bg-red-600 p-2 rounded-md relative z-[-10]" onPress={() => {
        navigation.navigate('Probation Report');
      }}>
        <Text className="text-white text-center">Probation Report</Text>
      </TouchableOpacity>
      <TouchableOpacity className="bg-red-600 p-2 rounded-md relative z-[-10] mt-4" onPress={handleSignOut}>
        <Text className="text-white text-center">Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
