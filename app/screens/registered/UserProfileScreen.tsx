import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import AppNavigationBar2 from '../../components/navigation/AppNavigationBar2';
import { useAppContainer } from '../../components/container/Context';
import { FIREBASE_AUTH } from '../../../firebase';
import { GlobalStyles } from '../../styles/GlobalStyles';
import EditUserInformationsComponent from '../../components/userProfileComponent/EditUserInformationsComponent';
import EditUserInformationField from '../../components/userProfileComponent/EditUserInformationField';

const UserProfileScreen = () => {
  const { currentUserData } = useAppContainer();
  return (
    <View style={styles.container}>
      <AppNavigationBar2
        navOrBack={'back'}
        screenTitle={'Nastavenia vášho účtu'}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Image
          source={require('../../../assets/images/user-profile-pic.jpeg')}
          width={153}
          height={153}
          style={{ width: 153, height: 153, borderRadius: 5 }}
        />
        <View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={GlobalStyles.ExtraSmallTextGrayRegulat}>
              Aktuálne miesta
            </Text>
            <Text style={GlobalStyles.BigTextBlackRegulat}>
              {currentUserData?.visitedPlaces.length}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={GlobalStyles.ExtraSmallTextGrayRegulat}>
              Aktuálny počet bodov
            </Text>
            <Text style={GlobalStyles.BigTextBlackRegulat}>
              {currentUserData?.points}
            </Text>
          </View>
        </View>
      </View>
      <EditUserInformationsComponent/>

    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: { marginHorizontal: 21 },
});
