import React from 'react';
import { Patienthomepage} from '../src/screens';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Settings from '../src/screens/Settings';
import PatientSettings from '../src/screens/PatientSettings';
import Notification from '../src/screens/Notification';
import {AntDesign, Ionicons, Fontisto, Octicons} from '@expo/vector-icons';
import CustomDrawer from '../components/CustomDrawer';
import {Entypo} from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
//const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
import {View, StyleSheet} from 'react-native';
import { useLayoutEffect } from 'react';
function BottomTabs() {
  

  return (
    
    
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
       // tabBarShowLabel:{display:"true"},

        tabBarStyle: {
          height: 70,
          position: 'absolute',
          bottom: 20,
          left: 16,
          right: 16,
          borderRadius: 20,
          paddingBottom: 0,
          shadowColor: '#000',
          shadowOffset: {height: 1, width: 0},
          shadowOpacity: 0.3,
          shadowRadius: 0.5,
          elevation: 2,
        },
      }}>
      <Tab.Screen
        name="Home2"
        component={Patienthomepage}
        options={{
          headerShown: false,
          tabBarLabel: 'Home2',
          tabBarStyle:{display:"none"},
          tabBarLabelStyle: {color: '#119988'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.infonew}>
                <AntDesign name="appstore1" size={28} color="#fff" />
              </View>
            ) : (
              <AntDesign name="appstore1" size={28} color="#119988" />
            ),
        }}
      />
      
     
      
   

    </Tab.Navigator>
    
  );
}

function Drawernav() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveBackgroundColor: '#119988',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#119988',
        drawerLabelStyle: {
          marginLeft: -22,
          textTransform: 'capitalize',
          fontSize: 16,
        },
      }}>
      <Drawer.Screen
        name="Patienthome"
        component={BottomTabs}
        options={{ 
          drawerIcon: ({color}) => (
            <AntDesign name="appstore1" size={20} color={color} />
          ),
        }}
      />
      {/*<Drawer.Screen
        name="notification"

        component={Notification}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="notifications" size={20} color={color} />
          ),
        }}
      />*/}
      <Drawer.Screen
        name="Settings"
        component={PatientSettings}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons name="settings" size={20} color={color} />
          ),
        }}
      />
     
    </Drawer.Navigator>
  );
};
export default Drawernav;

const styles = StyleSheet.create({
  infonew: {
    backgroundColor: '#119988',
    opacity: 1,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

// dummy
{
  /*<Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarLabelStyle: {color: '#119988'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <Ionicons name="md-settings-sharp" size={35} color="#119988" />
            ) : (
              <Ionicons name="md-settings-sharp" size={24} color="black" />
            ),
        }}
      />*/
}
