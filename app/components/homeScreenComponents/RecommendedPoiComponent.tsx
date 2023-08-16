import { View, Text, Dimensions } from 'react-native';
import React, { useState } from 'react';
import RecommendedPoiBox from './RecommendedPoiBox';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { PointOfInterest, poiData } from '../../data/poiData';

const RecommendedPoiComponent = () => {
  const [recommendedPoi, setRecommendedPoi] = useState([
    { id: 1, poiTitle: 'Place 1', poiPoints: 50 },
    { id: 2, poiTitle: 'Place 2', poiPoints: 10 },
    { id: 3, poiTitle: 'Place 3', poiPoints: 60 },
    { id: 4, poiTitle: 'Place 4', poiPoints: 40 },
    { id: 5, poiTitle: 'Place 5', poiPoints: 501 },
    { id: 6, poiTitle: 'Place 6', poiPoints: 520 },
    { id: 7, poiTitle: 'Place 7', poiPoints: 20 },
    { id: 8, poiTitle: 'Place 8', poiPoints: 50 },
  ]);
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
