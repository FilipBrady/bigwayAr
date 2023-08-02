import { View, Text, TextInput, StyleSheet } from 'react-native';
import React from 'react';

type formInputProps = {
  placeholder: string;
  secured: boolean;
  icon: any;
  onChangeText: any;
  changedText: any;
  inputMode?: 'text' | 'numeric';
};

const FormInput = ({
  placeholder,
  secured,
  icon,
  onChangeText,
  changedText,
  inputMode,
}: formInputProps) => {
  return (
    <View>
      <View
        style={[
          styles.textInputIcon,
          {
            transform: [{ translateY: 10 }, { translateX: 7 }],
          },
        ]}
      >
        {icon}
      </View>
      <TextInput
        inputMode={inputMode ? inputMode : 'text'}
        placeholder={placeholder}
        secureTextEntry={secured}
        placeholderTextColor='#FFF'
        style={styles.textInput}
        onChangeText={text => onChangeText(text)}
        value={changedText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 3,
    borderBottomColor: '#FFFFFF',
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 18.87,
    fontWeight: '400',
    paddingLeft: 62,
    marginBottom: 25,
  },
  textInputIcon: {
    position: 'absolute',
  },
});

export default FormInput;
