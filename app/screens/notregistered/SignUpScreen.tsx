import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Anvelope from '../../../assets/anvelope.svg';
import UserIcon from '../../../assets/user.svg';
import Lock from '../../../assets/lock.svg';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase';
import FormInput from '../../components/formInput';

const SignUpScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetePassword, setRepetePassword] = useState('');
  const [error, setError] = useState('');

  async function signUp() {
    if (
      username !== '' &&
      email !== '' &&
      password !== '' &&
      repetePassword !== '' &&
      password === repetePassword
    ) {
      try {
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        navigation.navigate('Sign In');
      } catch (error: any) {
        setError(error.message);
      }
    } else if (password !== repetePassword) {
      setError('Heslá sa nezhodujú');
    } else {
      setError('Vyplň všetky polia');
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/background/background.png')}
      style={{ width: '100%', height: '100%', alignItems: 'center' }}
    >
      {error !== '' && <Text>{error}</Text>}
      <View style={styles.container}>
        <Text style={styles.appLogo}>Logo appky</Text>
        <View style={styles.formContainer}>
          <FormInput
            placeholder='Username'
            secured={false}
            onChangeText={setUsername}
            changedText={username}
            icon={<UserIcon width={30} height={30} />}
          />
          <FormInput
            placeholder='E - Mail'
            secured={false}
            onChangeText={setEmail}
            changedText={email}
            icon={<Anvelope width={30} height={30} />}
          />
          <FormInput
            placeholder='Password'
            secured={true}
            onChangeText={setPassword}
            changedText={password}
            icon={<Lock width={30} height={30} />}
          />
          <FormInput
            placeholder='Confirm Password'
            secured={true}
            onChangeText={setRepetePassword}
            changedText={repetePassword}
            icon={<Lock width={30} height={30} />}
          />
          <TouchableOpacity activeOpacity={0.4}>
            <Text style={styles.signInBtn} onPress={signUp}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          onPress={() => navigation.navigate('Sign In')}
          style={styles.signUpBtn}
        >
          SIGN IN
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    flex: 1,
    marginTop: 50,
    marginBottom: 70,
    position: 'relative',
  },
  appLogo: {
    fontSize: 36,
    alignSelf: 'center',
    marginBottom: 150,
  },
  formContainer: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    width: '100%',
  },
  signInBtn: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    color: '#3069b0',
    textAlign: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    fontSize: 25,
    marginVertical: 25,
  },
  signUpBtn: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
});
