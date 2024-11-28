import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const SignInScreen = () => {
  const navigation = useNavigation();

  const handleSignIn = () => {
    router.navigate('dashboard');
  };

  const handleSignUp = () => {
    router.navigate('SignUp');
  };

  const handleForgotPassword = () => {
    router.navigate('ForgotPassword');
};

  return (
    <View style={styles.container}>
    
      <Image source={require('../assets/icon.png')} style={styles.splashImage} />

      
      <Text style={styles.helloText}>Hello{"\n"}Sign in!</Text>

     
      <View style={styles.whiteBackground} />

    
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gmail</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#000"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#000"
          secureTextEntry
        />
      </View>

     
      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>

      
      <Text style={styles.dontHaveAccountText}>Don’t have an Account?</Text>
      <TouchableOpacity style={styles.signUpContainer} onPress={handleSignUp}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    display: 'flex',
    backgroundColor: '#61E224',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 50,
    height: 54,
    position: 'absolute',
    top: 60,
    right: 70,
  },
  helloText: {
    fontSize: 30,
    fontFamily: 'SreeKrushnadevaraya',
    fontWeight: '500',
    lineHeight: 35,
    letterSpacing: 0.3,
    color: 'black',
    textAlign: 'left',
    marginBottom: 10,
    position: 'absolute',
    top: 70,
    left: 30,
  },
  whiteBackground: {
    width: '100%',
    height: '70%',
    position: 'absolute',
    top: '30%',
    backgroundColor: 'white',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  inputContainer: {
    width: '80%',
    marginTop: '45%',
  },
  label: {
    color: '#61E224',
    fontSize: 18,
    fontFamily: 'SreeKrushnadevaraya',
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: '10%',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: '#000',
    textDecorationLine: 'underline',
  },
  signInButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#61E224',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Staatliches',
  },
  dontHaveAccountText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.7)',
    marginTop: 20,
    textAlign: 'center',
  },
  signUpContainer: {
    marginTop: 10,
  },
  signUpText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SignInScreen;