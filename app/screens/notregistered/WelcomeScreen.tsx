import React, { useEffect, useRef } from 'react';
import {
  View,
  ImageBackground,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

const WelcomeScreen = ({ navigation }: any) => {
  const logoAnimationValue = useRef(new Animated.Value(0)).current;

  const backgroundAnimationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnimationValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      Animated.timing(backgroundAnimationValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.ease,
        useNativeDriver: false,
      }).start();
    }, 800);
    setTimeout(() => {
      navigation.navigate('Sign In');
    }, 3000);
  }, []);

  const screenWidth = Dimensions.get('screen').width;
  const screenHeight = Dimensions.get('screen').height;

  return (
    <ImageBackground
      source={require('../../../assets/background/background.png')}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Animated.Image
        source={require('../../../assets/images/Logo-appky.png')}
        style={{
          width: 296,
          height: 52,
          position: 'absolute',
          left: '50%',
          zIndex: 1000,
          transform: [
            { translateX: -143 },
            {
              translateY: logoAnimationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [400, 0],
              }),
            },
          ],
        }}
      />

      <Animated.View
        style={{
          backgroundColor: 'rgba(255,255,255,0.5)',
          position: 'absolute',
          width: backgroundAnimationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, screenWidth],
          }),
          height: backgroundAnimationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, screenHeight],
          }),
        }}
      />
    </ImageBackground>
  );
};

export default WelcomeScreen;
