import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View className="px-2 pt-4 bg-gray-700 h-full">
      <TouchableOpacity className="bg-red-600 p-2 rounded-md relative z-[-10]" onPress={() => {
        navigation.navigate('Probation Report');
      }}>
        <Text className="text-white text-center">Probation Report</Text>
      </TouchableOpacity>
    </View>
  )
}
