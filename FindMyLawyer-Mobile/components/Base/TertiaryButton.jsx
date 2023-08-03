import React from 'react';
import BaseButton from './BaseButton';

const TertiaryButton = ({ children, onPress, classNames, classNameText }) => {

    return (
        <BaseButton
            onPress={onPress}
            classNameText={`text-secondary-b ${classNameText}`}
            classNames={`${classNames}`}>
            {children}
        </BaseButton>
    );
};

export default TertiaryButton;