import { useRouter } from 'expo-router'; 
import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  const router = useRouter();

  // Pie chart data
  const pieData = [
    { name: 'Rent', amount: 2000, color: '#f54242', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Wi-Fi', amount: 150, color: '#f5a442', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Utilities', amount: 500, color: '#f5e442', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Groceries', amount: 700, color: '#42f54e', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Shopping', amount: 500, color: '#4287f5', legendFontColor: '#7F7F7F', legendFontSize: 12 },
    { name: 'Allowance', amount: 5000, color: '#a742f5', legendFontColor: '#7F7F7F', legendFontSize: 12 },
  ];

  const handleNotificationPress = () => {
    router.navigate('Notification'); 
  };

  const transactions = [
    { id: '1', category: 'Shopping', amount: -500 },
    { id: '2', category: 'Allowance', amount: -500 },
    { id: '3', category: 'Groceries', amount: -700 },
    { id: '4', category: 'Wi-Fi', amount: -150 },
    { id: '5', category: 'Rent', amount: -1500 },
    { id: '6', category: 'Allowance', amount: 5000 },
  ];

  const formatAmount = (amount) => (
    <Text style={{ color: amount >= 0 ? 'green' : 'red', fontWeight: 'bold' }}>
      {amount > 0 ? `+${amount}` : `${amount}`}
    </Text>
  );

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.notificationContainer} onPress={handleNotificationPress}>
        <Icon name="notifications-outline" size={24} color="#000" />
      </TouchableOpacity>

      <View style={styles.chartContainer}>
        <PieChart
          data={pieData}
          width={Dimensions.get('window').width - 32} // Dynamic width
          height={220}
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

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceTitle}>Total Balance:</Text>
        <Text style={styles.balanceAmount}>29,220</Text>
      </View>

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
    marginTop: 60, 
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
