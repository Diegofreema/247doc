import { colors } from '@/constants/Colors';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { ActivityIndicator } from 'react-native-paper';

export const LoadingComponent = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <View>
      <Modal isVisible={isLoading} style={{ justifyContent: 'center', alignItems: 'center' }}>
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
      </Modal>
    </View>
  );
};
