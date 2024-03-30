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

type Props = {};

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const threeItems = array.slice(0, 3);
export const AppointmentCard = ({}: Props): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  console.log('🚀 ~ AppointmentCard ~ currentIndex:', currentIndex);

  return (
    <>
      <View style={{ paddingRight: 20 }}>
        <SeeAll
          text="Appointments"
          onPress={() => {}}
          counter={array.length}
          subText="See all"
        />
      </View>
      <FlatList
        data={threeItems}
        keyExtractor={(item, index) => index?.toString()}
        renderItem={({ item }) => <AppointmentCardsItem />}
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
      {threeItems.length > 0 && (
        <HStack justifyContent="center" gap={5} mt={10}>
          {threeItems.map((_, index) => {
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

const AppointmentCardsItem = () => {
  const { width } = useWindowDimensions();
  const itemWidth = width * 0.8;
  return (
    <VStack bg={colors.textGreen} p={20} w={itemWidth} borderRadius={10}>
      <HStack alignItems="center" gap={10} mb={20}>
        <Image
          source={require('../../assets/images/doc.png')}
          style={{ width: 50, height: 50 }}
          contentFit="contain"
        />
        <VStack>
          <MyText
            text="Dr. Julia Chang"
            style={{ fontSize: 18, color: 'white', fontFamily: 'PoppinsBold' }}
          />
          <MyText
            text="General Practitioner"
            style={{
              fontSize: 13,
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
            text="16th July, 2024"
            style={{ fontSize: 10, color: 'white', fontFamily: 'Poppins' }}
          />
        </HStack>
        <HStack gap={5} alignItems="center">
          <FontAwesome name="clock-o" color="white" size={13} />
          <MyText
            text="10:30 AM - 11:30 AM"
            style={{ fontSize: 10, color: 'white', fontFamily: 'Poppins' }}
          />
        </HStack>
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
