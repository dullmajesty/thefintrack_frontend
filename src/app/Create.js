import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Create = () => {
  return (
    <ImageBackground
      source={require('../assets/light.png')} // Replace with your background image path
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Centered Header Section */}
        <View style={styles.centeredContent}>
          <Image
            source={require('../assets/icon.png')}
            style={styles.logo}
          />
          <Text style={styles.title}>FINTRACK</Text>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.signInButton]}
            onPress={() => router.navigate('SignIN')}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.signUpButton]}
            onPress={() => router.navigate('SignUp')}
          >
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Motivational Text */}
        <Text style={styles.motivationalText}>
          Track or Stay Broke.{'\n'}Losers pick the second option.
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the screen
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.1,
  },
  centeredContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
    resizeMode: 'contain',
  },
  title: {
    fontSize: width * 0.1,
    fontFamily: 'Staatliches',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: width * 0.1,
    fontFamily: 'SreeKrushnadevaraya',
    color: '#000',
    textAlign: 'center',
  },
  buttonContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: height * 0.1,
  },
  button: {
    width: '100%',
    height: height * 0.07,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  signInButton: {
    backgroundColor: '#61E224',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  signUpButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#61E224',
    borderWidth: 2,
  },
  signInText: {
    fontSize: width * 0.05,
    fontFamily: 'Staatliches',
    color: '#FFFFFF',
  },
  signUpText: {
    fontSize: width * 0.05,
    fontFamily: 'Staatliches',
    color: '#61E224',
  },
  motivationalText: {
    fontSize: width * 0.06,
    fontFamily: 'SreeKrushnadevaraya',
    color: '#000',
    textAlign: 'center',
    paddingHorizontal: width * 0.1,
    lineHeight: height * 0.03,
  },
});

export default Create;
