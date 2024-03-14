import { colors } from '@/constants/Colors';
import { VStack } from '@gluestack-ui/themed';
import { StyleSheet, View, Text, StyleProp, TextStyle } from 'react-native';

type Props = {
  text: string;
  subText?: string;
  style?: StyleProp<TextStyle>;
};

export const BoldHeader = ({ text, subText, style }: Props): JSX.Element => {
  return (
    <VStack gap={10}>
      <Text style={[{ fontFamily: 'PoppinsBold', fontSize: 23 }, style]}>
        {' '}
        {text}
      </Text>
      {subText && (
        <Text
          style={[
            {
              fontFamily: 'Poppins',
              fontSize: 12,
              color: colors.textLight,
            },
            style,
          ]}
        >
          {' '}
          {subText}
        </Text>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({});
