import { StyleSheet, View, Text } from 'react-native';
import { SeeAll } from './SeeAll';
import {
  FontAwesome6,
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { HStack, VStack } from '@gluestack-ui/themed';
import { MyText } from '../Ui/MyText';
import { colors } from '@/constants/Colors';

type Props = {};
const docs = [
  {
    text: 'Doctor',
    Icon: <Fontisto name="doctor" size={24} color="black" />,
  },
  {
    text: 'Mental Health Specialist',
    Icon: <MaterialCommunityIcons name="doctor" size={24} color="black" />,
  },
  {
    text: 'Natural Health Therapist',
    Icon: <FontAwesome6 name="user-doctor" size={24} color="black" />,
  },
  {
    text: 'Pharmacist',
    Icon: <MaterialIcons name="local-pharmacy" size={24} color="black" />,
  },
];
export const Category = ({}: Props): JSX.Element => {
  return (
    <View>
      <View>
        <SeeAll onPress={() => {}} text="Medical Practitioner Category" />
      </View>
      <HStack justifyContent="space-between" gap={5} mt={10}>
        {docs.map(({ Icon, text }, index) => (
          <VStack
            key={index}
            width={'23%'}
            justifyContent="center"
            alignItems="center"
            bg={colors.bgGray}
            borderRadius={6}
            p={5}
            gap={3}
          >
            {Icon}
            <MyText
              text={text}
              style={{
                textAlign: 'center',
                fontSize: 10,
                fontFamily: 'PoppinsBold',
              }}
            />
          </VStack>
        ))}
      </HStack>
    </View>
  );
};

const styles = StyleSheet.create({});
