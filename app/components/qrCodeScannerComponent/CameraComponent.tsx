import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { BarCodeScanner, BarCodeScannedCallback } from 'expo-barcode-scanner';
import { useNavigation } from 'expo-router';
import { Camera, CameraType } from 'expo-camera';
import SwapCameraIcon from '../../../assets/swap-icon.svg';
import QrScannerIcon from '../../../assets/qr-scan-icon.svg';
import { FIREBASE_DB, FIREBASE_STORAGE } from '../../../firebase';
import {
  doc,
  collection,
  updateDoc,
  arrayUnion,
  Timestamp,
  increment,
} from 'firebase/firestore';
import { useAppContainer } from '../../components/container/Context';
import { getDownloadURL, ref } from 'firebase/storage';
import ImageOverlay from './ImageOverlay';
import ExcludeScreenIcon from '../../../assets/exclude-screen.svg';
import { LinearGradient } from 'expo-linear-gradient';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const { currentUserData, poiData, message, setMessage, setPointsGained } =
    useAppContainer();
  const [imageUrl, setImageUrl] = useState(
    'https://firebasestorage.googleapis.com/v0/b/bigwayar.appspot.com/o/user-profile-pic.jpeg?alt=media&token=35f46c75-611f-4532-ad8f-6f5ef9b1b670'
  );
  const [imagePosition, setImagePosition] = useState({ x: -100, y: -100 });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [scannedPoiId, setScannedPoiId] = useState('');

  const [animationValue] = useState(new Animated.Value(0));

  const navigation = useNavigation<any>();

  const startLineAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animationValue, {
          toValue: 1,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(animationValue, {
          toValue: 0,
          duration: 3000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    startLineAnimation();

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
        }
      });
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
      if (findSpecificPoi) {
        if (currentUserData?.visitedPlaces.length === 0) {
          handleAddToVisited(scannedPoiId);
          setPointsGained(findSpecificPoi.poiPoints);
          setMessage('Získali ste body');
        } else {
          currentUserData?.visitedPlaces.map(VisitedPlace => {
            if (VisitedPlace.poiId !== findSpecificPoi.id) {
              //in DB add POI to visited and increment user score
              const userDocRef = doc(
                FIREBASE_DB,
                'users',
                String(currentUserData?.id)
              );
              updateDoc(userDocRef, {
                points: increment(findSpecificPoi?.poiPoints),
              });
              handleAddToVisited(scannedPoiId);
              setPointsGained(findSpecificPoi.poiPoints);
              setMessage('Získali ste body');
            }
          });
        }
      }
      navigation.navigate('AboutPoi', {
        PoiId: scannedPoiId,
      });
      setScannedPoiId('');
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

  return (
    <Camera
      style={styles.camera}
      type={type}
      onBarCodeScanned={handleBarCodeScanned}
    >
      {/* <View style={[styles.qrSquare, styles.squareTopLeft]} />
    <View style={[styles.qrSquare, styles.squareTopRight]} />
    <View style={[styles.qrSquare, styles.squareBottomLeft]} />
    <View style={[styles.qrSquare, styles.squareBottomRight]} /> */}
      <ImageBackground
        source={
          scannedPoiId === ''
            ? require('../../../assets/background/Exclude.png')
            : 'none'
        }
        style={{
          width: Dimensions.get('screen').width,
          height: '100%',
          zIndex: 0,
        }}
      >
        <Animated.View
          style={
            scannedPoiId === ''
              ? [
                  styles.line,
                  {
                    opacity: 1,
                    transform: [
                      {
                        translateY: animationValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-140, 140],
                        }),
                      },
                    ],
                  },
                ]
              : { opacity: 0 }
          }
        >
          <LinearGradient
            colors={['rgba(46, 165, 255, 0.8)', 'rgba(46, 165, 255, 0)']}
            start={{ x: 0, y: 1 }}
            end={{ x: 0, y: 0 }}
            style={{
              width: '100%',
              height: 35,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
            }}
          />
          <LinearGradient
            colors={['rgba(46, 165, 255, 0.8)', 'rgba(46, 165, 255, 0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{
              width: '100%',
              height: 35,
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              marginTop: 0.3,
            }}
          />
        </Animated.View>

        <ImageOverlay
          imagePosition={imagePosition}
          imageSize={imageSize}
          scannedPoiId={scannedPoiId}
          handleNavigateToPoi={handleNavigateToPoi}
          imageUrl={imageUrl}
        />
        <View style={styles.controlsContainer}>
          <View style={styles.qrCodeContainer}>
            <TouchableOpacity
              style={styles.qrCodeButton}
              onPress={() => setScanned(false)}
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
      </ImageBackground>
    </Camera>
  );
};

export default CameraComponent;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  camera: {
    flex: 1,
    aspectRatio: 9 / 16,
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  line: {
    position: 'absolute',
    top: '42%',
    left: '5%',
    width: '90%',
    height: 2,
    // backgroundColor: 'red',
    transformOrigin: 'center',
    zIndex: 1,
  },
  // qrSquare: {
  //   width: '15%',
  //   height: '10%',
  //   borderColor: '#fff',
  //   position: 'absolute',
  // },
  // squareTopLeft: {
  //   borderTopWidth: 2,
  //   borderLeftWidth: 2,
  //   top: '50%',
  //   left: '25%',
  //   transform: [{ translateY: -100 }],
  // },
  // squareTopRight: {
  //   borderTopWidth: 2,
  //   borderRightWidth: 2,
  //   top: '50%',
  //   right: '25%',
  //   transform: [{ translateY: -100 }],
  // },
  // squareBottomLeft: {
  //   borderBottomWidth: 2,
  //   borderLeftWidth: 2,
  //   bottom: '50%',
  //   left: '25%',
  //   transform: [{ translateY: 105 }],
  //   zIndex: 10,
  // },
  // squareBottomRight: {
  //   borderBottomWidth: 2,
  //   borderRightWidth: 2,
  //   bottom: '50%',
  //   right: '25%',
  //   transform: [{ translateY: 105 }],
  //   zIndex: 10,
  // },
  controlsContainer: {
    position: 'absolute',
    bottom: 20,
    width: Dimensions.get('screen').width,
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
