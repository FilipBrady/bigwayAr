import { View, Text, Dimensions } from 'react-native';
import React, { useState } from 'react';
import RecommendedPoiBox from './RecommendedPoiBox';
import { ScrollView } from 'react-native-gesture-handler';
import { PointOfInterest } from '../../data/poiData';
import { useAppContainer } from '../container/Context';
import { GlobalStyles } from '../../styles/GlobalStyles';

const RecommendedPoiComponent = () => {
  const { poiData } = useAppContainer();
  return (
    <View>
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
          height: Dimensions.get('window').height - 190,
          transform: [{ translateX: -21 }],
        }}
        showsVerticalScrollIndicator={false}
      >
        {poiData.map((Poi: PointOfInterest) => (
          <RecommendedPoiBox Poi={Poi} key={Poi.id} />
        ))}
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
      </ScrollView>
    </View>
  );
};

export default RecommendedPoiComponent;
