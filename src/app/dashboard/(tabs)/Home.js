import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../../../lib/supabase';

const Home = () => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [balance, setBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);

  // Function to fetch transaction data from Supabase
  const fetchTransactionData = async () => {
    try {
      setRefreshing(true); // Start refreshing
  
      // Fetch the authenticated user's session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData?.session) {
        console.error('Error fetching session or user not authenticated:', sessionError?.message);
        setRefreshing(false);
        return;
      }
  
      const userId = sessionData.session.user.id;
  
      // Fetch transactions for the authenticated user
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', userId); 
  
      if (error) {
        console.error('Error fetching data from Supabase:', error);
        setRefreshing(false);
        return;
      }
  
      console.log('Fetched data from Supabase:', data);
  
      const transactionsData = data || [];
  
      if (Array.isArray(transactionsData)) {
        setTransactions(transactionsData);
  
        // Separate income and expenses
        const incomeTransactions = transactionsData.filter((t) => t.amount >= 0);
        const expenseTransactions = transactionsData.filter((t) => t.amount < 0);
  
        // Aggregate data by category (expenses only)
        const categories = [...new Set(expenseTransactions.map((t) => t.category))];
        const chartData = categories.map((category) => {
          const total = expenseTransactions
            .filter((t) => t.category === category)
            .reduce((sum, t) => sum + t.amount, 0);
          return {
            name: category,
            amount: total,
            color: getCategoryColor(category),
            legendFontColor: '#7F7F7F',
            legendFontSize: 12,
          };
        });
  
        // Set the chart data for expenses only
        setPieData(chartData);
  
        // Calculate total income and total expenses
        const totalIncome = incomeTransactions.reduce((sum, t) => sum + t.amount, 0);
        const totalExpenses = expenseTransactions.reduce((sum, t) => sum + t.amount, 0);
  
        // Calculate the total balance (income - expenses)
        const totalBalance = totalIncome + totalExpenses; // Expenses are negative, so this effectively subtracts
        setBalance(totalBalance);
      } else {
        console.error('Transactions data is not available or not an array');
      }
    } catch (error) {
      console.error('Error fetching transaction data:', error);
    } finally {
      setRefreshing(false); // End refreshing
    }
  };
  
  const getCategoryColor = (category) => {
    const colors = {
      Groceries: '#79adcc',
      Rent: '#ffc09f',
      Shopping: '#ffee93',
      Utilities: '#fcf5c7',
      Other: '#adf7b6',
      Default: '#EEE',
    };
    return colors[category] || '#ccc';
  };

  useEffect(() => {
    fetchTransactionData();
  }, []);

  const handleNotificationPress = () => {
    console.log('Notification icon pressed');
      router.navigate('Notification');
      setUnreadCount(0);
  };

  const formatAmount = (amount) => (
    <Text style={{ color: amount >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
      {amount > 0 ? `+${amount}` : `${amount}`}
    </Text>
  );

  

  return (
    <FlatList
      style={styles.container}
      data={transactions}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={() => (
        <View>
          <TouchableOpacity style={styles.notificationContainer} onPress={handleNotificationPress}>
            <Icon name="notifications-outline" size={30} color="#000" />
              {unreadCount > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>

          <View style={styles.chartContainer}>
            <View style={styles.pieChartWrapper}>
              <PieChart
                data={pieData}  // This now contains only expense data
                width={Dimensions.get('window').width - 100} // Smaller width
                height={Dimensions.get('window').width - 200} // Same height as width for a circle
                chartConfig={{
                  backgroundColor: '#ffffff',
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="amount"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
              />
            </View>
          </View>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceTitle}>Total Balance:</Text>
            <Text style={styles.balanceAmount}>{balance.toLocaleString()}</Text>
          </View>

          <Text style={styles.transactionTitle}>Transactions</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <View style={[styles.transactionItem, { borderLeftColor: getCategoryColor(item.category) }]}>
          <Text style={styles.transactionCategory}>{item.category}</Text>
          {formatAmount(item.amount)}
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={fetchTransactionData} // Trigger data fetch on refresh
        />
      }
    />
  );
};

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  successMessageContainerContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  pieChartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 16,
  },
  balanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  transactionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#000',
  },
  notificationContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -5, // Adjust the position relative to the icon
    right: -10, // Adjust the position relative to the icon
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },

  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderLeftWidth: 25,
    borderRadius: 5,
  },
  transactionCategory: {
    fontSize: 16,
  },
});

export default Home;
