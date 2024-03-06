import { PropsWithChildren } from 'react';
import { StyleSheet, View, Text } from 'react-native';

type Props = {
  children: PropsWithChildren<any>;
};

export const Container = ({ children }: Props): JSX.Element => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});
