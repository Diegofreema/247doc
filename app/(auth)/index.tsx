import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Link, useRouter } from 'expo-router';
import { VStack } from '@gluestack-ui/themed';
import { NavHeader } from '@/components/Ui/NavHeader';
import { Container } from '@/components/Ui/Container';
import { BoldHeader } from '@/components/Ui/BoldHeader';
import { TextInput } from '@/components/Ui/TextInput';
import { colors } from '@/constants/Colors';
import { MyButton } from '@/components/Ui/MyButton';
import * as yup from 'yup';
import { useFormik } from 'formik';
type Props = {};
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
});
const Login = (props: Props) => {
  const router = useRouter();
  const {
    handleChange,
    handleSubmit,
    touched,
    errors,
    values,
    setValues,
    resetForm,
  } = useFormik({
    initialValues: {
      email: '',

      password: '',
    },
    // validationSchema,
    onSubmit: (values) => {
      router.push('/home');
    },
  });
  const navigate = () => {
    router.push('/signUp');
  };

  const { email, password } = values;
  return (
    <Container>
      <VStack mt={30}>
        <BoldHeader
          text="Sign in"
          subText="Enter your Login details on to continue"
        />
      </VStack>

      <VStack mt={40} gap={25}>
        <>
          <TextInput
            value={email}
            placeholder="Email"
            onChangeText={handleChange('email')}
          />

          {errors.email && touched.email && (
            <Text style={{ color: 'red' }}>{errors.email}</Text>
          )}
        </>

        <>
          <TextInput
            value={password}
            placeholder="Password"
            onChangeText={handleChange('password')}
          />

          {errors.password && touched.password && (
            <Text style={{ color: 'red' }}>{errors.password}</Text>
          )}
        </>

        <Pressable
          onPress={() => router.push('/forgot')}
          style={({ pressed }) => [
            styles.textContainer,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Text style={styles.text}>Forgot password</Text>
        </Pressable>

        <MyButton onPress={() => handleSubmit()} text="Login" />

        <Pressable
          onPress={navigate}
          style={({ pressed }) => [
            { opacity: pressed ? 0.5 : 1 },
            { padding: 4 },
          ]}
        >
          <Text style={styles.createAccountText}>
            Don’t have an account?{' '}
            <Text style={styles.text}>Create Account</Text>
          </Text>
        </Pressable>
      </VStack>
    </Container>
  );
};

export default Login;

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
