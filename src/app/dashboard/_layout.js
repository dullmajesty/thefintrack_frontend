import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import DrawerContent from '../../component/Drawer';

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={DrawerContent}>
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                size={20}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Profile"
          options={{
            drawerLabel: 'Profile',
            title: 'Profile',
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'account' : 'account-outline'}
                size={20}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Reminder"
          options={{
            drawerLabel: 'Reminder',
            title: 'Reminder',
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'clock' : 'clock-outline'}
                size={20}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Language"
          options={{
            drawerLabel: 'Language',
            title: 'Language',
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'circle-outline' : 'earth'}
                size={20}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Activity"
          options={{
            drawerLabel: 'Activity',
            title: 'Activity',
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'run' : 'run-fast'}
                size={20}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="SendFeedback"
          options={{
            drawerLabel: 'Send Feedback',
            title: 'Send Feedback',
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'send' : 'send-outline'}
                size={20}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="Report Problem"
          options={{
            drawerLabel: 'Report Problem',
            title: 'Report Problem',
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'alert-circle' : 'alert-circle-outline'}
                size={20}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="FAQs"
          options={{
            drawerLabel: 'FAQs',
            title: 'FAQs',
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'help-circle' : 'help-circle-outline'}
                size={20}
              />
            ),
          }}
        />

        <Drawer.Screen
          name="ReportProblem"
          options={{
            drawerLabel: 'Report Problem',
            title: 'Report Problem',
            drawerIcon: ({ focused }) => (
              <MaterialCommunityIcons
                name={focused ? 'alert' : 'alert-outline'}
                size={20}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
