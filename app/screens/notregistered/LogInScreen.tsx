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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase';
import FormInput from '../../components/formInput';

const LoginScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function signIn() {
    if (username !== '' && password !== '') {
      try {
        await signInWithEmailAndPassword(FIREBASE_AUTH, username, password);
        navigation.navigate('Sign In');
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
            placeholder='Password'
            secured={true}
            onChangeText={setPassword}
            changedText={password}
            icon={<Lock width={30} height={30} />}
          />
          <TouchableOpacity activeOpacity={0.4}>
            <Text style={styles.signInBtn} onPress={signIn}>
              SIGN IN
            </Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4}>
            <Text onPress={() => navigation.navigate("Forgot Password")}  style={styles.forgotBtn}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </View>
        <Text onPress={() => navigation.navigate("Sign Up")} style={styles.signUpBtn}>
          SIGN UP
        </Text>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

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
  forgotBtn: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '200',
    marginTop: 20,
  },
  signUpBtn: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    marginVertical: 'auto',
  },
});
