import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AntDesign, FontAwesome, MaterialIcons,FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useState, useEffect, useLayoutEffect } from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import { API_SERVER_URL, API_SERVER_SOCKET } from './config';

// Import your individual screens
import ProfileScreen from './ProfileScreen';

import ChangePassword from './ChangePassword';
import About from './About';
import AddDoctor from './AddDoctor';

// Create a local stack navigator
const SettingsStack = createStackNavigator();

const SettingsHome = ({ navigation }) => {
  const [doctorID, setDoctorID] = useState(null);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);



  const socket = socketIOClient(API_SERVER_SOCKET);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Home')}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('authtoken');
        if (token) {
          const response = await axios.get(`${API_SERVER_URL}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const userData = response.data;
          setDoctorID(userData.doctorid);
          setUser(userData.username);
          setPassword(userData.password);
          setName(userData.name);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchUserData();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileSection}>
          <MaterialIcons name="person" size={50} color="#119988" />
          <Text style={styles.infoText}>Name: {name}</Text>
          <Text style={styles.infoText}>Doctor ID: {doctorID}</Text>
          <Text style={styles.infoText}>Username: {user}</Text>
          {/* <Text style={styles.infoText}>Password: {password}</Text> */}


        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ProfileScreen', {
              doctorid: doctorID,
              user: user,
              password: password,
              name:name,
            })}          >
            <FontAwesome name="user" size={24} color="#333" />
            <Text style={styles.itemText}>Profile</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('ChangePassword')}
          >
            <MaterialIcons name="lock" size={24} color="#333" />
            <Text style={styles.itemText}>Change Password</Text>
          </TouchableOpacity> */}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('About')}
          >
           <FontAwesome5 name="info-circle" size={20} color="#333" />
           <Text style={styles.itemText}>About</Text>
          </TouchableOpacity>
        </View>

        {user === 'Smchadmin' && password === '1290' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Admin</Text>
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('AddDoctor')}
          >
              <FontAwesome name="user-plus" size={24} color="#333" />
              <Text style={styles.itemText}>Add User</Text>
          </TouchableOpacity>
        </View>
                )}

        
      </ScrollView>
    </SafeAreaView>
  );
};

const Settings = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="SettingsHome" component={SettingsHome} options={{ headerShown: false }} />
      <SettingsStack.Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'Profile' }} />
      <SettingsStack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Change Password' }} />
      <SettingsStack.Screen name="About" component={About} options={{ title: 'About' ,headerShown: true }} />
      <SettingsStack.Screen name="AddDoctor" component={AddDoctor} options={{ title: 'Add Doctor' }} />



    </SettingsStack.Navigator>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    padding: 20,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: '600',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginTop: 30,
  },
  logoutText: {
    fontSize: 16,
    color: 'red',
    marginLeft: 10,
  },
});
