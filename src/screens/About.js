import { StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AntDesign,Ionicons } from '@expo/vector-icons';

const About = () => {
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         style={{ marginLeft: 20 }}
  //         onPress={() => navigation.goBack()}
  //       >
  //         <AntDesign name="arrowleft" size={24} color="black" />
  //       </TouchableOpacity>
  //     ),
  //     title: 'About ', // Set the header title
  //   });
  // }, [navigation]);
  
  return (
    <ScrollView style={styles.container}>
    
<View style={styles.con1}>
      {/* About Content */}
      <Text style={styles.title}>About PregCare</Text>
      <Text style={styles.content}>
        Welcome to PregCare, a comprehensive health management app designed specifically 
        for monitoring and managing anemia and hypertension during pregnancy. Our platform 
        connects doctors and patients, allowing for efficient, secure, and effective health 
        monitoring throughout pregnancy.
      </Text>
      <Text style={styles.subheading}>For Doctors</Text>
      <Text style={styles.content}>
        PregCare enables you to maintain, track, and manage patient reports effortlessly. 
        You can monitor your patients’ health, analyze their condition, and provide timely 
        feedback, all through a single app.
      </Text>
      <Text style={styles.subheading}>For Patients</Text>
      <Text style={styles.content}>
        Stay on top of your health with easy access to your medical reports and direct communication 
        with your doctor. Monitor important health metrics related to anemia and hypertension, ensuring 
        you receive the best possible care throughout your pregnancy journey.
      </Text>
      <Text style={styles.subheading}>Diet Plan Customization</Text>
      <Text style={styles.content}>
        In addition to health monitoring, PregCare offers personalized diet plan customization. 
        Doctors can provide tailored diet recommendations to meet the unique nutritional needs of each 
        patient, ensuring a balanced intake of essential nutrients for both the mother and the baby.
        Whether you're following a vegetarian, non-vegetarian, or special diet, PregCare helps you stay 
        on track with customized meal plans to support a healthy pregnancy.
      </Text>
      <Text style={styles.subheading}>Key Features</Text>
      <Text style={styles.content}>
        • Real-Time Reports: Doctors can update and maintain patient reports, providing real-time insights 
        into health conditions.{'\n'}
        • Doctor-Patient Interaction: Both doctors and patients can access the platform, making it easier to 
        share information and maintain communication.{'\n'}
        • Personalized Health Monitoring: Tailored specifically for the conditions of anemia and hypertension, 
        ensuring both mothers and doctors can focus on essential aspects of care during pregnancy.{'\n'}
        • Customized Diet Plans: Personalized meal plans created by healthcare professionals to ensure the 
        nutritional needs of both mother and baby are met.{'\n'}
        • Secure and Reliable: All medical data is kept safe and accessible only to authorized users.
      </Text>
      <Text style={styles.subheading}>Our Vision</Text>
      <Text style={styles.content}>
        To create a healthier pregnancy experience for mothers by offering a seamless connection between 
        healthcare providers and patients, ensuring timely monitoring and treatment of anemia, hypertension, 
        and proper nutrition during pregnancy.
      </Text>
      </View>
    </ScrollView>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f3f3f3',
  },
  con1:{
   marginBottom:30,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 10,
    color: '#333',
  }
})
