// import React, { useState, useEffect } from 'react';
// import { Platform, Text, View, StyleSheet } from 'react-native';
// import Device from 'expo-device';
// import * as Location from 'expo-location';

// export default function UserLocation() {
//   const [location, setLocation] = useState<any>({});
//   const [errorMsg, setErrorMsg] = useState<any>(null);
//   const [currentLatitude, setCurrentLatitude] = useState(0);

//   useEffect(() => {
//     (async () => {
//       // if (Platform.OS === 'android' && !Device.isDevice) {
//       //   setErrorMsg(
//       //     'Oops, this will not work on Snack in an Android Emulator. Try it on your device!'
//       //   );
//       //   return;
//       // }
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       setLocation(location.coords);
//     })();
//   }, []);

//   let text = 'Waiting...';
//   if (errorMsg) {
//     text = errorMsg;
//   } else if (location) {
//     text = JSON.stringify(location);
//   }

//   // Function to calculate distance using Haversine formula
//   function haversineDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
//     const R = 6371; // Radius of the Earth in kilometers
//     const dLat = (lat2 - lat1) * (Math.PI / 180);
//     const dLon = (lon2 - lon1) * (Math.PI / 180);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(lat1 * (Math.PI / 180)) *
//         Math.cos(lat2 * (Math.PI / 180)) *
//         Math.sin(dLon / 2) *
//         Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in kilometers
//     return distance;
//   }

//   // Calculate distance between current location and target location
//   const targetLat = /* latitude from your data file */ 48.89;
//   const targetLon = /* longitude from your data file */ 21.67;
//   const distance = haversineDistance(
//     location.latitude,
//     location.longitude,
//     targetLat,
//     targetLon
//   );

//   console.log(`Distance: ${distance} km`);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.paragraph}>{location.latitude}</Text>
//       <Text style={styles.paragraph}>{location.longitude}</Text>
//       <Text style={styles.paragraph}>{Math.round(distance)} km</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   paragraph: {
//     fontSize: 18,
//     textAlign: 'center',
//   },
// });
