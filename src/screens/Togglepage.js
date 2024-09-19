import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';

const Togglepage = ({ navigation }) => {
  return (
    <View style={styles.container1}>
     <View>
      <Image source={require('../images/doctorimg.png')}/>
       <TouchableOpacity         onPress={() => navigation.navigate('Login')} style={styles.butn}>
      <Text style={styles.welt}>Doctor</Text>
      </TouchableOpacity>
     </View>
     <View style={styles.container2}>
     <View>
      <Image source={require('../images/patient.png')}/>
       <TouchableOpacity  onPress={() => navigation.navigate('Patientlogin')} style={styles.butn}>
      <Text style={styles.welt}>Patient</Text>
      </TouchableOpacity>
     </View>
     </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container1:{
        top:150,
        justifyContent:"center",
        alignItems:"center",
      },
      container2:{
        top:100,
        justifyContent:"center",
        alignItems:"center",
      },
      welt:{
        color:"#fff",
        fontWeight:'bold',
        fontSize:18,
      },
      butn:{
        borderRadius:20,
        padding:5,
        top:10,
        backgroundColor:"#119988",
        justifyContent:"center",
        alignItems:"center"
      }
    })
export default Togglepage;
