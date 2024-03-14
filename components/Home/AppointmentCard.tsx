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

type Props = {};

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const threeItems = array.slice(0, 3);
export const AppointmentCard = ({}: Props): JSX.Element => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(0);
  console.log('🚀 ~ AppointmentCard ~ currentIndex:', currentIndex);
  const onViewableItemsChanged = {};
  return (
    <>
      <View style={{ paddingRight: 20 }}>
        <Header />
      </View>
      <FlatList
        data={threeItems}
        keyExtractor={(item) => item.toString()}
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
      />
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

const Header = () => {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack gap={5} alignItems="center">
        <MyText
          text="Appointments"
          style={{ fontFamily: 'PoppinsBold', fontSize: 15 }}
        />
        <View
          style={{
            width: 20,
            height: 20,
            backgroundColor: 'red',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MyText
            text={`${array.length}`}
            style={{
              color: 'white',
              fontFamily: 'Poppins',
              fontSize: 12,
            }}
          />
        </View>
      </HStack>
      <Pressable
        onPress={() => {}}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      >
        <MyText
          text="See all"
          style={{ color: colors.textGreen, fontFamily: 'PoppinsMedium' }}
        />
      </Pressable>
    </HStack>
  );
};
