import AsyncStorage from '@react-native-community/async-storage';
import { List, ListItem } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const {height, width} = Dimensions.get('window');

function ProfileScreen(props) {
    console.log('ProfileScreen', props);

    const { params } = props.route;
    
    const [contactInfoList, setContactInfoList] = useState(props.route?.params?.contactList);
    const [firstName, setFirstName] = useState(params?.profile?.firstName);
    const [lastName, setLastName] = useState(params?.profile?.lastName);
    const [email, setEmail] = useState(params?.profile?.email);
    const [phone, setPhone] = useState(params?.profile?.phone);

    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const phoneRef = useRef();

    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    useEffect(() => {
        if(props.route?.params?.action) {
            const action = props.route?.params?.action;
            let randomId = '';
            
            // generate random id
            for ( var i = 0; i < 24; i++ ) {
                randomId += characters.charAt(Math.floor(Math.random() * characters.length));
            }

            if(firstName && lastName) {
                // setup new/updated profile
                const newProfile = {
                    id: (params?.profile?.id)?(params?.profile?.id):(randomId),
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone
                };

                // add new list
                if(action == 'Add') {
                    setContactInfoList(contactInfoList.push(newProfile));
                }
                // update profile
                else if(action == 'Update') {
                    const matchedContactIndex = contactInfoList.findIndex((contact) => contact.id === newProfile.id);
                    if(matchedContactIndex !== -1) {
                        contactInfoList[matchedContactIndex] = newProfile;
                    }
                    setContactInfoList(contactInfoList);
                }

                props?.navigation?.navigate('ContactList', { contactList: contactInfoList });
            }
            else {
                let errorField = [];

                if(!firstName) { errorField.push('First Name'); }
                if(!lastName) { errorField.push('Last Name'); }

                Alert.alert(errorField.join(', ') + ' is required');
            }
        }
    }, [params?.action])

    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <View style={styles.circle} />
            </View>
            

            {/* Main Information */}
            <List>
                <ListItem style={styles.title}>
                    <Text style={styles.titleText}>Main Information</Text>
                </ListItem>
                <ListItem>
                    <Text style={styles.listItemText}>First Name</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='First Name' 
                        defaultValue={firstName} 
                        ref={firstNameRef}
                        onChangeText={setFirstName}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            lastNameRef.current.focus();
                        }}
                    />
                    {!firstName && (
                        <Text style={{ marginLeft: width*0.02, color: "red" }}>First Name is required</Text>
                    )}
                </ListItem>
                <ListItem>
                    <Text style={styles.listItemText}>Last Name</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Last Name' 
                        defaultValue={lastName} 
                        ref={lastNameRef}
                        onChangeText={setLastName}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            emailRef.current.focus();
                        }}
                    />
                    {!lastName && (
                        <Text style={{ marginLeft: width*0.02, color: "red" }}>Last Name is required</Text>
                    )}
                </ListItem>
            </List>

            {/* Sub Information */}
            <List>
                <ListItem style={styles.title}>
                    <Text style={styles.titleText}>Sub Information</Text>
                </ListItem>
                <ListItem>
                    <Text style={styles.listItemText}>Email</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Email' 
                        defaultValue={email} 
                        ref={emailRef}
                        onChangeText={setEmail}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            phoneRef.current.focus();
                        }}
                    />
                </ListItem>
                <ListItem>
                    <Text style={styles.listItemText}>Phone</Text>
                    <TextInput 
                        style={styles.textInput}
                        placeholder='Phone' 
                        defaultValue={phone} 
                        ref={phoneRef}
                        onChangeText={setPhone}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            firstNameRef.current.focus();
                        }}
                    />
                </ListItem>
            </List>
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        backgroundColor: '#f7f7f7',
    },
    titleText: {
        marginLeft: width * 0.025
    },
    listItemText: {
        width: width * 0.2,
        marginLeft: width * 0.025
    },
    textInput : {
        width: width * 0.4,
        height: height*0.045
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    circle: {
        marginTop: height * 0.025,
        marginBottom: height * 0.025,
        height: height * 0.15,
        width: height * 0.15,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: "#ff8c00",
    }
});

export default ProfileScreen;
