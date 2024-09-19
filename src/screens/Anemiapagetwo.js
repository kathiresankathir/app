import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import { API_SERVER_URL } from './config';
import Toast from './Toast';
import FlashMessage, { showMessage } from 'react-native-flash-message';
const Anemiapagetwo = ({ navigation, route }) => {
  const [showToast, setShowToast] = useState(false);
  const [IronDeficiencyAnemia, setIronDeficiencyAnemia] = useState(null);
  const [targetHBInput, setTargetHBInput] = useState('');
  const [actualHBInput, setActualHBInput] = useState('');
  const [prepregnancyWeightInput, setPrepregnancyWeightInput] = useState('');
  const [ironDeficiencyAnemiaValue, setIronDeficiencyAnemiaValue] = useState(null);
  const [inputText, setInputText] = useState('');
 const pid = route.params.PatientID;
//  console.log(pid);
  const handleCalculate = () => {
    if (!IronDeficiencyAnemia) {
      Alert.alert('');
      return;
    }
    // Get the input values
    const targetHB = (targetHBInput) || 0;
    const actualHB = (actualHBInput) || 0;
    const prepregnancyWeight = (prepregnancyWeightInput) || 0;

    // Perform the calculation
    const IronDeficiencyAnemiaValue = targetHB - actualHB + prepregnancyWeight;
    setIronDeficiencyAnemiaValue(IronDeficiencyAnemiaValue);
  };
  const handleSaveReport = () => {
    // Your logic to save the report goes here

    // Show success message
    showMessage({
      message: 'Report saved successfully!',
      type: 'success',
    });
  };
  const sendDataToServer = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    try {
      const sendData = {
        date:new Date().toISOString().slice(0, 10),
        PatientID: route.params.PatientID,
        HemoglobinLevel : route.params.hemoglobinLevel,
        BloodTransfusion : route.params.Bloodtransfusion,
        BleedingDisorder : route.params.Bleedingdisorder,
        MCV: route.params.MCVvalue,
        MCH: route.params.MCHvalue,
        MCHC: route.params.MCHCvalue,
        RDW: route.params.RDWvalue, 
        MentzerIndex:route.params.mentzerIndexValue,
        IronDeficiencyAnemia: IronDeficiencyAnemia,
        targetHB: targetHBInput,
        IronDeficiencyAnemiaValue: IronDeficiencyAnemia === '1' ? ironDeficiencyAnemiaValue : null,
        targetHB: IronDeficiencyAnemia === '1' ? (targetHBInput) : null,
        actualHB: IronDeficiencyAnemia === '1' ? (actualHBInput) : null,
        prepregnancyWeight: IronDeficiencyAnemia === '1' ? (prepregnancyWeightInput) : null,
        otherReports: inputText,
      };
  
      const response = await fetch(`${API_SERVER_URL}/save-details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data to the server');
      }
        
      Alert.alert('Data saved successfully', '', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('PatientList'); // Navigate to the Reportfile
          },
        },
      ]);
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error occurred while saving data. Please try again later.');
    }
  };
  
      
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1, ...Platform.select({ android: { flex: 1 } }) }}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.question}>
            <Text style={styles.questionText}>Suffering from Iron Deficiency Anemia</Text>
            <View style={styles.group}>
            <View style={styles.radioGroup}>
            
              <RadioButton.Android
                value="1"
                status={IronDeficiencyAnemia === '1' ? 'checked' : 'unchecked'}
                onPress={() => setIronDeficiencyAnemia('1')}
                color="#119988"
              />
              <Text style={styles.radioLabel}>Yes</Text>
              
            </View>
            <View style={styles.radioGroup}>
              <RadioButton.Android
                value="2"
                status={IronDeficiencyAnemia === '2' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setIronDeficiencyAnemia('2');
                  setTargetHBInput('');
                  setActualHBInput('');
                  setPrepregnancyWeightInput('');
                  setIronDeficiencyAnemiaValue(null);
                }}
                color="#119988"
              />
              <Text style={styles.radioLabel}>No</Text>
            </View>
            </View>
          </View>
          {IronDeficiencyAnemia === '1' && (
            <View style={styles.additionalQuestions}>
              <Text style={styles.questionText}>Enter the target HB:</Text>
              <TextInput
                style={styles.input}
                value={targetHBInput}
                onChangeText={setTargetHBInput}
                keyboardType="numeric"
              />
              <Text style={styles.questionText}>Enter the Actual HB:</Text>
              <TextInput
                style={styles.input}
                value={actualHBInput}
                onChangeText={setActualHBInput}
                keyboardType="numeric"
              />
              <Text style={styles.questionText}>Enter Prepregnancy weight:</Text>
              <TextInput
                style={styles.input}
                value={prepregnancyWeightInput}
                onChangeText={setPrepregnancyWeightInput}
                keyboardType="numeric"
              />
              <TouchableOpacity onPress={handleCalculate} style={styles.calculateButton}>
                <Text style={styles.calculateButtonText}>Calculate</Text>
              </TouchableOpacity>
              {ironDeficiencyAnemiaValue !== null && (
                <Text style={styles.resultText}>Iron deficiency anemia: {ironDeficiencyAnemiaValue}</Text>
              )}
            </View>
          )}
          <View style={styles.question}>
            <Text style={styles.questionText}>Any Other Reports:</Text>
            <TextInput
            style={styles.input2}
            multiline={true} // Allow multiple lines
            value={inputText}
            placeholder="Write a Note.... "
            onChangeText={(text) => setInputText(text)} />
          </View>
          <TouchableOpacity  onPress={sendDataToServer} style={styles.saveButton}>
            <Text onPress={handleSaveReport} style={styles.saveButtonText}>Save</Text>
                 { /*<Text>{pid}</Text> */}      
    </TouchableOpacity>
            {/* Flash message component */}
      <FlashMessage position="top" animated={true} icon={'success'} statusBarHeight={10} style={{backgroundColor:"#119988"}}/>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Anemiapagetwo;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  question: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: 10,
  },
  group:{
   flexDirection:'row',
   
   justifyContent:'space-around',
   alignItems:'center',
   backgroundColor:'#fff',
   borderRadius:10,
  },
  radioLabel: {
    marginLeft: 5,
    flexDirection: 'column',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input2: {
    height: 180,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    // marginTop:20,
    textAlignVertical: 'top', // Align text to the top
  },
  calculateButton: {
    backgroundColor: '#119988',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#119988',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 20,
  },
});

