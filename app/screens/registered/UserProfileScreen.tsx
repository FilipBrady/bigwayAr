import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useState } from 'react';
import AppNavigationBar2 from '../../components/navigation/AppNavigationBar2';
import { useAppContainer } from '../../components/container/Context';
import { FIREBASE_AUTH, FIREBASE_STORAGE } from '../../../firebase';
import { GlobalStyles } from '../../styles/GlobalStyles';
import EditUserInformationsComponent from '../../components/userProfileComponent/EditUserInformationsComponent';
import { COLORS } from '../../styles/Colors';
import EditIcon from '../../../assets/edit-icon.svg';
import * as ImagePicker from 'expo-image-picker';
import { updateProfile } from 'firebase/auth';
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

const UserProfileScreen = () => {
  const { currentUserData } = useAppContainer();
  const [image, setImage] = useState<any>();
  const storageRef = ref(
    FIREBASE_STORAGE,
    `${FIREBASE_AUTH.currentUser?.uid}/profilePhoto`
  );

  const updateProfilePhoto = (photoUri: any) => {
    const user = FIREBASE_AUTH.currentUser;
    uploadBytesResumable(storageRef, photoUri).then(snapshot => {
      console.log('Uploaded');
    });
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      uploadFile(result.assets[0].uri, 'profilePfoto');
    } else {
      console.log('User cancelled image picker');
    }
  };
  // const uriToBlob = (uri: any) => {
  //   return new Promise((resolve, reject) => {
  //     const xhr = new XMLHttpRequest();
  //     xhr.onload = function () {
  //       // return the blob
  //       resolve(xhr.response);
  //     };
  //     xhr.onerror = function () {
  //       reject(new Error('uriToBlob failed'));
  //     };
  //     xhr.responseType = 'blob';
  //     xhr.open('GET', uri, true);

  //     xhr.send(null);
  //   });
  // };

  async function uploadFile(uri: any, filename: any) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const uploadImage = uploadBytesResumable(storageRef, blob);

    uploadImage.on(
      'state_changed',
      (snapshot: any) => {
        console.log(
          'Upload id done on ' +
            snapshot.bytesTransfered / snapshot.totalBytes +
            ' %'
        );
      },
      (error: any) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadImage.snapshot.ref).then(async downloadUrl => {});
      }
    );
  }

  return (
    <View style={styles.container}>
      <AppNavigationBar2
        navOrBack={'back'}
        screenTitle={'Nastavenia vášho účtu'}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <Image
          source={{ uri: FIREBASE_AUTH.currentUser?.photoURL }}
          width={153}
          height={153}
          style={{ width: 153, height: 153, borderRadius: 5 }}
        />
        <Pressable
          style={{
            backgroundColor: COLORS.white,
            position: 'absolute',
            top: 4,
            left: 127,
            borderRadius: 3,
            width: 23,
            height: 23,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={pickImage}
        >
          <EditIcon width={15} />
        </Pressable>
        <View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={GlobalStyles.ExtraSmallTextGrayRegulat}>
              Aktuálne miesta
            </Text>
            <Text style={GlobalStyles.BigTextBlackRegulat}>
              {currentUserData?.visitedPlaces.length}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={GlobalStyles.ExtraSmallTextGrayRegulat}>
              Aktuálny počet bodov
            </Text>
            <Text style={GlobalStyles.BigTextBlackRegulat}>
              {currentUserData?.points}
            </Text>
          </View>
        </View>
      </View>
      <EditUserInformationsComponent />
    </View>
  );
};
export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 21,
    height: '100%',
    backgroundColor: COLORS.white,
  },
});
