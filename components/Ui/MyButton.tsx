import { colors } from '@/constants/Colors';
import { Button } from '@gluestack-ui/themed';
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';

type Props = {
  text: string;
  onPress: () => void;
  textStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
};

export const MyButton = ({
  text,
  textStyle,
  onPress,
  style,
}: Props): JSX.Element => {
  return (
    <Button
      onPress={onPress}
      style={[
        { height: 50, borderRadius: 10, backgroundColor: colors.textGreen },
        style,
      ]}
    >
      <Text style={[{ fontFamily: 'Poppins', color: 'white' }, textStyle]}>
        {text}
      </Text>
    </Button>
  );
};

const styles = StyleSheet.create({});
