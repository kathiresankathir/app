import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Toast = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={[styles.container, { opacity: visible ? 1 : 0 }]}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  message: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Toast;
