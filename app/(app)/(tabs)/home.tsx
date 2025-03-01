import { FlatList, Pressable, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';

import { View } from '@/components/Themed';
import { BoldHeader } from '@/components/Ui/BoldHeader';
import { HStack, VStack } from '@gluestack-ui/themed';
import { AppointmentCard } from '@/components/Home/AppointmentCard';
import { CategoryList } from '@/components/Home/Category';
import { useGetAll, useGetCategories, useGetSpecialists } from '@/lib/tanstack/queries';
import { ErrorComponent } from '@/components/Ui/Error';
import { Loading } from '@/components/Ui/Loading';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '@/constants/Colors';
import { Subcategory } from '@/types';
import { MyText } from '@/components/Ui/MyText';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { BottomComponent } from '@/components/Home/BottomComponent';
import { useShowBottom } from '@/lib/zustand/showBottom';
import { MenuComponent } from '@/components/Home/Menu';
import { DeleteModal } from '@/components/Ui/Modals/deleteModal';
import { useDeleteProfile } from '@/lib/tanstack/mutation';
import { AllComponent } from '@/components/Home/AllComponent';

export default function TabOneScreen() {
  const [category, setCategory] = useState('All');
  const [subCat, setSubCat] = useState('');
  const [visible, setVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { mutate, isPending: isPendingDelete } = useDeleteProfile();
  const { onOpen } = useShowBottom();
  const { data, isPending, refetch, isError, isPaused } = useGetCategories();
  const {
    data: dataSpecialists,
    isPending: isPendingSpecialists,
    refetch: refetchSpecialists,
    isError: isErrorSpecialists,
    isPaused: isPausedSpecialists,
  } = useGetSpecialists(category);
  const {
    data: dataAll,
    isPending: isPendingAll,
    refetch: refetchAll,
    isError: isErrorAll,
    isPaused: isPausedAll,
  } = useGetAll();
  const { width } = useWindowDimensions();
  const handleRefetch = () => {
    refetch();
    refetchSpecialists();
    refetchAll();
  };
  if (
    isError ||
    isErrorSpecialists ||
    isPaused ||
    isPausedSpecialists ||
    isErrorAll ||
    isPausedAll
  ) {
    return <ErrorComponent refetch={handleRefetch} />;
  }
  if (isPending || isPendingAll) {
    return <Loading />;
  }

  const onSelect = (item: string) => {
    console.log('🚀 ~ onSelect ~ item:', item);

    if (item === 'All') {
      setCategory('All');
    } else {
      setCategory(item);
    }
  };
  const onSubSelect = (item: string) => {
    onOpen();
    setSubCat(item);
  };

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };
  const onCloseModal = () => {
    setIsVisible(false);
  };
  const onDelete = () => {
    mutate();
  };

  const onOpeDeleteModal = () => {
    setIsVisible(true);
  };
  console.log({ width });

  const isIPad = width > 800;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <DeleteModal
        isVisible={isVisible}
        onPress={onCloseModal}
        onDelete={onDelete}
        isPending={isPendingDelete}
      />
      <VStack mx="auto" width={isIPad ? '80%' : '100%'}>
        <VStack px={20}>
          <VStack mt={20} gap={10}>
            <HStack justifyContent="space-between">
              <BoldHeader text="247Doc" />

              <MenuComponent
                visible={visible}
                closeMenu={closeMenu}
                openMenu={openMenu}
                onOpen={onOpeDeleteModal}
              />
            </HStack>
          </VStack>
        </VStack>
        <View
          style={{
            marginTop: 20,
            marginLeft: 20,
            backgroundColor: 'transparent',
          }}>
          <AppointmentCard />
        </View>

        <View style={styles.cat}>
          <CategoryList cat={category} categories={data} onPress={onSelect} />
        </View>
        <View style={styles.cat}>
          {category === 'All' && <AllComponent data={dataAll} />}
          {isPendingSpecialists ? (
            <VStack justifyContent="center" alignItems="center">
              <ActivityIndicator color={colors.textGreen} />
            </VStack>
          ) : (
            <SubCat subCategory={dataSpecialists} onPress={onSubSelect} category={category} />
          )}
        </View>
        <BottomComponent cat={subCat} />
      </VStack>
    </ScrollView>
  );
}

const SubCat = ({
  subCategory,
  onPress,
  category,
}: {
  subCategory: Subcategory[];
  onPress: (item: string) => void;
  category: string;
}) => {
  const { width } = useWindowDimensions();
  const isIPad = width > 500;
  return (
    <FlatList
      scrollEnabled={false}
      data={subCategory}
      renderItem={({ item, index }) => (
        <Animated.View
          entering={SlideInLeft.delay(index * 100)}
          style={{ flex: 1, maxWidth: isIPad ? '48%' : 'auto' }}>
          <Pressable
            onPress={() => onPress(item.subcategory)}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? colors.textGreen : colors.textGray,
                padding: 10,
                borderRadius: 6,
              },
            ]}>
            <MyText text={item.subcategory} style={{ fontFamily: 'PoppinsBold' }} />
          </Pressable>
        </Animated.View>
      )}
      keyExtractor={(item, index) => index?.toString()}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      contentContainerStyle={{ paddingBottom: 20, gap: 10 }}
      columnWrapperStyle={isIPad ? { gap: 20 } : null}
      numColumns={isIPad ? 2 : 1}
      ListEmptyComponent={() =>
        category !== 'All' && (
          <MyText
            text="No doctors available for this category"
            style={{ fontFamily: 'PoppinsBold', textAlign: 'center' }}
          />
        )
      }
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
