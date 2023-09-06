import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
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
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from 'firebase/storage';

const UserProfileScreen = () => {
  const { currentUserData } = useAppContainer();
  const [usersPhotoUrl, setUsersPhotoUrl] = useState(
    `${FIREBASE_AUTH.currentUser?.photoURL}`
  );
  const storageRef = ref(
    FIREBASE_STORAGE,
    `${FIREBASE_AUTH.currentUser?.uid}/profilePhoto`
  );

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      uploadFile(result.assets[0].uri);
    } else {
      console.log('User cancelled image picker');
    }
  };
  const uriToBlob = (uri: any) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error('uriToBlob failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);

      xhr.send(null);
    });
  };

  async function uploadFile(uri: any) {
    const blobFile = await uriToBlob(uri);
    try {
      uploadBytes(storageRef, blobFile as Blob).then(async snapshot => {
        console.log('snapshot', snapshot);
        const url = await getDownloadURL(storageRef);
        setUsersPhotoUrl(url);
        if (FIREBASE_AUTH.currentUser) {
          updateProfile(FIREBASE_AUTH.currentUser, {
            photoURL: url,
          });
        }
        return url;
      });
    } catch (err) {
      console.log(err);
      return null;
    }
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
          source={{ uri: usersPhotoUrl }}
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
