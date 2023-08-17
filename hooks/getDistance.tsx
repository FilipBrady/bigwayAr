import { useEffect, useState } from 'react';
import * as Location from 'expo-location';

type DistanceProps = {
  targetLat: number;
  targetLon: number;
};
// Custom hook for calculating haversine distance
export default function getDistance({ targetLat, targetLon }: DistanceProps) {
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    async function calculateDistance() {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const currentLat = location.coords.latitude;
      const currentLon = location.coords.longitude;

      const R = 6371; // Radius of the Earth in kilometers
      const dLat = (targetLat - currentLat) * (Math.PI / 180);
      const dLon = (targetLon - currentLon) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(currentLat * (Math.PI / 180)) *
          Math.cos(targetLat * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const calculatedDistance = R * c; // Distance in kilometers

      setDistance(calculatedDistance);
    }

    calculateDistance();
  }, [targetLat, targetLon]);

  return distance;
}
