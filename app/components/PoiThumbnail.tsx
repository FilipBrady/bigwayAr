import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import PoiStar from '../../assets/poi-star.svg';
import ArrowRight from '../../assets/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';
import { PointOfInterest } from '../data/poiData';
import { GlobalStyles } from '../styles/GlobalStyles';
import FavoriteBtn from './FavoriteBtn';

type RecommendedPoiBoxProps = {
  Poi: PointOfInterest;
};
const PoiThumbnail = ({ Poi }: RecommendedPoiBoxProps) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.recomendedPoiContainer}>
      <View style={{ width: '30%', height: '100%', borderRadius: 10 }}>
        <FavoriteBtn Poi={Poi} width={23} height={19} color='white' />
        <Image
          source={require('../../assets/images/poi-place-image.jpeg')}
          style={styles.recomendedPoiImage}
        />
      </View>
      <Pressable
        onPress={() =>
          navigation.navigate('AboutPoi', {
            PoiId: Poi.id,
          })
        }
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
            padding: 10,
            paddingBottom: 0,
            width: '70%',
            justifyContent: 'space-between',
          },
        ]}
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
      </Pressable>
    </View>
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
    width: '100%',
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
