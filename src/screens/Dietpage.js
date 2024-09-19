import { StyleSheet, Text, View,Image} from 'react-native'
import React,{useLayoutEffect} from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import { AntDesign } from '@expo/vector-icons';
import Images from './Images';

import Dietpageone from './Dietpageone';
import Dietpagetwo from './Dietpagetwo';
const Stack = createStackNavigator();
const Dietpage = ({navigation}) => {
  return (
    <View style={styles.container1}>
      <View style={styles.imgbox}>
      <Text style={styles.txt}>Choose your Hemoglobin level</Text>
      <Image source={require('../images/diet.png')}/>
      <View  style={styles.box2}>
    <Text onPress={() => navigation.navigate('Dietpageone')}> above 11gm/dl</Text>
    </View>
    <View  style={styles.box2}>
    <Text onPress={() => navigation.navigate('Dietpagetwo')}>9-10.9gm/dl </Text>
    </View>
    <View  style={styles.box2}>
    <Text onPress={() => navigation.navigate('Dietpagetwo')}>7-8.9gm/dl </Text>
    </View>
    <View  style={styles.box2}>
    <Text onPress={() => navigation.navigate('Dietpagetwo')}> below 7gm/dl</Text>
    </View>
      </View>
     
    </View>
  )
}

export default Dietpage

const styles = StyleSheet.create({

  container1:{
    flex:1,
  },
  txt:{
    fontWeight:'bold',
   fontSize:18,
  },
  imgbox:{
    marginTop:20,
    alignItems:'center',
    rowGap:30,
  },
  box2:{
    alignItems:'center',
    justifyContent:'center',
    height:40,
    width:220,
    backgroundColor:"#119988",
    borderRadius:10,


  }

})