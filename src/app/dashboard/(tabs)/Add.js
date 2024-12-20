import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  RefreshControl, // Added for pull-to-refresh
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../../../lib/supabase';

const Add = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('Expense'); // Default to Expense
  const [categories, setCategories] = useState([
    'Groceries',
    'Rent',
    'Utilities',
    'Shopping',
    'Other',
  ]); // Default Expense categories
  const [selectedCategory, setSelectedCategory] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false); // For dropdown visibility
  const [isRefreshing, setIsRefreshing] = useState(false); // For refresh control

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
  
      // Delete from Supabase
      const { data, error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', transactionToDelete.id);
  
      if (error) {
        console.error('Error deleting transaction:', error.message);
        alert('Error deleting transaction. Please try again.');
        return;
      }
  
      // Remove from local state
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
    setEditIndex(index);
    toggleModal();
  };

  const handleSave = async () => {
    if (date && title && amount && (type === 'Income' || selectedCategory)) {
      const updatedTransaction = {
        date,
        title,
        amount: type === 'Expense' ? `-${amount}` : `${amount}`,
        type,
        category: type === 'Expense' ? selectedCategory : '',
        color: type === 'Expense' ? categoryColors[selectedCategory] || categoryColors.Default : categoryColors.Default,
      };
  
      try {
        const { data: sessionData } = await supabase.auth.getSession();
        const userId = sessionData?.session?.user?.id;
  
        if (!userId) {
          alert('User not logged in.');
          return;
        }
  
        if (editIndex !== null) {
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
  
          // Re-fetch updated transactions from the database
          await fetchTransactions();
        } else {
          const { data, error } = await supabase
            .from('transactions')
            .insert([{ ...updatedTransaction, user_id: userId }]);
  
          if (error) {
            console.error('Error saving transaction:', error.message);
            alert('Error saving transaction. Please try again.');
            return;
          }
  
          console.log('Transaction saved:', data);
  
          // Re-fetch updated transactions from the database
          await fetchTransactions();
        }
  
        // Reset form fields and close modal
        setDate('');
        setTitle('');
        setAmount('');
        setType('Expense');
        setSelectedCategory('');
        toggleModal();
      } catch (error) {
        console.error('Unexpected error:', error);
        alert('Unexpected error occurred. Please try again.');
      }
    } else {
      alert('Please fill in all required fields.');
    }
  };  
  
  // Function to trigger a notification
const triggerNotification = (transaction) => {
  // Push the notification to the notifications state
  const newNotification = {
    title: `${transaction.type} added`,
    subtitle: `Amount: ${transaction.amount} - ${transaction.title}`,
    time: new Date().toLocaleTimeString(),
    amount: transaction.amount,
    category: transaction.category,
    color: transaction.color,
  };

  setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
};

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString();
      setDate(formattedDate);
    }
  };

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
        .select('*') // Ensure "id" is included
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
  
  
  
  // Fetch transactions when component mounts or when refreshing
  useEffect(() => {
    fetchTransactions();
  }, []);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchTransactions(); // Refresh transactions
    setIsRefreshing(false);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Know your income, track your expenses, and save smart.
        </Text>
        <TouchableOpacity style={styles.addButton} onPress={toggleModal}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Transactions List with pull-to-refresh */}
      <ScrollView
        style={styles.transactionsContainer}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.sectionTitle}>Last Added</Text>
        {transactions.length === 0 ? (
          <Text>No items added yet.</Text>
        ) : (
          transactions.map((transaction, index) => (
            <View key={index} style={styles.transactionItem}>
              {/* Category Color Square */}
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

      {/* Modal */}
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editIndex !== null ? 'Edit' : 'Add'}
            </Text>

            {/* Date */}
            <Text style={styles.label}>Select Date:</Text>
            <View style={styles.datePickerContainer}>
              <TextInput
                style={styles.dateInput}
                placeholder="mm/dd/yyyy"
                value={date}
                editable={false}
              />
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => setShowDatePicker(true)}
              >
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

            {/* Type (Dropdown) */}
            <Text style={styles.label}>Type:</Text>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setShowTypeDropdown(!showTypeDropdown)}
            >
              <Text>{type}</Text>
              <Icon name="chevron-down-outline" size={20} />
            </TouchableOpacity>
            {showTypeDropdown && (
              <View style={styles.dropdownList}>
                <TouchableOpacity
                  onPress={() => {
                    setType('Expense');
                    setShowTypeDropdown(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text>Expense</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setType('Income');
                    setShowTypeDropdown(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text>Income</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Title */}
            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter title"
              value={title}
              onChangeText={setTitle}
            />

            {/* Amount */}
            <Text style={styles.label}>Amount:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
            />

            {/* Category (only for Expense) */}
            {type === 'Expense' && (
              <>
                <Text style={styles.label}>Category:</Text>
                <View style={styles.categoriesContainer}>
                <ScrollView
                horizontal // Makes it horizontally scrollable
                style={styles.categoriesContainer}>
                {categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category && styles.selectedCategory,
                    ]}
                    onPress={() => setSelectedCategory(category)}>
                    <Text>{category}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
                </View>
              </>
            )}

            {/* Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.cancelButton}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <Text style={styles.okButton}>Save</Text>
              </TouchableOpacity>
              </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontSize: 13,
    color: '#444',
    textAlign: 'center',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 150,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row', // Keep items in a row
    justifyContent: 'space-between', // Distribute items evenly
    alignItems: 'center', // Vertically center items
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#f9f9f9', // Optional: for better visibility
  },
  transactionText: {
    flex: 1, // Allow text to take up remaining space
    color: '#000',
    fontSize: 16,
    marginRight: 10, // Add space between text and amount
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right', // Align amount to the right
    color: '#000', // Default text color
  },
  transactionActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
  },
  dropdownText: {
    fontSize: 16,
    color: '#444',
  },
  iconButton: {
    marginLeft: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    fontSize: 16,
    color: '#FF6347',
    fontWeight: 'bold',
  },
  okButton: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  dropdownList: {
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    marginTop: 5,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  categoriesContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  categoryButton: {
    backgroundColor: '#d4f7d4',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: '#32CD32',
  },
  categoryText: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addCategoryButton: {
    backgroundColor: '#e6e6e6',
    borderRadius: 20,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryColorSquare: {
  width: 20,  // Adjust the size of the square
  height: 20,  // Adjust the size of the square
  borderRadius: 4,  // Optional: gives rounded corners to the square
  marginRight: 15,  // Space between the square and title
},
datePickerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  padding: 10,
  marginBottom: 20,
  backgroundColor: '#f9f9f9',  // Soft background for the date picker
},
dateInput: {
  flex: 1,
  fontSize: 16,
  padding: 10,
  borderWidth: 0,
  color: '#333',
  backgroundColor: '#f9f9f9', // Ensure input area matches the background
},
iconButton: {
  marginLeft: 10,
},
});

export default Add;
