import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';


const { width, height } = Dimensions.get('window');

export default function WelcomePage() {
  const navigation = useNavigation();

  
  const [loaded] = useFonts({
    Staatliches: require('../assets/Staatliches-Regular.ttf'),
    SreeKrushnadevaraya: require('../assets/SreeKrushnadevaraya-Regular.ttf'),
  });

  if (!loaded) {
    return null; 
  }

  return (
    <View style={styles.container}>
      
      <Image
        source={require('../assets/icon.png')}
        style={styles.splashImage}
      />

     
      <View style={styles.textContainer}>
        <Text style={styles.title}>FINTRACK</Text>
        <Text style={styles.subtitle}>
          Track or Stay Broke.{'\n'}Losers pick the second option.
        </Text>
      </View>

      
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => router.navigate('Create')}
      >
        <Text style={styles.buttonText}>GET STARTED!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#61E224',
    paddingVertical: height * 0.1, 
  },
  splashImage: {
    width: width * 0.5, 
    height: width * 0.5, 
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    paddingHorizontal: width * 0.1, 
  },
  title: {
    fontSize: width * 0.15, 
    fontFamily: 'Staatliches',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: height * 0.02, 
  },
  subtitle: {
    fontSize: width * 0.05, 
    fontFamily: 'SreeKrushnadevaraya',
    textAlign: 'center',
    color: '#000000',
    lineHeight: height * 0.03, 
  },
  buttonContainer: {
    width: '75%', 
    paddingVertical: height * 0.02, 
    backgroundColor: '#00A651',
    borderRadius: width * 0.05, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: width * 0.06, 
    fontFamily: 'Staatliches',
  },
});
