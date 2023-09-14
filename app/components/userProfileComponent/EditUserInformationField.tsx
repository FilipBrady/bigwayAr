import { View, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CancleIcon from '../../../assets/cancle-icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useAppContainer } from '../container/Context';
import { updateEmail, updatePassword } from 'firebase/auth';
import SuccesIcon from '../../../assets/succes-icon.svg';

type EditUserInfoFieldProps = {
  setIsFormVisible: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      editedValue: string;
      defaultValue: string;
    }>
  >;
  isFormVisible: {
    isOpen: boolean;
    editedValue: string;
    defaultValue: string;
  };
};
const EditUserInformationField = ({
  setIsFormVisible,
  isFormVisible,
}: EditUserInfoFieldProps) => {
  const [editedValue, setEditedValue] = useState(isFormVisible.defaultValue);
  const { currentUserData } = useAppContainer();
  const userId = currentUserData?.id;
  const updateUserInfo = async () => {
    if (
      userId !== undefined &&
      editedValue !== '' &&
      FIREBASE_AUTH.currentUser !== null
    ) {
      const userDbRef = doc(FIREBASE_DB, 'users', userId);
      if (isFormVisible.editedValue === 'name') {
        try {
          await updateDoc(userDbRef, {
            name: editedValue,
          });
          setIsFormVisible({
            isOpen: false,
            editedValue: '',
            defaultValue: '',
          });
        } catch (error) {
          console.log(error);
        }
      } else if (isFormVisible.editedValue === 'email') {
        try {
          await updateDoc(userDbRef, {
            email: editedValue,
          });
          await updateEmail(FIREBASE_AUTH.currentUser, editedValue);
          setIsFormVisible({
            isOpen: false,
            editedValue: '',
            defaultValue: '',
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          await updatePassword(FIREBASE_AUTH.currentUser, editedValue);
          setIsFormVisible({
            isOpen: false,
            editedValue: '',
            defaultValue: '',
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25,
        width: '100%',
        gap: 10,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.3}
        onPress={() =>
          setIsFormVisible({ isOpen: false, editedValue: '', defaultValue: '' })
        }
      >
        <CancleIcon rotation={180} width={20} height={20} />
      </TouchableOpacity>
      <TextInput
        placeholder={isFormVisible.defaultValue}
        style={styles.inputField}
        value={editedValue}
        onChangeText={text => setEditedValue(text)}
      />
      <SuccesIcon width={30} onPress={updateUserInfo} />
    </View>
  );
};

export default EditUserInformationField;

const styles = StyleSheet.create({
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    width: '90%',
    height: 25,
    paddingHorizontal: 21,
    paddingVertical: 5,
    fontSize: 16,
    marginVertical: 15,
  },
});
