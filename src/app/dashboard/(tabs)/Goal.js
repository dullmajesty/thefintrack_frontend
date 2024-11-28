import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router'; // Using router from expo-router

const Goal = () => {
  const router = useRouter(); // Initialize router
  const goals = [
    {
      title: 'Allowance',
      duration: '1 Month',
      amount: 8200,
      total: 10000,
      remaining: 1800,
      startDate: 'April 1',
      endDate: 'April 31',
      description: 'School Allowance',
      progress: 82,
      color: '#F2D7FB',
    },
    {
      title: 'Shopping',
      duration: '3 Weeks',
      amount: 1256,
      total: 5000,
      remaining: 3744,
      startDate: 'April 15',
      endDate: 'April 31',
      description: 'School Allowance',
      progress: 25.12,
      color: '#FEE9D1',
    },
  ];

  const handleAddGoal = () => {
    router.push('/AddGoal');  // Navigate to the AddGoal screen
  };

  const handleEdit = (goal) => {
    console.log('Editing goal:', goal);
  };

  const handleDelete = (goal) => {
    console.log('Deleting goal:', goal);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Goal</Text>
        <TouchableOpacity style={styles.addButton} onPress={handleAddGoal}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {goals.map((goal, index) => (
          <View key={index} style={[styles.card, { backgroundColor: goal.color }]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{goal.title}</Text>
              <Text style={styles.cardDuration}>{goal.duration}</Text>
            </View>
            <Text style={styles.amountText}>
              {goal.amount.toLocaleString()} / {goal.total.toLocaleString()}
            </Text>
            <Text style={styles.remainingText}>Remaining: {goal.remaining.toLocaleString()}</Text>
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${goal.progress}%` }]} />
            </View>
            <View style={styles.cardFooter}>
              <Text style={styles.dateText}>
                {goal.startDate} - {goal.endDate}
              </Text>
              <View style={styles.actionIcons}>
                <TouchableOpacity onPress={() => handleEdit(goal)}>
                  <Text style={styles.editButton}>✏️</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(goal)}>
                  <Text style={styles.deleteButton}>🗑️</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.descriptionText}>Description: {goal.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDuration: {
    fontSize: 14,
    color: '#555',
  },
  amountText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  remainingText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 8,
  },
  progressBarContainer: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: '#6C63FF',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 12,
    color: '#888',
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  editButton: {
    fontSize: 16,
    color: '#4CAF50',
  },
  deleteButton: {
    fontSize: 16,
    color: '#F44336',
  },
  descriptionText: {
    fontSize: 12,
    color: '#555',
  },
});

export default Goal;