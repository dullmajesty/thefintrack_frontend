import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

const AboutUs = () => {
  const teamMembers = [
    { name: 'Ella Guillena', role: 'Founder & CEO', image: require('../../assets/ella.jpg') },
    { name: 'Shane Irish Kate Yecyec', role: 'Chief Technology Officer', image: require('../../assets/shane.jpg') },
    { name: 'Mariah Shannen Sumaria', role: 'UI/UX Designer', image: require('../../assets/shannen.png') },
  ];

  const socialMediaLinks = [
    { name: 'Twitter', url: 'https://twitter.com/projecthandle', icon: null }, // Add icons if needed
    { name: 'Facebook', url: 'https://facebook.com/projecthandle', icon: null },
    { name: 'Instagram', url: 'https://instagram.com/projecthandle', icon: null },
    { name: 'LinkedIn', url: 'https://linkedin.com/company/projecthandle', icon: null },
  ];

  const Section = ({ title, children, style }) => (
    <View style={[styles.section, style]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );

  const TeamMember = ({ name, role, image }) => (
    <View style={styles.teamMember}>
      <Image source={image} style={styles.profileImage} />
      <Text style={styles.memberName}>{name}</Text>
      <Text style={styles.memberRole}>{role}</Text>
    </View>
  );

  const SocialMediaIcon = ({ url }) => (
    <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.socialMediaButton}>
      {/* Add icons here */}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Section title="About Us" style={styles.aboutSection}>
        <Text style={styles.aboutText}>
          We are a dedicated team passionate about delivering excellence in everything we do. Our mission is to empower individuals and
          organizations with the tools and knowledge they need to succeed.
        </Text>
      </Section>

      <Section title="About the App" style={styles.appSection}>
        <Text style={styles.detailText}>
          <Text style={styles.detailTitle}>App Name:</Text> FinTrack: Your Personal Finance Assistant{'\n\n'}
          <Text style={styles.detailTitle}>Overview:</Text> FinTrack is a personal finance management system designed specifically for students. It helps
          students track their income, expenses, savings, and budget, offering a clear overview of their financial situation.{'\n\n'}
          <Text style={styles.detailTitle}>Objectives:</Text>{'\n'}- Help students manage their finances effectively.{'\n'}- Provide tools for budgeting and
          tracking expenses.{'\n'}- Offer insights and reports that aid in financial planning.{'\n'}- Encourage students to save money and minimize
          unnecessary spending.{'\n\n'}
          <Text style={styles.detailTitle}>Key Features:</Text>{'\n'}1. Expense Tracking: Log daily expenses, categorize them, and set limits for each
          category.{'\n'}2. Budget Planner: Create and manage monthly budgets for better income allocation.{'\n'}3. Financial Reports & Insights:
          Generate detailed reports with charts on spending, savings, and budget adherence.{'\n\n'}
          <Text style={styles.detailTitle}>Target Users:</Text>{'\n'}- Primary: Students in high school, college, and university.{'\n'}- Secondary: Parents,
          financial advisors, and educational institutions promoting financial literacy.
        </Text>
      </Section>

      <Section title="Our Team" style={styles.teamSection}>
        <View style={styles.teamRow}>
          {teamMembers.map((member, index) => (
            <TeamMember key={index} name={member.name} role={member.role} image={member.image} />
          ))}
        </View>
      </Section>

      <Section title="Follow Us" style={styles.socialMediaSection}>
        <View style={styles.socialMediaRow}>
          {socialMediaLinks.map((social, index) => (
            <SocialMediaIcon key={index} url={social.url} />
          ))}
        </View>
      </Section>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f4f4f9' 
  },
  section: { 
    padding: 20, 
    marginBottom: 10 
  },
  sectionTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10, 
    textAlign: 'center' 
  },
  aboutSection: { 
    backgroundColor: '#4caf50', 
    alignItems: 'center' 
  },
  aboutText: { fontSize: 16, color: '#fff', textAlign: 'center' },
  appSection: { backgroundColor: '#2196f3', alignItems: 'center' },
  detailText: { fontSize: 16, color: '#fff', textAlign: 'center', marginVertical: 5 },
  detailTitle: { fontWeight: 'bold' },
  teamSection: {},
  teamRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' },
  teamMember: { alignItems: 'center', margin: 10, width: '30%' },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  memberName: { fontSize: 18, fontWeight: 'bold' },
  memberRole: { fontSize: 14, color: '#666' },
  socialMediaSection: { alignItems: 'center' },
  socialMediaRow: { flexDirection: 'row', justifyContent: 'space-around', width: '80%' },
  socialMediaButton: { marginHorizontal: 10 },
});

export default AboutUs;
