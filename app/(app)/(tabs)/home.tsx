import { FlatList, Pressable, ScrollView, StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { BoldHeader } from '@/components/Ui/BoldHeader';
import { HStack, SearchIcon, VStack } from '@gluestack-ui/themed';
import { TextInput } from '@/components/Ui/TextInput';
import { AppointmentCard } from '@/components/Home/AppointmentCard';
import { CategoryList } from '@/components/Home/Category';
import { Doctors } from '@/components/Home/Doctors';
import { useGetCategories, useGetSpecialists } from '@/lib/tanstack/queries';
import { ErrorComponent } from '@/components/Ui/Error';
import { Loading } from '@/components/Ui/Loading';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '@/constants/Colors';
import { Subcategory } from '@/types';
import { MyText } from '@/components/Ui/MyText';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { useAuth } from '@/lib/zustand/auth';
import { BottomComponent } from '@/components/Home/BottomComponent';
import { useShowBottom } from '@/lib/zustand/showBottom';

export default function TabOneScreen() {
  const [category, setCategory] = useState('All');
  const [subCat, setSubCat] = useState('');

  const { id } = useAuth();
  console.log(id);
  const { onOpen } = useShowBottom();
  const { data, isPending, refetch, isError, isPaused } = useGetCategories();
  const {
    data: dataSpecialists,
    isPending: isPendingSpecialists,
    refetch: refetchSpecialists,
    isError: isErrorSpecialists,
    isPaused: isPausedSpecialists,
  } = useGetSpecialists(category);
  const handleRefetch = () => {
    refetch();
    refetchSpecialists();
  };
  if (isError || isErrorSpecialists || isPaused || isPausedSpecialists) {
    return <ErrorComponent refetch={handleRefetch} />;
  }
  if (isPending) {
    return <Loading />;
  }

  const onPress = () => {};
  const onSelect = (item: string) => {
    setCategory(item);
  };
  const onSubSelect = (item: string) => {
    onOpen();
    setSubCat(item);
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <VStack px={20}>
        <VStack mt={20} gap={10}>
          <BoldHeader text="247Doc" />

          {/* <Pressable
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
          </Pressable> */}
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
        <CategoryList cat={category} categories={data} onPress={onSelect} />
      </View>
      <View style={styles.cat}>
        {isPendingSpecialists ? (
          <VStack justifyContent="center" alignItems="center">
            <ActivityIndicator color={colors.textGreen} />
          </VStack>
        ) : (
          <SubCat subCategory={dataSpecialists} onPress={onSubSelect} />
        )}
      </View>
      <BottomComponent cat={subCat} />
    </ScrollView>
  );
}

const SubCat = ({
  subCategory,
  onPress,
}: {
  subCategory: Subcategory[];
  onPress: (item: string) => void;
}) => {
  return (
    <FlatList
      scrollEnabled={false}
      data={subCategory}
      renderItem={({ item, index }) => (
        <Animated.View entering={SlideInLeft.delay(index * 100)}>
          <Pressable
            onPress={() => onPress(item.subcategory)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.textGreen : colors.textGray,
                padding: 10,
                borderRadius: 6,
              },
            ]}
          >
            <MyText
              text={item.subcategory}
              style={{ fontFamily: 'PoppinsBold' }}
            />
          </Pressable>
        </Animated.View>
      )}
      keyExtractor={(item, index) => index?.toString()}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
      ListEmptyComponent={() => (
        <MyText
          text="No doctors available for this category"
          style={{ fontFamily: 'PoppinsBold', textAlign: 'center' }}
        />
      )}
    />
  );
};

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
