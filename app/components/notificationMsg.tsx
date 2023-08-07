import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import SuccesIcon from '../../assets/succes-icon.svg';
import ErrorIcon from '../../assets/error-icon.svg';

type NotificationProps = {
  error: string | null;
};

const NotificationMsg = ({ error }: NotificationProps) => {
  console.log(error);

  return (
    <View style={styles.notificationContainer}>
      {error === 'Úspešne prihlásený' ? (
        <View style={styles.notificationBox}>
          <SuccesIcon width={24} height={24} />
          <Text style={styles.notificationText}>Úspešne prihlásený</Text>
        </View>
      ) : error === 'Firebase: Error (auth/invalid-email).' ||
        error === 'Firebase: Error (auth/user-not-found)' ||
        error === 'Firebase: Error (auth/wrong-password).' ? (
        <View style={styles.notificationBox}>
          <ErrorIcon width={24} height={24} />
          <Text style={styles.notificationText}>
            Chybné prihlasovacie údaje
          </Text>
        </View>
      ) : error !== '' ? (
        <View style={styles.notificationBox}>
          <ErrorIcon width={24} height={24} />
          <Text style={styles.notificationText}>{error}</Text>
        </View>
      ) : (
        ''
      )}
    </View>
  );
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
