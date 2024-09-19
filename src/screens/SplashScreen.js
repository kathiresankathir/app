import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const letterAnimations = useRef(
    [...Array(8)].map(() => new Animated.Value(0))
  ).current; // Creates an array of animated values for each letter

  useEffect(() => {
    // Animate each letter with a slight delay between them
    const animations = letterAnimations.map((animatedValue, index) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: -10, // Move up by 10 units
            duration: 500,
            delay: index * 100, // Delay each letter's animation
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 10, // Move down by 10 units
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      );
    });

    // Start the animations simultaneously
    Animated.stagger(100, animations).start();

    // Navigate to WelcomeScreen after 1.2 seconds
    setTimeout(() => {
      navigation.replace('WelcomeScreen');
    }, 1200);
  }, [navigation, letterAnimations]);

  // Split the word "PregCare" into individual letters for animation
  const appName = 'PregCare'.split('');

  return (
    <View style={styles.container}>
      <View style={styles.animatedTextContainer}>
        {appName.map((letter, index) => (
          <Animated.Text
            key={index}
            style={[styles.letter, { transform: [{ translateY: letterAnimations[index] }] }]}>
            {letter}
          </Animated.Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#119988', // Adjust background color as needed
  },
  animatedTextContainer: {
    flexDirection: 'row', // Make letters appear in a row
  },
  letter: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginHorizontal: 2, // Adds some spacing between letters
  },
});

export default SplashScreen;
