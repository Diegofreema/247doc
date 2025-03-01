import { Text, View } from 'react-native';

import { useState } from 'react';

import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';
import { MyButton } from './MyButton';

type Props = {
  refetch: any;
};

export const ErrorComponent = ({ refetch }: Props): JSX.Element => {
  const [_, setRetry] = useState(false);

  const handleRetry = () => {
    refetch();
    setRetry((prev) => !prev);
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        width: '100%',
      }}>
      <Animated.View
        entering={ZoomIn.duration(500)}
        exiting={ZoomOut}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          width: '100%',
          gap: 10,
        }}>
        <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>
          Something went wrong
        </Text>
        <View style={{ backgroundColor: 'white', width: '60%' }}>
          <MyButton text="Retry" onPress={handleRetry} />
        </View>
      </Animated.View>
    </View>
  );
};
