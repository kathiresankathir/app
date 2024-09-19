import React, { useContext, useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AuthStack from './AuthStack';
import Drawernav from './DrawerNav';
import DraverNavpat from './DraverNavpat';
import {jwtDecode} from 'jwt-decode';
import { decode } from 'base-64';
import { AuthContext } from '../Context/AuthContext';
import { NavigationContainer } from '@react-navigation/native';

global.atob = decode;

const AppNav = () => {
  const { usertoken, IsLoading } = useContext(AuthContext);
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (usertoken) {
      try {
        const decoded = jwtDecode(usertoken);
        setDecodedToken(decoded);
      } catch (error) {
        console.error('Error decoding token:', error.message);
        setDecodedToken(null);
      }
    } else {
      setDecodedToken(null);
    }
  }, [usertoken]);

  if (IsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#119988" />
      </View>
    );
  }

  const usertype = decodedToken?.userType;

  return (
    <NavigationContainer>
      {usertoken !== null ? (
        usertype === 'doctor' ? (
          <Drawernav />
        ) : (
          <DraverNavpat />
        )
      ) : (
        <AuthStack />
      )}
    </NavigationContainer>
  );
};

export default AppNav;
