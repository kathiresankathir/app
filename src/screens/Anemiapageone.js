import { StyleSheet, Text, View,TextInput,Alert,TouchableOpacity,navigation,ScrollView, SafeAreaView, KeyboardAvoidingView,Platform} from 'react-native'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper'; 
import { createStackNavigator } from '@react-navigation/stack';
import { API_SERVER_URL } from './config';
const Stack = createStackNavigator();
// import { NavigationContainer } from '@react-navigation/native';
const data = [
{ label: '>11gm/dl', value: '1' },
{ label: '9-10.9gm/dl', value: '2' },
{ label: '7-8.9gm/dl', value: '3' },
{ label: '<7gm/dl', value: '4' },
];
const mentzerIndexData = [
  { metvalue: '<12', value: '1' },
  { metvalue: '>12', value: '2' },
  
];

const Anemiapageone = ({navigation, route}) => {
const patientid = (route.params)

const [isFocus, setIsFocus] = useState(false);
const [Bloodtransfusion, setBloodtransfusion] = useState(null);
const [Bleedingdisorder, setBleedingdisorder] = useState(null);
const [MCVvalue, setMCVValue] = useState('');
const [MCHvalue, setMCHValue] = useState('');
const [MCHCvalue, setMCHCValue] = useState('');
const [RDWvalue, setRDWValue] = useState('');
const [hemoglobinLevel, setHemoglobinLevel] = useState(null);
const [mentzerIndexValue, setMentzerIndexValue] = useState(null); // New state for Mentzer Index
const [isFocus2, setIsFocus2] = useState(false);// use state for mentzer

const PatientID = patientid.patientdetails;
// const [bleedingDisorder, setBleedingDisorder] = useState(null); // New state for bleeding disorder
const sendDataToServer = async () => {
  try {
    const response = await fetch(`${API_SERVER_URL}/save-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientID: PatientID,
        HemoglobinLevel: hemoglobinLevel,
        BloodTransfusion: Bloodtransfusion,
        BleedingDisorder: Bleedingdisorder,
        MCV: MCVvalue,
        MCH: MCHvalue,
        MCHC: MCHCvalue,
        RDW: RDWvalue,
        MentzerIndex: mentzerIndexValue,
      }),
    });
    if (response.ok) {
      console.log('Data sent successfully');
      // Continue to the next page
      navigation.navigate('Anemiapagetwo', {
        PatientID,
        hemoglobinLevel,
        Bloodtransfusion,
        Bleedingdisorder,
        MCVvalue,
        MCHvalue,
        MCHCvalue,
        RDWvalue,
        mentzerIndexValue,
      });
    } else {
      console.error('Error sending data to server');
    }
  } catch (error) {
    console.error('Error sending data to server:', error);
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
  
      <Text style={{fontWeight:'bold',fontSize:16}}>Hemoglobin level </Text>
      <Dropdown
    style={[styles.dropdown, isFocus && { borderColor: '#119988' }]}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    iconStyle={styles.iconStyle}
    data={data}
    maxHeight={300}
    labelField="label"
    valueField="value"
    placeholder={!isFocus ? 'Select Level' : 'Select your Level'}
    searchPlaceholder="Select the Level"
    value={hemoglobinLevel}
    onFocus={() => setIsFocus(true)}
    onBlur={() => setIsFocus(false)}
    onChange={item => {
        setHemoglobinLevel(item.value);
        setIsFocus(false);
    }}
    renderLeftIcon={() => (
        <AntDesign
        
            style={styles.icon}
            color={isFocus ? '#119988' : 'black'}
            name="Safety"
            size={20}
        />
    )}
/>

    </View>

    <View  style={styles.container4} > 
    <Text style={{fontWeight:'bold',fontSize:16}}>History of Blood{'\n'} transfusion </Text> 
          <View style={styles.radioGroup}> 
          <View style={styles.radioButton}> 
          <RadioButton.Android 
          value="1"
          status={Bloodtransfusion === '1' ?  
          'checked' : 'unchecked'} 
          onPress={() => setBloodtransfusion('1')} 
          color="#119988"
          /> 
          <Text style={styles.radioLabel}> 
          Yes 
          </Text> 
          </View> 

          <View style={styles.radioButton}> 
          <RadioButton.Android 
          value="2"
          status={Bloodtransfusion === '2' ?  
          'checked' : 'unchecked'} 
          onPress={() => setBloodtransfusion('2')} 
          color="#119988"
          /> 
          <Text style={styles.radioLabel}> 
          No 
          </Text> 
          </View>
          </View> 
          </View> 
        <View  style={styles.container4}>
        <Text style={{fontWeight:'bold',fontSize:16}}>History of Bleeding{'\n'} disorder  </Text> 
        <View style={styles.radioGroup}> 
        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="1"
        status={Bleedingdisorder === '1' ?  
        'checked' : 'unchecked'} 
        onPress={() => setBleedingdisorder('1')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        Yes 
        </Text> 
        </View> 

        <View style={styles.radioButton}> 
        <RadioButton.Android 
        value="2"
        status={Bleedingdisorder === '2' ?  
        'checked' : 'unchecked'} 
        onPress={() => setBleedingdisorder('2')} 
        color="#119988"
        /> 
        <Text style={styles.radioLabel}> 
        No 
        </Text> 
        </View>
        </View>
        </View>
        <View style={styles.container4} >
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Enter The MCV :</Text>
        <TextInput
          style={styles.data}
          placeholder="MCV value"
          value={MCVvalue}
          onChangeText={(text) => setMCVValue(text)} />
      </View> 
      <View style={styles.container4}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Enter  The MCH :</Text>
      <TextInput
        style={styles.data}
        placeholder="MCH value"
        value={MCHvalue}
        onChangeText={(text) => setMCHValue(text)} />
    </View> 
    <View style={styles.container4}>
    <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Enter  The MCHC :</Text>
    <TextInput
      style={styles.data}
      placeholder="MCHC value"
      value={MCHCvalue}
      onChangeText={(text) => setMCHCValue(text)} />
  </View>
  <View style={styles.container4}>
            <Text style={{fontWeight: 'bold', fontSize: 16 }}>Enter  The RDW :</Text>
            <TextInput
              style={styles.data}
              placeholder="RDW value"
              value={RDWvalue}
              onChangeText={(text) => setRDWValue(text)} />
    </View>
    <View style={styles.container4}>
  <Text style={{fontWeight:'bold',fontSize:16}}> Mentzer index Level </Text>
  <Dropdown
    style={[styles.dropdown, isFocus2 && { borderColor: '#119988' }]}
    placeholderStyle={styles.placeholderStyle}
    selectedTextStyle={styles.selectedTextStyle}
    iconStyle={styles.iconStyle}
    data={mentzerIndexData}
    maxHeight={150}
    labelField="metvalue"
    valueField="value"
    placeholder={!isFocus2 ? 'Select Level' : 'Select your Level'}
    searchPlaceholder="Select the Level"
    value={mentzerIndexValue}
    onFocus={() => setIsFocus2(true)}
    onBlur={() => setIsFocus2(false)}
    onChange={item => {
        setMentzerIndexValue(item.value);
        setIsFocus2(false);
    }}
/>

</View>
<TouchableOpacity onPress={sendDataToServer}  style={styles.nextbtn}>
<Text  style={{color:"#fff", fontSize:20}} >Next</Text></TouchableOpacity>


</View>
  </ScrollView> 
  </View>
  </View> 

</KeyboardAvoidingView>

</SafeAreaView>
)
}

export default Anemiapageone;

 
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
// container2:{
// top:50,
// alignItems:'center',
// paddingLeft:20,
// flexDirection:'row',
// },
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
