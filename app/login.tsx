import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Link } from 'expo-router';

const LoginScreen = () => {
  return (
    <ImageBackground
      source={require('../assets/Rectangle1.png')}
      style={{ width: '100%', height: '100%', alignItems: 'center' }}
    >
      <View style={styles.container}>
        <Text style={styles.appLogo}>Logo appky</Text>
        <View>
          <View>
            <MaterialCommunityIcons
              name='account'
              size={30}
              color='white'
              style={[
                styles.textInputIcon,
                {
                  transform: [{ translateY: 10 }, { translateX: 10 }],
                },
              ]}
            />
            <TextInput
              inputMode='text'
              placeholder='Username'
              placeholderTextColor='#FFF'
              style={styles.textInput}
            />
          </View>
          <View>
            <Fontisto
              name='locked'
              size={30}
              color='white'
              style={[
                styles.textInputIcon,
                {
                  transform: [{ translateY: 10 }, { translateX: 10 }],
                },
              ]}
            />
            <TextInput
              inputMode='text'
              placeholder='Password'
              placeholderTextColor='#FFF'
              secureTextEntry={true}
              style={styles.textInput}
            />
          </View>
          <TouchableOpacity activeOpacity={0.4}>
            <Text style={styles.signInBtn}>SIGN IN</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.4}>
            <Text style={styles.forgotBtn}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
        <Link href='/signup' style={styles.signUpBtn}>
          SIGN UP
        </Link>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 100,
    marginBottom: 70,
  },
  textInput: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFFFFF',
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 20,
    paddingLeft: 50,
    marginBottom: 25,
  },
  textInputIcon: {
    position: 'absolute',
  },
  appLogo: {
    fontSize: 36,
    alignSelf: 'center',
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
    marginBottom: 35,
  },
  forgotBtn: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '200',
  },
  signUpBtn: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
});
