import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function WelcomePage() {
  const navigation = useNavigation();

  const [loaded] = useFonts({
    Staatliches: require('../assets/Staatliches-Regular.ttf'),
    SreeKrushnadevaraya: require('../assets/SreeKrushnadevaraya-Regular.ttf'),
  });

  if (!loaded) {
    return null; 
  }

  return (
    <ImageBackground
      source={require('../assets/light.png')} // Replace with your background image path
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('../assets/icon.png')}
          style={styles.splashImage}
        />

        {/* Title and Subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>FINTRACK</Text>
          <Text style={styles.subtitle}>
            Every expense counts,{'\n'}every goal matters.
          </Text>
        </View>

        {/* Get Started Button */}
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => router.navigate('Create')}
        >
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center', // Centers all elements vertically
    alignItems: 'center', // Centers all elements horizontally
    paddingVertical: height * 0.05, // Adds balanced top and bottom spacing
  },
  splashImage: {
    width: width * 0.5, // Adjust logo size relative to screen width
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: height * 0.05, // Space between logo and text
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.08, // Space between text and button
    paddingHorizontal: width * 0.1, // Ensure text has horizontal padding
  },
  title: {
    fontSize: width * 0.12, // Responsive title size
    fontFamily: 'Staatliches',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.02, // Space between title and subtitle
  },
  subtitle: {
    fontSize: width * 0.05,
    fontFamily: 'SreeKrushnadevaraya',
    textAlign: 'center',
    color: '#FFFFFF',
    lineHeight: height * 0.03,
  },
  buttonContainer: {
    width: width * 0.7, // Button width relative to screen width
    paddingVertical: height * 0.015, // Vertical padding for button
    backgroundColor: '#00A651',
    borderRadius: width * 0.05, // Rounded button corners
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.06,
    fontFamily: 'Staatliches',
  },
});
