import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../../firebase';
import AppNavigationBar from '../../components/navigation/AppNavigationBar';
import StatusBarComponent from '../../components/homeScreenComponents/StatusBarComponent';
import RecommendedPoiComponent from '../../components/homeScreenComponents/RecommendedPoiComponent';
import AppNavigationBar2 from '../../components/navigation/AppNavigationBar2';
// import QrCodeScanner from '../../components/QrCodeScanner';

const HomeScreen = () => {
  return (
    <View style={styles.homeScreenContainer}>
      <AppNavigationBar2
        navOrBack={'navbar'}
        screenTitle={'Domov'}
      />
      <StatusBarComponent />
      <RecommendedPoiComponent />
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  homeScreenContainer: {
    height: '100%',
    paddingHorizontal: 21,
  },
});
