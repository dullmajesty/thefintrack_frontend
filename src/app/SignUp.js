import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { supabase } from '../lib/supabase'; // Adjust the path if necessary

const SignUpScreen = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match!');
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        Alert.alert('Sign Up Error', error.message);
        return;
      }

      if (data.user) {
        // Now insert the user's data into the `users` table
        const { error: insertError } = await supabase
          .from('users')
          .insert([{ 
            userid: data.user.id, 
            name: fullName, 
            email: email, 
            password: password
          }]);

          if (insertError) {
            console.error('Insert Error:', insertError); // Log the error to the console
            Alert.alert('Error', `Failed to create user profile in the database: ${insertError.message}`);
            return;
          }

        Alert.alert('Success', 'Account created successfully! Please verify your email.');
        router.navigate('dashboard'); // Navigate to the dashboard or other screen
      }
    } catch (err) {
      Alert.alert('Sign Up Failed', err.message || 'Unexpected error occurred.');
    }
  };

  const handleSignIn = () => {
    router.navigate('SignIN'); // Navigate to SignIN screen
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.splashImage} />

      <Text style={styles.headerText}>Create Your{"\n"}Account</Text>

      <View style={styles.whiteBackground} />

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#000"
          value={fullName}
          onChangeText={setFullName}
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#000"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#000"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Re-enter your password"
          placeholderTextColor="#000"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Already have an account?</Text>
      <TouchableOpacity style={styles.signInLink} onPress={handleSignIn}>
        <Text style={styles.signInText}>Sign In</Text>
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
    top: 50,
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
    left: 30,
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
