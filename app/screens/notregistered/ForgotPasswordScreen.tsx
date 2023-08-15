import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Anvelope from '../../../assets/anvelope.svg';
import FormInput from '../../components/FormInput';
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '../../../firebase';
import NotRegisteredStyles from '../../styles/NotRegisteredStyles';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');

  const emailReset = () => {
    if (email !== '') {
      sendPasswordResetEmail(FIREBASE_AUTH, email)
        .then(() => {
          console.log('Reset odoslaný!');
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
        });
      setEmail('');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/background/background.png')}
      style={{ width: '100%', height: '100%', alignItems: 'center' }}
    >
      <View style={NotRegisteredStyles.container}>
        <Text style={NotRegisteredStyles.appLogo}>Logo appky</Text>
        <View style={NotRegisteredStyles.formContainer}>
          <FormInput
            placeholder='Your e-mail'
            secured={false}
            onChangeText={setEmail}
            changedText={email}
            icon={<Anvelope width={25} height={25} />}
          />
          <TouchableOpacity activeOpacity={0.4}>
            <Text style={NotRegisteredStyles.submitBtn} onPress={emailReset}>
              RESET PASSWORD
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

export default ForgotPasswordScreen;

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
  reserPasswordBtn: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    color: '#3069b0',
    textAlign: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    fontSize: 25,
    marginTop: 20,
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
