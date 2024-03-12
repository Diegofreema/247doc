import { colors } from '@/constants/Colors';
import { VStack } from '@gluestack-ui/themed';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  text: string;
  subText?: string;
};

export const BoldHeader = ({ text, subText }: Props): JSX.Element => {
  return (
    <VStack gap={10}>
      <Text style={{ fontFamily: 'PoppinsBold', fontSize: 23 }}> {text}</Text>
      {subText && (
        <Text
          style={{
            fontFamily: 'Poppins',
            fontSize: 12,
            color: colors.textLight,
          }}
        >
          {' '}
          {subText}
        </Text>
      )}
    </VStack>
  );
};

const styles = StyleSheet.create({});
