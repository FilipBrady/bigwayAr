import { View, Text, Dimensions } from 'react-native';
import React, { useState } from 'react';
import RecommendedPoiBox from './RecommendedPoiBox';
import { ScrollView } from 'react-native-gesture-handler';
import { PointOfInterest } from '../../data/poiData';
import { useAppContainer } from '../container/Context';

const RecommendedPoiComponent = () => {
  const { poiData } = useAppContainer();
  return (
    <View>
      <Text
        style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#124B92',
          marginBottom: 15,
          marginTop: 36,
        }}
      >
        Odporúčané
      </Text>
      <ScrollView
        style={{
          paddingTop: 20,
          width: Dimensions.get('screen').width,
          height: Dimensions.get('window').height - 190,
          transform: [{ translateX: -21 }],
        }}
        showsVerticalScrollIndicator={false}
      >
        {poiData.map((Poi: PointOfInterest) => (
          <RecommendedPoiBox Poi={Poi} key={Poi.id} />
        ))}
        <Text
          style={{
            fontSize: 12,
            fontWeight: '400',
            color: '#797979',
            alignSelf: 'center',
            marginVertical: 31,
          }}
        >
          Zobraziť všetky
        </Text>
      </ScrollView>
    </View>
  );
};

export default RecommendedPoiComponent;
