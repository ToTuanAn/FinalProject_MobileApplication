import React, { useState, useEffect, PropTypes, Component} from 'react';
import {View, SafeAreaView, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Share from 'react-native-share';
import COLORS from '../../const/colors';
import { collection, addDoc, getDoc, doc } from "firebase/firestore"; 
import {db, auth}  from '../../../firebase'
import { userConverter } from '../converters/User';
import { onAuthStateChanged } from "firebase/auth";


const ProfileScreen = ({navigation, route}) => {

  const [userData, setUserData] = useState(null);
  //const [loading, setLoading] = useState(true);
 
  const getUser = async() => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        getDoc(doc(db, "users", uid).withConverter(userConverter)).then(docSnap => {
          if (docSnap.exists()) {
            
            setUserData(docSnap.data());
            //console.log(userData)
            
            //return docSnap.data();
          } else {
            console.log("No such document!");
          }
        })
      }
    });
  }

  useEffect(() => {
    getUser();
    //fetchPosts();
    
  });


  const shareApp = async() =>{
    const options = {
      message : 'he',
    }
    Share.open(options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    err && console.log(err);
  });

  }

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.header}>
        <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
        <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 16}}>
        {userData ? userData.name || 'No details added.' : ''}
        </Text>
      </View>
      <View style = {styles.userInfoSection}>
        <View style={{flexDirection : 'row', marginTop : 15}}>
          <Avatar.Image source={{
            uri : userData ? userData.imageurl || 'No details added.' : ''
          }}
          size={80}/>
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{userData ? userData.name || 'No details added.' : ''}</Title>
            <Caption style={styles.caption}>{userData ? userData.email || 'No details added.' : ''}</Caption>
          </View>

          <TouchableOpacity 
          style={{marginStart : 20, marginTop:30}}
          onPress = {() => navigation.navigate('EditProfileScreen')}
          >
            <Icon name = "account-edit" size = {30} />
          </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.userInfoSection}>
        <View style = {styles.row} >

        <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userData ? userData.country || 'No details added.' : ''}</Text>
        </View>

        <View style = {styles.row} >
        <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userData ? userData.phonenum || 'No details added.' : ''}</Text>
        </View>

        <View style = {styles.row} >
        <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{userData ? userData.email|| 'No details added.' : ''}</Text>

        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>

            <Title><FontAwesome name="bitcoin" size = {20}/>{userData ? userData.money : '0'}</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{userData ? userData.item : 0}</Title>
            <Caption>Pets</Caption>

          </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="credit-card" color= {COLORS.black} size={25}/>
            <Text style={styles.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress = {shareApp}>
          <View style={styles.menuItem}>
            <Icon name="share-outline" color = {COLORS.black} size={25}/>
            <Text style={styles.menuItemText}>Share Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color= {COLORS.black} size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Feather name="settings" color= {COLORS.black} size={25}/>
            <Text style={styles.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>

    </SafeAreaView>
  )
}

export default ProfileScreen;

const styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor : COLORS.white,

  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: COLORS.black,
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
