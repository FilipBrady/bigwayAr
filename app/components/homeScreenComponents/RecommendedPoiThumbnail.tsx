import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import PoiStar from '../../../assets/poi-star.svg';
import ArrowRight from '../../../assets/arrow-right.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { PointOfInterest } from '../../data/poiData';
import { GlobalStyles } from '../../styles/GlobalStyles';

type RecommendedPoiThumbnailProps = {
  Poi: PointOfInterest;
};
const RecommendedPoiThumbnail = ({ Poi }: RecommendedPoiThumbnailProps) => {
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
        source={require('../../../assets/images/poi-place-image.jpeg')}
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
        <Text style={GlobalStyles.SmallTextBlueBold}>{Poi.poiTitle}</Text>
        <View style={styles.bottomRow}>
          <View style={styles.starContainer}>
            <PoiStar width={13} />
            <Text style={GlobalStyles.ExtraSmallTextGrayRegulat}>
              {Poi.poiPoints} bodov
            </Text>
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
    elevation: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 10, 
    },
    shadowOpacity: 0.15, 
    shadowRadius: 10, 
    marginBottom: 15, 
    marginHorizontal: 21,
  },
  recomendedPoiImage: {

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

export default RecommendedPoiThumbnail;
