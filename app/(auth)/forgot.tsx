import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';

import { Container } from '@/components/Ui/Container';
import { NavHeader } from '@/components/Ui/NavHeader';
import { BoldHeader } from '@/components/Ui/BoldHeader';
import { VStack } from '@gluestack-ui/themed';
import { TextInput } from '@/components/Ui/TextInput';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/Colors';
import { MyButton } from '@/components/Ui/MyButton';
import axios from 'axios';
import { api } from '@/lib/helper';
import Toast from 'react-native-toast-message';

type Props = {};
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});
const forgot = (props: Props) => {
  const router = useRouter();
  const {
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
    setValues,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { data } = await axios.post(
          `${api}?api=recoverpassword&patientemail=${values.email}`
        );

        if (data === "{'result': 'failed'}") {
          Toast.show({
            type: 'transparentToast',
            text1: 'Please try again',
            text2: 'Something went wrong',
            position: 'top',
          });
          return;
        }
        if (data !== '') {
          Toast.show({
            type: 'transparentToast',
            text1: 'Please try again',
            text2: 'Email not found',
            position: 'top',
          });
          return;
        }

        Toast.show({
          type: 'transparentToast',
          text1: 'Please check your email',
          text2: 'We have sent you an email',
          position: 'top',
        });

        router.back();
      } catch (error) {
        Toast.show({
          type: 'transparentToast',
          text1: 'Please try again',
          text2: 'Incorrect credentials',
          position: 'top',
        });
      }
    },
  });
  const navigate = () => {
    router.back();
  };
  return (
    <Container>
      <NavHeader />
      <VStack mt={30}>
        <BoldHeader
          text="Forgot Password"
          subText="Let us help you get back into your account"
        />
      </VStack>
      <VStack mt={40} gap={25}>
        <>
          <TextInput
            placeholder="Email"
            onChangeText={handleChange('email')}
            value={values.email}
          />
          {touched.email && errors.email && (
            <Text style={{ color: 'red' }}>{errors.email}</Text>
          )}
        </>

        <MyButton
          loading={isSubmitting}
          onPress={() => handleSubmit()}
          text="Submit"
        />

        <Pressable
          onPress={navigate}
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 },
            { padding: 4 },
          ]}
        >
          <Text style={styles.createAccountText}>
            Remember password ? <Text style={styles.text}>login</Text>
          </Text>
        </Pressable>
      </VStack>
    </Container>
  );
};

export default forgot;
const styles = StyleSheet.create({
  text: {
    color: colors.textGreen,
    fontFamily: 'Poppins',
  },
  textContainer: {
    alignSelf: 'flex-end',
  },
  createAccountText: {
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
});
