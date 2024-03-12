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
import { useRouter } from 'expo-router';
import { BoldHeader } from '@/components/Ui/BoldHeader';
import { colors } from '@/constants/Colors';
import { MyButton } from '@/components/Ui/MyButton';
import { useState } from 'react';
import { format } from 'date-fns';

type Props = {};

const defaultDateOfBirth = new Date(
  new Date().setFullYear(new Date().getFullYear() - 18)
);
const passwordRegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
const validationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .matches(
      passwordRegExp,
      'Password must include at least one capital letter, one number, one lower case letter, and one special character'
    )
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  address: yup.string().required('Address is required'),
  gender: yup.string().required('State is required'),
  dateOfBirth: yup
    .date()
    .default(
      () => new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    )
    .required('Date of birth is required'),
});
const signUp = (props: Props) => {
  const router = useRouter();
  const [date, setDate] = useState(new Date(defaultDateOfBirth));
  console.log('🚀 ~ signUp ~ date:', date);

  const [show, setShow] = useState(false);
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
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      address: '',
      gender: '',
      dateOfBirth: format(defaultDateOfBirth, 'dd-MM-yyyy'),
    },
    validationSchema,
    onSubmit: (values) => {},
  });
  const toggleDatePicker = () => {
    setShow((prev) => !prev);
  };
  const onChange = ({ type }: any, selectedDate: any) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setShow(false);
      setDate(currentDate);
      setValues({ ...values, dateOfBirth: format(currentDate, 'dd-MM-yyyy') });
    }
  };

  const showMode = () => {
    setShow(true);
  };

  const onChangeIos = () => {
    setValues({ ...values, dateOfBirth: format(date, 'yyyy-MM-dd') });
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
  console.log(show);

  return (
    <Container>
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
              placeholder="Phone"
              onChangeText={handleChange('phoneNumber')}
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
              placeholder="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={{ color: 'red', fontWeight: 'bold' }}>
                {errors.confirmPassword}
              </Text>
            )}
          </>

          <MyButton onPress={() => handleSubmit()} text="Create Account" />
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
