import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar
} from 'react-native';
import axios from 'axios';
import { API_SERVER_URL } from './config'; // Make sure this path is correct
import FlashMessage, { showMessage } from 'react-native-flash-message';

const AddDoctor = ({ navigation }) => {
  const [doctorData, setDoctorData] = useState({
    username: '',
    password: '',
    doctorid: '',
    userType: 'doctor', // Set default userType as 'doctor'
    name: '',
  });
  const [isSaveButtonActive, setIsSaveButtonActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setDoctorData({ ...doctorData, [field]: value });
    // Update button state
    setIsSaveButtonActive(isFormValid());
  };

  const isFormValid = () => {
    return (
      doctorData.username !== '' &&
      doctorData.password !== '' &&
      doctorData.doctorid !== '' &&
      doctorData.userType !== '' &&
      doctorData.name !== ''
    );
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true); // Set loading state
      await axios.post(`${API_SERVER_URL}/doctors`, doctorData);
      // Show success message
      showMessage({
        message: 'Doctor details saved successfully!',
        type: 'success',
      });

      // Delay navigation to allow flash message to be visible
      setTimeout(() => {
        navigation.navigate("Home"); // Adjust the route if needed
      }, 800); // Adjust the delay time as needed
    } catch (error) {
      console.error('Error saving doctor data:', error);
      // Handle error
      showMessage({
        message: 'Error saving doctor details.',
        type: 'danger',
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.body}>
            <View style={styles.mainblock}>
              <View style={styles.whitebox}>
                <View style={styles.header}>
                  <Text style={styles.txt}>Add Doctor</Text>
                </View>
                <TextInput
                  placeholder="Username *"
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('username', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Password *"
                  placeholderTextColor={'#a6a6a6'}
                  // secureTextEntry
                  onChangeText={text => handleInputChange('password', text)}
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Doctor ID *"
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('doctorid', text)}
                  style={styles.inputbox}
                />
                {/* userType is now set to 'doctor' by default */}
                <TextInput
                  value="doctor" // Show doctor as the default value
                  placeholder="User Type *"
                  editable={false} // Make the input non-editable
                  style={styles.inputbox}
                />
                <TextInput
                  placeholder="Name *"
                  placeholderTextColor={'#a6a6a6'}
                  onChangeText={text => handleInputChange('name', text)}
                  style={styles.inputbox}
                />
                <TouchableOpacity
                  style={
                    isSaveButtonActive
                      ? styles.activeSaveButton
                      : styles.disabledSaveButton
                  }
                  onPress={handleSubmit}
                  disabled={!isSaveButtonActive || isLoading}>
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.start}>Save</Text>
                  )}
                </TouchableOpacity>
                <FlashMessage position="top" animated={true} icon={'success'} statusBarHeight={10} style={{ backgroundColor: "#119988" }} />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    ...Platform.select({
      android: { paddingTop: 40 },
    }),
  },
  body: {
    flex: 1,
    alignItems: 'center',
  },
  mainblock: {
    width: '100%',
    backgroundColor: '#f2f2f2',
  },
  whitebox: {
    width: 350,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 0,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 10,
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#119988',
  },
  activeSaveButton: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#199991',
    alignItems: 'center',
    justifyContent: 'center',
    top: 70,
  },
  disabledSaveButton: {
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
    top: 70,
  },
  start: {
    color: '#fff',
    fontWeight: 'normal',
    fontSize: 18,
  },
  inputbox: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: '#d9d9d9',
    marginTop: 10,
    paddingLeft: 20,
  },
});

export default AddDoctor;
