import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useAppContainer } from '../container/Context';
import EditIcon from '../../../assets/edit-icon.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GlobalStyles } from '../../styles/GlobalStyles';
import EditUserInformationField from './EditUserInformationField';

const EditUserInformationsComponent = () => {
  const { currentUserData } = useAppContainer();
  const [isFormVisible, setIsFormVisible] = useState({
    isOpen: false,
    editedValue: '',
    defaultValue: '',
  });

  return (
    <View style={{ marginTop: 47 }}>
      <View>
        {isFormVisible.isOpen && isFormVisible.editedValue === 'name' ? (
          <View style={{ width: '90%' }}>
            <EditUserInformationField
              setIsFormVisible={setIsFormVisible}
              isFormVisible={isFormVisible}
            />
          </View>
        ) : (
          <View style={styles.infoBox}>
            <Text style={GlobalStyles.BigTextBlueRegular}>
              {currentUserData?.name}
            </Text>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() =>
                setIsFormVisible({
                  isOpen: true,
                  editedValue: 'name',
                  defaultValue: String(currentUserData?.name),
                })
              }
            >
              <EditIcon width={19} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {isFormVisible.isOpen && isFormVisible.editedValue === 'email' ? (
          <View style={{ width: '90%' }}>
            <EditUserInformationField
              setIsFormVisible={setIsFormVisible}
              isFormVisible={isFormVisible}
            />
          </View>
        ) : (
          <View style={styles.infoBox}>
            <Text style={GlobalStyles.BigTextBlueRegular}>
              {currentUserData?.email}
            </Text>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() =>
                setIsFormVisible({
                  isOpen: true,
                  editedValue: 'email',
                  defaultValue: String(currentUserData?.email),
                })
              }
            >
              <EditIcon width={19} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View>
        {isFormVisible.isOpen && isFormVisible.editedValue === 'password' ? (
          <View style={{ width: '90%' }}>
            <EditUserInformationField
              setIsFormVisible={setIsFormVisible}
              isFormVisible={isFormVisible}
            />
          </View>
        ) : (
          <View style={styles.infoBox}>
            <Text style={GlobalStyles.BigTextBlueRegular}>Change Password</Text>
            <TouchableOpacity
              activeOpacity={0.3}
              onPress={() =>
                setIsFormVisible({
                  isOpen: true,
                  editedValue: 'password',
                  defaultValue: 'Password',
                })
              }
            >
              <EditIcon width={19} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default EditUserInformationsComponent;

const styles = StyleSheet.create({
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 25,
    width: '100%',
  },
});
