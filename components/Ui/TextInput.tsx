import { colors } from '@/constants/Colors';
import { Input } from '@gluestack-ui/themed';
import {
  StyleSheet,
  View,
  Text,
  TextInputProps,
  TextInput as TextInputComponent,
  StyleProp,
  TextStyle,
} from 'react-native';

interface Props extends TextInputProps {
  style?: StyleProp<TextStyle>;
}

export const TextInput = (props: Props): JSX.Element => {
  return (
    <TextInputComponent
      {...props}
      placeholderTextColor={colors.textLight}
      style={[styles.input, props.style]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    paddingHorizontal: 15,
    height: 60,
    fontFamily: 'Poppins',
    borderRadius: 8,
  },
});
