import { View, Text } from 'react-native';
import React, { SetStateAction } from 'react';
type PoiFilterProps = {
  setFilterByPoints: React.Dispatch<
    SetStateAction<{ from: number; to: number }>
  >;
};

const PoiFilterComponent = ({ setFilterByPoints }: PoiFilterProps) => {
  return (
    <View>
      <Text>Points</Text>
      <Text onPress={() => setFilterByPoints({ from: 0, to: 40 })}>do 40</Text>
      <Text onPress={() => setFilterByPoints({ from: 40, to: 50 })}>do 50</Text>
      <Text onPress={() => setFilterByPoints({ from: 50, to: 70 })}>do 70</Text>
      <Text onPress={() => setFilterByPoints({ from: 70, to: 10000 })}>
        nad 70
      </Text>
      <Text onPress={() => setFilterByPoints({ from: 0, to: 10000 })}>
        Všetky
      </Text>
    </View>
  );
};

export default PoiFilterComponent;
