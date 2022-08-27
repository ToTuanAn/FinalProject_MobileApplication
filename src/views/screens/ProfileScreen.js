import React from 'react';
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




const ProfileScreen = ({navigation, route}) => {

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
  const [data,setData] = React.useState({
    userName : 'User Name',
    email : 'your@email.com',
    numsBud: 0,
    donate : 0,
    fullName :' your name',
    address : 'your address',
    phone : 'phone No',
  });

  return (
    <SafeAreaView style={styles.container} >
      <View style={styles.header}>
        <Icon name="sort-variant" size={28} onPress={navigation.toggleDrawer} />
        <Text style={{color: COLORS.primary, fontWeight: 'bold', fontSize: 16}}>
          {data.userName}
        </Text>
      </View>
      <View style = {styles.userInfoSection}>
        <View style={{flexDirection : 'row', marginTop : 15}}>
          <Avatar.Image source={{
            uri : 'https://scontent.fsgn8-3.fna.fbcdn.net/v/t39.30808-6/273798571_3047592772150453_1171043902568185126_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=tGeuSYDaILsAX-cvxJB&tn=rjuYXE7PEOaN48pk&_nc_ht=scontent.fsgn8-3.fna&oh=00_AT-R7h61g_Op9tMJEn7ta6bkKY_35WHhEt8k-N0R5CmowQ&oe=630B86F0'
          }}
          size={80}/>
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{data.fullName}</Title>
            <Caption style={styles.caption}>{data.userName}</Caption>
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
        <Icon name="map-marker-radius" color = {COLORS.black} size={20}/>
          <Text style={{marginLeft: 20}}>{data.address}</Text>
        </View>

        <View style = {styles.row} >
        <Icon name="phone" color = {COLORS.black} size={20}/>
          <Text style={{color : COLORS.black, marginLeft: 20}}>{data.phone}</Text>
        </View>

        <View style = {styles.row} >
        <Icon name="email" color = {COLORS.black} size={20}/>
          <Text style={{color : COLORS.black, marginLeft: 20}}>{data.email}</Text>
        </View>
      </View>

      <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title><FontAwesome name="dollar" size = {20}/>{data.donate}</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>{data.numsBud}</Title>
            <Caption>Buddies</Caption>
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