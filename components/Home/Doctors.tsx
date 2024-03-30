import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SeeAll } from './SeeAll';
import { HStack } from '@gluestack-ui/themed';
import { colors } from '@/constants/Colors';
import { Image } from 'expo-image';
import { VStack } from '@gluestack-ui/themed';
import { MyText } from '../Ui/MyText';

type Props = {};
const data = [3, 3, 4, 4, 5, 46, , 7, 5, 56, 767, 86, 6, 8];
export const Doctors = ({}: Props): JSX.Element => {
  return (
    <View>
      <SeeAll onPress={() => {}} text="Doctors" subText="See all" />
      <FlatList
        style={{ marginTop: 10 }}
        data={data}
        renderItem={({ item }) => <View />}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <Doctor />}
        keyExtractor={(item, index) => index?.toString()}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

const Doctor = () => {
  return (
    <HStack
      alignItems="center"
      gap={10}
      mb={20}
      bg={colors.bgGray}
      p={10}
      borderRadius={6}
    >
      <Image
        source={require('../../assets/images/doc.png')}
        style={{ width: 50, height: 50 }}
        contentFit="contain"
      />
      <VStack>
        <MyText
          text="Dr. Julia Chang"
          style={{ fontSize: 18, color: 'black', fontFamily: 'PoppinsBold' }}
        />
        <MyText
          text="General Practitioner"
          style={{
            fontSize: 13,
            color: 'black',
            fontFamily: 'Poppins',
          }}
        />
      </VStack>
    </HStack>
  );
};
