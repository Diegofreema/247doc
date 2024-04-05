import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/lib/zustand/auth';

type Props = {};

const AuthLayout = (props: Props) => {
  const { id, getId } = useAuth();
  console.log('🚀 ~ AuthLayout ~ id:', id);
  useEffect(() => {
    getId();
  }, []);
  if (id) {
    return <Redirect href="/home" />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({});
