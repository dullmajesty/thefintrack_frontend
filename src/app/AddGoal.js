import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { supabase } from '../lib/supabase'; // Ensure correct Supabase path
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

const AddGoal = ({ onGoalAdded }) => {
  const router = useRouter();
  const [userID, setUserID] = useState(null);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  useEffect(() => {
    const fetchUserID = async () => {
      const { data: user, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error.message);
        return;
      }
      setUserID(user?.user?.id);
    };

    fetchUserID();
  }, []);

  const handleAddGoal = async () => {
    if (!title || !amount || !startDate || !endDate || !description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }

    if (!userID) {
      Alert.alert('Error', 'User ID not found. Please log in again.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase
        .from('goal')
        .insert([
          {
            userid: userID,
            title: title,
            amount: parsedAmount,
            startdate: startDate.toISOString().split('T')[0],
            enddate: endDate.toISOString().split('T')[0],
            description: description,
          },
        ]);

      if (error) {
        console.error('Error adding goal:', error.message);
        Alert.alert('Error', 'Failed to add goal. Please try again.');
      } else {
        Alert.alert('Success', 'Goal added successfully!');
        setTitle('');
        setAmount('');
        setStartDate(null);
        setEndDate(null);
        setDescription('');
        if (onGoalAdded) {
          onGoalAdded();
        }
        router.back();
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    if (selectedDate) setStartDate(selectedDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Goal Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter goal title"
        placeholderTextColor="#aaa"
      />

      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="Enter amount"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter description"
        placeholderTextColor="#aaa"
        multiline
      />      

      <Text style={styles.label}>Start Date</Text>
      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowStartDatePicker(true)}
        >
          <Icon name="calendar-outline" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.dateText}>{startDate ? startDate.toDateString() : 'Select Start Date'}</Text>
      </View>
      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="spinner"
          onChange={handleStartDateChange}
        />
      )}

      <Text style={styles.label}>End Date</Text>
      <View style={styles.dateContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => setShowEndDatePicker(true)}
        >
          <Icon name="calendar-outline" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.dateText}>{endDate ? endDate.toDateString() : 'Select End Date'}</Text>
      </View>
      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="spinner"
          onChange={handleEndDateChange}
        />
      )}
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : (
        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
          <Text style={styles.addButtonText}>Add Goal</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  dateText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  iconButton: {
    alignSelf: 'flex-start',
  },
  addButton: {
    backgroundColor: '#32a852',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddGoal;
