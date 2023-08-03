import { View, ScrollView, FlatList } from 'react-native';
import React, { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import StandardInput from '../Base/StandardInput';
import PrimaryButton from '../Base/PrimaryButton';
import SecondaryButton from '../Base/SecondaryButton';
import TertiaryButton from '../Base/TertiaryButton';
import Heading from '../Base/Heading';
import { LogBox } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import validator from 'validator';

const LawyerSignUpForm = () => {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('03');
    const [address, setAddress] = React.useState('');
    const [selectedCity, setSelectedCity] = React.useState('');
    const [name, setName] = React.useState('');
    const [license, setLicense] = React.useState(null);
    const [keywords, setKeywords] = React.useState([]);
    const [newKeyword, setNewKeyword] = React.useState('');
    const [dropDownOpen, setDropDownOpen] = React.useState(false);
    const [items, setItems] = React.useState([
        { label: 'Karachi', value: 'karachi' },
        { label: 'Lahore', value: 'lahore' }
    ]);
    const [errorMessage, setErrorMessage] = useState('');

    React.useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    const selectLicenseDocument = async () => {

        let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
            if (response.type == 'success') {
                let { name, size, uri } = response;
                let nameParts = name.split('.');
                let fileType = nameParts[nameParts.length - 1];
                var fileToUpload = {
                    name: name,
                    size: size,
                    uri: uri,
                    type: "application/" + fileType
                };
                console.log(fileToUpload, '...............file');
                setLicense(fileToUpload);
            }
        });
        console.log(result);
        console.log("Doc: " + license?.uri);

    };

    const handleSignUp = async () => {
        if (name.length < 3) {
            setErrorMessage('Please enter correct name(as written in NIC)');
        } else if (!validator.isEmail(email)) {
            setErrorMessage('Please enter correct email');
        } else if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
        } else if (password.length < 5) {
            setErrorMessage('Password is not strong enough');
        } else if (phoneNumber.length !== 11 || !phoneNumber.startsWith('03')) {
            setErrorMessage('Please enter correct phone number');
        } else if (keywords.length < 1) {
            setErrorMessage('Please enter at least one keyword');
        } else if (!selectedCity) {
            setErrorMessage('No city selected');
        } else if (!license) {
            setErrorMessage('No license found');
        } else {
            setErrorMessage('');
        }


    };

    return (
        <ScrollView>

            <StandardInput
                value={name}
                onChangeText={(newName) => { setName(newName); }}
                classNames={'my-2.5'}
                placeholder={'Name'} />

            <StandardInput
                value={email}
                onChangeText={(newEmail) => { setEmail(newEmail); }}
                classNames={'my-2.5'}
                placeholder={'Email Address'} />

            <View className='flex-row'>
                <StandardInput
                    value={password}
                    onChangeText={(newPass) => { setPassword(newPass); }}
                    secureTextEntry={true}
                    classNames={'my-2.5 mr-2 flex-1'}
                    placeholder={'Password'} />

                <StandardInput
                    value={confirmPassword}
                    onChangeText={(newPass) => { setConfirmPassword(newPass); }}
                    secureTextEntry={true}
                    classNames={'my-2.5 ml-2 flex-1'}
                    placeholder={'Confirm Password'} />
            </View>

            <StandardInput
                inputMode={'tel'}
                value={phoneNumber}
                onChangeText={(newNumber) => { setPhoneNumber(newNumber); }}
                classNames={'my-2.5'}
                placeholder={'Phone Number'}
            />

            <View className='border-2 border-primary px-2 rounded-md my-2.5'>

                <View className='flex-row items-baseline'>
                    <StandardInput
                        onChangeText={(newKeyword) => { setNewKeyword(newKeyword); }}
                        classNames={'my-2.5 flex-1'} placeholder={'Enter Keywords(max 5)'} />
                    <TertiaryButton
                        onPress={() => setKeywords([...keywords, newKeyword])}>
                        Add
                    </TertiaryButton>
                </View>

                <View className='flex-row rounded-lg'>
                    {keywords.map((keyword, i) => {
                        return (
                            <View className='bg-secondary-a py-1 px-1.5 rounded-lg mr-1.5 mb-2.5 mt-1' key={i}>
                                <Heading classNames={'text-neutral'} size={6}>{keyword}</Heading>
                            </View>
                        );
                    })}
                </View>
            </View>

            <DropDownPicker
                contentContainerStyle={{ width: '100%', height: '100%' }}
                placeholder='City'
                className='bg-neutral border-2 border-primary my-2.5'
                open={dropDownOpen}
                value={selectedCity}
                items={items}
                setOpen={setDropDownOpen}
                setValue={setSelectedCity}
                setItems={setItems}
            />

            <SecondaryButton
                onPress={selectLicenseDocument}
                classNames={'my-2.5 p-1'}
                classNameText={`${license === null ? 'text-secondary-b' : 'text-primary'}`}
            >
                Select Lawyer License
            </SecondaryButton>


            {errorMessage ?
                <Heading size={6} classNames='text-exception mt-2.5'>{errorMessage}</Heading> :
                ''
            }

            <PrimaryButton
                onPress={handleSignUp}
                classNames={`my-5 ${!errorMessage ? '' : 'opacity-90'}`}>
                Sign In
            </PrimaryButton>

        </ScrollView>
    );
};

export default LawyerSignUpForm;