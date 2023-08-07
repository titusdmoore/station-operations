import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { supabase, getRoster, getIssueTypes } from '../lib/supabase';

export default function ProbationReport(props) {
  const { session } = props.route.params;
  const defaultFormData = {
    firstName: '',
    lastName: '',
    typeIssue: { label: 'Select Issue Type', value: '' }, 
    issueDescription: '',
    personInvolved: { label: 'Select Person Involved', value: '' },
  };
  const [ formData, setFormData ] = useState(defaultFormData);
  const [ typeIssueSelectIsOpened, setTypeIssueSelectIsOpened ] = useState(false);
  const [ personInvolvedSelectIsOpened, setPersonInvolvedSelectIsOpened ] = useState(false);
  const [ roster, setRoster ] = useState([]);
  const [ issueTypes, setIssueTypes ] = useState([]);
  const [ validInput, setValidInput ] = useState(false);
 
  const renderOptions = (options, property, selectVisibility) => {
    return options.map((option) => {
      return (
        <TouchableOpacity key={option.value} onPress={() => {
          let newVal = { ...formData }; 
          newVal[property] = option;

          setFormData(newVal);
          selectVisibility(false);
        }}>
          <Text className="p-2 text-md">{option.label}</Text>
        </TouchableOpacity>
      );
    })
  }

  const submitReport = async (sendEmail = true) => {
    const { data, error } = await supabase
      .from('reports')
      .insert([
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          typeIssue: formData.typeIssue.value,
          issueDescription: formData.issueDescription,
          personInvolved: formData.personInvolved.value,
        }
      ]).select(`
        firstName,
        lastName,
        typeIssue,
        issueDescription,
        roster (
          name
        )
      `);

    if (error) {
      console.log(error)
      return error;
    }

    if (sendEmail) {
      const res = await supabase.functions.invoke('send_report_email', {
        body: {
          ...data[0],
          typeIssue: formData.typeIssue.label,
          userEmail: session.user.email,
        }
      });
    }

    setFormData(defaultFormData);
    return data;
  }

  const evalValidInput = () => {
    let empty = Object.keys(formData).filter(key => {
      switch (key) {
        case 'personInvolved':
        case 'typeIssue':
          return formData[key].value === '';
        default:
          return formData[key] === '';
      }
    });

    return empty.length === 0;
  }

  useEffect(() => {
    setValidInput(evalValidInput());
  }, [formData])

  useEffect(() => {
    (async function() {
      let roster = await getRoster({ col: 'isProbationary', val: true });
      let issueTypes = await getIssueTypes();

      setRoster(roster);
      setIssueTypes(issueTypes);
    })();
  }, []);

  return (
    <ScrollView className="px-2 bg-gray-700 h-full pt-4">
      <View>
        <Text className="text-white text-xl mb-2">Name</Text>
        <View className="d-flex flex-row w-full">
          <TextInput placeholder="First" placeholderTextColor={'white'} onChangeText={(value) => {
            setFormData({
              ...formData,
              firstName: value
            })
          }} value={formData.firstName} className="border-[1px] mr-1 border-white rounded-md flex-1 p-2 text-white" /> 
          <TextInput placeholder="Last" placeholderTextColor={'white'} onChangeText={(value) => {
            setFormData({
              ...formData,
              lastName: value
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
                <ScrollView className="bg-white rounded-md p-2 mr-1 absolute top-full left-0 z-[150] w-full max-h-40">
                  {renderOptions([
                    { label: 'Select Issue Type', value: '' },
                    ...issueTypes.map((issue) => {
                      return {
                        label: issue.name,
                        value: issue.slug
                      }
                    }),
                  ], 'typeIssue', setTypeIssueSelectIsOpened)}
                </ScrollView>
              ) : null 
            }
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 relative" onPress={() => { setPersonInvolvedSelectIsOpened(!personInvolvedSelectIsOpened) }}>
            <View className="border-[1px] border-white rounded-md p-2 text-white ml-1">
              <Text className="text-white">{formData.personInvolved.label}</Text>
            </View>
            {
              personInvolvedSelectIsOpened ? (
                <ScrollView className="bg-white rounded-md p-2 ml-1 absolute top-full left-0 z-50 w-full">
                  {renderOptions([
                    { label: 'Select Person Involved', value: '' },
                    ...roster.map((person) => {
                      return {
                        label: person.name,
                        value: person.id
                      }
                    })
                  ], 'personInvolved', setPersonInvolvedSelectIsOpened)}
                </ScrollView>
              ) : null 
            }
          </TouchableOpacity>
        </View>
      </View>
      <View className="mt-2 relative z-[-100]">
        <TextInput placeholder="Description of the issue..." placeholderTextColor={'white'} multiline={true} onChangeText={(value) => {
          setFormData({
            ...formData,
            issueDescription: value
          })
        }} value={formData.issueDescription} className="border-[1px] border-white rounded-md p-2 h-40 text-white relative z-[-100]" textAlignVertical='top' /> 
      </View>
      <View className="flex flex-row">
        <TouchableOpacity className={`p-2 rounded-md mt-2 relative z-[-10] flex-1 mr-1 ${validInput ? "bg-red-600" : "bg-red-800"}`} disabled={!validInput} onPress={submitReport}>
          <Text className={`${validInput ? "text-white" : "text-gray-400"} text-center`}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity className={`p-2 rounded-md mt-2 relative z-[-10] flex-1 mr-1 ${validInput ? "bg-red-600" : "bg-red-800"}`} disabled={validInput} onPress={() => { submitReport(false) }}>
          <Text className={`${validInput ? "text-white" : "text-gray-400"} text-center`}>Submit (No Email)</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="bg-red-600 p-2 rounded-md mt-2 mb-8 relative z-[-10]" onPress={() => { console.log(formData); }}>
        <Text className="text-white text-center">Log Form Data</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

