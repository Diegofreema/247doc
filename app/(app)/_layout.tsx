import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/lib/zustand/auth';

type Props = {};

const Layout = (props: Props) => {
  const { id, getId } = useAuth();
  useEffect(() => {
    getId();
  }, []);
  // if (!id) {
  //   return <Redirect href="/" />;
  // }
  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="onboard" />
  );
};

export default Layout;

const styles = StyleSheet.create({});
