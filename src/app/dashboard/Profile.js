import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '../../lib/supabase'; // Ensure it's set up correctly

const Profile = () => {
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [imageUri, setImageUri] = useState(null); // Track the selected image URI

  useEffect(() => {
    const fetchProfile = async () => {
      // Fetch the user profile data from Supabase
      const { data, error } = await supabase.from('users').select('*').limit(1).single();
      if (error) {
        console.error('Error fetching profile:', error);
      } else {
        setProfileData(data);
        setImageUri(data.profile_picture); // Set the fetched image URI
      }
    };

    fetchProfile();
  }, []);

  // Function to pick an image from the device
  const pickImage = async () => {
    // Ask for permission to access the media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    // Launch the image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const selectedImageUri = result.assets[0].uri;
      setImageUri(selectedImageUri); // Set the selected image URI

      // Upload the image to Supabase Storage
      const fileExtension = selectedImageUri.split('.').pop();
      const fileName = `${Date.now()}.${fileExtension}`;

      // Upload image to the 'profile_pictures' bucket
      const { data, error } = await supabase.storage
        .from('profile_pictures')
        .upload(fileName, selectedImageUri, { contentType: `image/${fileExtension}` });

      if (error) {
        console.error('Error uploading image:', error);
      } else {
        // Get the public URL of the uploaded image
        const profilePictureUrl = data.publicUrl;

        // Save the image URL to the user's profile in the database
        await supabase.from('users').update({ profile_picture: profilePictureUrl }).match({ id: profileData.id });

        // Update the profileData state with the new image URL
        setProfileData((prevState) => ({ ...prevState, profile_picture: profilePictureUrl }));
      }
    }
  };

  if (!profileData) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.profileBackground}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.profilePicture} />
          ) : (
            <Image source={require('../../assets/DefaultProfile.jpg')} style={styles.profilePicture} />
          )}

          {/* Edit Icon to pick a new image */}
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <MaterialCommunityIcons name="pencil" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.name}>{profileData.name}</Text>
          <Text style={styles.email}>{profileData.email}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/EditProfile')} // Navigate to EditProfile screen
          >
            <MaterialCommunityIcons name="account-edit" size={20} color="#fff" />
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

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
    backgroundColor: '#f0f4f8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  profileBackground: {
    backgroundColor: '#4CAF50',
    borderRadius: 100,
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 5,
    borderColor: '#fff',
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 8,
  },
  infoCard: {
    backgroundColor: '#fff',
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
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
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
  },
});

export default Profile;
