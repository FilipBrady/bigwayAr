import { PixelRatio, StyleSheet } from 'react-native';
const NotRegisteredStyles = StyleSheet.create({
  container: {
    width: '70%',
    flex: 1,
    marginTop: 50,
    paddingTop: 30,
    position: 'relative',
  },
  appLogo: {
    fontSize: 36,
    alignSelf: 'center',
    // marginBottom: 150,
  },
  formContainer: {
    position: 'absolute',
    top: '20%',
    alignSelf: 'center',
    width: '100%',
  },
  submitBtn: {
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    color: '#3069b0',
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 15,
    fontSize: 20,
    marginTop: 50,
  },
  forgotBtn: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '200',
    marginTop: 20,
  },
  formSwitchBtn: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
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

export default NotRegisteredStyles;
