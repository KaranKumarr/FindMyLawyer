import { View, Text } from 'react-native';
import React from 'react';

const InputLabel = ({ children, classNames }) => {
    return (
        <Text style={{
            fontFamily: 'Lora_500Medium',
        }}
            className={`text-neutral-contrast text-lg ${classNames} `} >{children}</Text>
    );
};

export default InputLabel;