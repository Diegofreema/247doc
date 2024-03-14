import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import Colors, { colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              name="home"
              color={focused ? colors.textGreen : colors.textLight}
            />
          ),
          headerShown: false,
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: 'Poppins',
                fontSize: 12,

                color: focused ? colors.textGreen : colors.textLight,
              }}
            >
              Home
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="calendar"
              color={focused ? colors.textGreen : colors.textLight}
            />
          ),
          headerShown: false,

          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontFamily: 'Poppins',
                fontSize: 12,

                color: focused ? colors.textGreen : colors.textLight,
              }}
            >
              Appointments
            </Text>
          ),
        }}
      />
    </Tabs>
  );
}
