import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const TipsAndTricks = () => {
  const [data, setData] = useState([]); // State to store API data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://tradingview18.p.rapidapi.com/symbols/auto-complete?query=tela',
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '698cbb7331mshf2b48d79071b199p1dc277jsn9892b365dfc8',
            'x-rapidapi-host': 'tradingview18.p.rapidapi.com',
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result.results); // Assuming API returns a `results` array
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Call the fetch function on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Render each item in the list
  const renderSymbolCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.symbol}</Text>
        <Icon name="pin" size={20} color="#000" />
      </View>
      <Text style={styles.cardDescription}>{item.name}</Text>
      <Text style={styles.cardType}>Type: {item.type}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#000" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.symbol}
          renderItem={renderSymbolCard}
          contentContainerStyle={styles.listContainer}
        />
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
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#ccff66', // Light green color
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  cardDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  cardType: {
    fontSize: 12,
    color: '#555',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default TipsAndTricks;
