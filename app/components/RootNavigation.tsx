import React from 'react';
import { useAuthentication } from '../../hooks/useAuthentication';
import NotRegisteredScreen from '../screens/notregistered/NotRegisteredScreen';
import RegisteredScreen from '../screens/registered/RegisteredScreen';

export default function RootNavigation() {
  const { user } = useAuthentication();

  return user ? <RegisteredScreen /> : <NotRegisteredScreen />;
}
