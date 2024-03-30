import { Pressable, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { Link } from 'expo-router';
import { NavHeader } from '@/components/Ui/NavHeader';
import { Container } from '@/components/Ui/Container';
import { BoldHeader } from '@/components/Ui/BoldHeader';
import { HStack, SearchIcon, VStack } from '@gluestack-ui/themed';
import { TextInput } from '@/components/Ui/TextInput';
import { AppointmentCard } from '@/components/Home/AppointmentCard';
import { Category } from '@/components/Home/Category';
import { Doctors } from '@/components/Home/Doctors';

export default function TabOneScreen() {
  const onPress = () => {};
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <VStack px={20}>
        <VStack mt={20} gap={10}>
          <BoldHeader text="Diego" />

          <Pressable
            onPress={onPress}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <HStack
              gap={5}
              alignItems="center"
              px={17}
              borderRadius={10}
              backgroundColor="#F8F8F8"
            >
              <SearchIcon size={'xl'} />
              <TextInput
                placeholder="Search"
                style={{ flex: 1, borderWidth: 0, paddingLeft: 0 }}
                editable={false}
              />
            </HStack>
          </Pressable>
        </VStack>
      </VStack>
      <View
        style={{
          marginTop: 20,
          marginLeft: 20,
          backgroundColor: 'transparent',
        }}
      >
        <AppointmentCard />
      </View>

      <View style={styles.cat}>
        <Category />
      </View>
      <View style={styles.cat}>
        <Doctors />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  cat: {
    backgroundColor: 'transparent',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
