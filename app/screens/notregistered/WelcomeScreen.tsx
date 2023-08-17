import { View, Text, Button } from 'react-native';
import React from 'react';
import UserLocation from '../../components/UserLocation';

const WelcomeScreen = ({ navigation }: any) => {
  return (
    <View>
      <Text>Welcome here!!</Text>
      <Button title='log in' onPress={() => navigation.navigate('Sign In')} />
      <Button title='sign up' onPress={() => navigation.navigate('Sign Up')} />
      <View
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          borderColor: '#000',
          height: '50%',
        }}
      ></View>
    </View>
  );
};

export default WelcomeScreen;
