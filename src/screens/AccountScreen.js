import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';


const encryptToken= async () => {
  console.log(`****** Encrypt and Pass Token *******`);
}

const registerForNotifications= async () => {
    console.log(`****** Register For Notifications *******`);

}
const unRegisterForNotifications= async () => {
  console.log(`****** Register For Notifications *******`);

}

const AccountScreen = ({navigation}) => {

  return (
    <View style={styles.container} >

        <TouchableOpacity style={styles.input} onPress={() => registerForNotifications() } >
          <Text style={styles.text} >Register for notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.input} onPress={() => unRegisterForNotifications() } >
          <Text  style={styles.text}>Unregister for notifications</Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: "white",
    // alignContent
    

  },
  input: {
    margin: 15,
    borderColor: "black",
    borderWidth: 1,
    height: 80,
    backgroundColor: 'navy',
    justifyContent: "center"

  },

  container: {
    flex: 5,
    paddingTop: StatusBar.currentHeight,
    alignSelf: 'center',
    justifyContent: "center"
  },
});

export default AccountScreen;
