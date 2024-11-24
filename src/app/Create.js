import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Create = () => {
  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <Image
        source={require('../assets/icon.png')}
        style={styles.splashImage}
      />
      <Text style={styles.fintrackText}>FINTRACK</Text>

      {/* Welcome Back Text */}
      <Text style={styles.welcomeBackText}>Welcome Back!</Text>

      {/* Sign In and Sign Up Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={() => router.navigate('SignIN')}
        >
          <Text style={styles.signInText}>Sign In!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={() => router.navigate('SignUp')}
        >
          <Text style={styles.signUpText}>Sign Up!</Text>
        </TouchableOpacity>
      </View>

      {/* Motivational Text */}
      <Text style={styles.trackOrStayText}>
        Track or Stay Broke.{'\n'}Losers pick the second option.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#61E224',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: height * 0.1,
  },
  splashImage: {
    width: width * 0.2,
    height: width * 0.2,
    resizeMode: 'contain',
    marginTop: -height * 0.05,
  },
  fintrackText: {
    fontSize: width * 0.12,
    fontFamily: 'Staatliches',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  welcomeBackText: {
    fontSize: width * 0.08,
    fontFamily: 'SreeKrushnadevaraya',
    color: '#000000',
    textAlign: 'center',
    marginVertical: height * 0.02,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: width * 0.7,
    height: height * 0.07,
    borderRadius: width * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  signInButton: {
    backgroundColor: '#28A745',
    borderWidth: 2,
    borderColor: '#F3F3F3',
  },
  signUpButton: {
    backgroundColor: '#F3F3F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  signInText: {
    fontSize: width * 0.05,
    fontFamily: 'Staatliches',
    color: '#FFFFFF',
  },
  signUpText: {
    fontSize: width * 0.05,
    fontFamily: 'Staatliches',
    color: '#000000',
  },
  trackOrStayText: {
    fontSize: width * 0.05,
    fontFamily: 'SreeKrushnadevaraya',
    color: '#000000',
    textAlign: 'center',
    paddingHorizontal: width * 0.1,
    lineHeight: height * 0.03,
  },
});

export default Create;
