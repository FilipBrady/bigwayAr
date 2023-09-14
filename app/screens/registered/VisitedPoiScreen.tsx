import { View, Text, Dimensions, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../styles/Colors';
import AppNavigationBar2 from '../../components/navigation/AppNavigationBar2';
import PoiThumbnail from '../../components/PoiThumbnail';
import { useAppContainer } from '../../components/container/Context';
import { GlobalStyles } from '../../styles/GlobalStyles';
import VisitedPoiThumbnailBox from '../../components/VisitedPoiThumbnailBox';

const VisitedPoiScreen = () => {
  const { poiData, currentUserData } = useAppContainer();
  return (
    <View
      style={{
        paddingHorizontal: 21,
        backgroundColor: COLORS.white,
        width: '100%',
        height: '100%',
      }}
    >
      <View style={{ height: '10%' }}>
        <AppNavigationBar2
          navOrBack={'back'}
          screenTitle={'Zoznam získanúch POI/QR'}
        />
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
        {currentUserData && currentUserData.visitedPlaces.length === 0 ? (
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
          currentUserData.visitedPlaces.map(visitedPlace =>
            poiData.map(Poi => {
              if (visitedPlace.poiId === Poi.id) {
                return (
                  <VisitedPoiThumbnailBox
                    Poi={Poi}
                    visitedPlace={visitedPlace}
                    key={visitedPlace.visitedPlaceId}
                  />
                );
              }
            })
          )
        )}
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
};

export default VisitedPoiScreen;
