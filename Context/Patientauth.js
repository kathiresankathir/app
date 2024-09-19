import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const Patientauth = createContext();
import axios from 'axios';
import {API_SERVER_URL} from '../src/screens/config';

const AuthProvider2 = ({children}) => {
  const [IsLoading2, setIsLoading] = useState(true);
  const [usertoken2, setusertoken] = useState(null);
  const [Patientid, SetPatientid] = useState('');
  const [Password, SetPassword] = useState('');

  const isLoggedin = async () => {
    let usertoken2 = await AsyncStorage.getItem('authtoken');
    setusertoken(usertoken2);
    setIsLoading(false);
  };
  useEffect(() => {
    isLoggedin();
  }, []);

  const login = async () => {
    setIsLoading(true);
    const user={
      Patientid: Patientid,
      Password: Password,
    }
    // send a post req to backend API
    try {
      const response = await axios.post(`${API_SERVER_URL}/plogin`,user);
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('authtoken', response.data.token);
        setusertoken(response.data.token);
        console.log('Login successful', response.data.token);
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const logout = () => {
    setIsLoading(true);
    AsyncStorage.removeItem('authtoken');
    setusertoken(null);
    setIsLoading(false);
  };
  return (
    <Patientauth.Provider
      value={{
        login,
        logout,
        IsLoading2,
        usertoken2,
        Patientid,
        Password,
        SetPatientid,
        SetPassword,
      }}>
      {children}
    </Patientauth.Provider>
  );
};
export default AuthProvider2;
