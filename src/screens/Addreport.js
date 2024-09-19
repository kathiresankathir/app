import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  SafeAreaView,
  FileAddOutlined,
    TouchableOpacity,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import React from 'react';
import {useState, useEffect, useLayoutEffect} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {Fontisto} from '@expo/vector-icons';
import {createStackNavigator} from '@react-navigation/stack';
import {API_SERVER_URL} from './config';
import {API_SERVER_SOCKET} from './config';

import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { MaterialIcons } from '@expo/vector-icons';
const Stack = createStackNavigator();

const Addreports = ({route}) => {

  const socket = socketIOClient(`${API_SERVER_SOCKET}`);

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarVisible: false,
    });
    return () => {
      // Reset the tabBarVisible when the component is unmounted
      navigation.setOptions({
        tabBarVisible: true,
      });
    };
  }, [navigation]);

  useEffect(() => {
    // Update recently viewed patients list in AsyncStorage
    const updateRecentlyViewed = async () => {
      try {
        const recentlyViewedData = await AsyncStorage.getItem('recentlyViewed');
        let recentlyViewedPatients = recentlyViewedData
          ? JSON.parse(recentlyViewedData)
          : [];

        // Check if the patient is already in the list
        const existingPatientIndex = recentlyViewedPatients.findIndex(
          p => p._id === patient._id,
        );

        if (existingPatientIndex !== -1) {
          // Update the timestamp for the existing patient
          recentlyViewedPatients[existingPatientIndex].timestamp =
            new Date().toISOString();
        } else {
          // Add patient to the beginning of the list
          recentlyViewedPatients = [
            {...patient, timestamp: new Date().toISOString()},
            ...recentlyViewedPatients.slice(0, 4), // Limit the list to the last 5 viewed patients
          ];
        }

        // Update AsyncStorage
        await AsyncStorage.setItem(
          'recentlyViewed',
          JSON.stringify(recentlyViewedPatients),
        );
      } catch (error) {
        console.error('Error updating recently viewed patients:', error);
      }
    };
    // Call the updateRecentlyViewed function when the patient changes
    updateRecentlyViewed();
  }, [patient]); // Add patient as a dependency

  // ...


  const conditions = [
    { name: 'Anemia', screen: 'Anemiapageone' },
    { name: 'Hypertension', screen: 'Hyperpageone' },
    { name: 'General', screen: 'Generalpage' },
  ];

  const renderConditionButton = (condition) => (
    <TouchableOpacity
      key={condition.name}
      onPress={() => navigation.navigate(condition.screen, { patientdetails: patient.patientid })}
    >
      <View style={styles.body}>
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>{condition.name}</Text>
      </View>
    </TouchableOpacity>
  );
 

  const {patient} = route.params;
  const patientdetails = patient.patientid;

  const bmiheight = patient.Height;
  const bmiweight = patient.Weight;
  const convertheight = bmiheight / 100; // convertion from cm to m
  const BMI = bmiweight / (convertheight * convertheight);
  const fixedbmi = BMI.toPrecision(3);

  const getBMIDetails = bmi => {
    if (bmi < 18.5) {
      return {color: 'red', category: 'Underweight'};
    } else if (bmi >= 18.5 && bmi < 25) {
      return {color: 'green', category: 'Normal weight'};
    } else if (bmi >= 25 && bmi < 30) {
      return {color: '#3f0e0e', category: 'Overweight'};
    } else {
      return {color: 'blue', category: 'Obesity'};
    }
  };
  // Get the color and category based on BMI value
  const bmiDetails = getBMIDetails(parseFloat(fixedbmi));
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.outerbox}>
        <View style={styles.bodybox}>
          <View style={styles.headercontent}>
            <Text style={styles.headname}>Patient Details</Text>

            <View style={styles.whitebox}>
              <View style={styles.listbox}>
                <View style={styles.listitem}>
                  <View style={styles.cir}>
                    <Text
                      style={{color: '#fff', fontSize: 18, fontWeight: 'bold'}}>
                      {patient.name[0].toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.patientcontent}>
                  <Text style={styles.tcontent}>
                    {patient.name.toUpperCase()}
                  </Text>
                  <Text style={styles.tcontent}>

                  
                    {patient.patientid}
                    
                  </Text>

                  <Text style={{color: '#f44336'}}>
                   
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    left: 200,
                    position: 'absolute',
                  }}>
                  <Text
                    style={{fontWeight: 'bold', lineHeight: 22, fontSize: 18}}>
                    BMI :{' '}
                  </Text>
                  <Text style={{color: bmiDetails.color, fontSize: 18}}>
                    {fixedbmi}
                  </Text>
                  <Text style={{fontSize: 16, lineHeight: 22}}> kg/m</Text>
                  <Text
                    style={{fontSize: 12, fontWeight: '700', lineHeight: 14}}>
                    2
                  </Text>
                </View>
                <Text
                  style={{
                    color: bmiDetails.color,
                    marginTop: 20,
                    left: 200,
                    position: 'absolute',
                  }}>
                  ( {bmiDetails.category} )
                </Text>
              </View>
              <View style={styles.bodycontent}>
                <Text>Age: {patient.Age}</Text>
               
                
                <View style={styles.lineStyle} />
                <View>
                  <Text style={styles.last}>Weight : {patient.Weight} kg</Text>
                  <Text>Height : {patient.Height} cm</Text>
                </View>
              </View>
            </View>
            <View style={styles.lineSt} />
            <View style={styles.properalign}>
              
            </View>
            
              <View style={styles.bodyhead}>
                  <Text style={{fontSize:18,fontWeight:'bold'}}>Select the condition</Text>
                  </View>
                  <View style={{ flexDirection: 'column', rowGap: 20 }}>
              {conditions.map(renderConditionButton)}
            </View>
                  
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Addreports;

const styles = StyleSheet.create({
  body: {
    top:30,
    padding: 30,
    alignItems:'center',
    backgroundColor:"#119988",
    borderRadius:20,
  },
  listitem: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  bodyhead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    alignItems:'center'
  },

  lineSt: {
    borderWidth: 0.5,
    borderColor: 'black',
    width: '100%',
    top: 10,
  },
  last: {
    paddingBottom: 10,
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    height: 40,
  },
  bodycontent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: 'center',
  },
  patientcontent: {
    paddingLeft: 20,
  },
  tcontent: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingBottom: 5,
  },

  outerbox: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  bodybox: {
    width: '100%',
    padding: 20,
    paddingBottom: 0,
    backgroundColor: '#fff',
    // justifyContent: 'center',
    borderRadius: 20,
    top: 10,
    height: '100%',
  },
  headname: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2f2f2f',
  },
  cir: {
    height: 40,
    width: 40,
    backgroundColor: '#199999',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listbox: {
    flexDirection: 'row',
    paddingTop: 20,
  },

});
