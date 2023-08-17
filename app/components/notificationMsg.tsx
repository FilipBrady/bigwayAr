import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import SuccesIcon from '../../assets/succes-icon.svg';
import ErrorIcon from '../../assets/error-icon.svg';

type NotificationProps = {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};

const NotificationMsg = ({ error, setError }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsVisible(!!error);

    Animated.timing(animationValue, {
      toValue: error ? 1 : 0,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    if (error) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        clearTimeout(timeout);
        setError('');
      }, 4000);
    }
  }, [error]);

  return isVisible ? (
    <Animated.View
      style={[
        styles.notificationContainer,
        {
          transform: [
            {
              translateY: animationValue.interpolate({
                inputRange: [0, 1],
                outputRange: [-100, 0],
              }),
            },
          ],
          opacity: animationValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ]}
    >
      {error === 'Úspešne prihlásený' ? (
        <View style={styles.notificationBox}>
          <SuccesIcon width={24} height={24} />
          <Text style={styles.notificationText}>Úspešne prihlásený</Text>
        </View>
      ) : error === 'Firebase: Error (auth/invalid-email).' ||
        error === 'Firebase: Error (auth/user-not-found).' ||
        error === 'Firebase: Error (auth/wrong-password).' ? (
        <View style={styles.notificationBox}>
          <ErrorIcon width={24} height={24} />
          <Text style={styles.notificationText}>
            Chybné prihlasovacie údaje
          </Text>
        </View>
      ) : error ? (
        <View style={styles.notificationBox}>
          <ErrorIcon width={24} height={24} />
          <Text style={styles.notificationText}>{error}</Text>
        </View>
      ) : (
        ''
      )}
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  notificationContainer: {
    width: '80%',
    position: 'absolute',
    top: 20,
    marginHorizontal: 'auto',
    zIndex: 100,
  },
  notificationBox: {
    flexDirection: 'row',
    gap: 18,
    borderRadius: 15,
    paddingLeft: 17,
    alignItems: 'center',
    backgroundColor: '#FFFFFFCC',
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  notificationText: {
    color: '#124B92',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NotificationMsg;
