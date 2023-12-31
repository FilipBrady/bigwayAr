import { useFonts } from 'expo-font';
import RootNavigation from './components/RootNavigation';
import Container from './components/container/Container';
import React from 'react';
import NotificationMsg from './components/NotificationMsg';
import { useAppContainer } from './components/container/Context';

export default function Page() {
  const [loadedFonts] = useFonts({
    Regular: require('../assets/fonts/Poppins-Regular.otf'),
    Bold: require('../assets/fonts/Poppins-Bold.otf'),
    ExtraBold: require('../assets/fonts/Poppins-ExtraBold.otf'),
    Medium: require('../assets/fonts/Poppins-Medium.otf'),
  });

  return <Container>{params => <RootNavigation />}</Container>;
}
