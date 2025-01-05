import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { router } from 'expo-router'; // Expo Router for navigation
import { supabase } from '../lib/supabase'; // Supabase client for backend communication
import { Ionicons } from '@expo/vector-icons'; // Icons for the password visibility toggle

const SignInScreen = () => {
  // State variables to manage user input and toggle password visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Function to handle user sign-in
  const handleSignIn = async () => {
    try {
      // Supabase API call to sign in with email and password
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Handle any errors from the API call
      if (error) {
        Alert.alert('Sign In Error', error.message);
        return;
      }

      // Successful sign-in logic
      if (data.user) {
        Alert.alert('Success', 'Welcome back!');
        router.navigate('dashboard'); // Navigate to the dashboard screen
      }
    } catch (err) {
      // Catch and display unexpected errors
      Alert.alert('Sign In Failed', err.message || 'Unexpected error occurred.');
    }
  };

  // Navigate to the SignUp screen
  const handleSignUp = () => {
    router.navigate('SignUp');
  };

  // Navigate to the ForgotPassword screen
  const handleForgotPassword = () => {
    router.navigate('ForgotPassword');
  };

  return (
    <ImageBackground
      source={require('../assets/light.png')} // Background image for the screen
      style={styles.background}
    >
      <View style={styles.container}>
        {/* App Logo */}
        <Image source={require('../assets/icon.png')} style={styles.splashImage} />

        {/* Welcome Text */}
        <Text style={styles.helloText}>Hello{"\n"}Sign in!</Text>

        {/* White Background Panel */}
        <View style={styles.whiteBackground} />

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          {/* Email Input */}
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor="#000"
            keyboardType="email-address" // Keyboard optimized for email input
            value={email}
            onChangeText={setEmail} // Update email state
          />

          {/* Password Input */}
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor="#000"
            secureTextEntry={!showPassword} // Toggle password visibility
            value={password}
            onChangeText={setPassword} // Update password state
          />
          {/* Toggle Password Visibility */}
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)} // Toggle the password visibility state
          >
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Forgot Password Link */}
        <TouchableOpacity style={styles.forgotPasswordContainer} onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Sign In Button */}
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up Link */}
        <Text style={styles.dontHaveAccountText}>Don’t have an Account?</Text>
        <TouchableOpacity style={styles.signUpContainer} onPress={handleSignUp}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

// Styles for the SignIn screen
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // Ensures the background image covers the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 79,
    height: 54,
    position: 'absolute',
    top: 70,
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
    top: 80,
    left: 90,
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
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 147,
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
