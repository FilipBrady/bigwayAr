import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import PoiStar from '../../assets/poi-star.svg';
import ArrowRight from '../../assets/arrow-right.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { PointOfInterest } from '../data/poiData';

type RecommendedPoiBoxProps = {
  Poi: PointOfInterest;
};
const PoiThumbnail = ({ Poi }: RecommendedPoiBoxProps) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={styles.recomendedPoiContainer}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate('AboutPoi', {
          PoiId: Poi.id,
        })
      }
    >
      <Image
        source={require('../../assets/images/poi-place-image.jpeg')}
        style={styles.recomendedPoiImage}
      />
      <View
        style={{
          padding: 10,
          paddingBottom: 0,
          width: '70%',
          justifyContent: 'space-between',
        }}
      >
        <Text style={styles.poiTitle}>{Poi.poiTitle}</Text>
        <View style={styles.bottomRow}>
          <View style={styles.starContainer}>
            <PoiStar width={13} />
            <Text style={styles.points}>{Poi.poiPoints} bodov</Text>
          </View>
          <ArrowRight width={17} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  recomendedPoiContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 93,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 6,
    shadowColor: '#000000',
    shadowOffset: {
      width: 10,
      height: 10, // Define this value
    },
    shadowOpacity: 0.15, // Adjust as needed
    shadowRadius: 10, // Adjust as needed
    marginBottom: 15, // Adjust as needed
    marginHorizontal: 21,
  },
  recomendedPoiImage: {
    // width: 93,
    // height: 93,
    width: '30%',
    height: '100%',
    borderRadius: 10,
  },
  poiTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#124B92',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  points: {
    fontSize: 12,
    fontWeight: '400',
    color: '#797979',
  },
});

export default PoiThumbnail;
