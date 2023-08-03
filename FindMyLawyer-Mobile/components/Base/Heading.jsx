import { View, Text } from 'react-native';
import React from 'react';


const Heading = ({ children, size, classNames }) => {

    let sizeStyle = 'text-4xl';

    if (size === 2) {
        sizeStyle = 'text-3xl';
    } else if (size === 3) {
        sizeStyle = 'text-2xl';
    } else if (size === 4) {
        sizeStyle = 'text-xl';
    } else if (size === 5) {
        sizeStyle = 'text-lg';
    } else if (size === 6) {
        sizeStyle = 'text-base';
    } else {
        sizeStyle = 'text-4xl';
    }

    return (
        <Text
            style={{
                fontFamily: 'Lora_600SemiBold',
            }}
            className={`text-neutral-contrast ${sizeStyle} ${classNames}`}>{children}</Text>
    );
};

export default Heading;
