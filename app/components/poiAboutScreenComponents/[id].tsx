import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation, useRoute } from '@react-navigation/native';
import PoiAboutHeader from './PoiAboutHeader';

const PoiAboutScreenComponent = () => {
  const route = useRoute();
  console.log(route.params);

  return (
    <View>
      <PoiAboutHeader />
    </View>
  );
};

export default PoiAboutScreenComponent;
