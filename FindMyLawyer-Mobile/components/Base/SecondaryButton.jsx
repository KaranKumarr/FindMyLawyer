import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import BaseButton from './BaseButton';

const SecondaryButton = ({ children, onPress, classNames, classNameText, filled }) => {

    return (
        <BaseButton
            onPress={onPress}
            classNameText={`text-secondary-b  ${filled === true ? 'text-neutral' : ''}  ${classNameText}`}
            classNames={`border-2 border-secondary-b ${filled === true ? 'bg-secondary-b' : ''} ${classNames}`}
        >

            {children}
        </BaseButton>
    );
};

export default SecondaryButton;