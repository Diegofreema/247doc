import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import { z } from 'zod';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { Container } from '@/components/Ui/Container';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import { withZodSchema } from 'formik-validator-zod';
import { HStack, VStack } from '@gluestack-ui/themed';
import { NavHeader } from '@/components/Ui/NavHeader';
import { TextInput } from '@/components/Ui/TextInput';
import { Link, useRouter } from 'expo-router';
import { BoldHeader } from '@/components/Ui/BoldHeader';
import { colors } from '@/constants/Colors';
import { MyButton } from '@/components/Ui/MyButton';
import { useState } from 'react';
import { format } from 'date-fns';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { api } from '@/lib/helper';
import { ConfirmModal } from '@/components/Ui/Modals/ConfirmModal';
type Props = {};

const defaultDateOfBirth = new Date(
  new Date().setFullYear(new Date().getFullYear() - 18)
);

const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'Password can only contain letters and numbers')
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  gender: yup.string().required('State is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
});
const signUp = (props: Props) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date(defaultDateOfBirth));
  const [showModal, setShowModal] = useState(false);

  const [show, setShow] = useState(false);
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
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      address: 'Male',
      gender: '',
      dateOfBirth: format(defaultDateOfBirth, 'MM/dd/yyyy'),
    },
    validationSchema,
    onSubmit: async (values) => {
      const {
        address,
        dateOfBirth,
        email,
        firstName,
        gender,
        lastName,
        password,
        phoneNumber,
      } = values;

      const fullName = `${firstName} ${lastName}`;
      try {
        const { data } = await axios.post(
          `${api}?api=createaccount&patientemail=${email}&patientgender=${gender}&patientfname=${gender}&patientdob=${dateOfBirth}&patientphone=${phoneNumber}&patientadres=${address}&pasword1=${password}&patientlname=${fullName}`
        );

        if (data === 'Success') {
          setShowModal(true);
          return;
        }

        if (data === 'Email Already Exist') {
          Toast.show({
            type: 'transparentToast',
            text1: 'Error',
            text2: 'Email already exist',
            position: 'top',
          });
          return;
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'transparentToast',
          text1: 'Error',
          text2: 'Something went wrong',
          position: 'top',
        });
      }
    },
  });
  // const toggleDatePicker = () => {
  //   setShow((prev) => !prev);
  // };
  const onChange = ({ type }: any, selectedDate: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      setValues({ ...values, dateOfBirth: format(currentDate, 'MM/dd/yyyy') });
    }
  };

  const showMode = () => {
    setShow(true);
  };

  // const onChangeIos = () => {
  //   setValues({ ...values, dateOfBirth: format(date, 'yyyy-MM-dd') });
  // };
  const onPress = () => {
    router.replace('/onboard');
    setShowModal(false);
    resetForm();
  };
  const {
    address,
    confirmPassword,
    dateOfBirth,
    email,
    firstName,
    gender,
    lastName,
    password,
    phoneNumber,
  } = values;

  return (
    <Container>
      <ConfirmModal name={firstName} onPress={onPress} isVisible={showModal} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
      >
        <NavHeader />
        <VStack mt={30}>
          <BoldHeader
            text="Sign up"
            subText="Enter your details on to create account"
          />
        </VStack>

        <VStack mt={40} gap={25}>
          <>
            <TextInput
              value={firstName}
              placeholder="First name"
              onChangeText={handleChange('firstName')}
            />
            {touched.firstName && errors.firstName && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.firstName}
              </Text>
            )}
          </>
          <>
            <TextInput
              value={lastName}
              placeholder="Last name"
              onChangeText={handleChange('lastName')}
            />

            {touched.lastName && errors.lastName && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.lastName}
              </Text>
            )}
          </>
          <>
            <TextInput
              keyboardType="email-address"
              value={email}
              placeholder="Email"
              onChangeText={handleChange('email')}
            />
            {touched.email && errors.email && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.email}
              </Text>
            )}
          </>
          <>
            <TextInput
              value={phoneNumber}
              placeholder="Phone"
              onChangeText={handleChange('phoneNumber')}
              keyboardType="phone-pad"
            />
            {touched.phoneNumber && errors.phoneNumber && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.phoneNumber}
              </Text>
            )}
          </>
          <>
            <SelectList
              search={false}
              boxStyles={{
                ...styles2.border,
                justifyContent: 'flex-start',
                backgroundColor: 'white',
                alignItems: 'center',
              }}
              inputStyles={{
                textAlign: 'left',
                color: colors.textLight,
              }}
              fontFamily="Poppins"
              setSelected={handleChange('gender')}
              data={[
                { key: 'male', value: 'Male' },
                { key: 'female', value: 'Female' },
              ]}
              defaultOption={{
                key: 'male',
                value: 'Male',
              }}
              save="key"
              placeholder="Gender"
            />

            {touched.gender && errors.gender && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.gender}
              </Text>
            )}
          </>
          <>
            {Platform.OS === 'android' && (
              <>
                <Pressable
                  onPress={showMode}
                  style={({ pressed }) => pressed && { opacity: 0.5 }}
                >
                  <TextInput
                    value={dateOfBirth}
                    placeholder="Date of Birth"
                    editable={false}
                  />
                </Pressable>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    onChange={onChange}
                    display="spinner"
                  />
                )}
              </>
            )}
            {Platform.OS === 'ios' && (
              <>
                <Pressable
                  onPress={showMode}
                  style={({ pressed }) => pressed && { opacity: 0.5 }}
                >
                  <TextInput
                    value={format(date, 'dd/MM/yyyy')}
                    placeholder="Date of Birth"
                    editable={false}
                  />
                </Pressable>
                {show && (
                  <>
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode={'date'}
                      is24Hour={true}
                      onChange={onChange}
                      display="spinner"
                      style={{ height: 120, marginTop: -10 }}
                    />
                  </>
                )}
              </>
            )}
            {touched.dateOfBirth && errors.dateOfBirth && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.dateOfBirth}
              </Text>
            )}
          </>

          <>
            <TextInput
              value={address}
              placeholder="Street Address"
              onChangeText={handleChange('address')}
            />
            {touched.address && errors.address && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.address}
              </Text>
            )}
          </>
          <>
            <TextInput
              value={password}
              placeholder="Password"
              onChangeText={handleChange('password')}
            />
            {touched.password && errors.password && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.password}
              </Text>
            )}
          </>
          <>
            <TextInput
              value={confirmPassword}
              placeholder="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.confirmPassword}
              </Text>
            )}
          </>

          <MyButton
            loading={isSubmitting}
            onPress={() => handleSubmit()}
            text="Create Account"
          />
        </VStack>
      </ScrollView>
    </Container>
  );
};

export default signUp;

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

const styles2 = StyleSheet.create({
  border: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    minHeight: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
