import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import PoiStar from '../../../assets/poi-star.svg';
import Distance from '../../../assets/distance.svg';
import Navigate from '../../../assets/navigate.svg';
import { PointOfInterest } from '../../data/poiData';
import getDistance from '../../../hooks/getDistance';
import handleNavigationButton from '../../../hooks/handleNavigationBtn';

type PoiPlaceProps = {
  poiPlace: PointOfInterest;
};

const PoiAboutHeader = ({ poiPlace }: PoiPlaceProps) => {
  const distance = getDistance({
    targetLat: poiPlace.poiExactLocation.latitude,
    targetLon: poiPlace.poiExactLocation.longitude,
  });

  return (
    <View>
      <Image
        source={require('../../../assets/images/poi-place-image.jpeg')}
        style={{
          width: '100%',
          height: 219,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      />
      <Text style={styles.poiTitle}>{poiPlace.poiTitle}</Text>
      <View style={styles.infoBox}>
        <View style={styles.infoItem}>
          <PoiStar width={21} height={21} />
          <Text>{poiPlace.poiPoints} bodov</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.infoItem}>
          <Distance width={21} height={21} />
          <Text>{Math.floor(distance)} km</Text>
        </View>
        <View style={styles.divider} />
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() =>
            handleNavigationButton({
              targetLat: poiPlace.poiExactLocation.latitude,
              targetLon: poiPlace.poiExactLocation.longitude,
            })
          }
          style={styles.infoItem}
        >
          <Navigate width={21} height={21} />
          <Text>Navigovať</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PoiAboutHeader;

const styles = StyleSheet.create({
  poiTitle: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    color: '#124B92',
    marginTop: 29,
    marginBottom: 28,
    paddingHorizontal: 21,
  },
  infoBox: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  infoItem: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    gap: 7,
  },
  divider: {
    height: '100%',
    backgroundColor: '#0000001A',
    width: 1,
  },
});
