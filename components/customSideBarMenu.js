import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Platform } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { Avatar, Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { RFValue } from "react-native-responsive-fontsize";
import db from '../config';
import firebase from 'firebase';

export default class CustomSideBarMenu extends React.Component{
  constructor() {
    super();
    this.state = {
      userID: firebase.auth().currentUser.email,
      image: '#',
      name: '',
      docID: '',
    }
  }

  selectPicture = async () => {
    const { cancelled, uri } = await ImagePicker
    .launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.userID);
    }
  };

  uploadImage = async (uri, imageName) => {
    var response = await fetch(uri);
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);

    return ref.put(blob).then((response) => {
      this.fetchImage(imageName);
    });
  };

  fetchImage = (imageName) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child('user_profiles/' + imageName);

    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url });
      })
      .catch((error) => {
        this.setState({ image: '#' });
      });
  };

  getUserProfile() {
    db.collection('Users')
    .where('Email_ID', '==', this.state.userID)
    .onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.setState({
          name: doc.data().First_Name + " " + doc.data().Last_Name,
          docID: doc.id,
          image: doc.data().image,
        });
      });
    });
  }

  componentDidMount() {
    this.fetchImage(this.state.userID);
    this.getUserProfile();
  }

  render(){
    return(
      <View>
        <View
          style={{
            flex: 0.5,
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: 'orange',
          }}
        >
          <Avatar
            rounded
            source={{
              uri: this.state.image,
            }}
            size = {'xlarge'}
            onPress={() => this.selectPicture()}
            containerStyle={styles.imageContainer}
            showEditButton
          />

          <Text style={{ fontWeight: "300", fontSize: 20, color: "#fff", padding: 10 }}>
            {this.state.Name}
          </Text>

        </View>
        <View>
          <DrawerItems {...this.props}/>
        </View>
        <View>
          <TouchableOpacity
            style = {styles.logoutButton}
            onPress={()=> {
              this.props.navigation.navigate('welcomeScreen')
              firebase.auth().signOut()
            }}
          >
            <Icon
              name = 'logout'
              type = 'antdesign'
              iconStyle = {{ marginLeft: 20, marginTop: 10, }}
            />
            <Text style = {styles.logoutText}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  logoutText: {
    marginLeft: 28,
    marginTop: 11,
    fontSize: 15,
    fontWeight: 'bold',
  },
  imageContainer: {
    flex: 0.75,
    width: '40%',
    height: '20%',
    marginLeft: 20,
    marginTop: 30,
    borderRadius: 40,
  },
})