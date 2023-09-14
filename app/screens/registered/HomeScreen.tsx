import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../../firebase';
import StatusBarComponent from '../../components/homeScreenComponents/StatusBarComponent';
import RecommendedPoiComponent from '../../components/homeScreenComponents/RecommendedPoiComponent';
import AppNavigationBar2 from '../../components/navigation/AppNavigationBar2';
import { COLORS } from '../../styles/Colors';

const HomeScreen = () => {
  return (
    <View style={styles.homeScreenContainer}>
      <View style={{maxHeight: "15%"}}>
        <AppNavigationBar2 navOrBack={'navbar'} screenTitle={'Domov'} />
        <StatusBarComponent />
      </View>
      <View style={{ maxHeight: '85%' }}>
        <RecommendedPoiComponent />
      </View>
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  homeScreenContainer: {
    height: '100%',
    paddingHorizontal: 21,
    backgroundColor: COLORS.white,
  },
});
