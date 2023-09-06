import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './LogInScreen';
import SignUpScreen from './SignUpScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import { useAppContainer } from '../../components/container/Context';
import NotificationMsg from '../../components/NotificationMsg';

const Stack = createNativeStackNavigator();

export default function NotRegisteredScreen() {
  const { message, setMessage } = useAppContainer();

  return (
    <NavigationContainer independent={true}>
      <NotificationMsg message={message} setMessage={setMessage} />
      <Stack.Navigator>
        <Stack.Screen
          name='Welcome'
          component={WelcomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Sign In'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Sign Up'
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Forgot Password'
          component={ForgotPasswordScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
