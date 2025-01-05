// Import required libraries and components
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  ImageBackground 
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Navigation hook
import { router } from 'expo-router'; // Routing for navigation
import { supabase } from '../lib/supabase'; // Supabase client for backend API calls
import { Ionicons } from '@expo/vector-icons'; // For the eye icon (password visibility toggle)

// SignUpScreen Component
const SignUpScreen = () => {
  // State variables to manage form data and password visibility
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle for confirm password visibility

  // Navigation hook for screen transitions
  const navigation = useNavigation();

  // Function to handle the sign-up process
  const handleSignUp = async () => {
    // Ensure passwords match before proceeding
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      // Call Supabase to sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      // Handle any errors returned by Supabase
      if (error) {
        Alert.alert('Sign Up Error', error.message);
        return;
      }

      // If sign-up succeeds, insert user details into the database
      if (data.user) {
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ 
            userid: data.user.id, 
            name: fullName, 
            email: email, 
            password: password
          }]);

        // Handle any errors during database insertion
        if (insertError) {
          console.error('Insert Error:', insertError); // Log the error to the console
          Alert.alert('Error', `Failed to create user profile in the database: ${insertError.message}`);
          return;
        }

        // Notify the user of successful account creation
        Alert.alert('Success', 'Account created successfully! Please verify your email.');
        router.navigate('SignIN'); // Navigate to the dashboard or other screen
      }
    } catch (err) {
      // Handle unexpected errors during the sign-up process
      Alert.alert('Sign Up Failed', err.message || 'Unexpected error occurred.');
    }
  };

  // Function to navigate to the sign-in screen
  const handleSignIn = () => {
    router.navigate('SignIN'); // Navigate to SignIN screen
  };

  // Component UI
  return (
    <ImageBackground
      source={require('../assets/light.png')} // Background image
      style={styles.background}
      resizeMode="cover"
    >
      {/* App logo */}
      <Image source={require('../assets/icon.png')} style={styles.splashImage} />

      {/* Screen title */}
      <Text style={styles.headerText}>Create Your{"\n"}Account</Text>

      {/* White background behind the form */}
      <View style={styles.whiteBackground} />

      {/* Form inputs */}
      <View style={styles.inputContainer}>
        {/* Full Name input */}
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#000"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Email input */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#000"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password input with toggle visibility */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Enter your password"
            placeholderTextColor="#000"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          {/* Toggle password visibility */}
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword((prev) => !prev)}
          >
            <Ionicons name={showPassword ? "eye" : "eye-off"} size={20} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Confirm Password input with toggle visibility */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Re-enter your password"
            placeholderTextColor="#000"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {/* Toggle confirm password visibility */}
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowConfirmPassword((prev) => !prev)}
          >
            <Ionicons name={showConfirmPassword ? "eye" : "eye-off"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Sign-Up button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Link to sign-in screen */}
      <Text style={styles.footerText}>Already have an account?</Text>
      <TouchableOpacity style={styles.signInLink} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: 78,
    height: 54,
    position: 'absolute',
    top: 40,
    right: 70,
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'SreeKrushnadevaraya',
    fontWeight: '500',
    lineHeight: 35,
    color: '#000',
    textAlign: 'left',
    position: 'absolute',
    top: 50,
    left: 70,
  },
  whiteBackground: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: '23%',
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  inputContainer: {
    width: '80%',
    marginTop: '60%',
  },
  label: {
    fontSize: 18,
    color: '#61E224',
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 12,
  },
  signUpButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#61E224',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Staatliches',
  },
  footerText: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.7)',
    marginTop: 20,
    textAlign: 'center',
  },
  signInLink: {
    marginTop: 10,
  },
  signInText: {
    fontSize: 18,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SignUpScreen;
