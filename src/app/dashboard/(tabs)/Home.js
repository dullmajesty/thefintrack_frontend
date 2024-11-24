import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  // Function to handle navigation to the Notification page
  const handleNotificationPress = () => {
    router.navigate('Notification');
  };

  // Function to handle navigation to the Menu page
  

  return (
    <View style={styles.container}>
      
      <TouchableOpacity style={styles.notificationContainer} onPress={handleNotificationPress}>
        <Icon name="notifications-outline" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Home Screen</Text>
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
  menuContainer: {
    position: 'absolute',
    top: 10,
    left: 10, // Positioned on the top-left side
  },
  notificationContainer: {
    position: 'absolute',
    top: 10,
    right: 10, // Positioned on the top-right side
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Home;