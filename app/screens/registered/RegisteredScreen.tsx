import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import PoiAboutScreenComponent from '../../components/poiAboutScreenComponents/[id]';
import QrScannerScreen from './QrScannerScreen';
import AllPoiLocationsScreen from './AllPoiLocationsScreen';
import UserProfileScreen from './UserProfileScreen';
import FavoritePoiScreen from './FavoritePoiScreen';
import VisitedPoiScreen from './VisitedPoiScreen';
import NotificationMsg from '../../components/NotificationMsg';
import { useAppContainer } from '../../components/container/Context';

const Stack = createNativeStackNavigator();

export default function RegisteredScreen() {
  const { message, setMessage, pointsGained, setPointsGained } =
    useAppContainer();

  return (
    <NavigationContainer independent={true}>
      <NotificationMsg
        message={message}
        setMessage={setMessage}
        points={pointsGained}
        setPoints={setPointsGained}
      />
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
        <Stack.Screen
          name='FavoritePoiLocations'
          component={FavoritePoiScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='VisitedPoiLocations'
          component={VisitedPoiScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='UserProfile'
          component={UserProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
