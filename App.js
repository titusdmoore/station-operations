import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [ formData, setFormData ] = useState({
    firstName: '',
    lastName: '',
    typeIssue: { label: 'Select Issue Type', value: '' }, 
    issueDescription: '',
    personInvolved: { label: 'Select Person Involved', value: '' },
  });
  const [ typeIssueSelectIsOpened, setTypeIssueSelectIsOpened ] = useState(false);
  const [ personInvolvedSelectIsOpened, setPersonInvolvedSelectIsOpened ] = useState(false);

  const renderOptions = (options, property, selectVisibility) => {
    return options.map((option) => {
      return (
        <TouchableOpacity key={option.value} onPress={() => {
          let newVal = { ...formData }; 
          newVal[property] = option;

          setFormData(newVal);
          selectVisibility(false);
        }}>
          <Text>{option.label}</Text>
        </TouchableOpacity>
      );
    })
  }

  return (
    <SafeAreaView className="mt-16 px-2 bg-gray-700 h-full">
      <Text className="text-2xl text-white">Franklin Township Probationary Reporting</Text>
      <View className="mt-4">
        <Text className="text-white text-xl mb-2">Name</Text>
        <View className="d-flex flex-row w-full">
          <TextInput placeholder="First" placeholderTextColor={'white'} onChange={(e) => {
            setFormData({
              ...formData,
              firstName: e.target.value
            })
          }} value={formData.firstName} className="border-[1px] mr-1 border-white rounded-md flex-1 p-2 text-white" /> 
          <TextInput placeholder="Last" placeholderTextColor={'white'} onChange={(e) => {
            setFormData({
              ...formData,
              lastName: e.target.value
            })
          }} value={formData.lastName} className="border-[1px] border-white ml-1 rounded-md flex-1 p-2 text-white" /> 
        </View>
      </View>
      <View className="mt-4">
        <Text className="text-white text-xl mb-2">Issue Information</Text>
        <View className="d-flex flex-row w-full">
          <TouchableOpacity className="flex-1 relative" onPress={() => { setTypeIssueSelectIsOpened(!typeIssueSelectIsOpened) }}>
            <View className="border-[1px] border-white rounded-md p-2 text-white mr-1">
              <Text className="text-white">{formData.typeIssue.label}</Text>
            </View>
            {
              typeIssueSelectIsOpened ? (
                <View className="bg-white rounded-md p-2 mr-1 absolute top-full left-0 z-[150] w-full">
                  {renderOptions([
                    { label: 'Select Issue Type', value: '' },
                    { label: 'Conduct Unbecoming', value: 'conduct-unbecoming' },
                    { label: 'Gross Negligence', value: 'gross-negligence' },
                  ], 'typeIssue', setTypeIssueSelectIsOpened)}
                </View>
              ) : null 
            }
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 relative" onPress={() => { setPersonInvolvedSelectIsOpened(!personInvolvedSelectIsOpened) }}>
            <View className="border-[1px] border-white rounded-md p-2 text-white ml-1">
              <Text className="text-white">{formData.personInvolved.label}</Text>
            </View>
            {
              personInvolvedSelectIsOpened ? (
                <View className="bg-white rounded-md p-2 ml-1 absolute top-full left-0 z-50 w-full">
                  {renderOptions([
                    { label: 'Select Person Involved', value: '' },
                    { label: 'Seth Adams', value: 'seth-adams' },
                  ], 'personInvolved', setPersonInvolvedSelectIsOpened)}
                </View>
              ) : null 
            }
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-2 relative z-[-100]">
        <TextInput placeholder="Description of the issue..." placeholderTextColor={'white'} editable={false} onChange={(e) => {
          setFormData({
            ...formData,
            issueDescription: e.target.value
          })
        }} value={formData.issueDescription} className="border-[1px] border-white rounded-md p-2 pb-16 text-white relative z-[-100]" /> 
      </View>
      <TouchableOpacity className="bg-red-600 p-2 rounded-md mt-2 relative z-[-10]">
        <Text className="text-white text-center">Submit</Text>
      </TouchableOpacity>
      <StatusBar style="auto" backgroundColor='red' />
    </SafeAreaView>
  );
}

