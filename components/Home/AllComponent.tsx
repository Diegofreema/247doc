import { FlatList, useWindowDimensions, View } from 'react-native';
import { EmptyText } from '../Ui/EmptyText';
import { DoctorCard } from './BottomComponent';
import { Doctors } from '@/types';

type Props = {
  data: Doctors[];
};

export const AllComponent = ({ data }: Props): JSX.Element => {
  const { width } = useWindowDimensions();
  const isIPad = width > 500;
  return (
    <FlatList
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingBottom: 20,
      }}
      data={data}
      renderItem={({ item }) => <DoctorCard item={item} />}
      ListEmptyComponent={() => (
        <EmptyText text="We currently do not have availability on your selected date" />
      )}
      keyExtractor={(item, index) => index?.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      columnWrapperStyle={isIPad ? { gap: 20 } : null}
      numColumns={isIPad ? 2 : 1}
    />
  );
};
