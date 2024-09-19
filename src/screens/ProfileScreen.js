import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, SafeAreaView, Alert,TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Ensure AsyncStorage is imported
import { API_SERVER_URL } from './config';

const ProfileScreen = ({ route }) => {
  const { doctorid, user, password,name } = route.params || {};  // Default to empty object if route.params is undefined

  const [username, setUsername] = useState(user || '');
  const [prfname, setPrfname] = useState(name || '');
  const [newPassword, setNewPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(password || '');

  useEffect(() => {
    if (doctorid === undefined || user === undefined || password === undefined) {
      Alert.alert('Error', 'Required data is missing');
    }
  }, [doctorid, user, password]);

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('authtoken');
      const response = await axios.put(`${API_SERVER_URL}/updateProfile`, {
        doctorid: doctorid,
        username: username,
        prfname:prfname,
        password: newPassword || currentPassword,  // Use new password if entered, otherwise keep the current one
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        Alert.alert('Profile updated successfully');
      }
    } catch (error) {
      console.log('Error:', error);
      Alert.alert('Failed to update profile');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Doctor ID: {doctorid}</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        value={prfname}
        editable={false}  // Make the current password uneditable
      />

      <Text style={styles.label}>Username</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        value={currentPassword}
        editable={false}  // Make the current password uneditable
        secureTextEntry={true}
      />

      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter new password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={true}
      />
          <TouchableOpacity style={styles.loginbtn} onPress={handleUpdateProfile}>
            <Text style={styles.start}>Update Profile</Text>
          </TouchableOpacity>
      {/* <Button title="Update Profile" onPress={handleUpdateProfile} /> */}
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  loginbtn: {
    width: '100%',
    paddingLeft: '30%',
    paddingRight: '30%',
    height: 50,
    borderRadius: 15,
    backgroundColor: '#119988',
    alignItems: 'center',
    justifyContent: 'center',
    // top: 120,
  },
  start: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
