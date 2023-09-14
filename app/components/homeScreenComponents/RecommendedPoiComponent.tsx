import { View, Text, Dimensions, Pressable } from 'react-native';
import React, { useState } from 'react';
import RecommendedPoiThumbnail from './RecommendedPoiThumbnail';
import { ScrollView } from 'react-native-gesture-handler';
import { PointOfInterest } from '../../data/poiData';
import { useAppContainer } from '../container/Context';
import { GlobalStyles } from '../../styles/GlobalStyles';
import PoiThumbnail from '../PoiThumbnail';
import { useNavigation } from 'expo-router';

const RecommendedPoiComponent = () => {
  const { poiData } = useAppContainer();
  const navigation = useNavigation<any>();

  return (
    <View style={{ height: '100%' }}>
      <Text
        style={[
          GlobalStyles.BigTextBlueBold,
          { marginBottom: 15, marginTop: 36 },
        ]}
      >
        Odporúčané
      </Text>
      <ScrollView
        style={{
          paddingTop: 10,
          width: Dimensions.get('screen').width,
          height: '100%',
          transform: [{ translateX: -21 }],
        }}
        showsVerticalScrollIndicator={false}
      >
        {poiData.map((Poi: PointOfInterest) => (
          <PoiThumbnail Poi={Poi} key={Poi.id} />
        ))}
        <Pressable onPress={() => navigation.navigate('AllPoiLocations')}>
          <Text
            style={[
              GlobalStyles.ExtraSmallTextGrayRegulat,
              {
                alignSelf: 'center',
                marginVertical: 31,
              },
            ]}
          >
            Zobraziť všetky
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default RecommendedPoiComponent;
