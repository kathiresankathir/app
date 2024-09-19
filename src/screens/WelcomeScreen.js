// WelcomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Image } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../images/image1.png')}
      />
            <Text style={styles.fullform}>Consult Specialist Doctors Securely And Privately </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Togglepage')} style={styles.loginbtn}>
            <Text  style  ={styles.start}>Get Started</Text>
            </TouchableOpacity>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  fullform:{
    fontSize:24,
    top:100,
    color:'#2f2f2f',
    fontWeight:'bold',
    textAlign:"center"
  },
  loginbtn:{
    width:'80%',
    height:50,
    borderRadius:20,
    backgroundColor:'#119988',
    marginTop:150,
    alignItems:'center',
    justifyContent:'center',
  },
  start:{
    color:'#fff',
    fontWeight:'bold',
    fontSize:15,
    
  }
});

export default WelcomeScreen;
