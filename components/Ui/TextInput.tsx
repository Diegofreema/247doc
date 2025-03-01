import { colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { HStack } from '@gluestack-ui/themed';
import {
  StyleProp,
  StyleSheet,
  TextInput as TextInputComponent,
  TextInputProps,
  TextStyle,
} from 'react-native';

interface Props extends TextInputProps {
  style?: StyleProp<TextStyle>;
  password?: boolean;
  setSecured?: (secured: boolean) => void;
  secured?: boolean;
}

export const TextInput = (props: Props): JSX.Element => {
  const { password, setSecured, secured } = props;
  const toggleSecure = () => {
    if (!setSecured) return;
    setSecured(!secured);
  };
  return (
    <HStack style={[styles.input, props.style]} alignItems="center" justifyContent="space-between">
      <TextInputComponent
        {...props}
        style={{ fontFamily: 'Poppins', color: 'black', flex: 1 }}
        placeholderTextColor={colors.textLight}
      />
      {password && (
        <Ionicons
          name={secured ? 'eye-off-outline' : 'eye-outline'}
          onPress={toggleSecure}
          size={20}
          color="black"
        />
      )}
    </HStack>
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
