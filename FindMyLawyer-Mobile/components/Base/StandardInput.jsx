import { View, TextInput } from 'react-native';
import React from 'react';

const StandardInput = ({ onChangeText, inputMode, placeholder, value, keyboardType, secureTextEntry, classNames, multiline, numberOfLines, maxLength, onSubmitEditing, returnKeyType, onKeyPress }) => {
    return (
        <>
            <TextInput
                onKeyPress={onKeyPress}
                returnKeyType={returnKeyType}
                onSubmitEditing={onSubmitEditing}
                maxLength={maxLength}
                style={{
                    fontFamily: 'Lora_500Medium',
                    textAlignVertical: 'top'
                }}
                multiline={multiline}
                numberOfLines={numberOfLines}
                inputMode={inputMode}
                secureTextEntry={secureTextEntry}
                keyboardAppearance='dark'
                placeholderTextColor={'#9a9c9a'}
                className={` border-b-2 border-primary p-1 text-base ${classNames}`}
                onChangeText={onChangeText}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType}
            />
        </>
    );
};

export default StandardInput;