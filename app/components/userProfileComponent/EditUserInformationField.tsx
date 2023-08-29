import {
  View,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import FormInput from '../FormInput';
import AppNavigationBar2 from '../navigation/AppNavigationBar2';
import { GlobalStyles } from '../../styles/GlobalStyles';
import CancleIcon from '../../../assets/cancle-icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAppContainer } from '../container/Context';
import { reload, updatePassword } from 'firebase/auth';

type EditUserInfoFieldProps = {
  setIsFormVisible: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      editedValue: string;
    }>
  >;
  isFormVisible: {
    isOpen: boolean;
    editedValue: string;
  };
};
const EditUserInformationField = ({
  setIsFormVisible,
  isFormVisible,
}: EditUserInfoFieldProps) => {
  const [editedValue, setEditedValue] = useState('');
  const { currentUserData } = useAppContainer();
  const userId = currentUserData?.id;
  const updateUserInfo = async () => {
    if (userId !== undefined && editedValue !== '') {
      const userDbRef = doc(FIREBASE_DB, 'users', userId);
      if (isFormVisible.editedValue === 'name') {
        try {
          await updateDoc(userDbRef, {
            name: editedValue,
          });
          setIsFormVisible({ isOpen: false, editedValue: '' });
        } catch (error) {
          console.log(error);
        }
      } else if (isFormVisible.editedValue === 'email') {
        try {
          await updateDoc(userDbRef, {
            email: editedValue,
          });
          setIsFormVisible({ isOpen: false, editedValue: '' });
        } catch (error) {
          console.log(error);
        }
      } else {
        if (FIREBASE_AUTH.currentUser !== null) {
          try {
            await updatePassword(FIREBASE_AUTH.currentUser, editedValue);
            setIsFormVisible({ isOpen: false, editedValue: '' });
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  };
  return (
    <View>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => setIsFormVisible({ isOpen: false, editedValue: '' })}
        >
          <CancleIcon rotation={180} width={30} height={30} />
        </TouchableOpacity>
        <Text style={GlobalStyles.HeadlineBlueBold}>Edit your Info</Text>
        <View />
      </View>
      <TextInput
        placeholder={`Edit your ${isFormVisible.editedValue}`}
        style={styles.inputField}
        value={editedValue}
        onChangeText={text => setEditedValue(text)}
      />
      <Button title='Potvrdiť' onPress={updateUserInfo} />
    </View>
  );
};

export default EditUserInformationField;

const styles = StyleSheet.create({
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '100%',
    paddingHorizontal: 21,
    paddingVertical: 5,
    fontSize: 16,
    marginVertical: 15,
  },
});
