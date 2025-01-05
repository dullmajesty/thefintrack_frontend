import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  RefreshControl,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../../../lib/supabase';

const Add = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense');
  const [categories, setCategories] = useState([
    'Groceries',
    'Rent',
    'Utilities',
    'Shopping',
    'Other',
  ]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [goalList, setGoalList] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showGoalDropdown, setShowGoalDropdown] = useState(false); // Separate for Goal

  const categoryColors = {
    Groceries: '#79adcc',
    Rent: '#ffc09f',
    Shopping: '#ffee93',
    Utilities: '#fcf5c7',
    Other: '#adf7b6',
    Default: '#EEE',
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleDelete = async (index) => {
    try {
      const transactionToDelete = transactions[index];

      if (!transactionToDelete.id) {
        alert('Transaction ID not found.');
        return;
      }

      const { data, error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', transactionToDelete.id);

      if (error) {
        console.error('Error deleting transaction:', error.message);
        alert('Error deleting transaction. Please try again.');
        return;
      }

      const updatedTransactions = transactions.filter((_, i) => i !== index);
      setTransactions(updatedTransactions);

      console.log('Transaction deleted successfully:', data);
    } catch (error) {
      console.error('Unexpected error while deleting transaction:', error);
      alert('Unexpected error occurred. Please try again.');
    }
  };

  const handleEdit = (index) => {
    const transaction = transactions[index];
    setDate(transaction.date);
    setTitle(transaction.title);
    setAmount(transaction.amount);
    setType(transaction.type);
    setSelectedCategory(transaction.category);
    setSelectedGoal(transaction.goal || '');
    setEditIndex(index);
    toggleModal();
  };

// Function to save a transaction (add or edit)
const handleSave = async () => {
  // Ensure all required fields are filled
  if (date && title && amount && (type === 'Income' || selectedCategory)) {
    // Prepare the transaction object
    const updatedTransaction = {
      date,
      title,
      amount: type === 'Expense' ? `-${amount}` : `${amount}`,
      type,
      category: type === 'Expense' ? selectedCategory : '',
      goal: type === 'Expense' ? selectedGoal : null,
      color: type === 'Expense' ? categoryColors[selectedCategory] || categoryColors.Default : categoryColors.Default,
    };

    try {
      // Get the current session and user ID
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;

      if (!userId) {
        alert('User not logged in.');
        return;
      }

      if (editIndex !== null) {
        // Edit an existing transaction
        const transactionToEdit = transactions[editIndex];

        if (!transactionToEdit.id) {
          alert('Transaction ID not found.');
          return;
        }

        const { data, error } = await supabase
          .from('transactions')
          .update(updatedTransaction)
          .eq('id', transactionToEdit.id);

        if (error) {
          console.error('Error updating transaction:', error.message);
          alert('Error updating transaction. Please try again.');
          return;
        }

        console.log('Transaction updated:', data);
        await fetchTransactions();
      } else {
        // Add a new transaction
        const { data, error } = await supabase
          .from('transactions')
          .insert([{ ...updatedTransaction, user_id: userId }]);

        if (error) {
          console.error('Error saving transaction:', error.message);
          alert('Error saving transaction. Please try again.');
          return;
        }

        console.log('Transaction saved:', data);
        await fetchTransactions();
        
        // If it's an expense with a goal, update the goal balance
        if (updatedTransaction.goal) {
          const selectedGoalData = goalList.find(goal => goal.title === updatedTransaction.goal);
          if (selectedGoalData) {
            const updatedGoalAmount = selectedGoalData.amount - amount; // Deduct the expense amount

            // Update the goal in the database
            const { data: goalData, error: goalError } = await supabase
              .from('goal')
              .update({ amount: updatedGoalAmount })
              .eq('id', selectedGoalData.id);

            if (goalError) {
              console.error('Error updating goal:', goalError.message);
            } else {
              console.log('Goal updated:', goalData);
              await fetchGoal(); // Refresh goal data
            }
          }
        }
      }

      // Reset form fields after saving
      setDate('');
      setTitle('');
      setAmount('');
      setType('Expense');
      setSelectedCategory('');
      setSelectedGoal('');
      toggleModal();
    } catch (error) {
      console.error('Unexpected error:', error);
      alert('Unexpected error occurred. Please try again.');
    }
  } else {
    alert('Please fill in all required fields.');
  }
};


// Handle date change from the date picker
const handleDateChange = (event, selectedDate) => {
  setShowDatePicker(false);
  if (selectedDate) {
    const formattedDate = selectedDate.toLocaleDateString();
    setDate(formattedDate);
  }
};

// Fetch all transactions for the logged-in user
const fetchTransactions = async () => {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData.session) {
      console.error('No session found.');
      return;
    }

    const userId = sessionData.session.user.id;

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching transactions:', error.message);
      return;
    }

    setTransactions(data);
  } catch (error) {
    console.error('Unexpected error fetching transactions:', error);
  }
};

// Fetch all goals
const fetchGoal = async () => {
  try {
    const { data, error } = await supabase
      .from('goal')
      .select('*');

    if (error) {
      console.error('Error fetching goal:', error.message);
      return;
    }

    setGoalList(data);
  } catch (error) {
    console.error('Unexpected error fetching goal:', error);
  }
};

// Refresh the transactions list
const onRefresh = async () => {
  setIsRefreshing(true);
  await fetchTransactions();
  setIsRefreshing(false);
};

// Automatically fetch data when the component mounts
useEffect(() => {
  fetchTransactions();
  fetchGoal();
}, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Know your income, track your expenses, and save smart.
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.transactionsContainer}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.sectionTitle}>Last Added</Text>
        {transactions.length === 0 ? (
          <Text>No items added yet.</Text>
        ) : (
          transactions.map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              <View
                style={[styles.categoryColorSquare, { backgroundColor: transaction.color || categoryColors.Default }]}
              />
              <Text style={styles.transactionText}>{transaction.title}</Text>
              <Text
                style={[styles.transactionAmount, { color: transaction.type === 'Expense' ? 'red' : 'green' }]}
              >
                {transaction.type === 'Income' ? `+${transaction.amount}` : transaction.amount}
              </Text>
              <View style={styles.transactionActions}>
                <TouchableOpacity onPress={() => handleEdit(index)}>
                  <Icon name="create-outline" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(index)}>
                  <Icon name="trash-outline" size={20} color="#F44336" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{editIndex !== null ? 'Edit' : 'Add'}</Text>

            <Text style={styles.label}>Select Date:</Text>
            <View style={styles.datePickerContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="mm/dd/yyyy"
                value={date}
                editable={false}
              />
              <TouchableOpacity style={styles.iconButton} onPress={() => setShowDatePicker(true)}>
                <Icon name="calendar-outline" size={30} color="#000" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date ? new Date(date) : new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                />
              )}
            </View>

{/* Income/Expense Type Selection */}
<View style={styles.selectionContainer}>
  <Text style={styles.label}>Type:</Text>
  <TouchableOpacity style={styles.dropdown} onPress={() => setShowTypeDropdown(!showTypeDropdown)}>
    <Text>{type}</Text>
    <Icon name="chevron-down-outline" size={20} />
  </TouchableOpacity>
  {showTypeDropdown && (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={() => {
          setType('Expense');
          setSelectedCategory(''); // Reset category when changing to Expense
          setSelectedGoal(''); // Reset goal when changing to Expense
          setShowTypeDropdown(false);
        }}
      >
        <Text>Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.dropdownItem}
        onPress={() => {
          setType('Income');
          setSelectedCategory(''); // Reset category when changing to Income
          setSelectedGoal(''); // Reset goal when changing to Income
          setShowTypeDropdown(false);
        }}
      >
        <Text>Income</Text>
      </TouchableOpacity>
    </View>
  )}
</View>

            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter title"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Amount:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              value={amount}
              keyboardType="numeric"
              onChangeText={setAmount}
            />

            {/* Expense Category Selection Container */}
            {type === 'Expense' && (
  <>
    <Text style={styles.label}>Category:</Text>
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.categoryScroll}
    >
      {categories.map((category, idx) => (
        <TouchableOpacity
          key={idx}
          onPress={() => setSelectedCategory(category)}
          style={[
            styles.categoryButton,
            { backgroundColor: category === selectedCategory ? '#FFD700' : '#f0f0f0' },
          ]}
        >
          <Text style={styles.categoryText}>{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>


                {/* Goal Dropdown Container */}
                <View style={styles.selectionContainer}>
      <Text style={styles.label}>Goal:</Text>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setShowGoalDropdown(!showGoalDropdown)}
      >
        <Text>{selectedGoal || 'Select Goal'}</Text>{/* Show 'Select Goal' if none selected */}
        <Icon name="chevron-down-outline" size={20} />
      </TouchableOpacity>
      {showGoalDropdown && (
        <View style={styles.dropdownList}>
        {goalList.map((goal, index) => (
          <TouchableOpacity
            key={index}
            style={styles.dropdownItem}
            onPress={() => {
              setSelectedGoal(goal.title); // Assuming goal.title represents the goal name
              setShowGoalDropdown(false);
            }}
          >
            <Text>{goal.title}</Text>
          </TouchableOpacity>
        ))}
        </View>
      )}
    </View>
  </>
)}

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 120,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#ffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectionContainer: {
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginVertical: 8,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdownItem: {
    padding: 10,
  },
  categoryScroll: {
    marginBottom: 12,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 14,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 16,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#F44336',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 8,
  },
  cancelButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  datePickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateInput: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  iconButton: {
    marginLeft: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 6,
    elevation: 2,
  },
  categoryColorSquare: {
    width: 10,
    height: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  transactionText: {
    fontSize: 14,
    alignSelf: 'center',
  },
  transactionAmount: {
    fontSize: 14,
    alignSelf: 'center',
  },
  transactionActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Add;