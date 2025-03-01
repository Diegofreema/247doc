import { colors } from '@/constants/Colors';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

export const Loading = (): JSX.Element => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <ActivityIndicator size="large" color={colors.textGreen} />
    </View>
  );
};
