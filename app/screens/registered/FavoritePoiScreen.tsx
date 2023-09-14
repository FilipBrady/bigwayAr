import { View, Text, Dimensions, ScrollView } from 'react-native';
import React from 'react';
import AppNavigationBar2 from '../../components/navigation/AppNavigationBar2';
import PoiThumbnail from '../../components/PoiThumbnail';
import { PointOfInterest } from '../../data/poiData';
import { useAppContainer } from '../../components/container/Context';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { COLORS } from '../../styles/Colors';

const FavoritePoiScreen = () => {
  const { poiData, currentUserData } = useAppContainer();
  return (
    <View style={{ paddingHorizontal: 21, backgroundColor: COLORS.white }}>
      <View style={{ height: '10%' }}>
        <AppNavigationBar2 navOrBack={'back'} screenTitle={'Obľúbené POI'} />
      </View>
      <ScrollView
        style={{
          padding: 20,
          paddingHorizontal: 0,
          width: Dimensions.get('screen').width,
          height: '90%',
          transform: [{ translateX: -21 }],
        }}
        showsVerticalScrollIndicator={false}
      >
        {currentUserData && currentUserData.favorite.length === 0 ? (
          <View
            style={{
              paddingHorizontal: 21,
              alignItems: 'center',
            }}
          >
            <Text style={GlobalStyles.BigTextBlueBold}>
              Zatiaľ nemáte žiadne obľúbené miesta
            </Text>
          </View>
        ) : (
          currentUserData &&
          currentUserData.favorite.map(favoritePlace =>
            poiData.map(Poi => {
              if (favoritePlace.poiId === Poi.id) {
                return <PoiThumbnail Poi={Poi} key={Poi.id} />;
              }
            })
          )
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default FavoritePoiScreen;
