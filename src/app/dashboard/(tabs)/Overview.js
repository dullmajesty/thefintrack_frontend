import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Overview = ({ navigation }) => {
  const [monthVisible, setMonthVisible] = React.useState(false);
  const [selectedMonth, setSelectedMonth] = React.useState("Select a month");
  const [dateRange, setDateRange] = React.useState("Sep 01 - Sep 30");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const handleMenuPress = () => {
    navigation.navigate('Menu');
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setMonthVisible(false);

    // Change the date range based on the selected month
    switch (month) {
      case "Jan":
        setDateRange("Jan 01 - Jan 31");
        break;
      case "Feb":
        setDateRange("Feb 01 - Feb 28");
        break;
      case "Mar":
        setDateRange("Mar 01 - Mar 31");
        break;
      case "Apr":
        setDateRange("Apr 01 - Apr 30");
        break;
      case "May":
        setDateRange("May 01 - May 31");
        break;
      case "Jun":
        setDateRange("Jun 01 - Jun 30");
        break;
      case "Jul":
        setDateRange("Jul 01 - Jul 31");
        break;
      case "Aug":
        setDateRange("Aug 01 - Aug 31");
        break;
      case "Sep":
        setDateRange("Sep 01 - Sep 30");
        break;
      case "Oct":
        setDateRange("Oct 01 - Oct 31");
        break;
      case "Nov":
        setDateRange("Nov 01 - Nov 30");
        break;
      case "Dec":
        setDateRange("Dec 01 - Dec 31");
        break;
      default:
        setDateRange("Select a month");
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
        <Modal
          transparent={true}
          visible={monthVisible}
          animationType="fade"
          onRequestClose={() => setMonthVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.monthDropdown}>
              <FlatList
                data={months}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.monthOption}
                    onPress={() => handleMonthSelect(item)}
                  >
                    <Text style={styles.monthText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Legend for Income and Expense */}
        <View style={styles.legend}>
          <View style={[styles.legendBox, { backgroundColor: '#C4F0C4' }]} />
          <Text style={styles.legendText}>Income</Text>
          <View style={[styles.legendBox, { backgroundColor: '#85E085' }]} />
          <Text style={styles.legendText}>Expense</Text>
        </View>
      </View>

      {/* Bar Chart Section */}
      <View style={styles.barChart}>
        <Text style={styles.barLabel}>Week 1</Text>
        <View style={[styles.bar, { width: '40%', backgroundColor: '#C4F0C4' }]} />
        <View style={[styles.bar, { width: '20%', backgroundColor: '#85E085' }]} />
        <Text style={styles.barLabel}>Week 2</Text>
        <View style={[styles.bar, { width: '60%', backgroundColor: '#C4F0C4' }]} />
        <View style={[styles.bar, { width: '40%', backgroundColor: '#85E085' }]} />
        <Text style={styles.barLabel}>Week 3</Text>
        <View style={[styles.bar, { width: '90%', backgroundColor: '#C4F0C4' }]} />
        <View style={[styles.bar, { width: '70%', backgroundColor: '#85E085' }]} />
        <Text style={styles.barLabel}>Week 4</Text>
        <View style={[styles.bar, { width: '30%', backgroundColor: '#C4F0C4' }]} />
        <View style={[styles.bar, { width: '10%', backgroundColor: '#85E085' }]} />

        {/* Amount Range */}
        <View style={styles.amountRange}>
          <Text style={styles.amountText}>0</Text>
          <Text style={styles.amountText}>2000</Text>
          <Text style={styles.amountText}>4000</Text>
          <Text style={styles.amountText}>6000</Text>
        </View>
      </View>

      {/* Latest Transaction Section inside Transaction Card */}
      <View style={styles.transactionSection}>
        <Text style={styles.transactionTitle}>Latest Transactions</Text>
        <View style={styles.transactionCard}>
          <View style={styles.transactionIcon} />
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionCategory}>Shopping</Text>
            <Text style={styles.transactionDescription}>Buy some grocery</Text>
            <Text style={styles.transactionTime}>10:37 pm</Text>
          </View>
          <Text style={styles.transactionAmount}>-500</Text>
        </View>
      </View>

      {/* Summary Section with Only Income and Expenses */}
      <View style={styles.summarySection}>
      {/* Income Card */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Icon name="arrow-up-outline" size={20} color="#00C853" />
        </View>
        <Text style={styles.cardLabel}>INCOME</Text>
        <Text style={styles.cardAmountPositive}>+50,000</Text>
      </View>

      {/* Expenses Card */}
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Icon name="arrow-down-outline" size={20} color="#FF0000" />
        </View>
        <Text style={styles.cardLabel}>EXPENSES</Text>
        <Text style={styles.cardAmountNegative}>-20,780</Text>
      </View>
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
  barChart: {
    marginTop: 2,
  },
  barLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  bar: {
    height: 10,
    marginBottom: 8,
    borderRadius: 4,
  },
  amountRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  amountText: {
    fontSize: 12,
    color: '#666',
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
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  summarySection: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
    gap: 16,
  },
  
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
  },
  
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E0FFE0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  
  cardLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  
  cardAmountPositive: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00C853',
  },
  
  cardAmountNegative: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF0000',
  },  
});

export default Overview;