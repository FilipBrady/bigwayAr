import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner';
import { useNavigation } from 'expo-router';

interface QrCodeScannerProps {
  onClose: () => void;
}

const QrCodeScannerComponent = ({ onClose }: QrCodeScannerProps) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
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
    navigation.navigate('AboutPoi', {
      PoiId: data,
    });
  };

  const closeScanner = () => {
    setScanned(false);
    onClose(); // Call the onClose function passed as a prop
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={
          (StyleSheet.absoluteFillObject,
          { width: '100%', height: '100%', zIndex: 10000 })
        }
      />
      {scanned && (
        <View style={styles.scanAgainContainer}>
          <Button
            title={'Tap to Scan Again'}
            onPress={() => setScanned(false)}
          />
        </View>
      )}
      <Button title='Close Scanner' onPress={closeScanner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  scanAgainContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default QrCodeScannerComponent;
