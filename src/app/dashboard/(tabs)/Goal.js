import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Goal = () => {
  const [goals, setGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchGoals = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('goal')
        .select('goalid, userid, title, amount, startdate, enddate, description, createdat, savedamount')
        .order('createdat', { ascending: false });

      if (error) {
        console.error('Error fetching goals:', error.message);
        return;
      }

      setGoals(data || []);
    } catch (err) {
      console.error('Unexpected error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      const { error } = await supabase
        .from('goal')
        .delete()
        .eq('goalid', goalId);

      if (error) {
        Alert.alert('Error', 'Failed to delete the goal.');
        return;
      }
      fetchGoals();
    } catch (err) {
      console.error('Unexpected error:', err);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchGoals();
    setRefreshing(false);
  };

  const renderGoalItem = ({ item }) => {
    // Calculate remaining amount after expenses
    const remainingAmount = item.amount - (item.savedamount || 0);
    // Calculate the progress percentage
    const progress = item.savedamount && item.amount ? (item.savedamount / item.amount) * 100 : 0;

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => handleDeleteGoal(item.goalid)}>
              <Icon name="delete" size={24} color="#f44336" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.date}>
          {item.startdate} - {item.enddate}
        </Text>
        <View>
          <Text style={styles.amount}>
            ₱{item.savedamount || 0} / ₱{item.amount}
          </Text>
          <Text style={styles.remaining}>
            Remaining: ₱{remainingAmount.toFixed(2)}
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View
            style={[styles.progressBar, { width: `${progress.toFixed(1)}%` }]}/>
        </View>
        <Text style={styles.progressText}>
          {progress.toFixed(1)}% Saved
        </Text>
      </View>
    );
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => router.push('/AddGoal')}>
        <Text style={styles.addButtonText}>+ Add Goal</Text>
      </TouchableOpacity>

      {isLoading ? (
        <Text style={styles.loadingText}>Loading goals...</Text>
      ) : goals.length === 0 ? (
        <Text style={styles.noGoalsText}>No goals found.</Text>
      ) : (
        <FlatList
          data={goals}
          keyExtractor={(item) => item.goalid.toString()}
          renderItem={renderGoalItem}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  card: {
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  amount: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4CAF50',
  },
  remaining: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 10,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 12,
    marginTop: 5,
    color: '#4CAF50',
  },
  addButton: {
    marginBottom: 20,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingText: {
    textAlign: 'center',
    color: '#555',
  },
  noGoalsText: {
    textAlign: 'center',
    color: '#999',
  },
});

export default Goal;
