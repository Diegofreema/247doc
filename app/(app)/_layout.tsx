import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/lib/zustand/auth';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
type Props = {};

const Layout = (props: Props) => {
  const queryClient = new QueryClient();
  const { id, getId } = useAuth();
  useEffect(() => {
    getId();
  }, []);
  if (!id) {
    return <Redirect href="/" />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{ headerShown: false }}
        initialRouteName="onboard"
      />
    </QueryClientProvider>
  );
};

export default Layout;

const styles = StyleSheet.create({});
