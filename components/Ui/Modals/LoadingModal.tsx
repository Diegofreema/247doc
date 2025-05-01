import { colors } from '@/constants/Colors';
import { View, Modal } from 'react-native';

import { ActivityIndicator } from 'react-native-paper';

export const LoadingComponent = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <Modal visible={isLoading} style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'transparent',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            width: 100,
            height: 100,
            borderRadius: 10,
          }}>
          <ActivityIndicator color={colors.textGreen} size="large" />
        </View>
      </View>
    </Modal>
  );
};
