import { router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification</Text>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today</Text>

          {/* Notification 1 */}
          <View style={[styles.notificationItem, { borderLeftColor: '#FFA500' }]}>
            <Text style={styles.notificationTitle}>Shopping</Text>
            <Text style={styles.notificationAmount}>-500</Text>
            <Text style={styles.notificationSubtitle}>Buy some grocery</Text>
            <Text style={styles.notificationTime}>10:37 pm</Text>
          </View>

          {/* Notification 2 */}
          <View style={[styles.notificationItem, { borderLeftColor: '#32CD32' }]}>
            <Text style={styles.notificationTitle}>Expenses added successfully!</Text>
            <Text style={styles.notificationSubtitle}>
              "Your expenses have been recorded and updated."
            </Text>
            <Text style={styles.notificationTime}>03:37 am</Text>
          </View>

          {/* Notification 3 */}
          <View style={[styles.notificationItem, { borderLeftColor: '#32CD32' }]}>
            <Text style={styles.notificationTitle}>Income added successfully!</Text>
            <Text style={styles.notificationSubtitle}>
              "Your income has been recorded and updated."
            </Text>
            <Text style={styles.notificationTime}>10:37 pm</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Yesterday</Text>

          {/* Notification 4 */}
          <View style={[styles.notificationItem, { borderLeftColor: '#1E90FF' }]}>
            <Text style={styles.notificationTitle}>Advice</Text>
            <Text style={styles.notificationSubtitle}>
              You spend a lot on Gadgets. Earn up to 5% back.
            </Text>
            <Text style={styles.notificationTime}>10:37 pm</Text>
          </View>

          {/* Notification 5 */}
          <View style={[styles.notificationItem, { borderLeftColor: '#FF4500' }]}>
            <Text style={styles.notificationTitle}>Alerts!!</Text>
            <Text style={styles.notificationSubtitle}>
              "High Spending"
            </Text>
            <Text style={styles.notificationTime}>10:37 pm</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  notificationItem: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  notificationSubtitle: {
    fontSize: 14,
    color: '#555555',
    marginVertical: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'right',
  },
  notificationAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'right',
  },
});

export default Notification;
