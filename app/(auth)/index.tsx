import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

type Props = {};

const Login = (props: Props) => {
  return (
    <View>
      <Link href={'/onboard'}>Login</Link>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
