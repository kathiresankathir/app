import { StyleSheet, Text, View,TextInput,Alert,TouchableOpacity,navigation,ScrollView, SafeAreaView, KeyboardAvoidingView,Platform} from 'react-native'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper'; 
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { API_SERVER_URL } from './config';
const Stack = createStackNavigator();

const Generalpage = ({navigation, route}) => {
const patientid = (route.params)


const [breathing, setbreathing] = useState(null); // New state for breathing
const [Feelingtired, setFeelingtired] = useState(null); // New state for Feelingtired
const [ChestPain, setChestPain] = useState(null); // New state for ChestPain
const [Palpitation, setPalpitation] = useState(null); // New state for Palpitation
const [Indigestion, setIndigestion] = useState(null); // New state for Indigestion
const [Swellinginlegs, setSwellinginlegs] = useState(null); // New state for Swellinginlegs
const [bleedinghistory, setbleedinghistory] = useState(null); // New state for bleedinghistory
const [wheninput, setwheninput] = useState(''); // New state for bleedinghistory when
const [ManageInput, setManageInput] = useState(''); // New state for bleedinghistory manage
const [surgeries, setsurgeries] = useState(null);// New state for surgeries
const [SurgerieDetails, setSurgerieDetails] = useState(''); // New state for bleedinghistory when
const [childbirth, setchildbirth] = useState('');// New state for childbirth
const [medicalillness, setmedicalillness] = useState('');// New state for medicalillness
const [medicalillnessDetails, setmedicalillnessDetails] = useState('');// New state for medicalillness
const PatientID = patientid.patientdetails;
  // Your state variables and other code...

  const sendDataToServer =async () => {

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
try{
    // Prepare data object to send to server
    const data = {
      date:new Date().toISOString().slice(0, 10),
      patientID: PatientID,
      difficultyinbreathing: breathing,
      feelingtired: Feelingtired,
      chestpain: ChestPain,
      palpitation: Palpitation,
      indigestion: Indigestion,
      swellinginlegs: Swellinginlegs,
      bleedinghistory: bleedinghistory,
      bleedinghistorywhen: wheninput,
      bleedinghistorymanage: ManageInput,
      surgeries: surgeries,
      surgeriesdetails: SurgerieDetails,
      medicalillness: medicalillness,
      medicalillnessdetails: medicalillnessDetails,
      lastchildbirth: childbirth,
    };
const response = await fetch(`${API_SERVER_URL}/generaldatas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send data to the server');
      }
        
      Alert.alert('Data saved successfully', '', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('PatientList'); // Navigate to the Reportfile
          },
        },
      ]);
    } catch (error) {
      console.error('Error:', error.message);
      Alert.alert('Error occurred while saving data. Please try again later.');
    }
  };

return (
  <SafeAreaView style={{ flex: 1 }}>
  <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : null}
  style={{ flex: 1, ...Platform.select({ android: { flex: 1 } }) }}>
 <View style={styles.container1}>

  <View style={styles.container3} >
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
  <View style={styles.wholecontainer}>
 
  <View style={styles.container4}>
  
      <Text style={{fontWeight:'bold',fontSize:16}}>Difficulty in breathing </Text>
      <View style={styles.radioGroup}> 
      <View style={styles.radioButton}> 
      <RadioButton.Android 
      value="1"
      status={breathing === '1' ?  
      'checked' : 'unchecked'} 
      onPress={() => setbreathing('1')} 
      color="#119988"
      /> 
      <Text style={styles.radioLabel}> 
      Yes 
      </Text> 
      </View> 

      <View style={styles.radioButton}> 
      <RadioButton.Android 
      value="2"
      status={breathing === '2' ?  
      'checked' : 'unchecked'} 
      onPress={() => setbreathing('2')} 
      color="#119988"
      /> 
      <Text style={styles.radioLabel}> 
      No 
      </Text> 
      </View>
      </View> 
    </View>

    <View  style={styles.container4} > 
    <Text style={{fontWeight:'bold',fontSize:16}}>Feeling tired </Text> 
          <View style={styles.radioGroup}> 
          <View style={styles.radioButton}> 
          <RadioButton.Android 
          value="1"
          status={Feelingtired  === '1' ?  
          'checked' : 'unchecked'} 
          onPress={() => setFeelingtired('1')} 
          color="#119988"
          /> 
          <Text style={styles.radioLabel}> 
          Yes 
          </Text> 
          </View> 

          <View style={styles.radioButton}> 
          <RadioButton.Android 
          value="2"
          status={Feelingtired === '2' ?  
          'checked' : 'unchecked'} 
          onPress={() => setFeelingtired('2')} 
          color="#119988"
          /> 
          <Text style={styles.radioLabel}> 
          No 
          </Text> 
          </View>
          </View> 
          </View> 
        <View  style={styles.container4}>
        <Text style={{fontWeight:'bold',fontSize:16}}>Chest Pain  </Text> 
        <View style={styles.radioGroup}> 
        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="1"
        status={ChestPain === '1' ?  
        'checked' : 'unchecked'} 
        onPress={() => setChestPain('1')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        Yes 
        </Text> 
        </View> 

        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="2"
        status={ChestPain === '2' ?  
        'checked' : 'unchecked'} 
        onPress={() => setChestPain('2')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        No 
        </Text> 
        </View>
        </View>
        </View>
        <View  style={styles.container4}>
        <Text style={{fontWeight:'bold',fontSize:16}}>Palpitation  </Text> 
        <View style={styles.radioGroup}> 
        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="1"
        status={Palpitation === '1' ?  
        'checked' : 'unchecked'} 
        onPress={() => setPalpitation('1')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        Yes 
        </Text> 
        </View> 

        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="2"
        status={Palpitation === '2' ?  
        'checked' : 'unchecked'} 
        onPress={() => setPalpitation('2')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        No 
        </Text> 
        </View>
        </View>
        </View>
        <View  style={styles.container4}>
        <Text style={{fontWeight:'bold',fontSize:16}}>Indigestion  </Text> 
        <View style={styles.radioGroup}> 
        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="1"
        status={Indigestion === '1' ?  
        'checked' : 'unchecked'} 
        onPress={() => setIndigestion('1')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        Yes 
        </Text> 
        </View> 

        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="2"
        status={Indigestion === '2' ?  
        'checked' : 'unchecked'} 
        onPress={() => setIndigestion('2')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        No 
        </Text> 
        </View>
        </View>
        </View>
        <View  style={styles.container4}>
        <Text style={{fontWeight:'bold',fontSize:16}}>Swelling of legs  </Text> 
        <View style={styles.radioGroup}> 
        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="1"
        status={Swellinginlegs === '1' ?  
        'checked' : 'unchecked'} 
        onPress={() => setSwellinginlegs('1')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        Yes 
        </Text> 
        </View> 

        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="2"
        status={Swellinginlegs === '2' ?  
        'checked' : 'unchecked'} 
        onPress={() => setSwellinginlegs('2')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        No 
        </Text> 
        </View>
        </View>
        </View>
        <View style={styles.container4} >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>History of bleeding {'\n'}in pregnancy in{'\n'}early months:</Text>
        <View style={styles.radioGroup}> 
        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="1"
        status={bleedinghistory === '1' ?  
        'checked' : 'unchecked'} 
        onPress={() => setbleedinghistory('1')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        Yes 
        </Text> 
        </View> 

        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="2"
        status={bleedinghistory === '2' ?  
        'checked' : 'unchecked'} 
        onPress={() => setbleedinghistory('2')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        No 
        </Text> 
        </View>
        </View>
      </View> 
      {bleedinghistory === '1' && (
        <View style={styles.additionalContainer}>
          <View style={styles.question}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>When                </Text>
            <TextInput
              style={styles.inputbox}
              placeholder="year/month/date"
              value={wheninput}
              onChangeText={(text) => setwheninput(text)}
            />
          </View>
          <View style={styles.question}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>How was it managed </Text>
            <TextInput
              style={styles.inputbox}
              placeholder="Enter the details"
              value={ManageInput}
              onChangeText={(text) => setManageInput(text)}
            />
          </View>
  
        </View>
      )}
      <View style={styles.container4}>
            <Text style={{fontWeight: 'bold', fontSize: 16 }}>Any surgeries done{'\n'}previously:</Text>
            <View style={styles.radioGroup}> 
        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="1"
        status={surgeries === '1' ?  
        'checked' : 'unchecked'} 
        onPress={() => setsurgeries('1')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        Yes 
        </Text> 
        </View> 

        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="2"
        status={surgeries === '2' ?  
        'checked' : 'unchecked'} 
        onPress={() => setsurgeries('2')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        No 
        </Text> 
        </View>
        </View>
    </View>
    {surgeries === '1' && (
      <View style={styles.additionalContainer}>
        <View style={styles.question}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>Surgerie Details:    </Text>
          <TextInput
            style={styles.inputbox}
            placeholder=" Surgerie Details... "
            value={SurgerieDetails}
            onChangeText={(text) => setSurgerieDetails(text)}
          />
        </View>
        

      </View>
    )}
     
    <View style={styles.container4}>
    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Any medical illness:</Text>
    <View style={styles.radioGroup}> 
        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="1"
        status={medicalillness === '1' ?  
        'checked' : 'unchecked'} 
        onPress={() => setmedicalillness('1')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        Yes 
        </Text> 
        </View> 

        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="2"
        status={medicalillness === '2' ?  
        'checked' : 'unchecked'} 
        onPress={() => setmedicalillness('2')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        No 
        </Text> 
        </View>
        </View>
  </View>
  {medicalillness === '1' && (
    <View style={styles.additionalContainer}>
      <View style={styles.question}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>Medical illness :    </Text>
        <TextInput
          style={styles.inputbox}
          placeholder=" illness Details... "
          value={medicalillnessDetails}
          onChangeText={(text) => setmedicalillnessDetails(text)}
        />
      </View>
      

    </View>
  )}
  <View style={styles.container4}>
  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Last child birth:</Text>
  <TextInput
    style={styles.data}
    placeholder="year/month/date"
    value={childbirth}
    onChangeText={(text) => setchildbirth(text)} />
</View> 
  
   
<TouchableOpacity  onPress={sendDataToServer}  style={styles.nextbtn}>
<Text  style={{color:"#fff", fontSize:20}} >Save</Text></TouchableOpacity>


</View>
  </ScrollView> 
  </View>
  </View> 

</KeyboardAvoidingView>

</SafeAreaView>
)
}

export default Generalpage;

 
const styles = StyleSheet.create({
  nextbtn:{
  width:"100%",
  backgroundColor:"#119988",
  padding:15,
  borderRadius:20,
  alignItems:"center"
  },
  wholecontainer:{
 padding:20,
 alignItems:"flex-start",
 rowGap:34,

  },
  containernext:{
    padding:5,
    backgroundColor:"#119900",
    alignItems:"center",
    justifyContent:"center",
  },
container1:{
flex:1,

},
question:{
  alignItems:"center",
  flexDirection:"row"
 },
 additionalContainer: {
  // marginTop: 10,
  padding: 10,
  rowGap:10,
  backgroundColor: '#CDE8DD',
  borderRadius: 15,
  justifyContent:"center",
  alignItems:"center"

},
// container2:{
// top:50,
// alignItems:'center',
// paddingLeft:20,
// flexDirection:'row',
// },
inputbox:{
  padding:10,
  borderRadius:10,
  width:"50%",
  backgroundColor:"lightgray",
  
},
container3:
{

width:'100%',
height:'100%',
backgroundColor:"#d9d9d9",
flexDirection: 'column',  
},
container4:{     
  justifyContent:"space-between",
  flexDirection:'row',
  alignItems:"center",
  width:"100%"
  },
dropdown: { //dropdown opiton
height: 45,
width:"53%",
backgroundColor:"#fff",
borderColor: 'gray',
borderWidth: 0.5,
borderRadius: 8,
paddingHorizontal: 4,  
},
icon: {
marginRight: 5,

},
label: {
position: 'absolute',
backgroundColor: 'white',
left: 22,
top: 8,
zIndex: 999,
paddingHorizontal:4,
fontSize: 14,
},
placeholderStyle: {
fontSize: 16,
},
selectedTextStyle: {
fontSize: 16,
},
iconStyle: {
width: 20,
height: 20,
},
inputSearchStyle: {
height: 40,
fontSize: 16,
},
radioGroup: { 
flexDirection: 'row', 
paddingleft:10,
paddingRight:10,
borderRadius: 10, 
backgroundColor: 'white', 
},
radioButton: { 
flexDirection:'row', 
alignItems: 'center', 
}, 
radioLabel: { 
marginLeft: 4, 
fontSize: 16, 
color: '#333', 
}, 
 data: {
  padding:8,
   height:40,
   width:"50%",
   borderRadius:10,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    // alignItems: 'center',
    paddingBottom: 20,
    ...Platform.select({
      android: {paddingTop: 10},
    }),
  },
  
}); 
