import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const FAQs = () => {
  const [expanded, setExpanded] = useState(null);

  const faqs = [
    { question: "What is FinTrack?", answer: "FinTrack is a personal finance management app designed to help students track their expenses, manage budgets, and plan their savings." },
    { question: "How does FinTrack work?", answer: "FinTrack allows users to log income and expenses, set budget limits, and view financial reports to track their financial health." },
    { question: "Is FinTrack free to use?", answer: "Yes! FinTrack offers free features, but premium plans are available for advanced tools like detailed insights and analytics." },
    { question: "How can I reset my password?", answer: "To reset your password, click on 'Forgot Password' on the login screen and follow the instructions sent to your email." },
    { question: "How secure is my data?", answer: "We use encryption and industry-standard security measures to protect your data." },
  ];

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>FAQs</Text>
      
      {/* FAQ Items */}
      {faqs.map((faq, index) => (
        <View key={index} style={styles.faqItem}>
          <TouchableOpacity onPress={() => toggleExpand(index)} style={styles.questionContainer}>
            <Text style={styles.question}>{faq.question}</Text>
          </TouchableOpacity>
          {expanded === index && (
            <View style={styles.answerContainer}>
              <Text style={styles.answer}>{faq.answer}</Text>
            </View>
          )}
        </View>
      ))}

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactText}>
          Didn't find your answer? 
        </Text>
        <Text style={styles.contactInfo}>
          Contact us at support@fintrack.com or call 123-456-7890.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  questionContainer: {
    paddingVertical: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  answerContainer: {
    paddingVertical: 10,
  },
  answer: {
    fontSize: 16,
    color: '#555',
  },
  contactSection: {
    marginTop: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  contactText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#333',
  },
  contactInfo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default FAQs;
