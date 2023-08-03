import React from 'react';
import BaseButton from './BaseButton';

const PrimaryButton = ({ children, onPress, classNames, classNameText }) => {

    return (
        <BaseButton
            onPress={onPress}
            classNameText={`text-neutral ${classNameText}`}
            classNames={`bg-primary ${classNames}`}>
            {children}
        </BaseButton>
    );
};

export default PrimaryButton;