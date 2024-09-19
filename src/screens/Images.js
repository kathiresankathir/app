import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import axios from 'axios';
import { API_SERVER_URL } from './config';

const Images = ({route}) => {
    const { doctorID } = route.params;

  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const doctorid = doctorID; // Replace with the actual doctorid


  // Fetch images from the server
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${API_SERVER_URL}/reports/${doctorid}`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  // Handle image click
  const handleImageClick = (imageUri) => {
    setSelectedImage(imageUri);
  };

  // Close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleImageClick(item.images)}>
            <Image source={{ uri: item.images }} style={styles.imageThumbnail} />
          </TouchableOpacity>
        )}
      />

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <Modal visible={true} transparent={true}>
          <TouchableOpacity style={styles.modalContainer} onPress={closeModal}>
            <Image source={{ uri: selectedImage }} style={styles.fullScreenImage} />
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default Images;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  imageThumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
