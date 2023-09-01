import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner';
import { useNavigation } from 'expo-router';
import { Camera, CameraType } from 'expo-camera';
import AppNavigationBar2 from '../../components/navigation/AppNavigationBar2';
import SwapCameraIcon from '../../../assets/swap-icon.svg';
import QrScannerIcon from '../../../assets/qr-scan-icon.svg';

const QrScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(CameraType.back);

  const navigation = useNavigation<any>();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = ({
    type,
    data,
  }: {
    type: string;
    data: string;
  }) => {
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned`);
    navigation.navigate('AboutPoi', {
      PoiId: data,
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  function toggleCameraType() {
    setType(current =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ paddingHorizontal: 21 }}>
        <AppNavigationBar2
          navOrBack={'back'}
          screenTitle={'Nascanujte QR kód vašou kamerou'}
          scanIconShow={false}
        />
      </View>
      <Camera
        style={styles.camera}
        type={type}
        onBarCodeScanned={handleBarCodeScanned}
      >
        <View style={styles.overlay}>
          <View style={styles.blackBackground} />
          <View style={styles.transparentSquare} />
          <View style={styles.qrCodeContainer}>
            <TouchableOpacity
              style={styles.qrCodeButton}
              onPress={toggleCameraType}
            >
              <QrScannerIcon width={39} />
            </TouchableOpacity>
          </View>
          <View style={styles.cameraSwapContainer}>
            <TouchableOpacity onPress={toggleCameraType}>
              <SwapCameraIcon width={32} height={32} />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
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
