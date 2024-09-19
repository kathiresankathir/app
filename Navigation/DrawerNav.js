import React from 'react';
import {Homepage} from '../src/screens';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PatientList from '../src/screens/PatientList';
import AddPatient from '../src/screens/AddPatient';
import Settings from '../src/screens/Settings';
import PatientRecord from '../src/screens/PatientRecord';
import About from '../src/screens/About';
import {AntDesign, Ionicons, Fontisto, Octicons,FontAwesome5} from '@expo/vector-icons';
import CustomDrawer from '../components/CustomDrawer';
import {Entypo} from '@expo/vector-icons';
import {createDrawerNavigator} from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
import {View, StyleSheet} from 'react-native';
function BottomTabs() {
  

  return (
    
    
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
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
        name="Home"
        component={Homepage}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
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
      
      <Tab.Screen
        name="patientList"
        component={PatientList}
        options={{
          headerShown: false,
          tabBarStyle:{display:"none"},
          // tabBarShowLabel:{display:"true"},
          tabBarLabel: 'Patientlist',
          tabBarLabelStyle: {color: '#119988'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.infonew}>
                <Ionicons name="person" size={28} color="#fff" />
              </View>
            ) : (
              <Ionicons name="person" size={28} color="#119988" />
            ),
        }}
      />
      
      
      <Tab.Screen
        name="AddPatient"
        component={AddPatient}
        options={{
          headerShown: false,
          tabBarLabel: 'AddPatient',
          // tabBarStyle:{display:"none"},
          tabBarLabelStyle: {color: '#119988'},
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.infonew}>
                <Octicons name="person-add" size={28} color="#fff" />
              </View>
            ) : (
              <Octicons name="person-add" size={28} color="#119988" />
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
        name="home"
        component={BottomTabs}
        options={{ 
          drawerIcon: ({color}) => (
            <AntDesign name="appstore1" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="PatientRecord"
        component={PatientRecord}
        options={{
          drawerIcon: ({color}) => (
            <Entypo name="database" size={20} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="settings"
        component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <AntDesign name="setting" size={20} color={color} />
          ),
        }}
      />
       {/* <Drawer.Screen
        name=""
        component={About}
        options={{
          drawerIcon: ({color}) => (
           <FontAwesome5 name="info-circle" size={20} color={color} />
          ),
        }}
      /> */}

       
     
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
