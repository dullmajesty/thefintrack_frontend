import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Add = ({ navigation }) => {

  

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Add Screen</Text>
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

  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default Add;
