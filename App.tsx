import "./global";
 
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Platform } from "react-native";
import WalletConnectProvider from "@walletconnect/react-native-dapp";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GovProvider } from "./src/context/GovContext";

import WalletConnectExperience from "./WalletConnectExperience";

const SCHEME_FROM_APP_JSON = "walletconnect-example";


import { Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
// import Icon from "./src/components/Icon";
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';

import SquareScreen from "./src/screens/SquareScreen";
import AccountScreen from "./src/screens/AccountScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import ReferendaScreen from "./src/screens/Referenda/ReferendaScreen";
import ReferendumScreen from "./src/screens/PProjectView/ReferendumScreen";
import ProposalsScreen from "./src/screens/Proposals/ProposalsScreen";
import ProposalScreen from "./src/screens/Proposal/ProposalScreen";
import NotificationScreen from "./src/screens/Notification";


















const ReferendaStack = createNativeStackNavigator();
const ReferendaStackScreen = () => {
  return (
    <ReferendaStack.Navigator>
      <ReferendaStack.Screen name="Referenda" component={ReferendaScreen} />
      <ReferendaStack.Screen name="Referendum" component={ReferendumScreen} />
    </ReferendaStack.Navigator>
  )
}

const ProposalsStack = createNativeStackNavigator();
const ProposalsStackScreen = () => {
  return (
    <ProposalsStack.Navigator>
      <ProposalsStack.Screen name="Proposals" component={ProposalsScreen} />
      <ProposalsStack.Screen name="Proposal" component={ProposalScreen} />
    </ProposalsStack.Navigator>
  )
}

const BottomTab = createBottomTabNavigator();


// export default function App() {
export default () => {
  return (
    
    <GovProvider>

      <WalletConnectProvider
        redirectUrl={ Platform.OS === "web"? window.location.origin: `${SCHEME_FROM_APP_JSON}://`}
        storageOptions={{ asyncStorage: AsyncStorage,}}
        >


          <NavigationContainer>

                                {/* <WalletConnectExperience  /> */}
                                {/* <App /> */}

            {/* <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}> */}
            <BottomTab.Navigator screenOptions={{
                headerStyle: { backgroundColor: '#3c0a6b'},
                headerTintColor: 'white',
                tabBarActiveTintColor: '#3c0a6b'
            }} >

              <BottomTab.Screen name="Referenda" component={ReferendaStackScreen} options={{
                tabBarIcon: ({color, size}) => ( 
                // <Ionicons name="poll" color={color} size={size} /> 
                <FontAwesome5 name="poll" size={24} color={color} />
                ),
              }}
              />
              <BottomTab.Screen name="Proposals" component={ProposalsStackScreen} options={{
                tabBarIcon: ({color, size}) => ( 
                // <Ionicons name="vote-yea" color={color} size={size} /> 
                <FontAwesome5 name="vote-yea" size={24} color={color} />
                ),
              }}
              />
              <BottomTab.Screen name="History" component={HistoryScreen} options={{
                tabBarIcon: ({color, size}) => ( 
                // <Ionicons name="person-booth" color={color} size={size} /> 
                <FontAwesome5 name="person-booth" size={24} color={color} />

                ),
              }}
              />

              <BottomTab.Screen name="Notifications" component={NotificationScreen} options={{
                tabBarIcon: ({color, size}) => ( 
                // <Ionicons name="exclamation-triangle" color={color} size={size} /> 
                // <FontAwesome5 name="exclamation-triangle" size={24} color={color} />

                <View>
               
                 <FontAwesome5 name="exclamation-triangle" size={24} color={color} />

                <View
                    style={{
                        borderWidth: 1,
                        borderColor: "white", ///BaseColor.whiteColor,
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        width: 20,
                        height: 20,
                        backgroundColor: "red",
                        top: -5,
                        right: -12,
                        borderRadius: 10,
                    }}
                >
                    <Text  style={{color:"white"}}  >
                        5
                    </Text>
                </View>
            </View>

                ),
              }}
              />
                 <BottomTab.Screen name="Account" component={AccountScreen} options={{
                tabBarIcon: ({color, size}) => ( 
                // <Ionicons name="user-crcle" color={color} size={size} /> 
                <FontAwesome name="user-circle" size={24} color="black" />

                ),
              }}
              />
             
            </BottomTab.Navigator>

       </NavigationContainer>

      </WalletConnectProvider>
      
    </GovProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "flex-end",
    justifyContent: "center",
    height:50,
  },
});

//test