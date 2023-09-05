import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import QrCodeScanner from '../../../assets/qr-scan-icon.svg';
import ShareIcon from '../../../assets/share-icon.svg';
import FavoriteBtn from '../FavoriteBtn';
import { useRoute } from '@react-navigation/native';
import { PointOfInterest } from '../../data/poiData';
import { useAppContainer } from '../container/Context';

type AppNavigationIconsProps = {
  scanIconShow?: boolean;
  openScanner: () => void;
};

const AppNavigationIconsComponent = ({
  scanIconShow,
  openScanner,
}: AppNavigationIconsProps) => {
  const route = useRoute<any>();
  const { poiData } = useAppContainer();
  const onPoiAboutPage = route.params;
 

  return (
    <View
      style={
        onPoiAboutPage !== undefined
          ? {
              flexDirection: 'row',
              alignItems: 'center',
              gap: 13,
              transform: [{ translateX: 51 }],
            }
          : { flexDirection: 'row', alignItems: 'center', gap: 13 }
      }
    >
      {onPoiAboutPage !== undefined && (
        <ShareIcon
          width={33}
          style={{
            transform: [{ translateX: -36 }],
          }}
        />
      )}
      {onPoiAboutPage !== undefined && (
        <View style={{ position: 'absolute', top: 0 }}>
          {route.params !== undefined && (
            <FavoriteBtn
              Poi={
                poiData.find(
                  Poi => Poi.id === route.params?.PoiId
                ) as PointOfInterest
              }
              width={33}
              height={30}
              color='black'
            />
          )}
        </View>
      )}
      {scanIconShow !== false && (
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={openScanner}
          style={
            onPoiAboutPage !== undefined
              ? {
                  backgroundColor: '#FFF',
                  paddingLeft: 10,
                  paddingVertical: 8,
                  paddingRight: 51,
                  borderRadius: 10,
                  elevation: 20,
                }
              : {}
          }
        >
          <QrCodeScanner width={33} height={30} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AppNavigationIconsComponent;

const styles = StyleSheet.create({
  navigationContainer: {
    minHeight: 85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navigationScreenName: {
    color: '#124B92',
    fontSize: 16,
    fontWeight: '400',
  },
  userPhoto: {
    width: 41,
    height: 41,
    borderRadius: 100,
  },
});
