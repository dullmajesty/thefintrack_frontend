import React from "react";
import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DashboardLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#32CD32",
          borderTopWidth: 0,
          height: 70,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          color: "#333",
        },
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#ffffffa0",
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Overview"
        options={{
          title: "Overview",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-bar" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Add"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => (
            <View style={styles.addButtonContainer}>
              <MaterialCommunityIcons
                name="plus"
                size={30}
                color="#ffffff"
                style={styles.addButton}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="TipsAndTricks"
        options={{
          title: "Tips",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb-outline" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Goal"
        options={{
          title: "Goal",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="flag-checkered" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  addButtonContainer: {
    position: "absolute",
    top: -20,
    backgroundColor: "#32CD32",
    borderRadius: 35,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButton: {
    alignSelf: "center",
  },
});

export default DashboardLayout;
