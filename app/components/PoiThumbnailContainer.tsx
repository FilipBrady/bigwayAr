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
    <ScrollView
      style={{
        padding: 20,
        paddingHorizontal: 0,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height - 130,
        transform: [{ translateX: -21 }],
      }}
      showsVerticalScrollIndicator={false}
    >
      {PoiByPoints.map((Poi: PointOfInterest) => (
        <PoiThumbnail Poi={Poi} key={Poi.id} />
      ))}
    </ScrollView>
  );
};

export default PoiThumbnailContainer;
