import { View, Text } from 'react-native';
import React, { useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useDoctor } from '@/lib/tanstack/queries';
import { ErrorComponent } from '@/components/Ui/Error';
import { Loading } from '@/components/Ui/Loading';
import { Doctor } from '@/types';
import { Avatar, Card } from 'react-native-paper';
import { HStack } from '@gluestack-ui/themed';
import { VStack } from '@gluestack-ui/themed';
import { MyText } from '@/components/Ui/MyText';
import { MyButton } from '@/components/Ui/MyButton';
import { Paystack, paystackProps } from 'react-native-paystack-webview';
import axios from 'axios';
import { useAuth } from '@/lib/zustand/auth';
import Toast from 'react-native-toast-message';
import { NavHeader } from '@/components/Ui/NavHeader';
import { useQueryClient } from '@tanstack/react-query';
type Props = {};

const DoctorDetails = (props: Props) => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [email, setEmail] = useState('');
  const [sessionFee, setSessionFee] = useState('');
  const [paymentRef, setPaymentRef] = useState('');
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id: userId } = useAuth();
  const { data, isPending, refetch, isError, isPaused } = useDoctor(id);
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();
  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }
  if (isPending) {
    return <Loading />;
  }

  if (
    // @ts-ignore
    data === 'This  session has been booked. Please try a different session'
  ) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MyText
          text="This  session has been booked. Please try a different session"
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontFamily: 'PoppinsBold',
          }}
        />
      </View>
    );
  }

  const onStartTransaction = async () => {
    // email, sessionFee, paymentRef, phone;
    // This  session has been booked. Please try a different session
    try {
      const { data: dataRes } = await axios.post(
        `https://247docapi.netpro.software/api.aspx?api=book&sessionid=${id}&patientref=${userId}`
      );
      console.log(dataRes);
      if (
        dataRes ===
        'This  session has been booked. Please try a different session'
      ) {
        return Toast.show({
          type: 'transparentToast',
          text1: 'Please try  a different session',
          text2:
            'This  session has been booked. Please try a different session',
        });
      }

      if (dataRes?.sessionFee) {
        setSessionFee(dataRes.sessionFee);
        setPaymentRef(dataRes.paymentRef);
        setEmail(dataRes.email);
        paystackWebViewRef?.current?.startTransaction();
      }
    } catch (error) {
      Toast.show({
        type: 'transparentToast',
        text1: 'Please try again',
        text2: 'Something went wrong',
      });
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white', marginHorizontal: 20 }}>
      <NavHeader />

      <Paystack
        paystackKey="pk_live_34dcb421bb4e9e6f20fdf2c993f2b44c9e436fbe"
        billingEmail={email}
        amount={sessionFee}
        channels={[
          'card',
          'bank',
          'ussd',
          'mobile_money',
          'qr',
          'bank_transfer',
        ]}
        onCancel={(e) => {
          // handle response here
          Toast.show({
            type: 'transparentToast',
            text1: 'Your payment was cancelled',
            position: 'top',
          });
        }}
        onSuccess={async (res) => {
          // handle response here
          await axios.post(
            ` https://247doc.net/checkout.aspx?zxc=${paymentRef}`
          );
          Toast.show({
            type: 'transparentToast',
            text1: 'Payment was successful',
            position: 'top',
          });
          queryClient.invalidateQueries({
            queryKey: ['upcoming_sessions', id],
          });
          router.push('/two');
        }}
        // @ts-ignore

        ref={paystackWebViewRef}
      />
      <DoctorCard item={data} />
      <VStack mt={20}>
        <MyText
          text={data?.bio}
          style={{
            textAlign: 'left',
            fontFamily: 'Poppins',
            color: '#000',
          }}
        />
      </VStack>
      <VStack mt={'auto'} mb={30}>
        <MyButton text="Book Appointment" onPress={onStartTransaction} />
      </VStack>
    </View>
  );
};

export default DoctorDetails;

const DoctorCard = ({ item }: { item: Doctor }) => {
  return (
    <Card style={{ paddingVertical: 20, backgroundColor: '#F8F8F8' }}>
      <HStack alignItems="center" px={15} gap={10} mb={10}>
        <Avatar.Image
          source={{
            uri: `https://247pharmacy.net/Uploads/doctor-${item?.doctorid}.jpeg`,
          }}
        />

        <VStack>
          <MyText
            text={item?.Doctor}
            style={{ fontFamily: 'PoppinsBold', fontSize: 18 }}
          />
          <MyText
            text={item?.categoryName}
            style={{ fontFamily: 'PoppinsMedium', fontSize: 12, color: 'gray' }}
          />
        </VStack>
      </HStack>
      <HStack justifyContent="space-between" px={15}>
        <MyText
          text={item?.Startime}
          style={{ fontFamily: 'PoppinsBold', fontSize: 15, color: 'gray' }}
        />
        <MyText
          text={`₦${item?.Price}`}
          style={{ fontFamily: 'PoppinsBold', fontSize: 15, color: 'gray' }}
        />
      </HStack>
    </Card>
  );
};
