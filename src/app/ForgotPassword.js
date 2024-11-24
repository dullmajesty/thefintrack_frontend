import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = () => {
    if (email === '') {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }

    // Simulate sending a password reset email
    // Here you can integrate your password reset logic (e.g., Firebase, backend API, etc.)
    Alert.alert('Success', 'A password reset link has been sent to your email.');
    router.navigate('SignIn'); // Navigate back to SignIn screen after reset
  };

  return (
    <View style={styles.container}>
      {/* Header Text */}
      <Text style={styles.headerText}>Forgot Password</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Enter your Gmail</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      {/* Reset Button */}
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.resetButtonText}>Send Reset Link</Text>
      </TouchableOpacity>

      {/* Go back to Sign In */}
      <TouchableOpacity onPress={() => router.navigate()} style={styles.goBackLink}>
        <Text style={styles.goBackText}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#61E224',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 30,
    fontFamily: 'SreeKrushnadevaraya',
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
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
  },
  resetButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#61E224',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resetButtonText: {
    fontSize: 20,
    color: '#FFFFFF',
    fontFamily: 'Staatliches',
  },
  goBackLink: {
    marginTop: 20,
  },
  goBackText: {
    fontSize: 16,
    color: 'black',
    textDecorationLine: 'underline',
  },
});

export default ForgotPasswordScreen;
