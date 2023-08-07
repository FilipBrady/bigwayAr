import { View, Text, TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';

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
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <View
        style={[
          styles.textInputIcon,
          {
            transform: [{ translateY: 12 }, { translateX: 7 }],
          },
        ]}
      >
        {icon}
      </View>
      <TextInput
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        inputMode={inputMode ? inputMode : 'text'}
        placeholder={placeholder}
        secureTextEntry={secured}
        placeholderTextColor='#FFF'
        style={isFocused ? styles.textInputFocused : styles.textInput}
        onChangeText={text => onChangeText(text)}
        value={changedText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 18.87,
    fontWeight: '400',
    paddingLeft: 62,
    marginBottom: 25,
  },
  textInputFocused: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFFFFF',
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 18.87,
    fontWeight: '400',
    paddingLeft: 62,
    marginBottom: 25,
    backgroundColor: '#ffffff75',
    borderWidth: 0,
  },
  textInputIcon: {
    position: 'absolute',
  },
});

export default FormInput;
