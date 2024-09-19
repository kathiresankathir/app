import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Platform,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  navigation,
  StatusBar,
} from 'react-native';
import socketIOClient from 'socket.io-client';
import NoResultsIndicator from './NoResultsIndicator';
import {ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {createStackNavigator} from '@react-navigation/stack';
import {API_SERVER_URL} from './config';

import PatientDetails from './PatientDetails';
import AnemiaReport from './AnemiaReport';
import HypertensionReport from './HypertensionReport';
import GeneralReport from './GeneralReport';
import Addreports from './Addreport';
import Anemiapageone from './Anemiapageone';
import Anemiapagetwo from './Anemiapagetwo';
import Hyperpageone from './Hyperpageone';
import Generalpage from './Generalpage';
import Hyperpagetwo from './Hyperpagetwo';
import {FontAwesome} from '@expo/vector-icons';
import {API_SERVER_SOCKET} from './config';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const PatientList = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doctorID, setDoctorID] = useState(null);
  const socket = socketIOClient(`${API_SERVER_SOCKET}`);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ marginLeft: 20 }}
          onPress={() => navigation.navigate('Home')}
        >
        <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
      )
    });
  }, [navigation]);

  const handleSearch = text => {
    setSearchQuery(text);
    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredPatients(filtered);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('authtoken');
        if (token) {
          const response = await axios.get(`${API_SERVER_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('Doctor ID:', response.data.doctorid);
          const doctorID = response.data.doctorid;
          setDoctorID(doctorID);

          if (doctorID !== null && patients.length === 0) {
            const response = await axios.get(
              `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
            );
            setPatients(response.data);
            setFilteredPatients(response.data);
            setLoading(false);
          }
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
    fetchData();
  
   socket.on('new-patient', newPatient => {
  // Check if the newPatient is not already in the patients list
  if (!patients.find(patient => patient._id === newPatient._id)) {
    setPatients(prevPatients => [...prevPatients, newPatient]);
    setFilteredPatients(prevPatients => [...prevPatients, newPatient]);
  }
});
    return () => {
      socket.disconnect();
    };
  }, []);
  

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const response = await axios.get(
        `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
      );
      setPatients(response.data);
      setFilteredPatients(response.data);
    } catch (error) {
      console.log('Error fetching patients:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView>
      <View>
        <View style={styles.header}>
          <View style={styles.search}>
            <TextInput
              placeholder="Search patient"
              placeholderTextColor="#2f2f2f"
              value={searchQuery}
              onChangeText={handleSearch}
              style={styles.input}
            />
            <FontAwesome
              style={styles.seicon}
              name="search"
              size={24}
              color="#199999"
            />
          </View>
        </View>
        <Text style={[styles.txt, styles.text]}>List of Patients</Text>
        <View style={styles.list}>
          {loading ? (
            <ActivityIndicator size="large" color="#119988" />
          ) : filteredPatients.length === 0 ? (
            <NoResultsIndicator />
          ) : (
            <FlatList
              style={styles.sv}
              data={filteredPatients}
              keyExtractor={(item, index) => item._id ? item._id.toString() : index.toString()} // Added a fallback for the index
              renderItem={({item}) => (
                <TouchableOpacity
                  style={styles.listbox}
                  onPress={() =>
                    navigation.push('PatientDetails', {patient: item})
                  }>
                  <View style={styles.listitem}>
                    <View style={styles.cir}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        {item.name[0].toUpperCase()}
                      </Text>
                    </View>
                  </View> 

                  <View style={styles.patientcontent}>
                    <View style={{flexDirection:"row"}}>
                    <Text style={[styles.tcontent, styles.text]}>{item.name} </Text>
                    <Text style={{color:"#14b8a5"}}> P_Id :({item.patientid})</Text>
                    </View>
                    
                    <Text style={{}}>Weight: {item.Weight} kg</Text>
                  </View>
                </TouchableOpacity>
              )}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default function Dino() {
  return (
    <Stack.Navigator
      initialRouteName="PatientList"
      screenOptions={{headerShown: "false"}}>
      <Stack.Screen name="PatientList" component={PatientList} options={{ title: 'PatientList ' }} />
      <Stack.Screen name="PatientDetails" component={PatientDetails}/>
      <Stack.Screen name="AnemiaReport" component={AnemiaReport}/>
      <Stack.Screen name="HypertensionReport" component={HypertensionReport}/>
      <Stack.Screen name="GeneralReport" component={GeneralReport}/>
      <Stack.Screen name="Addreports" component={Addreports}  />
      <Stack.Screen name="Anemiapageone" component={Anemiapageone}  />
      <Stack.Screen name="Anemiapagetwo" component={Anemiapagetwo}  />
      <Stack.Screen name="Hyperpageone" component={Hyperpageone}  />
      <Stack.Screen name="Generalpage" component={Generalpage}  />
      <Stack.Screen name="Hyperpagetwo" component={Hyperpagetwo}  />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  text: {
    textTransform:'capitalize' 
  },
  whitebox: {
    paddingBottom: 10,
  },

  sv: {
    height: '86.2%',
    ...Platform.select({
      android: {height: '87.2%'},
    }),
  },
  tcontent: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  patientcontent: {
    paddingLeft: 20,
  },
  cir: {
    height: 40,
    width: 40,
    backgroundColor: '#119988',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    top: 40,
   padding:10,
  //  backgroundColor:" #e8fcfa",
  },
  listbox: {
    height: 80,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 10,
    paddingLeft: 20,
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {height: 1, width: 0},
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    elevation: 1,
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    top: 30,
    left: 20,
  },
  search: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    top: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingLeft: 20,
  },
  seicon: {
    top: 12,
    right: 40,
    height: 30,
    width: 30,
  },
});
