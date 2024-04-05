import { HStack, VStack } from '@gluestack-ui/themed';
import { Image } from 'expo-image';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import { MyText } from '../Ui/MyText';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../constants/Colors';
import { useState } from 'react';
import { SeeAll } from './SeeAll';
import { useRouter } from 'expo-router';
import { useComingSessions } from '@/lib/tanstack/queries';
import { useAuth } from '@/lib/zustand/auth';
import { ErrorComponent } from '../Ui/Error';
import { Loading } from '../Ui/Loading';
import { UpComingSessions } from '@/types';
import { format } from 'date-fns';
import * as Linking from 'expo-linking';
type Props = {};

export const AppointmentCard = ({}: Props): JSX.Element => {
  const { id } = useAuth();
  const { data, isPending, refetch, isError, isPaused, isFetching } =
    useComingSessions(id);
  console.log('🚀 ~ AppointmentCard ~ isFetching:', isFetching);
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  const router = useRouter();
  if (isError || isPaused) {
    return <ErrorComponent refetch={refetch} />;
  }
  if (isPending) {
    return <Loading />;
  }
  console.log(data?.length, 'id', id);
  console.log(data);

  return (
    <>
      <View style={{ paddingRight: 20 }}>
        <SeeAll
          text="Appointments"
          onPress={() => router.push('/(app)/(tabs)/two')}
          subText="See all"
        />
      </View>
      <FlatList
        data={data.slice(0, 3)}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={({ item }) => <AppointmentCardsItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        contentContainerStyle={{
          paddingVertical: 20,
          paddingRight: 10,
          backgroundColor: 'transparent',
        }}
        style={{ backgroundColor: 'transparent' }}
        onViewableItemsChanged={({ changed, viewableItems }) => {
          if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
          }
        }}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70,
        }}
        ListEmptyComponent={() => <ListEmptyComponent />}
      />
      {data?.length > 0 && (
        <HStack justifyContent="center" gap={5} mt={10}>
          {data?.splice(0, 3).map((_, index) => {
            return (
              <View
                style={{
                  width: currentIndex === index ? 20 : 10,
                  backgroundColor:
                    currentIndex === index ? colors.textGreen : colors.textGray,
                  height: 10,
                  borderRadius: 5,
                }}
                key={index}
              />
            );
          })}
        </HStack>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

const AppointmentCardsItem = ({ item }: { item: UpComingSessions }) => {
  const { width } = useWindowDimensions();

  const onPress = () => {
    Linking.openURL(item?.meetingLink);
  };
  return (
    <VStack bg={colors.textGreen} p={20} w={width * 0.9} borderRadius={10}>
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
          <MyText
            text={item?.doctorPhone}
            style={{
              fontSize: 11,
              color: 'white',
              fontFamily: 'Poppins',
            }}
          />
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
    <VStack bg={colors.textGreen} p={20} w={width - 35} borderRadius={10}>
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
          source={require('../../assets/images/empty.png')}
          style={{ width: 100, height: 100 }}
          contentFit="contain"
        />
      </HStack>
    </VStack>
  );
};
