import {
  StyleSheet,
  View,
  Text,
  useWindowDimensions,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';
import { MyText } from '../MyText';
import { MyButton } from '../MyButton';
type Props = {
  onPress: () => void;
  name: string;
  isVisible: boolean;
};

export const ConfirmModal = ({
  isVisible,
  name,
  onPress,
}: Props): JSX.Element => {
  const { width } = useWindowDimensions();
  const finalWidth = width - 100;
  return (
    <View>
      <Modal
        isVisible={isVisible}
        style={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <View
          style={{
            backgroundColor: 'white',
            padding: 40,
            alignItems: 'center',
            gap: 10,
            width: finalWidth,

            borderRadius: 10,
          }}
        >
          <Image
            source={require('../../../assets/images/confirm.png')}
            style={{ width: 60, height: 60 }}
            resizeMode="contain"
          />
          <MyText
            style={{
              fontFamily: 'PoppinsBold',
              fontSize: 18,
              textAlign: 'center',
            }}
            text="Account Created, Please check your email"
          />
          <MyText
            style={{ fontFamily: 'Poppins', fontSize: 13, textAlign: 'center' }}
            text={`We sent a link to verify your email`}
          />
          <MyText
            style={{ fontFamily: 'Poppins', fontSize: 13, textAlign: 'center' }}
            text={`Verify your email before you will be able to login`}
          />

          <MyButton text="Continue" onPress={onPress} style={{ width: 150 }} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});
