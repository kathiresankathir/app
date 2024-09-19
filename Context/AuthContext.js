import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();
import axios from 'axios';
import {API_SERVER_URL} from '../src/screens/config';
import {Alert} from 'react-native';

const AuthProvider = ({children}) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [usertoken, setusertoken] = useState(null);
  const [username, SetUserName] = useState('');
  const [password, SetPassword] = useState('');

  const isLoggedin = async () => {
    let usertoken = await AsyncStorage.getItem('authtoken');
    setusertoken(usertoken);
    setIsLoading(false);
  };
  useEffect(() => {
    isLoggedin();
  }, []);

  const login = async () => {
    setIsLoading(true);
    const user={
      username: username,
      password: password,
    }
    // send a post req to backend API
    try {
      const response = await axios.post(`${API_SERVER_URL}/login`,user);
      if (response.data && response.data.token) {
        await AsyncStorage.setItem('authtoken', response.data.token);
        setusertoken(response.data.token);
        console.log('Login successful', response.data.token);
      } else {
        console.error('Login failed:', error.message);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const logout = async () => {
  setIsLoading(true);
  try {
    await AsyncStorage.removeItem('authtoken');
    setusertoken(null);
  } catch (error) {
    console.error('Error during logout:', error.message);
  } finally {
    setIsLoading(false);
  }
};
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        IsLoading,
        usertoken,
        username,
        password,
        SetUserName,
        SetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
