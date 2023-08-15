import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import PoiStar from '../../../assets/poi-star.svg';
import ArrowRight from '../../../assets/arrow-right.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Link, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

type RecommendedPoiBoxProps = {
  Poi: {
    id: number;
    poiTitle: string;
    poiPoints: number;
  };
};
const RecommendedPoiBox = ({ Poi }: RecommendedPoiBoxProps) => {
  const router = useRouter();
  const navigation = useNavigation<any>();

  const navigateToPoiAbout = () => {
    navigation.navigate('AboutPoi', { id: Poi.id }); // Navigate with the dynamic ID parameter
  };

  return (
    <TouchableOpacity
      style={styles.recomendedPoiContainer}
      activeOpacity={0.7}
      // onPress={navigateToPoiAbout}
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
      <View style={{ padding: 10, paddingBottom: 0, width: '70%' }}>
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
    elevation: 20,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
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
    marginTop: 8,
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

export default RecommendedPoiBox;
