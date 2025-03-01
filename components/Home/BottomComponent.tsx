import { useGetSession } from '@/lib/tanstack/queries';
import { FlatList, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import { BottomSheet } from '@rneui/themed';
import { useShowBottom } from '@/lib/zustand/showBottom';
import { EmptyText } from '../Ui/EmptyText';
import { Loading } from '../Ui/Loading';
import { ErrorComponent } from '../Ui/Error';
import { Card } from 'react-native-paper';
import { HStack, View, VStack } from '@gluestack-ui/themed';
import { Doctors } from '@/types';
import { MyText } from '../Ui/MyText';
import { useRouter } from 'expo-router';
import { MyButton } from '../Ui/MyButton';
import { Image } from 'expo-image';

type Props = {
  cat: string;
};

const limitText = (text: string) => {
  if (text?.length > 12) {
    return text.slice(0, 12) + '...';
  }
  return text;
};

export const BottomComponent = ({ cat }: Props): JSX.Element => {
  const { data, isPending, refetch, isError, isPaused } = useGetSession(cat);
  const { width } = useWindowDimensions();
  const isIPad = width > 800;
  const { onClose, open } = useShowBottom();

  return (
    <BottomSheet
      onBackdropPress={onClose}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        scrollEnabled: true,
        style: {
          backgroundColor: 'white',
          padding: 10,
          borderTopRightRadius: 25,
          borderTopLeftRadius: 25,
          height: '60%',
        },
        contentContainerStyle: {
          height: '100%',
        },
      }}
      isVisible={open}>
      {isError || (isPaused && <ErrorComponent refetch={refetch} />)}
      {isPending && <Loading />}

      {!isError && !isPaused && !isPending && (
        // @ts-ignore
        <>
          <Pressable
            onPress={onClose}
            style={{
              height: 7,
              width: 70,
              backgroundColor: '#ECECEC',
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 6,
              marginBottom: 30,
            }}
          />

          <FlatList
            data={data}
            renderItem={({ item }) => <DoctorCard item={item} />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <EmptyText text="We currently do not have availability on your selected date" />
            )}
            keyExtractor={(item, index) => index?.toString()}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            columnWrapperStyle={isIPad ? { gap: 20 } : null}
            numColumns={isIPad ? 2 : 1}
            scrollEnabled={false}
          />
        </>
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

export const DoctorCard = ({ item }: { item: Doctors }) => {
  const router = useRouter();
  const { onClose } = useShowBottom();
  const onPress = () => {
    router.push(`/doctor/${item?.sessionId}`);
    onClose();
  };

  return (
    <Card
      style={{
        paddingVertical: 20,
        backgroundColor: '#F8F8F8',
        marginBottom: 15,
        flex: 1,
      }}>
      <HStack alignItems="center" px={15} gap={10} mb={10}>
        <Image
          source={{
            uri: `https://247pharmacy.net/Uploads/doctor-${item?.doctorid}.jpeg`,
          }}
          style={styles.img}
          contentFit="cover"
        />

        <VStack>
          <MyText text={item?.Doctor} style={{ fontFamily: 'PoppinsBold', fontSize: 14 }} />
          <HStack alignItems="center" gap={10}>
            <MyText
              text={limitText(item?.categoryName)}
              style={{
                fontFamily: 'PoppinsMedium',
                fontSize: 12,
                color: 'gray',
              }}
            />
            <MyText
              text={item?.Startime}
              style={{
                fontFamily: 'PoppinsMedium',
                fontSize: 12,
                color: 'gray',
              }}
            />
          </HStack>
        </VStack>
      </HStack>
      <VStack px={15} width="100%">
        <MyButton text="View Details" onPress={onPress} />
      </VStack>
    </Card>
  );
};
