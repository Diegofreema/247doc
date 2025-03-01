import { StyleProp, Text, TextStyle } from 'react-native';

type Props = {
  text: string | number;
  style?: StyleProp<TextStyle>;
};

export const MyText = ({ text, style }: Props) => {
  return <Text style={style}>{text}</Text>;
};
