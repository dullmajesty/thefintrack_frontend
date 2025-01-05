import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient('https://kowjetafugrvxisjpoyz.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imtvd2pldGFmdWdydnhpc2pwb3l6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM5ODk4NjYsImV4cCI6MjA0OTU2NTg2Nn0.p_M2l5z7L7R4iwsziKb2WuAJJ8dUjIRv9z_71xsH5Hs');

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('transactions')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;

        const formattedData = data.map(item => ({
          ...item,
          type: item.type === 'Income' ? 'Income' : item.type === 'Expense' ? 'Expense' : 'Unknown',
          title: item.title || 'No Title Provided',
          category: item.category || 'General',
          amount: item.amount || 0.0,
          time: item.time || new Date().toLocaleTimeString(),
          date: item.date || new Date().toLocaleDateString(),
          color: item.type === 'Income' ? '#4CAF50' : item.type === 'Expense' ? '#F44336' : '#ccc',
        }));

        setNotifications(formattedData);
      } catch (error) {
        console.error('Error fetching data: ', error.message);
      }
    };

    fetchData();
  }, []);

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedNotification(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Notifications</Text>
      {notifications.length === 0 ? (
        <Text style={styles.noNotificationsText}>No notifications yet.</Text>
      ) : (
        <ScrollView style={styles.notificationsContainer}>
          {notifications.map((notification, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.notificationItem, { borderLeftColor: notification.color }]}
              onPress={() => openModal(notification)}
            >
              <Icon
                name={notification.type === 'Income' ? 'check-circle' : 'cancel'}
                size={30}
                color={notification.color}
                style={styles.icon}
              />
              <View style={styles.notificationTextContainer}>
                <Text style={styles.notificationHeading}>
                  {notification.type === 'Income'
                    ? 'Income Successfully Saved'
                    : notification.type === 'Expense'
                    ? 'Expense Successfully Saved'
                    : 'Notification'}
                </Text>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationDetails}>Date: {notification.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Modal for Notification Details */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Close Button */}
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            {selectedNotification && (
              <>
                {/* Icon in the Modal */}
                <Icon
                  name={selectedNotification.type === 'Income' ? 'attach-money' : 'money-off'}
                  size={30}
                  color={selectedNotification.type === 'Income' ? '#4CAF50' : '#F44336'}
                  style={styles.modalIcon}
                />
                <Text style={styles.modalHeading}>{selectedNotification.type}</Text>
                <Text style={styles.modalTitle}>{selectedNotification.title}</Text>
                <Text style={styles.modalDetails}>
                  Amount: ${selectedNotification.amount.toFixed(2)}
                </Text>
                <Text style={styles.modalDetails}>
                  Category: {selectedNotification.category}
                </Text>
                <Text style={styles.modalDetails}>
                  Date: {selectedNotification.date}
                </Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#222',
    marginBottom: 20,
  },
  noNotificationsText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
  notificationsContainer: {
    marginTop: 10,
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },
  notificationTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  notificationHeading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  notificationDetails: {
    fontSize: 13,
    color: '#666',
  },
  icon: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    position: 'relative',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#eee',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 22,
    color: '#333',
  },
  modalIcon: {
    marginBottom: 15,
  },
  modalHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    color: '#333',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#444',
  },
  modalDetails: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
});

export default Notification;
