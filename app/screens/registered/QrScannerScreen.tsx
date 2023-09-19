import React from 'react';
import { View, StyleSheet } from 'react-native';
import AppNavigationBar2 from '../../components/navigation/AppNavigationBar2';
import CameraComponent from '../../components/qrCodeScannerComponent/CameraComponent';

const QrScannerScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 21 }}>
        <AppNavigationBar2
          navOrBack={'back'}
          screenTitle={'Nascanujte QR kód vašou kamerou'}
          scanIconShow={false}
        />
      </View>
      <CameraComponent />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  camera: {
    flex: 1,
    aspectRatio: 9 / 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blackBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  transparentSquare: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  qrCodeContainer: {
    position: 'absolute',
    bottom: 20,
    left: '50%',
    transform: [{ translateX: -30 }],
  },
  qrCodeButton: {
    backgroundColor: '#FFF',
    padding: 8,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  cameraSwapContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});

export default QrScannerScreen;
