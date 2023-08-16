import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';
import { PointOfInterest } from '../../data/poiData';
import NavigateIcon from '../../../assets/navigate.svg';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';

type PoiAboutBtnProps = {
  poiPlace: PointOfInterest;
};

const PoiAboutNavigateBtn = ({ poiPlace }: PoiAboutBtnProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7}>
      <LinearGradient
        colors={[
          'rgba(0, 97, 255, 1)',
          'rgba(96, 239, 255, 1)',
          'rgba(255, 255, 255, 1)',
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1.2, y: 1 }}
        style={styles.NavigateBtnBox}
      >
        <View style={styles.NavigateBtnInnerBox}>
          <NavigateIcon width={24} height={25} />
          <Text style={styles.NavigationBtnText}>Navigovať</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default PoiAboutNavigateBtn;

const styles = StyleSheet.create({
  NavigateBtnBox: {
    borderRadius: 10,
    width: '80%',
    marginVertical: 50,
    alignSelf: 'center',
  },
  NavigateBtnInnerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    margin: 3,
    paddingVertical: 13,
    borderRadius: 8,
  },
  NavigationBtnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#124B92',
  },
});
