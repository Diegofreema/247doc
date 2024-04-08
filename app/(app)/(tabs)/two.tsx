import { HStack, VStack } from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
  Platform,
} from 'react-native';

import { UpComingSessions } from '@/types';
import { format } from 'date-fns';
import * as Linking from 'expo-linking';
import { useAuth } from '@/lib/zustand/auth';
import { useComingSessions } from '@/lib/tanstack/queries';
import { ErrorComponent } from '@/components/Ui/Error';
import { Loading } from '@/components/Ui/Loading';
import { useRouter } from 'expo-router';
import { colors } from '@/constants/Colors';
import { MyText } from '@/components/Ui/MyText';
import { FontAwesome } from '@expo/vector-icons';
type Props = {};

const Appointment = ({}: Props): JSX.Element => {
  const { id } = useAuth();
  const {
    data,
    isPending,
    refetch,
    isError,
    isPaused,
    isRefetching,
    isRefetchError,
  } = useComingSessions(id);

  const router = useRouter();
  if (isError || isPaused || isRefetchError) {
    return <ErrorComponent refetch={refetch} />;
  }
  if (isPending) {
    return <Loading />;
  }
  console.log(data?.length);

  return (
    <FlatList
      data={data}
      onRefresh={refetch}
      refreshing={isRefetching}
      ListHeaderComponent={() => (
        <MyText
          text="Appointments"
          style={{
            fontSize: 20,
            color: 'black',
            fontFamily: 'PoppinsBold',
          }}
        />
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

        gap: 20,
      }}
      style={{ backgroundColor: 'transparent' }}
      ListEmptyComponent={() => <ListEmptyComponent />}
    />
  );
};

const styles = StyleSheet.create({});
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
    <VStack bg={colors.textGreen} p={20} w={'100%'} borderRadius={10}>
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
            })}
          >
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
        alignItems="center"
      >
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
          ]}
        >
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
  const { width } = useWindowDimensions();
  return (
    <VStack bg={colors.textGreen} p={20} w={'100%'} borderRadius={10}>
      <HStack alignItems="center" gap={10} mb={20}>
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
          <Pressable>
            <HStack
              gap={5}
              alignItems="center"
              padding={10}
              borderRadius={10}
              bg={colors.textGreen2}
              mt={10}
            >
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
