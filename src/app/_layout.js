import { Stack } from "expo-router";
import React from "react";

const RootLayout =() => {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }}/>
            <Stack.Screen name="Create" options={{ headerShown: false }}/>
            <Stack.Screen name="SignIN" options={{ headerShown: false }}/>
            <Stack.Screen name="SignUp" options={{ headerShown: false }}/>
            <Stack.Screen name="ForgotPassword" options={{ headerShown: false }}/>
            <Stack.Screen name="dashboard" options={{ headerShown: false }} />
            <Stack.Screen name="Notification" />
            <Stack.Screen name="EditProfile" />
            <Stack.Screen name="Add" />

        </Stack>
    )
}

export default RootLayout