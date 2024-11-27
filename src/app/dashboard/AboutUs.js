import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default function AboutUs() {
  return (
    <ScrollView style={styles.container}>
      {/* About Us Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.aboutTitle}>About Us</Text>
        <Text style={styles.aboutText}>
          We are a dedicated team passionate about delivering excellence in everything we do. 
          Our mission is to empower individuals and organizations with the tools and knowledge they need to succeed.
        </Text>
      </View>

      {/* About the App Section */}
      <View style={styles.appSection}>
        <Text style={styles.appTitle}>About the App</Text>
        <View style={styles.appDetails}>
          <Text style={styles.detailTitle}>App Name:</Text>
          <Text style={styles.detailText}>FinTrack: Your Personal Finance Assistant</Text>
        </View>
        <View style={styles.appDetails}>
          <Text style={styles.detailTitle}>Overview:</Text>
          <Text style={styles.detailText}>
            FinTrack is a personal finance management system designed specifically for students. 
            It helps students track their income, expenses, savings, and budget, offering a clear overview of their financial situation. 
            The system is intuitive and accessible, empowering students to develop better financial habits.
          </Text>
        </View>
        <View style={styles.appDetails}>
          <Text style={styles.detailTitle}>Objectives:</Text>
          <Text style={styles.detailText}>
            - Help students manage their finances effectively.{"\n"}
            - Provide tools for budgeting and tracking expenses.{"\n"}
            - Offer insights and reports that aid in financial planning.{"\n"}
            - Encourage students to save money and minimize unnecessary spending.
          </Text>
        </View>
        <View style={styles.appDetails}>
          <Text style={styles.detailTitle}>Key Features:</Text>
          <Text style={styles.detailText}>
            1. Expense Tracking: Log daily expenses, categorize them, and set limits for each category.{"\n"}
            2. Budget Planner: Create and manage monthly budgets for better income allocation.{"\n"}
            3. Financial Reports & Insights: Generate detailed reports with charts on spending, savings, and budget adherence.
          </Text>
        </View>
        <View style={styles.appDetails}>
          <Text style={styles.detailTitle}>Target Users:</Text>
          <Text style={styles.detailText}>
            - Primary: Students in high school, college, and university.{"\n"}
            - Secondary: Parents, financial advisors, and educational institutions promoting financial literacy.
          </Text>
        </View>
      </View>

      {/* Team Section */}
      <View style={styles.teamSection}>
        <Text style={styles.teamTitle}>Our Team</Text>

        {/* Team Members Row */}
        <View style={styles.teamRow}>
          {/* Team Member 1 */}
          <View style={styles.teamMember}>
            <Image source={require('../../assets/ella.jpg')} style={styles.profileImage} />
            <Text style={styles.memberName}>Ella Guillena</Text>
            <Text style={styles.memberRole}>Founder & CEO</Text>
          </View>

          {/* Team Member 2 */}
          <View style={styles.teamMember}>
            <Image source={require('../../assets/shane.jpg')} style={styles.profileImage} />
            <Text style={styles.memberName}>Shane Irish Kate Yecyec</Text>
            <Text style={styles.memberRole}>Chief Technology Officer</Text>
          </View>

          {/* Team Member 3 */}
          <View style={styles.teamMember}>
            <Image source={require('../../assets/shannen.png')} style={styles.profileImage} />
            <Text style={styles.memberName}>Mariah Shannen Sumaria</Text>
            <Text style={styles.memberRole}>UI/UX Designer</Text>
          </View>
        </View>
      </View>

      {/* Social Media Section */}
      <View style={styles.socialMediaSection}>
        <Text style={styles.socialMediaTitle}>Follow Us</Text>
        <View style={styles.socialMediaIcons}>
          {/* Twitter */}
          <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com/projecthandle')}>
            
          </TouchableOpacity>
          {/* Facebook */}
          <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com/projecthandle')}>
            
          </TouchableOpacity>
          {/* Instagram */}
          <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com/projecthandle')}>
            
          </TouchableOpacity>
          {/* LinkedIn */}
          <TouchableOpacity onPress={() => Linking.openURL('https://linkedin.com/company/projecthandle')}>
            
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
  },
  aboutSection: {
    backgroundColor: '#4caf50',
    padding: 20,
    alignItems: 'center',
  },
  aboutTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  aboutText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  appSection: {
    backgroundColor: '#2196f3',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',  // Center the content
  },
  appTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  appDetails: {
    marginBottom: 15,
    alignItems: 'center', // Center the details
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center', // Ensure text is centered
  },
  teamSection: {
    padding: 20,
  },
  teamTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Center team members in the row
    flexWrap: 'wrap',
  },
  teamMember: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  memberName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  memberRole: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  socialMediaSection: {
    padding: 20,
    alignItems: 'center',
  },
  socialMediaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  socialMediaIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginTop: 10,
  },
  socialIcon: {
    width: 40,
    height: 40,
  },
});
