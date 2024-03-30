import { colors } from '@/constants/Colors';

import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { Button } from 'react-native-paper';

type Props = {
  text: string;
  onPress: () => void;
  loading?: boolean;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export const MyButton = ({
  text,
  textStyle,
  onPress,
  style,
  loading,
}: Props): JSX.Element => {
  return (
    <Button
      loading={loading}
      onPress={onPress}
      rippleColor={colors.textGreen2}
      contentStyle={[
        {
          height: 50,
          borderRadius: 5,
          backgroundColor: colors.textGreen,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      style={{ borderRadius: 5 }}
      textColor="white"
      labelStyle={[{ fontFamily: 'Poppins', color: 'white' }, textStyle]}
    >
      {text}
    </Button>
  );
};

const styles = StyleSheet.create({});
