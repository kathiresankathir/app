  import { StyleSheet, Text, View } from 'react-native'
  import React from 'react'
 
  
  import {SplashScreen, WelcomeScreen,Togglepage,Login, Patientlogin} from '../src/screens';


  import {createNativeStackNavigator} from '@react-navigation/native-stack';
  const Stack = createNativeStackNavigator();
  const AuthStack = () => {
    return (
        <Stack.Navigator  screenOptions={{headerShown: false}}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="Togglepage" component={Togglepage} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Patientlogin" component={Patientlogin}/>
        </Stack.Navigator>
      
    )
  }

  export default AuthStack

  const styles = StyleSheet.create({})