import { Stack } from "expo-router";
import React from "react";

const RootLayout = () => {
  return (  
      <Stack>
        {/* The Stack automatically registers routes based on the file structure */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Create" options={{ headerShown: false }} />
        <Stack.Screen name="SignIN" options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
        <Stack.Screen name="AddGoal" />
        {/* Remove component or children props */}
        <Stack.Screen name="Notification" options={{ title: "Notification" }} />
      </Stack>
  );
};

export default RootLayout;
