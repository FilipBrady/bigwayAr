// import { View, Text, StyleSheet, Image } from 'react-native';
// import NavigationIcon from '../../../assets/menu-icon.svg';
// import QrCodeScanner from '../../../assets/qr-scan-icon.svg';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import OpenedNavigation from './OpenedNavigation';
// import { useState } from 'react';
// import QrCodeScannerComponent from '../QrCodeScannerComponent';
// import ArrowRight from '../../../assets/arrow-right.svg'
// import { useNavigation } from 'expo-router';

// const AppNavigationBar = () => {
//   const [isNavigationOpen, setIsNavigationOpen] = useState(false);
//   const [isScannerOpen, setIsScannerOpen] = useState(false);
//   const navigation = useNavigation()
//   const openScanner = () => {
//     setIsScannerOpen(true);
//   };

//   const closeScanner = () => {
//     setIsScannerOpen(false);
//   };

//   return (
//     <View>
//       <OpenedNavigation
//         isNavigationOpen={isNavigationOpen}
//         setIsNavigationOpen={setIsNavigationOpen}
//       />
//       <View style={styles.navigationContainer}>
//         <TouchableOpacity
//           activeOpacity={0.3}
//           onPress={() => setIsNavigationOpen(true)}
//         >
//           <NavigationIcon width={30} height={21} />
//         </TouchableOpacity>
//         <TouchableOpacity activeOpacity={0.3} onPress={() => navigation.goBack()}>
//           <ArrowRight width={30} height={20} rotation={180} />
//         </TouchableOpacity>
//         <Text
//           style={[
//             styles.navigationScreenName,
//             { transform: [{ translateX: 5 }] },
//           ]}
//         >
//           Domov
//         </Text>
//         <View
//           style={{
//             flexDirection: 'row',
//             alignItems: 'center',
//             gap: 13,
//             position: 'absolute',
//             right: 21,
//           }}
//         >
//           <TouchableOpacity activeOpacity={0.3} onPress={openScanner}>
//             <QrCodeScanner width={33} height={30} />
//           </TouchableOpacity>
//           <TouchableOpacity activeOpacity={0.3}>
//             <Image
//               source={require('../../../assets/images/user-profile-pic.jpeg')}
//               width={41}
//               height={41}
//               style={styles.userPhoto}
//             />
//           </TouchableOpacity>
//         </View>
//       </View>
//       {isScannerOpen && <QrCodeScannerComponent onClose={closeScanner} />}
//     </View>
//   );
// };

// export default AppNavigationBar;

// const styles = StyleSheet.create({
//   navigationContainer: {
//     height: 85,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   navigationScreenName: {
//     color: '#124B92',
//     fontSize: 16,
//     fontWeight: '400',
//     position: 'absolute',
//     right: '50%',
//   },
//   userPhoto: {
//     width: 41,
//     height: 41,
//     borderRadius: 100,
//   },
// });
