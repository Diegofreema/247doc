import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { HStack } from '@gluestack-ui/themed';
import { useRouter } from 'expo-router';
import { StyleSheet, View, Text, Pressable } from 'react-native';

type Props = {};

export const NavHeader = ({}: Props): JSX.Element => {
  const router = useRouter();

  const navigate = () => {
    router.back();
  };
  return (
    <HStack my={10}>
      <Pressable
        onPress={navigate}
        style={({ pressed }) => [
          { opacity: pressed ? 0.5 : 1 },
          { padding: 4 },
        ]}
      >
        <AntDesign name="arrowleft" size={30} color="black" />
      </Pressable>
    </HStack>
  );
};

const styles = StyleSheet.create({});
