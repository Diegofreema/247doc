import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/lib/zustand/auth';

const AuthLayout = () => {
  const { id, getId } = useAuth();

  useEffect(() => {
    getId();
  }, [getId]);
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
