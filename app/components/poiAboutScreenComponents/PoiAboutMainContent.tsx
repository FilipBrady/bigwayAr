import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { PointOfInterest } from '../../data/poiData';

type PoiPlaceProps = {
  poiPlace: PointOfInterest;
};

const PoiAboutMainContent = ({ poiPlace }: PoiPlaceProps) => {
  return (
    <View>
      <Text style={styles.poiDescriptionText}>{poiPlace.poiDescription}</Text>
      <Text style={styles.poiDescriptionText}>{poiPlace.poiDescription}</Text>
      <Text style={styles.poiDescriptionText}>{poiPlace.poiDescription}</Text>
      <Text style={styles.poiDescriptionText}>{poiPlace.poiDescription}</Text>
    </View>
  );
};

export default PoiAboutMainContent;
const styles = StyleSheet.create({
  poiDescriptionText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#000000',
    paddingHorizontal: 21,
    marginTop: 30,
  },
});
