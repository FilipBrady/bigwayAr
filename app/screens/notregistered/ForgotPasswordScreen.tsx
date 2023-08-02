import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Anvelope from '../../../assets/anvelope.svg';
import FormInput from '../../components/formInput';

const ForgotPasswordScreen = ({ navigation }: any) => {
  const [text, setText] = useState('');
  console.log(text);

  return (
    <ImageBackground
      source={require('../../../assets/background/background.png')}
      style={{ width: '100%', height: '100%', alignItems: 'center' }}
    >
      <View style={styles.container}>
        <Text style={styles.appLogo}>Logo appky</Text>
        <View style={styles.formContainer}>
          <FormInput
            placeholder='Your e-mail'
            secured={false}
            onChangeText={setText}
            changedText={text}
            icon={<Anvelope width={30} height={30} />}
          />
          <TouchableOpacity activeOpacity={0.4}>
            <Text style={styles.reserPasswordBtn}>RESET PASSWORD</Text>
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
