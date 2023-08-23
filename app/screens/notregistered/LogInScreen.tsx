import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import UserIcon from '../../../assets/user.svg';
import Lock from '../../../assets/lock.svg';
import {
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase';
import FormInput from '../../components/FormInput';
import NotRegisteredStyles from '../../styles/NotRegisteredStyles';
import NotificationMsg from '../../components/NotificationMsg';
import { getDocs, collection } from 'firebase/firestore';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [error, setError] = useState<string | null>('');

  async function signIn() {
    if (username !== '' && password !== '') {
      const querySnapshot = await getDocs(collection(FIREBASE_DB, 'users'));
      querySnapshot.forEach(doc => {
        if (doc.data().name === username) {
          setUserEmail(doc.data().email);
        }
      });
      try {
        await signInWithEmailAndPassword(FIREBASE_AUTH, userEmail, password);
        // navigation.navigate('Sign In');
        setError('Úspešne prihlásený');
      } catch (error: any) {
        setError(error.message);
      }
    } else {
      setError('Vyplň všetky polia');
    }
  }
  return (
    <ImageBackground
      source={require('../../../assets/background/background.png')}
      style={{ width: '100%', height: '100%', alignItems: 'center' }}
    >
      <NotificationMsg error={error} setError={setError} />
      <View style={NotRegisteredStyles.container}>
        <Text style={NotRegisteredStyles.appLogo}>Logo appky</Text>
        <View style={NotRegisteredStyles.formContainer}>
          <FormInput
            placeholder='Username'
            secured={false}
            onChangeText={setUsername}
            changedText={username}
            icon={<UserIcon width={25} height={25} />}
          />
          <FormInput
            placeholder='Password'
            secured={true}
            onChangeText={setPassword}
            changedText={password}
            icon={<Lock width={25} height={25} />}
          />
          <TouchableOpacity activeOpacity={0.4}>
            <Text style={NotRegisteredStyles.submitBtn} onPress={signIn}>
              SIGN IN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4}>
            <Text
              onPress={() => navigation.navigate('Forgot Password')}
              style={NotRegisteredStyles.forgotBtn}
            >
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          onPress={() => navigation.navigate('Sign Up')}
          style={NotRegisteredStyles.formSwitchBtn}
        >
          SIGN UP
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  notification: {
    width: '80%',
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    backgroundColor: '#FFFFFFCC',
    paddingVertical: 12,
    zIndex: 100,
    borderRadius: 15,
    paddingLeft: 17,
    alignItems: 'center',
    gap: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  notificationText: {
    color: '#124B92',
    fontSize: 16,
    fontWeight: '600',
  },
});
