import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Platform, Text, useWindowDimensions } from 'react-native';

import Colors, { colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { StatusBar } from 'expo-status-bar';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isIPad = width > 500;
  const isIos = Platform.OS === 'ios';
  return (
    <>
      <StatusBar style="light" backgroundColor={colors.textGreen} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: {
            gap: 10,
          },
          tabBarLabelStyle: {
            marginLeft: isIPad ? 10 : 0,
          },
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Tab One',
            tabBarIcon: ({ focused }) => (
              <TabBarIcon name="home" color={focused ? colors.textGreen : colors.textLight} />
            ),
            headerShown: false,
            tabBarLabel: ({ focused }) =>
              isIos ? null : (
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 12,
                    marginLeft: isIPad ? 20 : 0,
                    color: focused ? colors.textGreen : colors.textLight,
                  }}>
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
              <TabBarIcon name="calendar" color={focused ? colors.textGreen : colors.textLight} />
            ),
            headerShown: false,

            tabBarLabel: ({ focused }) =>
              isIos ? null : (
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 12,
                    marginLeft: isIPad ? 20 : 0,
                    color: focused ? colors.textGreen : colors.textLight,
                  }}>
                  Appointments
                </Text>
              ),
          }}
        />
      </Tabs>
    </>
  );
}
