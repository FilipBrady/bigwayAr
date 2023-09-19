import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner';
import { useNavigation } from 'expo-router';
import { Camera, CameraType } from 'expo-camera';
import AppNavigationBar2 from '../../components/navigation/AppNavigationBar2';
import SwapCameraIcon from '../../../assets/swap-icon.svg';
import QrScannerIcon from '../../../assets/qr-scan-icon.svg';
import { updateProfile } from 'firebase/auth';
import {
  FIREBASE_AUTH,
  FIREBASE_DB,
  FIREBASE_STORAGE,
} from '../../../firebase';
import {
  doc,
  collection,
  updateDoc,
  arrayUnion,
  serverTimestamp,
  Timestamp,
  increment,
} from 'firebase/firestore';
import { useAppContainer } from '../../components/container/Context';
import { getDownloadURL, ref } from 'firebase/storage';
import { GlobalStyles } from '../../styles/GlobalStyles';

const QrScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const { currentUserData, poiData, message, setMessage, setPointsGained } =
    useAppContainer();
  const [imageUrl, setImageUrl] = useState(
    'https://firebasestorage.googleapis.com/v0/b/bigwayar.appspot.com/o/user-profile-pic.jpeg?alt=media&token=35f46c75-611f-4532-ad8f-6f5ef9b1b670'
  );
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [scannedPoiId, setScannedPoiId] = useState('');

  const navigation = useNavigation<any>();
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned: BarCodeScannedCallback = (scann: any) => {
    if (!scanned) {
      poiData.map(async Poi => {
        if (Poi.id === scann.data) {
          setScannedPoiId(scann.data);
          const imagesRef = ref(
            FIREBASE_STORAGE,
            `POI-images/${scann.data}/poi-place-title-image.jpeg`
          );
          const url = await getDownloadURL(imagesRef);
          setImageUrl(url);
          if (scann.boundingBox) {
            setImagePosition({
              x: scann.boundingBox.origin.x,
              y: scann.boundingBox.origin.y,
            });
            setImageSize({
              width: scann.boundingBox.size.width,
              height: scann.boundingBox.size.height,
            });
          }
          //   const findSpecificPoi = poiData.find(Poi => Poi.id === scann.data);
          //   //in DB add POI to visited and increment user score
          //   if (findSpecificPoi) {
          //     setPointsGained(findSpecificPoi.poiPoints);
          //     const userDocRef = doc(
          //       FIREBASE_DB,
          //       'users',
          //       String(currentUserData?.id)
          //     );
          //     updateDoc(userDocRef, {
          //       points: increment(findSpecificPoi?.poiPoints),
          //     });
          //   }
        }
      });
      // setScanned(true);
      // navigation.navigate('AboutPoi', {
      // });
      // handleAddToVisited(scann.data);
      // setMessage('Získali ste body');
    }
  };
  const handleAddToVisited = async (poiId: string) => {
    const userDataToUpdateRef = doc(
      FIREBASE_DB,
      'users',
      String(currentUserData?.id)
    );
    const newVisitedRef = doc(collection(FIREBASE_DB, 'POI'));
    console.log(poiId);
    if (currentUserData && currentUserData.visitedPlaces) {
      await updateDoc(userDataToUpdateRef, {
        visitedPlaces: arrayUnion({
          visitedPlaceId: newVisitedRef.id,
          poiId: poiId,
          timeOfTheVisit: Timestamp.now(),
        }),
      });
    }
  };

  const handleNavigateToPoi = () => {
    if (scannedPoiId !== '') {
      const findSpecificPoi = poiData.find(Poi => Poi.id === scannedPoiId);
      //in DB add POI to visited and increment user score
      if (findSpecificPoi) {
        setPointsGained(findSpecificPoi.poiPoints);
        const userDocRef = doc(
          FIREBASE_DB,
          'users',
          String(currentUserData?.id)
        );
        updateDoc(userDocRef, {
          points: increment(findSpecificPoi?.poiPoints),
        });
      }
      handleAddToVisited(scannedPoiId);
      setMessage('Získali ste body');
      navigation.navigate('AboutPoi', {
        PoiId: scannedPoiId,
      });
    }
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

  // const handleBarCodeScanned = (scann: any) => {
  //   if (scann.boundingBox) {
  //     setImagePosition({
  //       x: scann.boundingBox.origin.x,
  //       y: scann.boundingBox.origin.y,
  //     });
  //     setImageSize({
  //       width: scann.boundingBox.size.width,
  //       height: scann.boundingBox.size.height,
  //     });
  //   }
  // };

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
        <View
          style={{
            position: 'absolute',
            top: imagePosition.x - 15,
            left: imagePosition.y - 15,
            width: imageSize.height + 30,
            height: imageSize.width + 60,
            flexDirection: 'column',
          }}
        >
          <Image
            source={{ uri: imageUrl }}
            style={{
              width: imageSize.height + 30,
              height: imageSize.width + 30,
              backgroundColor: '#000',
            }}
          />
          <Pressable
            onPress={handleNavigateToPoi}
            style={scannedPoiId === '' ? { opacity: 0 } : { opacity: 1 }}
          >
            <Text
              style={[GlobalStyles.SmallTextBlueBold, { textAlign: 'center' }]}
            >
              Open POI
            </Text>
          </Pressable>
        </View>
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
