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
import { HStack } from '@gluestack-ui/themed';
type Props = {
  onPress: () => void;
  isPending: boolean;
  isVisible: boolean;

  onDelete: () => void;
};

export const DeleteModal = ({
  isVisible,
  isPending,
  onPress,
  onDelete,
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
            height: finalWidth,
            borderRadius: 10,
          }}
        >
          <MyText
            style={{
              fontFamily: 'PoppinsBold',
              fontSize: 18,
              color: 'red',
              textAlign: 'center',
            }}
            text="This process can not be undone"
          />
          <MyText
            style={{
              fontFamily: 'PoppinsBold',
              fontSize: 18,
              color: 'black',
              textAlign: 'center',
            }}
            text="Are you sure you want to delete your profile?"
          />

          <HStack gap={10} flex={1}>
            <MyButton text="Cancel" onPress={onPress} style={{ width: 100 }} />
            <MyButton
              loading={isPending}
              text="Delete"
              onPress={onDelete}
              style={{ width: 100, backgroundColor: 'red' }}
            />
          </HStack>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({});
