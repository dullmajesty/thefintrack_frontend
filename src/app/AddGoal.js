import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Picker,
} from 'react-native';

const AddGoal = () => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // For Modal
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [activeDateField, setActiveDateField] = useState('');
  const [tempMonth, setTempMonth] = useState('');
  const [tempDay, setTempDay] = useState('');
  const [tempYear, setTempYear] = useState('');

  const validateForm = () => {
    if (title && amount && description && startDate && endDate) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  const handleSaveGoal = () => {
    alert(
      `Goal Saved:\nTitle: ${title}\nAmount: ${amount}\nStart Date: ${startDate}\nEnd Date: ${endDate}\nDescription: ${description}`
    );
  };

  const handleDateSave = () => {
    const selectedDate = `${tempMonth}/${tempDay}/${tempYear}`;
    if (activeDateField === 'start') {
      setStartDate(selectedDate);
    } else if (activeDateField === 'end') {
      setEndDate(selectedDate);
    }
    setShowDatePicker(false);
    validateForm();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Set Goal</Text>

      {/* Title */}
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={(text) => {
          setTitle(text);
          validateForm();
        }}
      />

      {/* Amount */}
      <Text style={styles.label}>Amount</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        value={amount}
        onChangeText={(text) => {
          setAmount(text);
          validateForm();
        }}
        keyboardType="numeric"
      />

      {/* Start Date */}
      <Text style={styles.label}>Start Date</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => {
          setActiveDateField('start');
          setShowDatePicker(true);
        }}
      >
        <Text style={styles.dateText}>
          {startDate || 'Select Start Date'}
        </Text>
      </TouchableOpacity>

      {/* End Date */}
      <Text style={styles.label}>End Date</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => {
          setActiveDateField('end');
          setShowDatePicker(true);
        }}
      >
        <Text style={styles.dateText}>
          {endDate || 'Select End Date'}
        </Text>
      </TouchableOpacity>

      {/* Description */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
          validateForm();
        }}
        multiline
      />

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSaveGoal}
        style={[
          styles.saveButton,
          isButtonEnabled ? styles.saveButtonEnabled : styles.saveButtonDisabled,
        ]}
        disabled={!isButtonEnabled}
      >
        <Text style={styles.saveButtonText}>Set Goal</Text>
      </TouchableOpacity>

      {/* Modal for Date Picker */}
      {showDatePicker && (
        <Modal transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalHeading}>Select Date</Text>
              <View style={styles.modalRow}>
                <Picker
                  selectedValue={tempMonth}
                  style={styles.modalPicker}
                  onValueChange={(itemValue) => setTempMonth(itemValue)}
                >
                  <Picker.Item label="Month" value="" />
                  {[...Array(12).keys()].map((m) => (
                    <Picker.Item key={m} label={(m + 1).toString()} value={m + 1} />
                  ))}
                </Picker>
                <Picker
                  selectedValue={tempDay}
                  style={styles.modalPicker}
                  onValueChange={(itemValue) => setTempDay(itemValue)}
                >
                  <Picker.Item label="Day" value="" />
                  {[...Array(31).keys()].map((d) => (
                    <Picker.Item key={d} label={(d + 1).toString()} value={d + 1} />
                  ))}
                </Picker>
                <Picker
                  selectedValue={tempYear}
                  style={styles.modalPicker}
                  onValueChange={(itemValue) => setTempYear(itemValue)}
                >
                  <Picker.Item label="Year" value="" />
                  {[2024, 2025, 2026].map((y) => (
                    <Picker.Item key={y} label={y.toString()} value={y} />
                  ))}
                </Picker>
              </View>
              <TouchableOpacity onPress={handleDateSave} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Save Date</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#FFF' },
  heading: { fontSize: 24, fontWeight: '600', textAlign: 'center', marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '500', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#A8C686', borderRadius: 10, padding: 12, marginBottom: 12 },
  dateInput: { borderWidth: 1, borderColor: '#A8C686', borderRadius: 10, padding: 12, marginBottom: 12 },
  dateText: { fontSize: 16, color: '#444' },
  saveButton: { paddingVertical: 12, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  saveButtonEnabled: { backgroundColor: '#4CAF50' },
  saveButtonDisabled: { backgroundColor: '#A8C686' },
  saveButtonText: { fontSize: 16, fontWeight: 'bold', color: '#FFF' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#FFF', padding: 20, borderRadius: 10, width: '80%' },
  modalHeading: { fontSize: 18, fontWeight: '600', marginBottom: 20, textAlign: 'center' },
  modalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  modalPicker: { flex: 1, marginHorizontal: 5 },
  modalButton: { marginTop: 20, backgroundColor: '#4CAF50', padding: 10, borderRadius: 10, alignItems: 'center' },
  modalButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

export default AddGoal;