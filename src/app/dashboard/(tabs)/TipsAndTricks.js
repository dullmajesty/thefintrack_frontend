import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TipsAndTricks = () => {
  const tips = [
    {
      id: '1',
      title: 'Set a Budget',
      description: 'Use the 50/30/20 rule to allocate your income wisely. Focus on needs, wants, and savings.',
      details: 'The 50/30/20 rule suggests dividing your income as follows: 50% for necessities (e.g., rent, food), 30% for discretionary expenses (e.g., hobbies, entertainment), and 20% for savings or debt repayment. This rule provides a flexible framework for managing finances.',
    },
    {
      id: '2',
      title: 'Track Every Expense',
      description: 'Record all your spending to understand your habits and identify areas to save.',
      details: 'Tracking your expenses can reveal spending patterns you might not have noticed. Use budgeting apps or a simple notebook to categorize expenses and find ways to cut costs. Regular tracking ensures you stay aligned with your financial goals.',
    },
    {
      id: '3',
      title: 'Save for Emergencies',
      description: 'Aim to save at least three months’ worth of expenses to protect against unexpected costs.',
      details: 'An emergency fund acts as a financial safety net. Start by saving small amounts consistently. Gradually aim to build three to six months of essential living expenses in a separate, easily accessible account.',
    },
    {
      id: '4',
      title: 'Automate Your Savings',
      description: 'Set up automatic transfers to a savings account to make saving effortless.',
      details: 'Automation takes the guesswork out of saving. By scheduling regular transfers to a savings account, you ensure consistency and reduce the temptation to spend. Many banks and apps offer features to automate saving.',
    },
    {
      id: '5',
      title: 'Invest Early',
      description: 'Start investing as early as possible to take advantage of compound interest.',
      details: 'The earlier you start investing, the more time your money has to grow through compound interest. Even small contributions can yield significant growth over time. Focus on low-cost index funds or ETFs as a starting point.',
    },
    {
      id: '6',
      title: 'Avoid Lifestyle Inflation',
      description: 'Resist the urge to spend more as your income increases.',
      details: 'Lifestyle inflation can erode financial progress. When you get a raise, allocate the extra income to savings, investments, or paying down debt rather than upgrading your lifestyle unnecessarily.',
    },
    {
      id: '7',
      title: 'Pay Off High-Interest Debt First',
      description: 'Focus on paying down high-interest debts like credit cards before saving aggressively.',
      details: 'High-interest debt can grow quickly and diminish your financial health. Prioritize paying off these debts while maintaining minimum payments on others. Once cleared, redirect those payments toward savings or investments.',
    },
    {
      id: '8',
      title: 'Use Cashback and Rewards Wisely',
      description: 'Leverage credit card rewards and cashback programs to save money on purchases.',
      details: 'When used responsibly, cashback and rewards can reduce expenses. Avoid carrying balances to prevent interest charges and use rewards for planned purchases rather than splurging.',
    },
    {
      id: '9',
      title: 'Diversify Your Investments',
      description: 'Spread your investments across different asset classes to manage risk.',
      details: 'Diversification reduces the risk of significant losses by spreading investments across stocks, bonds, real estate, and other assets. It ensures your portfolio is better prepared for market fluctuations.',
    },
    {
      id: '10',
      title: 'Review Your Financial Goals Regularly',
      description: 'Periodically assess your financial goals and adjust your plans as needed.',
      details: 'Life changes, and so do financial priorities. Regularly review your goals and strategies to ensure they align with your current situation and future aspirations. Flexibility is key to long-term success.',
    },
  ];

  const [selectedTip, setSelectedTip] = useState(null); // Stores the selected tip
  const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility

  const openModal = (tip) => {
    setSelectedTip(tip);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedTip(null);
    setModalVisible(false);
  };

  const renderTipCard = ({ item }) => (
    <View style={styles.tipCard}>
      <View style={styles.tipHeader}>
        <Text style={styles.tipTitle}>{item.title}</Text>
        <Icon name="pin" size={20} color="black" />
      </View>
      <Text style={styles.tipDescription}>{item.description}</Text>
      <TouchableOpacity style={styles.learnMoreButton} onPress={() => openModal(item)}>
        <Text style={styles.learnMoreText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Tips</Text>
      <FlatList
        data={tips}
        keyExtractor={(item) => item.id}
        renderItem={renderTipCard}
        contentContainerStyle={styles.listContainer}
      />

      {/* Modal for displaying detailed tip information */}
      {selectedTip && (
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedTip.title}</Text>
              <Text style={styles.modalDescription}>{selectedTip.details}</Text>
              <Button title="Close" onPress={closeModal} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 16,
  },
  tipCard: {
    backgroundColor: '#ccff66',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  tipDescription: {
    fontSize: 14,
    color: '#333',
    marginVertical: 8,
  },
  learnMoreButton: {
    backgroundColor: '#34a853',
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  learnMoreText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});

export default TipsAndTricks;
