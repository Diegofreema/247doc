import { colors } from '@/constants/Colors';
import { useAuth } from '@/lib/zustand/auth';
import { FontAwesome } from '@expo/vector-icons';
import { router } from 'expo-router';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Button, Divider, Menu } from 'react-native-paper';

type Props = {
  visible: boolean;
  closeMenu: () => void;
  openMenu: () => void;
  onOpen: () => void;
};

export const MenuComponent = ({
  closeMenu,
  openMenu,
  visible,
  onOpen,
}: Props): JSX.Element => {
  const { clearId } = useAuth();
  const logOut = () => {
    closeMenu();
    clearId();
    router.replace('/');
  };
  const deleteFn = () => {
    closeMenu();
    onOpen();
  };
  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      elevation={5}
      contentStyle={{ backgroundColor: 'white' }}
      anchor={
        <Pressable
          onPress={openMenu}
          style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
        >
          <FontAwesome name="user-o" size={24} color={colors.textGreen} />
        </Pressable>
      }
    >
      <Menu.Item
        onPress={logOut}
        titleStyle={{
          color: colors.textGreen,
          fontFamily: 'PoppinsBold',
          fontSize: 12,
        }}
        title="Log out"
      />
      <Divider />
      <Menu.Item
        onPress={deleteFn}
        titleStyle={{ color: 'red', fontFamily: 'PoppinsBold', fontSize: 12 }}
        title="Delete account"
      />
    </Menu>
  );
};

const styles = StyleSheet.create({});
