import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import SuccesIcon from '../../assets/succes-icon.svg';
import ErrorIcon from '../../assets/error-icon.svg';
import PoiStar from '../../assets/poi-star.svg';
import HeartIconFull from '../../assets/heart-icon-full-red.svg';
import HeartIconEmptyRed from '../../assets/heart-icon-empty-red.svg';

type NotificationProps = {
  message: string | null;
  setMessage: React.Dispatch<React.SetStateAction<string | null>>;
  points?: number;
  setPoints?: React.Dispatch<React.SetStateAction<number>>;
};

const NotificationMsg = ({
  message,
  setMessage,
  points,
  setPoints,
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setIsVisible(!!message);

    Animated.timing(animationValue, {
      toValue: message ? 1 : 0,
      duration: 400,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();

    if (message) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
        clearTimeout(timeout);
        setMessage('');
        if (points && setPoints) {
          setPoints(0);
        }
      }, 4000);
    }
  }, [message]);

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
      {message === 'Úspešne prihlásený' ? (
        <View style={styles.notificationBox}>
          <SuccesIcon width={24} height={24} />
          <Text style={styles.notificationText}>Úspešne prihlásený</Text>
        </View>
      ) : message === 'Firebase: Error (auth/invalid-email).' ||
        message === 'Firebase: Error (auth/user-not-found).' ||
        message === 'Firebase: Error (auth/wrong-password).' ? (
        <View style={styles.notificationBox}>
          <ErrorIcon width={24} height={24} />
          <Text style={styles.notificationText}>
            Chybné prihlasovacie údaje
          </Text>
        </View>
      ) : message === 'Pridané do obľúbených' ? (
        <View style={styles.notificationBox}>
          <HeartIconFull width={24} height={24} />
          <Text style={styles.notificationText}>Pridané do obľúbených</Text>
        </View>
      ) : message === 'Odobrané z obľúbených' ? (
        <View style={styles.notificationBox}>
          <HeartIconEmptyRed width={24} height={24} />
          <Text style={styles.notificationText}>Odobrané z obľúbených</Text>
        </View>
      ) : message === 'Získali ste body' && points ? (
        <View style={styles.notificationBox}>
          <PoiStar width={24} height={24} />
          <Text style={styles.notificationText}>
            Získali ste {points} bodov
          </Text>
        </View>
      ) : message ? (
        <View style={styles.notificationBox}>
          <ErrorIcon width={24} height={24} />
          <Text style={styles.notificationText}>{message}</Text>
        </View>
      ) : (
        ''
      )}
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  notificationContainer: {
    width: '100%',
    position: 'absolute',
    top: 49,
    marginHorizontal: 'auto',
    zIndex: 1000,
    alignItems: 'center',
  },
  notificationBox: {
    width: '80%',
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
