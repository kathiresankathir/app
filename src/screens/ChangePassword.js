import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const ChangePassword = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Change Password Page</Text>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
