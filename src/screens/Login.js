import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {API_SERVER_URL} from './config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import {Ionicons} from '@expo/vector-icons';
const Login = ({navigate}) => {
  {
    /*const [token , setToken] = useState('');*/
  }
  const navigation = useNavigation();
  const {login} = useContext(AuthContext);
  const {username, password, SetUserName, SetPassword} =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.logintop}>
    <View style={styles.logtxt}>
    <Text style={styles.below}>Welcome !</Text>
      <Text style={styles.btext}>Please login to continue</Text>
    </View>
      
      <View style={styles.box}>
      <View style={styles.logim}>
      <Image source={require('../images/loginimg.png')}/> 

      </View> 
        <View style={styles.inputbox}>
          <TextInput
            placeholder="login id "
            placeholderTextColor={'#2f2f2f'}
            style={styles.input}
            value={username}
            onChangeText={actualData => SetUserName(actualData)}></TextInput>

          <View style={{position: 'relative'}}>
            <TextInput
              secureTextEntry={!showPassword}
              placeholder="Password"
              placeholderTextColor={'#2f2f2f'}
              style={styles.secondinput}
              value={password}
              onChangeText={actualData => SetPassword(actualData)}></TextInput>
            <TouchableOpacity
              style={{position: 'absolute',top:15, right: 20}}
              onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? 'eye' : 'eye-off'}
                size={18}
                color="#2f2f2f"
              />
            </TouchableOpacity>
          </View>
          <Text
            style={styles.forgot}
            onPress={() => navigation.navigate('Forgot')}>
            Forgot password ?
          </Text>
          <TouchableOpacity style={styles.loginbtn} onPress={login}>
            <Text style={styles.start}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  img2: {
    left: 25,
    top: -50,
  },
  logim:{
    alignItems: 'center',
    justifyContent: 'center',
    top:25,

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
  forgot: {
    color: '#2f2f2f',
    fontSize: 15,
    fontWeight: '500',
    // top: 100,
    left: 10,
  },
  inputbox: {

    alignContent: 'center',
    padding: 20,
    rowGap:10,
    paddingTop:50,
  },
  input: {
    height: 50,
    width: '100%',
    // top: 80,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingLeft: 20,
  },
  secondinput: {
    height: 50,
    width: '100%',
    // top: 100,
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingLeft: 20,
  },
  btext: {
    color: '#2f2f2f',
    fontSize: 15,
    fontWeight: '500',
  },
  box: {
    backgroundColor: '#d9d9d9',
    height: 500,
    width: '100%',
    borderRadius: 30,
    top: 20,
  },
  below: {
    color: '#2f2f2f',
    fontWeight:'bold',
    fontSize: 29,
  },
  logintop: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    top: -50,
  },
});
