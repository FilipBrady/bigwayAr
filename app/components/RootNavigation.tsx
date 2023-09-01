import React from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import NotRegisteredScreen from '../screens/notregistered/NotRegisteredScreen';
import RegisteredScreen from '../screens/registered/RegisteredScreen';
import { Platform } from 'react-native';
import PcWelcomeScreen from '../screens/pcScreens/PcWelcomeScreen';

export default function RootNavigation() {
  const { user } = useAuthentication();
  const isMobile = Platform.OS === 'ios' || Platform.OS === 'android';

  const mobileContent = user ? <RegisteredScreen /> : <NotRegisteredScreen />;

  const pcContent = <PcWelcomeScreen />;

  return isMobile ? mobileContent : pcContent;
}
