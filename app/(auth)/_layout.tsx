import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Stack } from 'expo-router';

type Props = {};

const AuthLayout = (props: Props) => {
  return <Stack screenOptions={{ headerShown: false }} />;
};

export default AuthLayout;

const styles = StyleSheet.create({});
