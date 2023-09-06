import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { PointOfInterest } from '../data/poiData';
import { GlobalStyles } from '../styles/GlobalStyles';
import PoiThumbnail from './PoiThumbnail';

type VisitedPoiThumbnailBoxProps = {
  Poi: PointOfInterest;
  visitedPlace: {
    visitedPlaceId: string;
    poiId: string;
    timeOfTheVisit: any;
  };
};

const VisitedPoiThumbnailBox = ({
  Poi,
  visitedPlace,
}: VisitedPoiThumbnailBoxProps) => {
  // useEffect(() => {
  //   const time = new Date(
  //     visitedPlace.timeOfTheVisit.seconds * 1000 +
  //       visitedPlace.timeOfTheVisit.nanoseconds / 1000000
  //   );
  //   setVisitTime(time);
  // }, [visitedPlace]);
  const visitTime = new Date(
    visitedPlace.timeOfTheVisit.seconds * 1000 +
      visitedPlace.timeOfTheVisit.nanoseconds / 1000000
  ); // Replace this with your Date object

  const day = visitTime.getDate();
  const month = visitTime.getMonth() + 1; // Note: Months are zero-indexed, so add 1
  const year = visitTime.getFullYear();
  const hour = visitTime.getHours();
  const minutes = visitTime.getMinutes();
  return (
    <View
      key={Poi.id}
      style={{ flexDirection: 'column', alignItems: 'flex-end' }}
    >
      <Text style={{ ...GlobalStyles.SmallTextBlueRegular, paddingRight: 21 }}>
        Získané {`${day}.${month}.${year}, ${hour}:${minutes}`}
      </Text>
      <PoiThumbnail Poi={Poi} />
    </View>
  );
};

export default VisitedPoiThumbnailBox;
