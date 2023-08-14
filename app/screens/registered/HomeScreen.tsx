import { View, Text, Button } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../../firebase';
import AppNavigationBar from '../../components/navigation/AppNavigationBar';

const HomeScreen = () => {
  return (
    <View>
      <AppNavigationBar />
      {/* <Text>HomeScreen</Text> */}
      {/* <Button title='sign out' onPress={() => FIREBASE_AUTH.signOut()} /> */}
    </View>
  );
};

export default HomeScreen;
