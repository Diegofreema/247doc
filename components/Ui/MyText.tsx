import { StyleSheet, View, Text, StyleProp, TextStyle } from 'react-native';

type Props = {
  text: string;
  style?: StyleProp<TextStyle>;
};

export const MyText = ({ text, style }: Props): JSX.Element => {
  return <Text style={style}>{text}</Text>;
};

const styles = StyleSheet.create({});
