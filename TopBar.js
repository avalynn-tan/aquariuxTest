import { Icon } from 'native-base';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function TopBar(props) {
  console.log(props);
  const type = props?.props?.route?.params?.type;

  function addContact() {
    props.props.navigation.setParams({
      ...props.props.route.params,
      action: 'Add'
    });
  }

  function updateContact() {
    props.props.navigation.setParams({
      ...props.props.route.params,
      action: 'Update'
    });
  }

  return (
    (props.props.route.name == 'ContactList')? 
      // for Contact list header
      (<View style={styles.container}>
        <TouchableOpacity onPress={() => { console.log('Search'); }} >
          <Icon name={'search1'} type={'AntDesign'} style={styles.themeColor} />
        </TouchableOpacity>

        <Text>Contacts</Text>

        <TouchableOpacity onPress={() => { props.props.navigation.navigate('Profile', { ...props.props.route.params, type: 'Add' })}} >
          <Icon name={'plus'} type={'AntDesign'} style={styles.themeColor} />
        </TouchableOpacity>
      </View>) 
    :
      // for Profile header
      (<View style={styles.container}>
        <TouchableOpacity onPress={() => { props.props.navigation.goBack() }} >
          <Text style={styles.themeColor}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { 
          if(type == 'Add') { // add contact
            addContact();
          }
          else { // update contact
            updateContact();
          }
         }} >
          <Text style={styles.themeColor}>{(type == 'Add')?'Add':'Save'}</Text>
        </TouchableOpacity>
      </View>) 
  );
}
  
const styles = StyleSheet.create({
  themeColor: {
    color: '#ff8c00'
  },
  container: {
    alignSelf: 'stretch',
    height: 52,
    flexDirection: 'row', // row
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
    justifyContent: 'space-between', // center, space-around
    paddingLeft: 10,
    paddingRight: 10
  }
});

export default TopBar;