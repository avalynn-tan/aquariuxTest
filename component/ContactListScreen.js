import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { List } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import contactListJSON from '../json/data.json';

const {height, width} = Dimensions.get('window');

function ContactListScreen(props) {
    const [contactInfoList, setContactInfoList] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    let tempContactList = async function () {
        try {
            await AsyncStorage.clear();
            await AsyncStorage.setItem('contactList', JSON.stringify(contactListJSON));
        } catch (error) {
            // Error saving data
            console.log(error, 'Something went wrong.');
        }
        setContactInfoList(contactListJSON);
        console.log('ContactListScreen', props);
        props.navigation.setParams({ contactList: contactListJSON });
    };

    useEffect(() => {
        // run once only when first time come in this component
        tempContactList();
    }, [])

    const onRefresh = async () => {
        setRefreshing(true);
        
        setContactInfoList(JSON.parse(await AsyncStorage.getItem('contactList'))); // reset contact list to default based data in data.json
        setRefreshing(false);
    };

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.listItem}
                onPress={() => {
                    console.log(props);
                    props.navigation.navigate('Profile', { profile: item, contactList: contactInfoList });
                }}
            >
                <View style={styles.circle} />
                <Text style={styles.listItemText}>{item.firstName} {item.lastName}</Text>
            </TouchableOpacity>
            
        );
    };

    return (
        <List>
            <FlatList
                style={{
                    margin: height * 0.01
                }}
                data={contactInfoList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </List>
    );
}

const styles = StyleSheet.create({
    listItem: {
        height: height * 0.08,
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        // marginTop: 5,
        // marginBottom: 5,
        // paddingTop: height * 0.01,
        // paddingBottom: height * 0.01,
        // paddingLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ebebec',
        
    },
    listItemText: {
        marginLeft: width * 0.03
    },
    circle: {
        height: height * 0.045,
        width: height * 0.045,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: "#ff8c00",
    }
});

export default ContactListScreen;
