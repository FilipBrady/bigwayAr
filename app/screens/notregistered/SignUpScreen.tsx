import {
  ImageBackground,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Anvelope from '../../../assets/anvelope.svg';
import UserIcon from '../../../assets/user.svg';
import Lock from '../../../assets/lock.svg';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase';
import FormInput from '../../components/FormInput';
import NotRegisteredStyles from '../../styles/NotRegisteredStyles';
import NotificationMsg from '../../components/NotificationMsg';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const SignUpScreen = ({ navigation }: any) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetePassword, setRepetePassword] = useState('');
  const [error, setError] = useState<string | null>('');

  async function signUp() {
    if (
      username !== '' &&
      email !== '' &&
      password !== '' &&
      repetePassword !== '' &&
      password === repetePassword
    ) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );
        const userUid = userCredential.user.uid;
        const newUserDocRef = doc(collection(FIREBASE_DB, 'users'), userUid);
        await setDoc(newUserDocRef, {
          id: userUid,
          email: email,
          name: username,
          points: 0,
          favorite: [],
          visitedPlaces: [],
        });
        navigation.navigate('Sign In');
        if (FIREBASE_AUTH.currentUser !== null) {
          sendEmailVerification(FIREBASE_AUTH.currentUser);
          setError('Úspešne prihlásený');
        }
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
            placeholder='E - Mail'
            secured={false}
            onChangeText={setEmail}
            changedText={email}
            icon={<Anvelope width={25} height={25} />}
          />
          <FormInput
            placeholder='Password'
            secured={true}
            onChangeText={setPassword}
            changedText={password}
            icon={<Lock width={25} height={25} />}
          />
          <FormInput
            placeholder='Confirm Password'
            secured={true}
            onChangeText={setRepetePassword}
            changedText={repetePassword}
            icon={<Lock width={25} height={25} />}
          />
          <TouchableOpacity activeOpacity={0.4}>
            <Text style={NotRegisteredStyles.submitBtn} onPress={signUp}>
              SIGN UP
            </Text>
          </TouchableOpacity>
        </View>
        <Text
          onPress={() => navigation.navigate('Sign In')}
          style={NotRegisteredStyles.formSwitchBtn}
        >
          SIGN IN
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SignUpScreen;

// const styles = StyleSheet.create({
//   container: {
//     width: '85%',
//     flex: 1,
//     marginTop: 50,
//     // marginTop: PixelRatio.getPixelSizeForLayoutSize(50),
//     marginBottom: 70,
//     position: 'relative',
//   },
//   appLogo: {
//     fontSize: 36,
//     alignSelf: 'center',
//     marginBottom: 150,
//   },
//   formContainer: {
//     position: 'absolute',
//     top: '20%',
//     alignSelf: 'center',
//     width: '100%',
//   },
//   signInBtn: {
//     width: '80%',
//     alignSelf: 'center',
//     backgroundColor: '#FFF',
//     color: '#3069b0',
//     textAlign: 'center',
//     paddingVertical: 15,
//     borderRadius: 15,
//     fontSize: 25,
//     marginVertical: 25,
//   },
//   signUpBtn: {
//     color: '#FFF',
//     textAlign: 'center',
//     fontSize: 16,
//     position: 'absolute',
//     bottom: 0,
//     alignSelf: 'center',
//   },
// });
