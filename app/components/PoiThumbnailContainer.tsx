import { View, Text, Dimensions } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { PointOfInterest, PointsOfInterest } from '../data/poiData';
import PoiThumbnail from './PoiThumbnail';
import { useAppContainer } from './container/Context';

type PoiThumbnailProps = {
  PoiByPoints: PointsOfInterest;
};

const PoiThumbnailContainer = ({ PoiByPoints }: PoiThumbnailProps) => {
  return (
    <View style={{ height: '100%' }}>
      <ScrollView
        style={{
          padding: 20,
          paddingHorizontal: 0,
          width: Dimensions.get('screen').width,
          height: '100%',
          transform: [{ translateX: -21 }],
        }}
        showsVerticalScrollIndicator={false}
      >
        {PoiByPoints.map((Poi: PointOfInterest) => (
          <PoiThumbnail Poi={Poi} key={Poi.id} />
        ))}
        {PoiByPoints.map((Poi: PointOfInterest) => (
          <PoiThumbnail Poi={Poi} key={Poi.id} />
        ))}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default PoiThumbnailContainer;
