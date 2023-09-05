import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import PoiAboutHeader from './PoiAboutHeader';
import PoiAboutMainContent from './PoiAboutMainContent';
import PoiAboutNavigateBtn from './PoiAboutNavigateBtn';
import AppNavigationBar2 from '../navigation/AppNavigationBar2';
import { useAppContainer } from '../container/Context';

const PoiAboutScreenComponent = () => {
  const route = useRoute();
  const [screenScrollY, setScreenScrollY] = useState(0);
  const { poiData } = useAppContainer();

  const routeId = route.params?.PoiId;
  return (
    <View>
      <View
        style={{
          paddingHorizontal: 21,
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 1000,
          width: '100%',
          backgroundColor: `rgba(255, 255, 255, ${screenScrollY / 200})`,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          shadowColor: '#000000',
          elevation: screenScrollY / 100 >= 1 ? 50 : 0,
          shadowOffset: { width: 40, height: 40 },
          shadowRadius: 20,
          shadowOpacity: 0,
        }}
      >
        <AppNavigationBar2
          navOrBack={'back'}
          screenTitle={
            String(poiData.find(poi => poi.id === route.params.PoiId)?.poiTitle)
          }
          titleShow={false}
          screenScrollY={screenScrollY}
        />
      </View>
      {poiData.map(poiPlace => {
        if (poiPlace.id === routeId) {
          return (
            <ScrollView
              key={poiPlace.id}
              onScroll={event =>
                setScreenScrollY(event.nativeEvent.contentOffset.y)
              }
            >
              <PoiAboutHeader poiPlace={poiPlace} />
              <PoiAboutMainContent poiPlace={poiPlace} />
              <PoiAboutNavigateBtn poiPlace={poiPlace} />
            </ScrollView>
          );
        }
      })}
    </View>
  );
};

export default PoiAboutScreenComponent;
