import { View, Text } from 'react-native';
import React from 'react';
import { Container } from '@/components/Ui/Container';
import { BoldHeader } from '@/components/Ui/BoldHeader';
import { VStack } from '@gluestack-ui/themed';
import { Link, useRouter } from 'expo-router';
import { MyButton } from '@/components/Ui/MyButton';

type Props = {};

const verify = (props: Props) => {
  const router = useRouter();
  return (
    <Container>
      <VStack justifyContent="center" flex={1}>
        <BoldHeader
          style={{ textAlign: 'center' }}
          text="Please check your email to complete your registration"
          subText="We have sent you an email to verify your account "
        />
        <MyButton
          onPress={() => router.replace('/(auth)/')}
          text="Login"
          style={{ marginTop: 20 }}
        />
      </VStack>
    </Container>
  );
};

export default verify;
