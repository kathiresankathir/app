import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
const Dietpageone = ({navigation}) => {
  return (
    <View style={{}}>
     
<View style={styles.box}>
<Text style={{fontSize:20,fontWeight:"bold",color:"#00bfaf"}}>you are healthy !</Text>
<Text style={{fontSize:24,color:"#cc818c",fontStyle:"italic"}}>Continue with same line of treatment and Diet plan </Text>
<View style={{justifyContent:'center'}}>
<Image source={require('../images/dietimg.png')}/>
</View>
</View>   
 </View>
  )
}

export default Dietpageone


const styles = StyleSheet.create({
    box:{
        alignItems:'center',
        rowGap:20,
        top:30
    },
   
})