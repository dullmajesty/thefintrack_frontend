import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Import Material Community Icons
import { useRouter } from 'expo-router';  // Import useRouter from expo-router

const Profile = () => {
  const router = useRouter(); // Initialize router for navigation

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

        {/* Profile background with gradient */}
        <View style={styles.profileBackground}>
          <Image source={require('../../assets/picture.png')} style={styles.profilePicture} />
        </View>

        {/* Card container for user info */}
        <View style={styles.infoCard}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>johndoe@example.com</Text>
        </View>

        {/* Additional Info Section */}
        <View style={styles.additionalInfo}>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="phone" size={20} color="#007bff" />
            <Text style={styles.infoText}>+123 456 7890</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#007bff" />
            <Text style={styles.infoText}>New York, USA</Text>
          </View>
          <View style={styles.infoItem}>
            <MaterialCommunityIcons name="facebook" size={20} color="#007bff" />
            <Text style={styles.infoText}>facebook.com/johndoe</Text>
          </View>
        </View>

        {/* Decorative Line */}
        <View style={styles.decorativeLine} />

        {/* Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={() => router.navigate('EditProfile')} // Navigate to EditProfile screen
          >
            <MaterialCommunityIcons name="account-edit" size={20} color="#fff" />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity style={styles.fab}>
          <MaterialCommunityIcons name="settings" size={30} color="#fff" />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#f0f4f8',  // Background color for the screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileBackground: {
    backgroundColor: '#4CAF50', // Solid background color for profile
    borderRadius: 100,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 5, // Adds border around profile image
    borderColor: '#fff', // White border color for contrast
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  infoCard: {
    backgroundColor: '#fff',  // White card background for user info
    borderRadius: 12,
    padding: 20,
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    marginBottom: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  additionalInfo: {
    width: '80%',
    marginVertical: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#333',
  },
  decorativeLine: {
    width: '80%',
    height: 2,
    backgroundColor: '#ccc', // Light gray line as a separator
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '80%',
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
    flexDirection: 'row',  // Align the icon and text
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,  // Space between icon and text
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
});

export default Profile;
