import { View, Text, Button } from 'react-native';
import React from 'react';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>Welcome here!!</Text>
      <Button title='log in' onPress={() => navigation.navigate('Sign In')} />
      <Button title='sign up' onPress={() => navigation.navigate('Sign Up')} />
    </View>
  );
};

export default WelcomeScreen;
