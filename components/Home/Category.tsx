import { StyleSheet, View, ScrollView, Pressable } from 'react-native';
import { SeeAll } from './SeeAll';
import { FontAwesome, Fontisto } from '@expo/vector-icons';
import { HStack, VStack } from '@gluestack-ui/themed';
import { MyText } from '../Ui/MyText';
import { colors } from '@/constants/Colors';
import { Category } from '@/types';

type Props = {};

export const CategoryList = ({
  categories,
  onPress,
  cat,
}: {
  categories: Category[];
  onPress: (text: string) => void;
  cat: string;
}): JSX.Element => {
  return (
    <View>
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <SeeAll onPress={() => {}} text="Medical Practitioner Category" />
          <FontAwesome color="black" name="arrow-right" size={20} />
        </View>
      </View>
      <HStack justifyContent="space-between" gap={5} mt={10}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ gap: 10, flexGrow: 1 }}
        >
          {categories.map(({ categoryname }, index) => (
            <Pressable
              key={index}
              style={{ minWidth: 80 }}
              onPress={() => onPress(categoryname)}
            >
              <VStack
                key={index}
                justifyContent="center"
                alignItems="center"
                bg={cat === categoryname ? colors.textGreen : colors.bgGray}
                borderRadius={6}
                p={5}
                gap={3}
              >
                <Fontisto
                  name="doctor"
                  size={24}
                  color={cat === categoryname ? 'white' : 'black'}
                />
                <MyText
                  text={categoryname}
                  style={{
                    textAlign: 'center',
                    fontSize: 10,
                    fontFamily: 'PoppinsBold',
                    color: cat === categoryname ? 'white' : 'black',
                  }}
                />
              </VStack>
            </Pressable>
          ))}
        </ScrollView>
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({});
