import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Alert } from 'react-native';
import Modal from 'react-native-modal';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { API_SERVER_URL } from './config';

const UploadReport = ({ route ,navigation }) => {
  const { doctorID } = route.params;

  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [image, setImage] = useState(null);

  const doctorid = doctorID; // Replace with the actual doctorid

  // Function to upload image from the gallery
  const handleChooseFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: undefined,
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const imageUri = result.assets[0].uri;
        setImage(imageUri); // Set the image URI to state
        
        const formData = new FormData();
        formData.append('fileName', {
          uri: imageUri,
          type: 'image/*', // Adjust the mime type according to your image type
          name: 'image.png', // Adjust the file name if needed
        });
        formData.append('doctorid', doctorid); // Include the doctorid
        
        const response = await axios.post(`${API_SERVER_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        console.log('Image uploaded successfully:', response.data);
        Alert.alert('Success', 'Image uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Error uploading image');
    }
  };

  return (
    <View style={styles.box}>
      <View style={styles.boxx}>
        <View style={styles.box2}>
          <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
            Add a medical record.
          </Text>
          <Text style={styles.text}>
            A detailed health history helps a doctor diagnose you better.
          </Text>
          <TouchableOpacity style={styles.vurbox}>
            <Text onPress={() => navigation.navigate('Images',{doctorID})}>View Uploaded Report</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadbox} onPress={handleChooseFromGallery}>
            <Text>Upload from Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default UploadReport;

const styles = StyleSheet.create({
  boxx: {
    alignItems: 'center',
    top: 30,
    rowGap: 50,
  },
  vurbox: {
    backgroundColor: '#996633',
    alignItems: 'center',
    height: 40,
    width: 180,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  box: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  box2: {
    top: 40,
    alignItems: 'center',
    rowGap: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
  },
  uploadbox: {
    backgroundColor: '#0EBE7F',
    alignItems: 'center',
    height: 40,
    width: 150,
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 20,
  },
});
