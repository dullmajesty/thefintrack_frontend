import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { supabase } from '../../../lib/supabase'; // Ensure supabase.js is already configured
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const Overview = ({ navigation }) => {
  const [monthVisible, setMonthVisible] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("Select a month");
  const [dateRange, setDateRange] = useState("Sep 01 - Sep 30");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshed, setIsRefreshed] = useState(false); // to trigger a refresh when adding transactions

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const screenWidth = Dimensions.get('window').width;

  const handleMenuPress = () => {
    navigation.navigate('Menu');
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setMonthVisible(false);

    const dateRanges = {
      "Jan": "Jan 01 - Jan 31",
      "Feb": "Feb 01 - Feb 28",
      "Mar": "Mar 01 - Mar 31",
      "Apr": "Apr 01 - Apr 30",
      "May": "May 01 - May 31",
      "Jun": "Jun 01 - Jun 30",
      "Jul": "Jul 01 - Jul 31",
      "Aug": "Aug 01 - Aug 31",
      "Sep": "Sep 01 - Sep 30",
      "Oct": "Oct 01 - Oct 31",
      "Nov": "Nov 01 - Nov 30",
      "Dec": "Dec 01 - Dec 31",
    };
    setDateRange(dateRanges[month] || "Select a month");
  };

  // Fetch transactions based on the selected month
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);

      // Extract year and month from the selected month
      const year = new Date().getFullYear();
      const startOfMonth = new Date(`${year}-${months.indexOf(selectedMonth) + 1}-01`).toISOString();
      const endOfMonth = new Date(year, months.indexOf(selectedMonth) + 1, 0).toISOString();

      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .gte('date', startOfMonth)
        .lte('date', endOfMonth)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching transactions:', error);
      } else {
        setTransactions(data);
      }
      setLoading(false);
    };

    if (selectedMonth !== "Select a month") {
      fetchTransactions();
    }
  }, [selectedMonth, isRefreshed]); // Trigger when month changes or when refreshing

  // Function to generate weekly data
  const getWeeklyData = () => {
    const weeklyData = [
      { week: 'Week 1', expenses: 0, sales: 0 },
      { week: 'Week 2', expenses: 0, sales: 0 },
      { week: 'Week 3', expenses: 0, sales: 0 },
      { week: 'Week 4', expenses: 0, sales: 0 },
    ];

    transactions.forEach((transaction) => {
      const dayOfMonth = new Date(transaction.date).getDate();
      const weekNumber = Math.ceil(dayOfMonth / 7); // Calculate week based on day of month

      if (weekNumber >= 1 && weekNumber <= 4) {
        const weekIndex = weekNumber - 1;
        if (transaction.type === 'Expense') {
          weeklyData[weekIndex].expenses += transaction.amount;
        } else if (transaction.type === 'Income') {
          weeklyData[weekIndex].sales += transaction.amount;
        }
      }
    });

    return weeklyData;
  };

  const chartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        data: getWeeklyData()
          .map((data) => data.expenses)
          .sort((a, b) => b - a), // Sort expenses in descending order
        color: () => '#C4F0C4', // Expense color (Light Green - HEX)
        strokeWidth: 2,
      },
      {
        data: getWeeklyData()
          .map((data) => data.sales)
          .sort((a, b) => b - a), // Sort sales in descending order
        color: () => '#85E085', // Income color (Dark Green - HEX)
        strokeWidth: 2,
      },
    ],
  };

  // Handle add transaction functionality (for example, adding a new income or expense)
  const addTransaction = async (type, amount, category, description) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([{
        type,
        amount,
        category,
        description,
        date: new Date().toISOString(),
      }]);

    if (error) {
      console.error('Error adding transaction:', error);
    } else {
      setIsRefreshed(!isRefreshed); // Toggle refresh flag to update chart
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section */}
      <Text style={styles.pageTitle}>Overview</Text>

      {/* Statistics Section */}
      <View style={styles.statisticsSection}>
        <View style={styles.statisticsHeader}>
          <Text style={styles.statisticsTitle}>Statistics</Text>
          <Text style={styles.dateRange}>{dateRange}</Text>
          <TouchableOpacity style={styles.dropdown} onPress={() => setMonthVisible(true)}>
            <Text style={styles.dropdownText}>{selectedMonth}</Text>
            <Icon name="chevron-down-outline" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Dropdown Modal for Month Selection */}
        <Modal transparent={true} visible={monthVisible} animationType="fade" onRequestClose={() => setMonthVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.monthDropdown}>
              <FlatList
                data={months}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.monthOption} onPress={() => handleMonthSelect(item)}>
                    <Text style={styles.monthText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Legend for Expense and Sales */}
        <View style={styles.legend}>
          <View style={[styles.legendBox, { backgroundColor: '#C4F0C4' }]} />
          <Text style={styles.legendText}>Expense</Text>
          <View style={[styles.legendBox, { backgroundColor: '#85E085' }]} />
          <Text style={styles.legendText}>Income</Text>
        </View>
      </View>

      {/* Grouped Horizontal Bar Chart Section */}
      <View style={styles.chartSection}>
        <BarChart
          data={chartData}
          width={screenWidth - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(133, 224, 133, ${opacity})`,  // Ensure labels are black
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Ensure label color is black
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          horizontal
          withHorizontalLabels
          barPercentage={0.5}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>

      {/* Latest Transaction Section */}
      <View style={styles.transactionSection}>
        <Text style={styles.transactionTitle}>Latest Transactions</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : transactions.length === 0 ? (
          <Text style={styles.noTransactionsText}>No transactions available</Text>
        ) : (
          transactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionCard}>
              <View style={styles.transactionIcon} />
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionCategory}>{transaction.category}</Text>
                <Text style={styles.transactionDescription}>{transaction.title}</Text>
                <Text style={styles.transactionTime}>{new Date(transaction.date).toLocaleDateString()}</Text>
              </View>
              <Text
                style={
                  transaction.type === 'Income'
                    ? styles.transactionAmountPositive
                    : styles.transactionAmountNegative
                }
              >
                {transaction.type === 'Income' ? '+' : '-'}{transaction.amount}
              </Text>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: -5,
  },
  statisticsSection: {
    marginTop: 10,
  },
  statisticsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statisticsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateRange: {
    fontSize: 14,
    color: '#666',
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    padding: 8,
  },
  dropdownText: {
    fontSize: 14,
    marginRight: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  monthDropdown: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 16,
    width: 180,
    elevation: 5,
  },
  monthOption: {
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  monthText: {
    fontSize: 16,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendBox: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 5,
  },
  chartSection: {
    marginTop: 20,
  },
  transactionSection: {
    marginTop: 20,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionCard: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#ececec',
    borderRadius: 8,
    elevation: 2,
    marginTop: 8,
    alignItems: 'center',
  },
  transactionIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginRight: 10,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionCategory: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  transactionDescription: {
    fontSize: 12,
    color: '#888',
  },
  transactionTime: {
    fontSize: 12,
    color: '#888',
  },
  transactionAmountPositive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00C853',
  },
  transactionAmountNegative: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  noTransactionsText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default Overview;
