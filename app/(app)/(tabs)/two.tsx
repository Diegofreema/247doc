import { HStack, VStack } from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import { FlatList, Platform, Pressable, useWindowDimensions, View } from 'react-native';

import { ErrorComponent } from '@/components/Ui/Error';
import { Loading } from '@/components/Ui/Loading';
import { MyText } from '@/components/Ui/MyText';
import { colors } from '@/constants/Colors';
import { useComingSessions } from '@/lib/tanstack/queries';
import { useAuth } from '@/lib/zustand/auth';
import { UpComingSessions } from '@/types';
import { FontAwesome } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';

const Appointment = () => {
  const { id } = useAuth();
  const { width } = useWindowDimensions();
  const isIPad = width > 500;
  const { data, isPending, refetch, isError, isPaused, isRefetching, isRefetchError } =
    useComingSessions(id);

  if (isError || isPaused || isRefetchError) {
    return <ErrorComponent refetch={refetch} />;
  }
  if (isPending) {
    return <Loading />;
  }

  return (
    <FlatList
      data={data}
      onRefresh={refetch}
      refreshing={isRefetching}
      ListHeaderComponent={() => (
        <HStack justifyContent="space-between" alignItems="center">
          <MyText
            text="Appointments"
            style={{
              fontSize: 20,
              color: 'black',
              fontFamily: 'PoppinsBold',
            }}
          />
        </HStack>
      )}
      keyExtractor={(item, index) => index?.toString()}
      renderItem={({ item }) => <AppointmentCardsItem item={item} />}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      contentContainerStyle={{
        paddingVertical: 20,
        paddingHorizontal: 15,
        backgroundColor: 'transparent',
        flexGrow: 1,
        width: isIPad ? '90%' : '100%',
        marginHorizontal: 'auto',
        gap: 20,
      }}
      style={{ backgroundColor: 'white' }}
      ListEmptyComponent={() => <ListEmptyComponent />}
      numColumns={isIPad ? 2 : 1}
      columnWrapperStyle={isIPad ? { gap: 20 } : null}
    />
  );
};

export default Appointment;
const AppointmentCardsItem = ({ item }: { item: UpComingSessions }) => {
  const onPress = () => {
    Linking.openURL(item?.meetingLink);
  };
  const openDialScreen = () => {
    let number = '';
    if (Platform.OS === 'ios') {
      number = 'telprompt:${item?.doctorPhone}';
    } else {
      number = 'tel:${item?.doctorPhone}';
    }
    Linking.openURL(number);
  };
  return (
    <VStack bg={colors.textGreen} p={20} w={'100%'} flex={1} borderRadius={10}>
      <HStack alignItems="center" gap={10} mb={20}>
        <VStack>
          <MyText
            text={item?.doctorName}
            style={{ fontSize: 18, color: 'white', fontFamily: 'PoppinsBold' }}
          />
          <MyText
            text={item?.doctorEmail}
            style={{
              fontSize: 13,
              color: 'white',
              fontFamily: 'Poppins',
            }}
          />
          <Pressable
            onPress={openDialScreen}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
              paddingVertical: 4,
            })}>
            <MyText
              text={item?.doctorPhone}
              style={{
                fontSize: 11,
                color: 'white',
                fontFamily: 'Poppins',
              }}
            />
          </Pressable>
        </VStack>
      </HStack>

      <HStack
        justifyContent="space-between"
        padding={10}
        borderRadius={10}
        bg={colors.textGreen2}
        alignItems="center">
        <HStack gap={5} alignItems="center">
          <FontAwesome name="calendar" color="white" size={13} />
          <MyText
            text={item?.date}
            style={{ fontSize: 10, color: 'white', fontFamily: 'Poppins' }}
          />
        </HStack>
        <HStack gap={5} alignItems="center">
          <FontAwesome name="clock-o" color="white" size={13} />
          <MyText
            text={item?.sessionStartTimex}
            style={{ fontSize: 10, color: 'white', fontFamily: 'Poppins' }}
          />
        </HStack>
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [
            {
              opacity: pressed ? 0.5 : 1,
              padding: 4,
              backgroundColor: colors.textGreen,
              borderRadius: 5,
            },
          ]}>
          <MyText
            text={'Meeting link'}
            style={{
              fontSize: 10,
              color: 'white',
              fontFamily: 'PoppinsBold',
            }}
          />
        </Pressable>
      </HStack>
    </VStack>
  );
};

const ListEmptyComponent = () => {
  return (
    <VStack height={'100%'} w={'100%'}>
      <HStack bg={colors.textGreen} p={20} borderRadius={10} alignItems="center" gap={10} mb={20}>
        <VStack>
          <MyText
            text="You currently don’t have any
appointment at the moment"
            style={{
              fontSize: 13,
              color: 'white',
              fontFamily: 'PoppinsMedium',
            }}
          />
          <Pressable onPress={() => router.push('/home')}>
            <HStack
              gap={5}
              alignItems="center"
              padding={10}
              borderRadius={10}
              bg={colors.textGreen2}
              mt={10}>
              <FontAwesome name="calendar" color="white" size={13} />
              <MyText
                text="Book an Appointment"
                style={{
                  fontSize: 13,
                  color: 'white',
                  fontFamily: 'Poppins',
                }}
              />
            </HStack>
          </Pressable>
        </VStack>

        <Image
          source={require('../../../assets/images/empty.png')}
          style={{ width: 100, height: 100 }}
          contentFit="contain"
        />
      </HStack>
    </VStack>
  );
};
