import React, {useEffect, useContext, useState} from 'react';
// import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

// import detectEthereumProvider from '@metamask/detect-provider'; // FOR METAMASK TO BE USED This function detects most providers injected at window.ethereum

import WalletConnectExperience from "../../WalletConnectExperience";

import GovContext from '../context/GovContext';

import { ethers } from 'ethers';  



//#region *** Allows us to see scheduled notifications nut not enough to open the notification start ***/
Notifications.setNotificationHandler({
  handleNotification: async () => {
      return {
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowAlert: true
      }
  }
});
//#endregion *** Allows us to see scheduled notifications nut not enough to open the notification end ***/


//#region // START: NEWLY ADDED FUNCTIONS This is needed for Local notifications in iOS////
const allowsNotificationsAsync = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};
 
const requestPermissionsAsync = async () => {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
};
//#endregion // END: NEWLY ADDED FUNCTIONS ////





// const HomeScreen = (props) => {
const HomeScreen = ({navigation}) => {
  // console.log(props);
  // console.log(props.navigate);

    const [scNumber, setScNumber] = useState();
    const [proposalTokens, setProposalTokens] = useState();
    const [lowestUnbaked, setLowestUnbaked] = useState();
    const [numOfProposals, setNumOfProposals] = useState();


    const [propIndexToSecond, setPropIndexToSecond]  = useState();
    const [refIndex, setRefIndex]  = useState();
    const [voteAmount, setVoteAmount]  = useState();
    const [convictionIndex, setConvictionIndex]  = useState();

    const [proposalHash, setProposalHash]  = useState();
    const [proposalAmount, setProposalAmount]  = useState();
    const [encodedProposal, setEncodedProposal]  = useState();
    const [representativeAddress, setRepresentativeAddress]  = useState();
    const [unlockTargetAddress, setUnlockTargetAddress]  = useState();



    // const {name , addNewName} = useContext(GovContext);
    const {wallet, scComs, scGov, updateSignerElements} = useContext(GovContext);

    
    //#region Read Governance Precompile
    const getTokensDepositedFroProposal = async (proposalIndexNum) => {
      if (scGov)
      {
        const tokensWEI= await scGov.depositOf(parseInt(proposalIndexNum));
        console.log(` *****> tokensWEI.toString(): ${tokensWEI.toString()} `);
        const tokens_DEV = ethers.utils.formatUnits(tokensWEI,18);
        console.log(`tokens in DEV: ${tokens_DEV}`)
        setProposalTokens(tokens_DEV);
      }
      else console.log(`****** getTokensDepositedFroProposal is run but scGov does not exist *******`);

    }
  
    const getLowestUnbaked = async () => {
      if (scGov)
      {
        const _lowestUnbaked= await scGov.lowestUnbaked();
        console.log(` *****> _lowestUnbaked: ${_lowestUnbaked} `);
        setLowestUnbaked(_lowestUnbaked.toString());
      }
      else console.log(`****** getLowestUnbaked is run but scGov does not exist *******`);
    }

    const getNumOfProposals = async () => {
      if (scGov)
      {
        const _numOfProposals= await scGov.publicPropCount();
        console.log(` *****> _numOfProposals: ${_numOfProposals} `);
        setNumOfProposals(_numOfProposals.toString());
      }
      else console.log(`****** getNumOfProposals is run but scGov does not exist *******`);
    }
    //#endregion Read Governance Precompile

    
    const second = async (propIndex, secondsUpperBound=100) => {
      if (scGov)
      {
        //TODO propIndex is a valid Index
        const proposalAmount = await getTokensDepositedFroProposal(propIndex);
        //TODO THE WALLET HAS ENOUGH TOKENS TO SECOND THIS
        
        const tx = await scGov.second(propIndex, secondsUpperBound);
        tx.wait().then( async reslveMsg => {
          console.log(`tx to second a proposal is mined resolveMsg : `,reslveMsg);
        });

      }
      else console.log(`****** second is run but scGov does not exist *******`);
    }

    const standardVote = async (refIndex, isAye, amount, convictionNum = 0 ) => {
      if (scGov)
      {
        const amountWEI = ethers.utils.parseUnits(amount,18);
        const tx = await scGov.standardVote(refIndex, isAye, amountWEI, convictionNum) ;
        tx.wait().then( async reslveMsg => {
          console.log(`tx to standardVote a proposal is mined resolveMsg : `,reslveMsg);
        });

      }
      else console.log(`****** standardVote is run but scGov does not exist *******`);
    }

    const propose = async (proposalHash, amount) => {
      if (scGov)
      {
        const amountWEI = ethers.utils.parseUnits(amount,18);
        const tx = await scGov.propose(proposalHash, amountWEI);
        tx.wait().then( async reslveMsg => {
          console.log(`tx to propose a proposal is mined resolveMsg : `,reslveMsg);
        });

      }
      else console.log(`****** propose is run but scGov does not exist *******`);
    }

    const removeVote = async (refIndex) => {
      if (scGov)
      {
        const tx = await scGov.removeVote(refIndex);
        tx.wait().then( async reslveMsg => {
          console.log(`tx to removeVote from a referenum is mined resolveMsg : `,reslveMsg);
        });

      }
      else console.log(`****** removeVote is run but scGov does not exist *******`);
    }

    const delegate = async (_representativeAddress, convictionNum, amount) => {
      if (scGov)
      {
        const amountWEI = ethers.utils.parseUnits(amount,18);
        console.log(`_representativeAddress: ${_representativeAddress} convictionNum: ${convictionNum} amountWEI: ${amountWEI}`);
        const tx = await scGov.delegate(_representativeAddress, convictionNum, amountWEI);
        tx.wait().then( async reslveMsg => {
          console.log(`tx to delegate a votie to ${_representativeAddress} is mined resolveMsg : `,reslveMsg);
        });

      }
      else console.log(`****** delegate is run but scGov does not exist *******`);
    }

    const unDelegate = async () => {
      if (scGov)
      {
        const tx = await scGov.unDelegate();
        tx.wait().then( async reslveMsg => {
          console.log(`tx to unDelegate is mined resolveMsg : `,reslveMsg);
        });

      }
      else console.log(`****** unDelegate is run but scGov does not exist *******`);
    }

    const unlock = async (_targetAddress) => {
      if (scGov)
      {
        const tx = await scGov.unlock(_targetAddress);
        tx.wait().then( async reslveMsg => {
          console.log(`tx to unlock from ${_targetAddress} is mined resolveMsg : `,reslveMsg);
        });

      }
      else console.log(`****** unlock is run but scGov does not exist *******`);
    }

    const notePreimage = async (_encodedProposal) => {
      if (scGov)
      {
        const tx = await scGov.notePreimage(_encodedProposal);
        tx.wait().then( async reslveMsg => {
          console.log(`tx to notePreimage is mined resolveMsg : `,reslveMsg);
        });

      }
      else console.log(`****** notePreimage is run but scGov does not exist *******`);
    }

    const noteImminentPreimage = async (_encodedProposal) => {
      if (scGov)
      {
        const tx = await scGov.noteImminentPreimage(_encodedProposal);
        tx.wait().then( async reslveMsg => {
          console.log(`tx to noteImminentPreimage is mined resolveMsg : `,reslveMsg);
        });

      }
      else console.log(`****** noteImminentPreimage is run but scGov does not exist *******`);
    }
  



    const getSCNumber = async () => {
        if (scComs)
        {
          const ang_number2 = (await scComs.retrieve()).toString();
          console.log(` *****> ang_number2: ${ang_number2} `);
          setScNumber(ang_number2)
        }
        else console.log(`****** getSCNumber is run but scComs does not exist *******`);

    }


    const setSCNumber = async (newNum) => {
        if (scComs)
        {
          const tx = await scComs.store(newNum);
          tx.wait().then( async reslveMsg => {
            console.log(`tx for transfer is mined resolveMsg : `,reslveMsg);
          });

        }
        else console.log(`****** setSCNumber is run but scComs does not exist *******`);

    }




  //#region PUSH NOTIFICATIONS SET UP PERMISSIONS AND GET DEVICE TOKEN
  useEffect(() => {
    
    //We have added Alert and Platform form reac-native above
    const configurePushNotifications = async () => {
      //Check if the user has enabled permissions
      const {status} = await Notifications.getPermissionsAsync();
      let finalStatus = status;
       
      //if permissions not enabled ask the user to enable it
      if (finalStatus!=='granted') {
        const {status} = Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      //if after the above request still not permissions enable just alert the user
      if (finalStatus!=='granted') {
        Alert.alert('Permission required', 'Push notifications need the appropriate permissions.');
        return;
      }

      //if you reach this stage then all permissions needed has been enabled we can proceed and get the unique device token
      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log('pushTokenData: ',pushTokenData);   //see this being printed NOTE THIS IS SENITIVE INFORMATION

      //For Android we need an extra step in setting up a channell and stating the importance of the notifications
      if (Platform.OS==='android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.DEFAULT
        })
      }
    

    }

    configurePushNotifications();
  },[])
  //#endregion


  //#region *** EVENT LISTENERS FOR RECEIVING NOTIFICATIONS  ***/ start
  useEffect(() => {
   
    //event listener no matter whether the user Taps the nitification or not
    const subscription1 = Notifications.addNotificationReceivedListener((notificationObject) => {
      console.log('Notification Received');
      console.log(notificationObject);
      const userName = notificationObject.request.content.data.userName;
      console.log(`USER NAME : ${userName}`);
    });

    //event listener when the user taps the notification
    const subscription2 = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('Notification Response Received');
      console.log(response);
      const userName = response.notification.request.content.data.userName;
      console.log(`USER NAME FROM RESPONSE : ${userName}`);
    });


    return () => {
      //removing event listeners to avoid memory leaks
      subscription1.remove();
      subscription2.remove();
    }
  },[])
  //#endregion *** EVENT LISTENERS FOR RECEIVING NOTIFICATIONS  ***/ end


  //#region *** ALLOWS THE CREATION OF LOCAL SCHEDULED NOTIFICATIONS *** start
  // const trigger = new Date(Date.now() + 60 * 60 * 1000);
  // trigger.setMinutes(0);
  // trigger.setSeconds(0);
  // trigger,
  const angScheduleNotificationHanlder = async () => {

    ////iOS START: CALL FUNCTIONS HERE NEEDED FOR IOS////
    const hasPushNotificationPermissionGranted = await allowsNotificationsAsync();
  
    if (!hasPushNotificationPermissionGranted) {
        await requestPermissionsAsync();
    }
    //// END: CALL FUNCTIONS HERE ////

    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification',
        body: 'This is the body of the notification.',
        data: { userName: 'Max'}
      },
      trigger: {
        seconds: 5,
        repeats: false
      }
    });

  }
  //#endregion *** ALLOWS THE CREATION OF LOCAL SCHEDULED NOTIFICATIONS *** end


  //#region
  //This part sends a Push notirfication and normally would be inside a server
  const sendPushNotificationHandler = () => {
    fetch('https://exp.host/--/api/v2/push/send',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: "ExponentPushToken[pM5T3fG_V66hoJMZvn7VJO]",
          title: 'Test sent from iPhone',
          body: 'This is a test that was sent from an iPhone to my Adnroid phone. Has it worked?'
        })
      }
    )
  }
  //#endregion

  return (
      <View style={styles.container}>
         <WalletConnectExperience />

        {/* <Text style={styles.text}>Hello Angelos</Text> */}

        {/* <Text style={styles.text}>This is from GovContext {name}</Text> */}
        {/* <Button title="Change Name" onPress={() => addNewName("Elena") } /> */}

        <Text style={styles.text}>The SC Number is: {scNumber}</Text>
        <Button title="READ Smart Contract" onPress={() => getSCNumber() } />
        <Button title="WRITE Smart Contract" onPress={() => setSCNumber(1212445) } />

        <ScrollView style={styles.areaScrollView}>
              <Text style={styles.textGov}>Proposal Tokens: {proposalTokens}</Text>
              <Button title="Get Tokens for Proposal" onPress={() => getTokensDepositedFroProposal("185") } />

              <Text style={styles.textGov}>Lowest Unbaked: {lowestUnbaked}</Text>
              <Button title="Get Lowest Unbaked Referendum" onPress={() => getLowestUnbaked() } />

              <Text style={styles.textGov}>Num Of Public Proposals: {numOfProposals}</Text>
              <Button title="Get total number of p[ublic proposals" onPress={() => getNumOfProposals() } />


              <Text>Enter Proposal Index To Second:</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={propIndexToSecond} onChangeText={(newValue) => setPropIndexToSecond(newValue)} />
              <Button title="Second" onPress={() => second(propIndexToSecond) } />


              <Text>Enter Referendum Index:</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={refIndex} onChangeText={(newValue) => setRefIndex(newValue)} />
              <Text>Enter Amount:</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={voteAmount} onChangeText={(newValue) => setVoteAmount(newValue)} />
              <Text>Enter Conviction (0-6)</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={convictionIndex} onChangeText={(newValue) => setConvictionIndex(newValue)} />
              <Button title="Vote Aye" onPress={() => standardVote(refIndex, true, voteAmount, convictionIndex) } />
              <Button title="Vote Nay" onPress={() => standardVote(refIndex, false, voteAmount, convictionIndex ) } />

              <Text>Remove Vote from Referendum Index:</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={refIndex} onChangeText={(newValue) => setRefIndex(newValue)} />
              <Button title="Remove Vote" onPress={() => removeVote(refIndex) } />

              <Text>Proposal Hash</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={proposalHash} onChangeText={(newValue) => setProposalHash(newValue)} />
              <Text>Proposal Amount</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={proposalAmount} onChangeText={(newValue) => setProposalAmount(newValue)} />
              <Button title="Submit Proposal" onPress={() => propose(proposalHash, proposalAmount) } />
             
              <Text>PreImage Encoded Proposal:</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={encodedProposal} onChangeText={(newValue) => setEncodedProposal(newValue)} />
              <Button title="Submit PreImage" onPress={() => notePreimage(encodedProposal) } />

              <Text>Imminentt PreImage Encoded Proposal:</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={encodedProposal} onChangeText={(newValue) => setEncodedProposal(newValue)} />
              <Button title="Submit PreImage" onPress={() => noteImminentPreimage(encodedProposal) } />


              <Text>Enter Representative Address</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={representativeAddress} onChangeText={(newValue) => setRepresentativeAddress(newValue)} />
              <Text>Enter Conviction (0-6)</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={convictionIndex} onChangeText={(newValue) => setConvictionIndex(newValue)} />
              <Text>Enter Amount:</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={voteAmount} onChangeText={(newValue) => setVoteAmount(newValue)} />
              <Button title="Delegate" onPress={() => delegate(representativeAddress, convictionIndex, voteAmount) } />
              <Button title="UnDelegate" onPress={() => unDelegate() } />
             
              <Text>Enter Account Address:</Text>
              <TextInput style={styles.input} autoCapitalize="none" autoCorrect={false} value={unlockTargetAddress} onChangeText={(newValue) => setUnlockTargetAddress(newValue)} />
              <Button title="Unlock Tokens" onPress={() => unlock(unlockTargetAddress) } />
            
        </ScrollView>


        <Button title="Schedule Local Notification" onPress={angScheduleNotificationHanlder} />
        <Button title="Send Push Notification" onPress={sendPushNotificationHandler} />

        <Button 
          title="Go to Component Demo" 
          // onPress={() => console.log("Button pressed") }
          // onPress={() => props.navigation.navigate("Components")}
          onPress={() => navigation.navigate("Components")}
        />   

        <StatusBar style='auto' />

        <Button 
          title="Go to List Demo" 
          // onPress={() => console.log("Button pressed") }
          onPress={() => navigation.navigate("List")}
        />   

        {/* <TouchableOpacity onPress={() => console.log("List pressed") } > */}
        <TouchableOpacity onPress={() => navigation.navigate("List") } >
          <Text>Go to List Demo</Text>
        </TouchableOpacity>

        <Button 
          title="Go to Image Screen" 
          // onPress={() => console.log("Button pressed") }
          onPress={() => navigation.navigate("Image")}
        />   

        <Button 
          title="Go to Color Screen" 
          // onPress={() => console.log("Button pressed") }
          onPress={() => navigation.navigate("Color")}
        />   

      <Button
        title="Go to Square Demo"
        onPress={() => navigation.navigate("Square")}
      />

      <Button
        title="Go to Text Demo"
        onPress={() => navigation.navigate("Text")}
      />

      <Button
        title="Go to Box Demo"
        onPress={() => navigation.navigate('Box')}
      />

      </View>
  ) 
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
  input: {
    margin: 15,
    borderColor: "black",
    borderWidth: 1
  },
  textGov: {
    fontSize: 30,
    color: "green"
  },
  areaScrollView: {
    backgroundColor: 'pink',
    marginHorizontal:20,
    marginVertical: 10,
    flex: 4
  },
  container: {
    flex: 10,
    paddingTop: StatusBar.currentHeight,
  },
});

export default HomeScreen;



