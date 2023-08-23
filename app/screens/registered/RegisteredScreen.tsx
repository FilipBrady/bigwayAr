import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import PoiAboutScreenComponent from '../../components/poiAboutScreenComponents/[id]';
import QrScannerScreen from './QrScannerScreen';
import AllPoiLocationsScreen from './AllPoiLocationsScreen';

const Stack = createNativeStackNavigator();

export default function RegisteredScreen() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AboutPoi'
          component={PoiAboutScreenComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='QrScanner'
          component={QrScannerScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='AllPoiLocations'
          component={AllPoiLocationsScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
