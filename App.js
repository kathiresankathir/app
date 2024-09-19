import { StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import AppNav from './Navigation/AppNav';
import AuthProvider from './Context/AuthContext';
import AuthProvider2 from './Context/Patientauth';

import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  useEffect(() => {
    const loadApp = async () => {
      // await loadFonts();
    };
    

    loadApp();
  }, []);
  
  return (
    
    <AuthProvider>
    <AuthProvider2>
      <StatusBar/>
      <AppNav />
    </AuthProvider2>
    </AuthProvider>
    
   
  );
};

export default App;
