import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Button } from 'react-native';

const Notification = ({ navigation }) => {
  const handleHomePress = () => {
    router.navigate('Home');
  };


  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Page</Text>
      <Text style={styles.text}>This is where your notifications will be displayed.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  
});

export default Notification;
