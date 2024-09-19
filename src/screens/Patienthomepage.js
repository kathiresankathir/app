import {useState, useEffect} from 'react';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View, 
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
  RefreshControl,
  Image
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { API_SERVER_URL, API_SERVER_SOCKET } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Patientparallax from './Patientparallax';
import Uploadreport from './Uploadreport';
import Viewreport from './Viewreport';
import Dietpage from './Dietpage';
import Dietpageone from './Dietpageone';
import Dietpagetwo from './Dietpagetwo';
import Nonvegdiet from './Nonvegdiet';
import Nutsdiet from './Nutsdiet';
import Fruitsdiet from './Fruitsdiet';
import Images from './Images';
import Graphpage from './Graphpage';
import AnemiaReportscreen from './AnemiaReportscreen';
import HypertensionReportscreen from './HypertensionReportscreen';
import GeneralReportscreen from './GeneralReportscreen';

const Stack = createStackNavigator();

const Patienthomepage = ({ navigation }) => {
  const [doctorID, setDoctorID] = useState(null);
  const [patientID,setPatientID] =useState(null);
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState(null);

  const [user, setUser] = useState(null);
  const socket = socketIOClient(`${API_SERVER_SOCKET}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('authtoken');
        if (token) {
          const response = await axios.get(`${API_SERVER_URL}/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userData = response.data;
          if (userData && userData.username) {
            setUser(userData.username);
            setName(userData.name);

          }

          const doctorID = userData.doctorid;
          setDoctorID(doctorID);

          const patientID =userData.patientid;
          setPatientID(patientID);

          if (doctorID !== null && patients.length === 0) {
            const response = await axios.get(
              `${API_SERVER_URL}/patients?doctorID=${doctorID}`,
            );
            setPatients(response.data);
            
          }
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchData();

    socket.on('new-patient', (newPatient) => {
      if (!patients.find((patient) => patient._id === newPatient._id)) {
        setPatients((prevPatients) => [...prevPatients, newPatient]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [patients]);

  return ( 
    <SafeAreaView style={{flex:1}} >
    <View >
    <View style={styles.header}>
         <View style={styles.profile}>
          <Text style={{ color: '#119988', fontSize: 32, fontWeight: 'bold' }}>
           {name ? name[0]:'u'}
           </Text>
          </View> 
         <Text style={{fontWeight:'bold',fontSize:18}}>Hi..  {name}</Text> 
         <View >
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
             <Octicons name="three-bars" size={24} color="black" />
            </TouchableOpacity>
         </View>       
        </View> 
      <View style={{alignItems:'center',top:10}}>   
     <Image source={require('../images/pathom.png')}/>
    </View>
    <View>
    <Text style={{fontSize:20,padding:15,fontWeight:'bold'}}>Categories</Text>
    </View>
    <View style={{flexDirection:'column'}}>
    <View>
    <Patientparallax/> 
    </View>   
     <View  style={styles.box}>
     <Text style={{fontWeight:'bold',fontSize:18}}>View</Text>
    <ScrollView >
    <View style={styles.box2} >
<View style={styles.reportbox} >
<TouchableOpacity>
<Text style={{color:"#fff",fontWeight:"bold",fontSize:18}}onPress={() => navigation.navigate('Viewreport', {doctorID})}>View Report</Text>
</TouchableOpacity>
</View>
<View style={styles.reportbox} >
<Text style={{color:"#fff",fontWeight:"bold",fontSize:18}}onPress={() => navigation.navigate('Uploadreport', {doctorID})}>Upload Report</Text>
</View>

<View style={styles.reportbox} >
<Text style={{color:"#fff",fontWeight:"bold",fontSize:18}}onPress={() => navigation.navigate('Dietpage')}>Diet plan</Text>
</View>
{/*<View style={styles.reportbox} >
<Text style={{color:"#fff",fontWeight:"bold",fontSize:18}}onPress={() => navigation.navigate('Homeworkout')}>Home Workout</Text>
  </View>*/}
<View>
</View>
</View>
</ScrollView>
    </View>   
    </View>
     </View>
    </SafeAreaView>
  )
}

export default function PatientHm() {
  return (
    <Stack.Navigator initialRouteName="Patienthomepage" >
    <Stack.Screen name="Patienthomepage" component={Patienthomepage} options={{ headerShown: false }} />    
    <Stack.Screen name="Viewreport" component={Viewreport} />
      <Stack.Screen name="Uploadreport" component={Uploadreport} />
      <Stack.Screen name="Dietpage" component={Dietpage}  options={{ headerShown: true,headerTitle:'' }}/>
      <Stack.Screen name="Dietpageone" component={Dietpageone} options={{ headerShown: true,headerTitle:'' }} />
      <Stack.Screen name="Dietpagetwo" component={Dietpagetwo} options={{ headerShown: true,headerTitle:'' }} />
      <Stack.Screen name="Images" component={Images} />
      <Stack.Screen name="Nonvegdiet" component={Nonvegdiet} options={{ headerShown: false }} />
      <Stack.Screen name="Nutsdiet" component={Nutsdiet} options={{ headerShown: false }} />
      <Stack.Screen name="Fruitsdiet" component={Fruitsdiet} options={{ headerShown: false }} />
      <Stack.Screen name="Graphpage" component={Graphpage} />
      <Stack.Screen name="AnemiaReportscreen" component={AnemiaReportscreen} options={{ headerShown: true,headerTitle:'AnemiaReport' }} />
      <Stack.Screen name="HypertensionReportscreen" component={HypertensionReportscreen} options={{ headerShown: true,headerTitle:'HypertensionReport' }} />
      <Stack.Screen name="GeneralReportscreen" component={GeneralReportscreen}options={{ headerShown: true,headerTitle:'GeneralReport' }} />

    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  header: {
    padding:10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent:'space-between',
    backgroundColor:"#119988",
    paddingRight:20,
    paddingLeft:10,    
  },
  catbox1:{
  height:50,
  width:150,
  backgroundColor:"#119988",
  alignItems:'center',
  justifyContent:'center',
  borderRadius:20,
  },
  slidebox:{
columnGap:10,
  },
  box2:{
rowGap:14,
top:10,
  },
  box:{
    padding: 20,
    top:120,
    backgroundColor: '#fff',
    margin: 10,
    height:"67.2%",
    borderRadius: 20,
  // rowGap:10,
  paddingLeft:10,
  paddingRight:10,
  flexDirection:"column",
  borderRadius:20,
  },
  slide:{
padding:20,

backgroundColor:'#d9d9d9'
  },
  profile:{
    height: 56,
    width: 56,
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    left:"40%",
  },
  reportbox:{
alignItems:'center',
justifyContent:'center',
padding:40,
borderRadius:30,
backgroundColor:"#119988"
  },
})
