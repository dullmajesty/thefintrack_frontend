import { useRouter } from 'expo-router'; // Correct import for routing
import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const router = useRouter();

  // Mock data for the bar chart
  const data = {
    labels: ['Rent', 'Wi-Fi', 'Utilities', 'Groceries', 'Shopping', 'Allowance'],
    datasets: [
      {
        data: [2000, 150, 500, 700, 500, 5000], // Example data
      },
    ],
  };

  // Function to handle navigation to the Notification page
  const handleNotificationPress = () => {
    router.navigate('Notification'); // Correct way to navigate with expo-router
  };

  // Mock data for the transactions
  const transactions = [
    { id: '1', category: 'Shopping', amount: -500 },
    { id: '2', category: 'Allowance', amount: -500 },
    { id: '3', category: 'Groceries', amount: -700 },
    { id: '4', category: 'Wi-Fi', amount: -150 },
    { id: '5', category: 'Rent', amount: -1500 },
    { id: '6', category: 'Allowance', amount: 5000 },
  ];

  // Function to format amounts with color
  const formatAmount = (amount) => (
    <Text style={{ color: amount >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
      {amount > 0 ? `+${amount}` : `${amount}`}
    </Text>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Notification Icon */}
      <TouchableOpacity style={styles.notificationContainer} onPress={handleNotificationPress}>
        <Icon name="notifications-outline" size={24} color="#000" />
      </TouchableOpacity>

      {/* Bar Chart */}
      <View style={styles.chartContainer}>
        <BarChart
          data={data}
          width={Dimensions.get('window').width - 32} // Dynamic width
          height={220}
          fromZero={true}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            barPercentage: 0.6,
          }}
          style={styles.chart}
        />
      </View>

      {/* Total Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Total Balance:</Text>
        <Text style={styles.balanceAmount}>29,220</Text>
      </View>

      {/* Transactions List */}
      <Text style={styles.transactionTitle}>Transactions</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionCategory}>{item.category}</Text>
            {formatAmount(item.amount)}
          </View>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  notificationContainer: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  chartContainer: {
    marginTop: 60, // Adds space between the notification icon and the chart
  },
  chart: {
    marginVertical: 16,
    borderRadius: 8,
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
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  transactionCategory: {
    fontSize: 16,
  },
});

export default Home;
