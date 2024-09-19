import { StyleSheet, Text, View ,ScrollView,SafeAreaView,KeyboardAvoidingView,Alert, TextInput } from 'react-native'
import React, { useState } from 'react'; 
import { RadioButton} from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_SERVER_URL } from './config';
// const Stack = createStackNavigator();


const Hyperpagetwo = ({navigation,route}) => {
  const [SGOT, onChangeSGOT] = useState('');
  const [SGPT, onChangeSGPT] = useState('');
  const [Albumin, onChangeAlbumin] = useState('');
  const [Totalprotein, onChangeTotalprotein] = useState('');
  const [DirectBilirubin, onChangeDirectBilirubin] = useState('');
  const [TotalBilirubin, onChangeTotalBilirubin] = useState('');
  const [UREA, onChangeUREA] = useState('');
  const [  UrineAlbumin, onChangeUrineAlbumin] = useState('');
  const [  Urineketone, onChangeUrineketone] = useState('');
  const [  UrineSugar, onChangeUrineSugar] = useState('');
  const [inputText, setInputText] = useState('');

  const pid = route.params.PatientID;
  console.log(pid);

  const sendDataToServer = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    try {
      const sendData = {
        date:new Date().toISOString().slice(0, 10),
        PatientID: route.params.PatientID,
        Headache: route.params.Headache ,
        Blurringofvision:  route.params.Blurringofvision,
        Epigastricpain:  route.params.Epigastricpain,
        Urineoutput:  route.params.Urineoutput,
        SystolicBP:  route.params.Systolicspvalue,
        DiastolicBP:  route.params.DiastolicBP,
        Meditationtaken:  route.params.Meditationtaken,
        HistoryofHypertension:  route.params.HistoryofHypertension,
        Hemoglobin:  route.params.Hemoglobin,
        Platelets: route.params.Platelets,
        SGOT: SGOT,
        SGPT: SGPT,
        Albumin: Albumin,
        Totalprotein:  Totalprotein,
        DirectBilirubin: DirectBilirubin,
        TotalBilirubin: TotalBilirubin,
        UREA:  UREA,
        UrineAlbumin:  UrineAlbumin,
        Urineketone: Urineketone,
        UrineSugar: UrineSugar,
        Otherreports:inputText,
      };
  const response = await fetch(`${API_SERVER_URL}/hypertwo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(sendData),
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
    
    
    <View style={styles.container3}>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>

     <View style={styles.container4}>
      
  <Text style={{fontWeight:'bold',fontSize: 18,color:"#119988"}}>LFT Report </Text>
      <View style={styles.containertext}>
      <View style={styles.container5}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>SGOT</Text>
      <View>
      <TextInput
      style={styles.inputt}
      placeholder="Value"
      keyboardType="numeric"
      onChangeText={onChangeSGOT}
      value={SGOT}
    />
        </View>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>SGPT</Text>
        <View>
        <TextInput
        style={styles.inputt}
        placeholder="Value"
        keyboardType="numeric"
        onChangeText={onChangeSGPT}
        value={SGPT}
      />
      </View>
      </View>
      <View style={styles.container5}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>Albumin </Text>
      <View>
      <TextInput
      style={styles.input}
      placeholder="Enter the level"
      onChangeText={onChangeAlbumin}
      value={Albumin}
    />
        </View>
      </View>
      <View style={styles.container5}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>Total protein </Text>
      <View>
      <TextInput
      style={styles.input}
      placeholder="Enter the level"
      onChangeText={onChangeTotalprotein}
      value={Totalprotein}
    />
        </View>
      </View>
      <View style={styles.container5}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>Direct Bilirubin </Text>
      <View>
      <TextInput
      style={styles.input}
      placeholder="Enter the level"
      onChangeText={onChangeDirectBilirubin}
      value={DirectBilirubin}
    />
        </View>
      </View>
      <View style={styles.container5}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>Total Bilirubin </Text>
      <View>
      <TextInput
      style={styles.input}
      placeholder="Enter the level"
      onChangeText={onChangeTotalBilirubin}
      value={TotalBilirubin}
    />
        </View>
      </View>
      </View>

      <Text style={{fontWeight:'bold',fontSize: 18,color:"#119988"}}>RFT Report  </Text>
      <View style={styles.containertext}>

      <View style={styles.container5}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>UREA </Text>
      <View>
      <TextInput
      style={styles.input}
      placeholder="Enter the level"
      onChangeText={onChangeUREA}
      value={UREA}
    />
        </View>
        </View>
        <View style={styles.container5}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>Urine Albumin </Text>
      <View>
      <TextInput
      style={styles.input}
      placeholder="Enter the level"
      onChangeText={onChangeUrineAlbumin}
      value={ UrineAlbumin}
    />
        </View>
      </View>
      <View style={styles.container5}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>Urine ketone </Text>
      <View>
      <TextInput
      style={styles.input}
      placeholder="Enter the level"
      onChangeText={onChangeUrineketone}
      value={Urineketone }
    />
     </View>
    </View>
      <View style={styles.container5}>
      <Text style={{fontWeight: 'bold', fontSize: 16 }}>Urine Sugar  </Text>
      <View>
      <TextInput
      style={styles.input}
      placeholder="Enter the level"
      onChangeText={onChangeUrineSugar}
      value={UrineSugar}/>
        </View>
       </View>
       
      </View>

      <Text style={{fontWeight:'bold',fontSize: 18,color:"#119988"}}>Any othe reports  </Text>
      <View style={styles.containertextt}>
      <View style={styles.containerr}>
      <View>
      <TextInput
            style={styles.input2}
            multiline={true} // Allow multiple lines
            value={inputText}
            placeholder="Write a Note.... "
            onChangeText={(text) => setInputText(text)} />

          
        </View>
        </View>
       
        
      </View>

      <View style={styles.nextbton}>
     <TouchableOpacity onPress={sendDataToServer} style={styles.nextbtn}>
     <Text  style={{color:"#fff", fontSize:20}} >Save</Text>
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


export default Hyperpagetwo

const styles = StyleSheet.create({
 
  scrollViewContainer: {
    flexGrow: 1,
  },
  container1: {
    flex: 1,
  },
  nextbton:{
    top:-20,
    paddingleft:20,
    paddingRight:20
  
    },
    containertextt:{
      padding:20,
      alignItems:"flex-start",
      rowGap:10,
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
    rowGap:25,
     },
  container4:{
    paddingLeft:20,
    top:15,
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
      width: "100%",
      height: 40,
      width:'auto',
       padding: 2,
      // borderRadius: 10,
      backgroundColor: "#fff",
    },
    input: {
      height:40,
      width: "100%",
      paddingRight:40,
      // width:'auto',
       padding: 10,
      borderRadius: 10,
      backgroundColor: "#fff",
    },
    input2: {
      height:140,
      width: "100%",
       padding: 10,
      borderRadius: 10,
      backgroundColor: "#fff",
      textAlignVertical:'top', // Align text to the top
    },
    containerr:{
      width:"100%"
    },
    inputt: {
      height:40,
      width: "100%",
      // width:'auto',
       padding: 10,
      borderRadius: 10,
      backgroundColor: "#fff",
    },
})