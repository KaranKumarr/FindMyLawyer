import { View, Text } from 'react-native';
import React from 'react';

const NormalText = ({ children, classNames, onPress }) => {
    return (
        <Text onPress={onPress} style={{
            fontFamily: 'Lora_400Regular',
        }} className={`text-neutral-contrast text-base ${classNames} `} >{children}</Text>
    );
};

export default NormalText;