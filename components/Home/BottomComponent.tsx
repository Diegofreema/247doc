import { useGetSession } from '@/lib/tanstack/queries';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { BottomSheet } from '@rneui/themed';
import { useShowBottom } from '@/lib/zustand/showBottom';
import { EmptyText } from '../Ui/EmptyText';
import { Loading } from '../Ui/Loading';
import { ErrorComponent } from '../Ui/Error';
import { Avatar, Card } from 'react-native-paper';
import { HStack, VStack } from '@gluestack-ui/themed';
import { Doctors } from '@/types';
import { MyText } from '../Ui/MyText';
import { useRouter } from 'expo-router';
import { MyButton } from '../Ui/MyButton';
type Props = {
  cat: string;
};

export const BottomComponent = ({ cat }: Props): JSX.Element => {
  console.log('🚀 ~ TabOneScreen ~ cat:', cat);
  const { data, isPending, refetch, isError, isPaused } = useGetSession(cat);
  console.log('🚀 ~ BottomComponent ~ data:', data);
  const { onClose, open } = useShowBottom();

  return (
    <BottomSheet
      modalProps={{}}
      onBackdropPress={onClose}
      scrollViewProps={{
        showsVerticalScrollIndicator: false,
        scrollEnabled: false,
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
      isVisible={open}
    >
      {isError || (isPaused && <ErrorComponent refetch={refetch} />)}
      {isPending && <Loading />}

      {!isError && !isPaused && !isPending && (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 10,
            paddingBottom: 20,
          }}
          data={data}
          renderItem={({ item }) => <DoctorCard item={item} />}
          ListHeaderComponent={() => (
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
          )}
          ListEmptyComponent={() => (
            <EmptyText text="We currently do not have availability on your selected date" />
          )}
          keyExtractor={(item, index) => index?.toString()}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      )}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({});

const DoctorCard = ({ item }: { item: Doctors }) => {
  const router = useRouter();
  const onPress = () => {
    router.push(`/doctor/${item?.sessionId}`);
  };

  return (
    <Card style={{ paddingVertical: 20, backgroundColor: '#F8F8F8' }}>
      <HStack alignItems="center" px={15} gap={10} mb={10}>
        <Avatar.Image
          source={{
            uri: `https://247pharmacy.net/Uploads/doctor-${item?.doctorid}.jpeg`,
          }}
        />

        <VStack>
          <MyText
            text={item?.Doctor}
            style={{ fontFamily: 'PoppinsBold', fontSize: 18 }}
          />
          <MyText
            text={item?.categoryName}
            style={{ fontFamily: 'PoppinsMedium', fontSize: 12, color: 'gray' }}
          />
        </VStack>
      </HStack>
      <VStack px={15}>
        <MyButton text="View Details" onPress={onPress} />
      </VStack>
    </Card>
  );
};
