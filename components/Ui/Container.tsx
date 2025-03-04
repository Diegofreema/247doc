import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

type Props = {
  style?: StyleProp<ViewStyle>;
};

export const Container = ({ children, style }: PropsWithChildren<Props>): JSX.Element => {
  return (
    <View collapsable={false} style={[styles.container, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
});
