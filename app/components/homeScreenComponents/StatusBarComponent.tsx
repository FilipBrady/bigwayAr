import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { FIREBASE_DB } from '../../../firebase';
import { GlobalStyles } from '../../styles/GlobalStyles';

const StatusBarComponent = () => {
  return (
    <View style={styles.statusBarContainer}>
      <View>
        <Text style={GlobalStyles.ExtraSmallTextGrayRegulat}>
          Aktúalny počet bodov
        </Text>
        <Text style={GlobalStyles.BigTextBlackRegulat}>1580</Text>
      </View>
      <View>
        <Text style={GlobalStyles.ExtraSmallTextGrayRegulat}>
          Aktuálne miesto
        </Text>
        <Text
          style={[GlobalStyles.BigTextBlackRegulat, { alignSelf: 'flex-end' }]}
        >
          150
        </Text>
      </View>
    </View>
  );
};

export default StatusBarComponent;
const styles = StyleSheet.create({
  statusBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
});
