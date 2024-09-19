import { StyleSheet, Text, View ,ScrollView,SafeAreaView,KeyboardAvoidingView,TextInput} from 'react-native'
import React, { useState } from 'react'; 
import { RadioButton } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_SERVER_URL } from './config';
// const Stack = createStackNavigator();

const Hyperpageone = ({navigation,route}) => {
  const patientid = (route.params)

  const [Headache, setHeadache] = useState(null); 
  const [Blurringofvision, setBlurringofvision] = useState(null); 
  const [Epigastricpain, setEpigastricpain] = useState(null); 
  const [Urineoutput, setUrineoutput] = useState(null); 
  const [Systolicspvalue, setSystolicspvalue] = useState('');
  const [DiastolicBP, setDiastolicBP] = useState('');
  const [Meditationtaken, setMeditationtaken] = useState(null);
  const [HistoryofHypertension, setHistoryofHypertension] = useState(null);
  const [Hemoglobin, setHemoglobin] = useState('');
  const [Platelets, setPlatelets] = useState('');
  const PatientID = patientid.patientdetails;


  const sendDataToServer = async () => {
    try {
      const response = await fetch(`${API_SERVER_URL}/hypertwo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientID: PatientID,
          Headache: Headache , 
          Blurringofvision: Blurringofvision,
          Epigastricpain: Epigastricpain,
          Urineoutput: Urineoutput,
          SystolicBP: Systolicspvalue,
          DiastolicBP: DiastolicBP,
          Meditationtaken: Meditationtaken,
          HistoryofHypertension: HistoryofHypertension,
          Hemoglobin:Hemoglobin,
          Platelets:Platelets,
        }),
      });
      if (response.ok) {
        // Data sent successfully
        
        console.log('Data sent successfully');

        // Navigate to the next page or perform any other action
        navigation.navigate("Hyperpagetwo",{
          PatientID,
          Headache,
          Blurringofvision,
          Epigastricpain,
          Urineoutput,
          Systolicspvalue,
          DiastolicBP,
          Meditationtaken,
          HistoryofHypertension,
          Hemoglobin,
          Platelets,
        });
      } else {
        // Handle error
        console.error('Error sending data to server');
      }
    } catch (error) {
      // Handle error
      console.error('Error sending data to server:', error);
    }
  };





  return (
    
    <SafeAreaView style={{ flex: 1 }}>
    <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : null}
  style={{ flex: 1, ...Platform.select({ android: { flex: 1 } }) }}>
    <View style={styles.container1}>
    

    <View style={styles.container3}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>

     <View style={styles.container4}>
      <Text style={{fontWeight:'bold',fontSize: 18,color:"#119988"}}>Symptoms</Text>
      <View style={styles.containertext}>
      <View style={styles.container5}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Headache</Text>
			<View style={styles.radioGroup}> 
				<View style={styles.radioButton}> 
					<RadioButton.Android value="1"	status={Headache === '1' ? 	'checked' : 'unchecked'} 
						onPress={() => setHeadache('1')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	YES </Text> 
				</View> 

				<View style={styles.radioButton}> 
					<RadioButton.Android value="2" status={Headache === '2' ? 'checked' : 'unchecked'} 
						onPress={() => setHeadache('2')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	NO 	</Text> 
				</View> 
        </View>
			</View> 
      <View style={styles.container5}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Blurring of{'\n'} vision</Text>
			<View style={styles.radioGroup}> 
				<View style={styles.radioButton}> 
					<RadioButton.Android value="1"	status={Blurringofvision === '1' ? 	'checked' : 'unchecked'} 
						onPress={() => setBlurringofvision('1')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	YES </Text> 
				</View> 

				<View style={styles.radioButton}> 
					<RadioButton.Android value="2" status={Blurringofvision === '2' ? 'checked' : 'unchecked'} 
						onPress={() => setBlurringofvision('2')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	NO 	</Text> 
				</View> 
        </View>
			</View> 
      <View style={styles.container5}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Epigastric {'\n'} Pain</Text>
			<View style={styles.radioGroup}> 
				<View style={styles.radioButton}> 
					<RadioButton.Android value="1"	status={Epigastricpain === '1' ? 	'checked' : 'unchecked'} 
						onPress={() => setEpigastricpain('1')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	YES </Text> 
				</View> 

				<View style={styles.radioButton}> 
					<RadioButton.Android value="2" status={Epigastricpain === '2' ? 'checked' : 'unchecked'} 
						onPress={() => setEpigastricpain('2')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	NO 	</Text> 
				</View> 
        </View>
			</View>
      <View style={styles.container5}>
      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Decrease in{'\n'} urine output</Text>
			<View style={styles.radioGroup}> 
				<View style={styles.radioButton}> 
					<RadioButton.Android value="1"	status={Urineoutput === '1' ? 	'checked' : 'unchecked'} 
						onPress={() => setUrineoutput('1')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	YES </Text> 
				</View> 

				<View style={styles.radioButton}> 
					<RadioButton.Android value="2" status={Urineoutput === '2' ? 'checked' : 'unchecked'} 
						onPress={() => setUrineoutput('2')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	NO 	</Text> 
				</View> 
        </View>
			</View>
      </View>
  <Text style={{ top:20,fontWeight:'bold',fontSize: 18,color:"#119988"}}>Blood pressure</Text>
      <View style={styles.containertext}>

     
     
        <View style={styles.container6}>
        <Text style={{fontWeight: 'bold', fontSize: 16 }}> Previous History{'\n'} of Hypertension </Text>
        <View>
        <View style={styles.radioGroup}> 
				<View style={styles.radioButton}> 
					<RadioButton.Android value="1"	status={HistoryofHypertension  === '1' ? 	'checked' : 'unchecked'} 
						onPress={() => setHistoryofHypertension('1')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	YES </Text> 
				</View> 

				<View style={styles.radioButton}> 
					<RadioButton.Android value="2" status={HistoryofHypertension === '2' ? 'checked' : 'unchecked'} 
						onPress={() => setHistoryofHypertension('2')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	NO 	</Text> 
				</View> 
        </View>
          </View>
          </View>
          <View style={styles.container6}>
      <Text style={{ fontWeight: 'bold', fontSize: 16, }}>Meditation taken </Text>
			<View style={styles.radioGroup}> 
				<View style={styles.radioButton}> 
					<RadioButton.Android value="1"	status={Meditationtaken  === '1' ? 	'checked' : 'unchecked'} 
						onPress={() => setMeditationtaken('1')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	YES </Text> 
				</View> 

				<View style={styles.radioButton}> 
					<RadioButton.Android value="2" status={Meditationtaken === '2' ? 'checked' : 'unchecked'} 
						onPress={() => setMeditationtaken('2')} 	color="#119988"/> 
					<Text style={styles.radioLabel}> 	NO 	</Text> 
				</View> 
        </View>
			</View>
      <View style={styles.container6}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>Systolic BP</Text>
      <View>
        <TextInput
          style={styles.values}
          placeholder="Enter the Value"
          value={Systolicspvalue}
          onChangeText={(text) => setSystolicspvalue(text)}
        />
        </View>
      </View>
      <View style={styles.container6}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}> Diastolic BP</Text>
      <View>
        <TextInput
          style={styles.values}
          placeholder="Enter the Value"
          value={DiastolicBP}
          onChangeText={(text) => setDiastolicBP(text)}
        />
        </View>
        </View>
      <View style={styles.container6}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>Hemoglobin </Text>
      <View>
        <TextInput
          style={styles.values}
          placeholder="Enter the level"
          value={Hemoglobin}
          onChangeText={(text) => setHemoglobin(text)}
        />
        </View>
      </View>
      <View style={styles.container6}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>Platelets </Text>
      <View>
        <TextInput
          style={styles.values}
          placeholder="Enter the level"
          value={Platelets}
          onChangeText={(text) => setPlatelets(text)}
        />
        </View>
      </View>
      </View>
      <View style={styles.nextbton}>
       <TouchableOpacity onPress={sendDataToServer} style={styles.nextbtn}>
       <Text  style={{color:"#fff", fontSize:20}} >Next</Text>
       </TouchableOpacity>
       </View>
        </View>
        </ScrollView>

    </View>

   </View>
  </KeyboardAvoidingView>
 </SafeAreaView>
  
  )
}


export default Hyperpageone

const styles = StyleSheet.create({
 
  scrollViewContainer: {
    flexGrow: 1,
  },
  container1: {
    flex: 1,
  },
  nextbton:{
  paddingleft:20,
  paddingRight:20

  },
  nextbtn: {
    
    alignItems:'center',
    width: "100%",
    backgroundColor: "#119988",
    padding: 15,
    borderRadius: 20,
    alignItems: "center"
  },
  
  container3: {
    
    width: '100%',
    height: '100%',
    backgroundColor: "#d9d9d9",
    // borderTopEndRadius: 40,
    // borderTopStartRadius: 40,
    // columnGap:0,
  },
  containertext:{
    padding:20,
    alignItems:"flex-start",
    rowGap:20,
     },
  container4:{
    paddingLeft:20,
    top:5,
    // width:'100%',
    flexDirection:'column',
    rowGap:10
  },
  container5:{
    justifyContent:"space-between",
    flexDirection:'row',
    alignItems:"center",
    width:"100%"
  },
	radioGroup: { 
    gap:10,
    flexDirection: 'row', 
    paddingleft:10,
    paddingRight:10,
    borderRadius: 10, 
    backgroundColor: 'white', 
    // elevation: 4, 
    // shadowColor: '#000', 
    // shadowOffset: { 
    //  width: '100%', 
    // height: 2, 
    // }, 
    // shadowOpacity: 0.25, 
    // shadowRadius: 3.84, 
    // width:'50%'
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
    values: {
      height:40,
      width: "100%",
      // width:'auto',
       padding: 10,
      borderRadius: 10,
      backgroundColor: "#fff",
    },
   
    container6:{
      justifyContent:"space-between",
      flexDirection:'row',
      alignItems:"center",
      width:"100%",
      top:10
    },
   
})