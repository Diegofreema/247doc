import { HStack } from '@gluestack-ui/themed';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { MyText } from '../Ui/MyText';
import { colors } from '@/constants/Colors';

type Props = {
  text: string;
  onPress: () => void;
  counter?: number;
  subText?: string;
};

export const SeeAll = ({
  onPress,
  text,
  counter,
  subText,
}: Props): JSX.Element => {
  return (
    <HStack alignItems="center" justifyContent="space-between">
      <HStack gap={5} alignItems="center">
        <MyText
          text={text}
          style={{ fontFamily: 'PoppinsBold', fontSize: 15 }}
        />
        {/* {counter && (
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
              text={counter}
              style={{
                color: 'white',
                fontFamily: 'Poppins',
                fontSize: 12,
              }}
            />
          </View>
        )} */}
      </HStack>
      {subText && (
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
          <MyText
            text={subText}
            style={{ color: colors.textGreen, fontFamily: 'PoppinsMedium' }}
          />
        </Pressable>
      )}
    </HStack>
  );
};

const styles = StyleSheet.create({});
