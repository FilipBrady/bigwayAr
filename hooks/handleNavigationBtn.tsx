import React from 'react';
import { View, Button, Linking } from 'react-native';
import * as Location from 'expo-location';

type DistanceProps = {
  targetLat: number;
  targetLon: number;
};

const handleNavigationButton = async ({
  targetLat,
  targetLon,
}: DistanceProps) => {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    // Handle permission not granted
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  const currentLat = location.coords.latitude;
  const currentLon = location.coords.longitude;

  const url = `https://www.google.com/maps/dir/?api=1&origin=${currentLat},${currentLon}&destination=${targetLat},${targetLon}`;
  Linking.openURL(url);
};

export default handleNavigationButton;
