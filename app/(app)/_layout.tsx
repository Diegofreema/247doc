import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/lib/zustand/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';

const Layout = () => {
  const queryClient = new QueryClient();
  const { id, getId } = useAuth();
  useEffect(() => {
    getId();
  }, [getId]);
  if (!id) {
    return <Redirect href="/" />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }} initialRouteName="onboard" />
    </QueryClientProvider>
  );
};

export default Layout;
