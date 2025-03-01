import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { VStack } from '@gluestack-ui/themed';
import { Container } from '@/components/Ui/Container';
import { BoldHeader } from '@/components/Ui/BoldHeader';
import { TextInput } from '@/components/Ui/TextInput';
import { colors } from '@/constants/Colors';
import { MyButton } from '@/components/Ui/MyButton';
import { useFormik } from 'formik';
import axios from 'axios';
import { api } from '@/lib/helper';
import Toast from 'react-native-toast-message';
import { LoadingComponent } from '@/components/Ui/Modals/LoadingModal';
import { useAuth } from '@/lib/zustand/auth';

const Login = () => {
  const router = useRouter();
  const [secured, setSecured] = useState(true);
  const { setId } = useAuth();
  const { width } = useWindowDimensions();
  const { handleChange, handleSubmit, touched, errors, values, isSubmitting } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    // validationSchema,
    onSubmit: async (values) => {
      const formattedPassword = values.password.replace(/[#?\/\\%&]/g, '').replace(/:/g, '');
      try {
        const { data } = await axios.post(
          `${api}?api=signin&patientemail=${values.email.toLowerCase()}&pasword1=${formattedPassword}`
        );
        console.log(data?.result);
        if (data?.result === 'incorrect credentials') {
          Toast.show({
            type: 'transparentToast',
            text1: 'Please try again',
            text2: 'Incorrect credentials',
            position: 'top',
          });

          return;
        }
        if (data.result === 'failed') {
          Toast.show({
            type: 'transparentToast',
            text1: 'Please try again',
            text2: 'Something went wrong',
            position: 'top',
          });
          return;
        }
        setId(data?.result);
        router.push('/home');
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'transparentToast',
          text1: 'Please try again',
          text2: 'Something went wrong',
          position: 'top',
        });
      }
    },
  });
  const navigate = () => {
    router.push('/signUp');
  };
  console.log({ width });

  const { email, password } = values;
  const isIPad = width > 500;
  return (
    <>
      <LoadingComponent isLoading={isSubmitting} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: 'white' }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
        }}>
        <Container
          style={{
            width: isIPad ? '80%' : '100%',
            marginHorizontal: 'auto',
          }}>
          <VStack mt={30}>
            <BoldHeader text="Sign in" subText="Enter your Login details on to continue" />
          </VStack>

          <VStack mt={40} gap={25}>
            <>
              <TextInput value={email} placeholder="Email" onChangeText={handleChange('email')} />

              {errors.email && touched.email && (
                <Text style={{ color: 'red' }}>{errors.email}</Text>
              )}
            </>

            <>
              <TextInput
                value={password}
                secureTextEntry={secured}
                placeholder="Password"
                onChangeText={handleChange('password')}
                password
                secured={secured}
                setSecured={setSecured}
              />

              {errors.password && touched.password && (
                <Text style={{ color: 'red' }}>{errors.password}</Text>
              )}
            </>

            <Pressable
              onPress={() => router.push('/forgot')}
              style={({ pressed }) => [styles.textContainer, { opacity: pressed ? 0.5 : 1 }]}>
              <Text style={styles.text}>Forgot password</Text>
            </Pressable>

            <MyButton loading={isSubmitting} onPress={() => handleSubmit()} text="Login" />

            <Pressable
              onPress={navigate}
              style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, { padding: 4 }]}>
              <Text style={styles.createAccountText}>
                Don’t have an account? <Text style={styles.text}>Create Account</Text>
              </Text>
            </Pressable>
          </VStack>
        </Container>
      </ScrollView>
    </>
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
