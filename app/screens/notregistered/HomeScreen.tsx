import { View, Text, Button } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '../../../firebase';

const HomeScreen = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
      <Button title='sign out' onPress={() => FIREBASE_AUTH.signOut()} />
    </View>
  );
};

export default HomeScreen;
