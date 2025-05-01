import { useWindowDimensions, View, Modal } from 'react-native';

import { MyText } from '../MyText';
import { MyButton } from '../MyButton';
import { HStack } from '@gluestack-ui/themed';

type Props = {
  onPress: () => void;
  isPending: boolean;
  isVisible: boolean;
  onDelete: () => void;
};

export const DeleteModal = ({ isVisible, isPending, onPress, onDelete }: Props): JSX.Element => {
  const { width } = useWindowDimensions();

  const finalWidth = width - 100;
  return (
    <Modal visible={isVisible} style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
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
            padding: 40,
            alignItems: 'center',
            gap: 10,
            width: finalWidth,
            height: finalWidth,
            borderRadius: 10,
          }}>
          <MyText
            style={{
              fontFamily: 'PoppinsMedium',
              fontSize: 18,
              color: 'red',
              textAlign: 'center',
            }}
            text="This process can't be undone"
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
      </View>
    </Modal>
  );
};
