import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

const BaseButton = ({ children, onPress, classNames, classNameText }) => {

    return (
        <TouchableOpacity onPress={onPress} className={` rounded-lg font-medium px-4 py-2 transition-all flex-row justify-center items-center text-neutral-contrast ${classNames}`}>

            <Text
                style={{ fontFamily: 'Lora_500Medium' }}
                className={`text-lg tracking-wide ${classNameText}`}
            >
                {children}
            </Text>

        </TouchableOpacity>
    );
};

export default BaseButton;