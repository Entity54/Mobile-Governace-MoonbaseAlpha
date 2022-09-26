import React, { useMemo, useEffect, useContext, useState } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, StatusBar, TextInput, ScrollView,  Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

import WalletConnectExperience from "../../../WalletConnectExperience";
import GovContext from '../../context/GovContext';
import { ethers } from 'ethers';  
import axios from 'axios';



    // import Avatars from "@components/Avatars";
    // import Icon from "@components/Icon";
import Icon from "../../components/Icon";
    // import ProgressBar from "@components/Progress/Bar";
import ProgressBar from "../../components/Progress/Bar";
    // import Tag from "@components/Tag";
import Tag from "../../components/Tag";
    // import Text from "@components/Text";
    // import { BaseColor, useTheme } from "@config";
import { BaseColor } from "../../config/theme";

import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";
// import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
 

//ntt54
//dark blue theme
// const  colors = {
//     primary: "#5DADE2",
//     primaryDark: "#1281ac",
//     primaryLight: "#68c9ef",
//     accent: "#FF8A65",
//     background: "#010101",
//     card: "#121212",
//     text: "#e5e5e7",
//     border: "#272729",
// }

//light blue theme
const colors = {
    primary: "#5DADE2",
    primaryDark: "#1281ac",
    primaryLight: "#68c9ef",
    accent: "#FF8A65",
    background: "white",
    card: "#F5F5F5",
    text: "#212121",
    border: "#c7c7cc",
};




const url = 'https://api.subquery.network/sq/Entity54/MoonbaseAlphaGov' ;
// const url = 'https://api.subquery.network/sq/Entity54/MoonbaseAlphaGovernance' ;

//#region sendGraphQLRequestFromNum
const sendGraphQLRequestFromNum = async () => {	 
    console.log(`====> SENDING  A SUBQUERY sendGraphQLRequestFromNum for blockNum: ${blockNum}`);
    let pendingNotificationsArray = [], lastBlockNumberIndexed = blockNum-1;
    
    const query = query_AllAfterBlockNum(blockNum);
    axios({ url: `${url}`, method: 'post', data: { query: query } })
    .then( async (result) => {
            // console.log("====> GRAPHQL sendRequest 4 ======> : ",result.data)
            // console.log("====> GRAPHQL sendRequest JSON.stringify(result.data)  ======> : ",JSON.stringify(result.data))

            // //voteds
            // const voteds_dataArray = result.data.data.voteds.nodes;
            // // console.log("====> GRAPHQL voted_dataArray : ",JSON.stringify(voted_dataArray));
            // console.log(" ===========>>>>>> GRAPHQL voted_dataArray");
            // if (voteds_dataArray.length>0)
            // {
            //     voteds_dataArray.forEach((elem) => {
            //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.voterAccountId: ${elem.voterAccountId} elem.refIndex: ${elem.refIndex} elem.voteBalance: ${elem.voteBalance} elem.voteConvictionNum: ${elem.voteConvictionNum} elem.voteLock: ${elem.voteLock} elem.voteDirection: ${elem.voteDirection} elem.voteAye: ${elem.voteAye} elem.voteNay: ${elem.voteNay} elem.voteTypeStandard: ${elem.voteTypeStandard}  elem.extrinsicHash: ${elem.extrinsicHash}`);
            //         const notificationPayload = {
            //             id: elem.id,
            //             eventTrigger: "voted",
            //             blockNum: elem.blockNum,
            //             timestamp: elem.timestamp,
            //             title: `New ${elem.voteDirection} Vote for referendum:${elem.refIndex}`, 
            //             body: `Account ${elem.voterAccountId} has just voted ${elem.voteDirection} for referendum ${elem.refIndex} with ${elem.voteBalance} tokens and ${elem.voteLock} conviction.`
            //         }
            //         pendingNotificationsArray.push(notificationPayload);
            //         lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
            //     })
            // }
            // else console.log(`voteds_dataArray is blank`);

            // //preImageNoteds
            // const preImageNoteds_dataArray = result.data.data.preImageNoteds.nodes;
            // console.log(" ===========>>>>>> GRAPHQL preImageNoteds_dataArray");
            // // console.log("====> GRAPHQL preImageNoteds_dataArray : ",JSON.stringify(preImageNoteds_dataArray));
            // if (preImageNoteds_dataArray.length>0)
            // {
            //     preImageNoteds_dataArray.forEach((elem) => {
            //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.preImageHash: ${elem.preImageHash} elem.preImageAccountId: ${elem.preImageAccountId} elem.preImageStorageFees: ${elem.preImageStorageFees} elem.extrinsicHash: ${elem.extrinsicHash}`);
            //         const notificationPayload = {
            //             id: elem.id,
            //             eventTrigger: "preImageNoted",
            //             blockNum: elem.blockNum,
            //             timestamp: elem.timestamp,
            //             title: `New preImage submitted`, 
            //             body: `Account ${elem.preImageAccountId} has just submitted preImage with hash ${elem.preImageHash} paying ${elem.preImageStorageFees} tokens.`
            //         }
            //         pendingNotificationsArray.push(notificationPayload);
            //         lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
            //     })
            // }
            // else console.log(`preImageNoteds_dataArray is blank`);

            // //proposeds
            // const proposeds_dataArray = result.data.data.proposeds.nodes;
            // console.log(" ===========>>>>>> GRAPHQL proposeds_dataArray");
            // // console.log("====> GRAPHQL proposeds_dataArray : ",JSON.stringify(proposeds_dataArray));
            // if (proposeds_dataArray.length>0)
            // {
            //     proposeds_dataArray.forEach((elem) => {
            //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.proposalIndex: ${elem.proposalIndex} elem.proposalDeposit: ${elem.proposalDeposit} elem.proposalAccountId: ${elem.proposalAccountId} elem.extrinsicHash: ${elem.extrinsicHash}`);
            //         const notificationPayload = {
            //             id: elem.id,
            //             eventTrigger: "proposed",
            //             blockNum: elem.blockNum,
            //             timestamp: elem.timestamp,
            //             title: `New proposal submitted`, 
            //             body: `Account ${elem.proposalAccountId} has just submitted proposal ${elem.proposalIndex} paying ${elem.proposalDeposit} tokens.`
            //         }
            //         pendingNotificationsArray.push(notificationPayload);
            //         lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
            //     })
            // }
            // else console.log(`proposeds_dataArray is blank`);


            // //secondeds
            // const secondeds_dataArray = result.data.data.secondeds.nodes;
            // console.log(" ===========>>>>>> GRAPHQL secondeds_dataArray");
            // // console.log("====> GRAPHQL secondeds_dataArray : ",JSON.stringify(secondeds_dataArray));
            // if (secondeds_dataArray.length>0)
            // {
            //     secondeds_dataArray.forEach((elem) => {
            //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.proposalIndex: ${elem.proposalIndex} elem.seconderAccountId: ${elem.seconderAccountId} elem.secondedAmount: ${elem.secondedAmount} elem.extrinsicHash: ${elem.extrinsicHash}`);
            //         const notificationPayload = {
            //             id: elem.id,
            //             eventTrigger: "seconded",
            //             blockNum: elem.blockNum,
            //             timestamp: elem.timestamp,
            //             title: `Proposal ${elem.proposalIndex} has been seconded`, 
            //             body: `Account ${elem.seconderAccountId} has just endorsed proposal ${elem.proposalIndex} paying ${elem.secondedAmount} tokens.`
            //         }
            //         pendingNotificationsArray.push(notificationPayload);
            //         lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
            //     })
            // }
            // else console.log(`secondeds_dataArray is blank`);

            // //tableds
            // const tableds_dataArray = result.data.data.tableds.nodes;
            // console.log(" ===========>>>>>> GRAPHQL tableds_dataArray");
            // // console.log("====> GRAPHQL tableds_dataArray : ",JSON.stringify(tableds_dataArray));
            // if (tableds_dataArray.length>0)
            // {
            //     tableds_dataArray.forEach((elem) => {
            //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.proposalIndex: ${elem.proposalIndex} elem.depositAmount: ${elem.depositAmount} elem.referendumIndex: ${elem.referendumIndex} elem.depositors: `,elem.depositors);
            //         let listOfDepositors="";
            //         elem.depositors.forEach(depositorAddress => listOfDepositors +=`${depositorAddress}, `);
            //         const notificationPayload = {
            //             id: elem.id,
            //             eventTrigger: "tabled",
            //             blockNum: elem.blockNum,
            //             timestamp: elem.timestamp,
            //             title: `Proposal ${elem.proposalIndex} has been tabled for referendum`, 
            //             body: `Proposal ${elem.proposalIndex} has been tabled for referendum ${elem.referendumIndex}. The proposal had ${elem.depositAmount} tokens deposited by each of the following depositors ${listOfDepositors}.`
            //         }
            //         pendingNotificationsArray.push(notificationPayload);
            //         lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
            //     })
            // }
            // else console.log(`tableds_dataArray is blank`);

            // //passeds
            // const passeds_dataArray = result.data.data.passeds.nodes;
            // console.log(" ===========>>>>>> GRAPHQL passeds_dataArray");
            // // console.log("====> GRAPHQL passeds_dataArray : ",JSON.stringify(passeds_dataArray));
            // if (passeds_dataArray.length>0)
            // {
            //     passeds_dataArray.forEach((elem) => {
            //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.referendumIndex: ${elem.referendumIndex} elem.scheduledEnactmentBlock: ${elem.scheduledEnactmentBlock}`);
            //         const notificationPayload = {
            //             id: elem.id,
            //             eventTrigger: "passed",
            //             blockNum: elem.blockNum,
            //             timestamp: elem.timestamp,
            //             title: `Referendum ${elem.referendumIndex} has been passed`, 
            //             body: `Referendum ${elem.referendumIndex} passed at block ${elem.blockNum} and timestamp ${elem.timestamp}. Enactment period is scheduled for block: ${elem.scheduledEnactmentBlock}.`
            //         }
            //         pendingNotificationsArray.push(notificationPayload);
            //         lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
            //     })
            // }
            // else console.log(`passeds_dataArray is blank`);

            //notPasseds
            // const notPasseds_dataArray = result.data.data.notPasseds.nodes;
            // console.log(" ===========>>>>>> GRAPHQL notPasseds_dataArray");
            // // console.log("====> GRAPHQL notPasseds_dataArray : ",JSON.stringify(notPasseds_dataArray));
            // if (notPasseds_dataArray.length>0)
            // {
            //     notPasseds_dataArray.forEach((elem) => {
            //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.referendumIndex: ${elem.referendumIndex}.`);
            //         const notificationPayload = {
            //             id: elem.id,
            //             eventTrigger: "notPassed",
            //             blockNum: elem.blockNum,
            //             timestamp: elem.timestamp,
            //             title: `Referendum ${elem.referendumIndex} has NOT been passed`, 
            //             body: `Referendum ${elem.referendumIndex} did NOT pass at block ${elem.blockNum} and timestamp ${elem.timestamp}.`
            //         }
            //         pendingNotificationsArray.push(notificationPayload);
            //         lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
            //     })
            // }
            // else console.log(`notPasseds_dataArray is blank`);

            // //executeds
            // const executeds_dataArray = result.data.data.executeds.nodes;
            // console.log(" ===========>>>>>> GRAPHQL executeds_dataArray");
            // // console.log("====> GRAPHQL executeds_dataArray : ",JSON.stringify(executeds_dataArray));
            // if (executeds_dataArray.length>0)
            // {
            //     executeds_dataArray.forEach((elem) => {
            //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.referendumIndex: ${elem.referendumIndex} elem.result: ${elem.result} elem.proposalHash: ${elem.proposalHash} elem.providerAccount: ${ elem.providerAccount} elem.refundedAmountString: ${elem.refundedAmountString} elem.refundedAmount: ${elem.refundedAmount}`);
            //         const notificationPayload = {
            //             id: elem.id,
            //             eventTrigger: "executed",
            //             blockNum: elem.blockNum,
            //             timestamp: elem.timestamp,
            //             title: `PreImage of referendum ${elem.referendumIndex} has been executed`, 
            //             body: `PreImage with hash ${elem.proposalHash} of referendum ${elem.referendumIndex} has been executed. The amount of ${elem.refundedAmount} tokens will be refunded to preimage provider account: ${elem.providerAccount}.`
            //         }
            //         pendingNotificationsArray.push(notificationPayload);
            //         lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
            //     })
            // }
            // else console.log(`executeds_dataArray is blank`);


            // //removeVoteCalls
            // const removeVoteCalls_dataArray = result.data.data.removeVoteCalls.nodes;
            // console.log(" ===========>>>>>> GRAPHQL removeVoteCalls_dataArray");
            // // console.log("====> GRAPHQL removeVoteCalls_dataArray : ",JSON.stringify(removeVoteCalls_dataArray));
            // if (removeVoteCalls_dataArray.length>0)
            // {
            //     removeVoteCalls_dataArray.forEach((elem) => {
            //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.signerAccountId: ${elem.signerAccountId} elem.argsIndex: ${elem.argsIndex}`);
            //         const notificationPayload = {
            //             id: elem.id,
            //             eventTrigger: "removeVoteCall",
            //             blockNum: elem.blockNum,
            //             timestamp: elem.timestamp,
            //             title: `Account ${elem.signerAccountId} has removed vote`, 
            //             body: `Account ${elem.signerAccountId} removed vote from referendum ${elem.argsIndex} at block ${elem.blockNum} and timestamp ${elem.timestamp}.`
            //         }
            //         pendingNotificationsArray.push(notificationPayload);
            //         lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
            //     })
            // }
            // else console.log(`removeVoteCalls_dataArray is blank`);

            // //unlockCalls
            // const unlockCalls_dataArray = result.data.data.unlockCalls.nodes;
            // console.log(" ===========>>>>>> GRAPHQL proposalCanceleds_dataArray");
            // // console.log("====> GRAPHQL unlockCalls_dataArray : ",JSON.stringify(unlockCalls_dataArray));
            // if (unlockCalls_dataArray.length>0)
            // {
            //     unlockCalls_dataArray.forEach((elem) => {
            //         // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.signerAccountId: ${elem.signerAccountId} elem.argsTargetAccountId: ${elem.argsTargetAccountId}`);
            //         const notificationPayload = {
            //             id: elem.id,
            //             eventTrigger: "unlockCall",
            //             blockNum: elem.blockNum,
            //             timestamp: elem.timestamp,
            //             title: `Account ${elem.argsTargetAccountId} received unlocked tokens`, 
            //             body: `Account ${elem.signerAccountId} unlocked tokens for account ${elem.argsTargetAccountId} at block ${elem.blockNum} and timestamp ${elem.timestamp}.`
            //         }
            //         pendingNotificationsArray.push(notificationPayload);
            //         lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
            //     })
            // }
            // else console.log(`unlockCalls_dataArray is blank`);


            //activeProposalsReferendaLists
            const activeProposalsReferendaLists_dataArray = result.data.data.activeProposalsReferendaLists.nodes;
            console.log(" ===========>>>>>> GRAPHQL activeProposalsReferendaLists_dataArray");
            // console.log("====> GRAPHQL activeProposalsReferendaLists_dataArray : ",JSON.stringify(activeProposalsReferendaLists_dataArray));
            if (activeProposalsReferendaLists_dataArray.length>0)
            {
                activeProposalsReferendaLists_dataArray.forEach((elem) => {
                    // console.log(`elem.id: ${elem.id} elem.blockNum: ${elem.blockNum} elem.timestamp: ${elem.timestamp} elem.now: ${elem.now} elem.lowestUnbaked: ${elem.lowestUnbaked} elem.referendumCount: ${elem.referendumCount} elem.publicPropsLength: ${elem.publicPropsLength}`);
                    console.log(` ******************************************************************* `);
                    console.log(` BlokcNumber: ${elem.blockNum} Timestmap: ${elem.timestamp} LowestUnbaked: ${elem.lowestUnbaked} ReferendumCount: ${elem.referendumCount} ProposalCount: ${elem.publicPropsLength}`);
                    let referendaList = "", referendaArray=[];
                    if (elem.referendaArray)
                    {
                        const referendaArray = JSON.parse(elem.referendaArray)
                        // console.log(`|||||>>>> elem.referendaArray ${typeof referendaArray} <<<|||||: `,elem.referendaArray);
                        const referendaHeaders = `Index\tEndBlock\tProposalHash\tEnactmentDelay\tAYES\tNAYS\tturnout\n`
                        // referendaArray.forEach(referendum => referendaList +=`${referendum.referendumIndex}\t${referendum.refrendumEndBlock}\t${referendum.refrendumProposalHash}\t${referendum.refrendumDelay}\t${web3.utils.fromWei(referendum.refrendumTally.ayes)}\t${web3.utils.fromWei(referendum.refrendumTally.nays)}\t${web3.utils.fromWei(referendum.refrendumTally.turnout)}\n`);
                        referendaArray.forEach(referendum => referendaList +=`${referendum.referendumIndex}\t${referendum.refrendumEndBlock}\t${referendum.refrendumProposalHash}\t${referendum.refrendumDelay}\t${ethers.utils.formatUnits(referendum.refrendumTally.ayes)}\t${ethers.utils.formatUnits(referendum.refrendumTally.nays)}\t${wethers.utils.formatUnits(referendum.refrendumTally.turnout)}\n`);

                    }
                    console.log(referendaList);

                    let proposaList = "";
                    if (elem.proposalList)
                    {
                        const proposalArray = JSON.parse(elem.proposalList)
                        console.log(`|||||>>>> elem.proposalList ${typeof  proposalArray} : `,elem.proposalList);

                    }
                    console.log(`proposaList: `,proposaList);

                    console.log(` ******************************************************************* `);

                    lastBlockNumberIndexed = Math.max(lastBlockNumberIndexed, Number(elem.blockNum));
                })
            }
            else console.log(`activeProposalsReferendaLists_dataArray is blank`);


            return { activeProposalsReferendaLists_dataArray};
            // return {voteds_dataArray, preImageNoteds_dataArray, proposeds_dataArray, secondeds_dataArray, tableds_dataArray, passeds_dataArray, notPasseds_dataArray, activeProposalsReferendaLists_dataArray};
            // return {voteds_dataArray, preImageNoteds_dataArray, proposeds_dataArray, secondeds_dataArray, tableds_dataArray, passeds_dataArray, notPasseds_dataArray, removeVoteCalls_dataArray, unlockCalls_dataArray, activeProposalsReferendaLists_dataArray};

    });
};
//#endregion sendGraphQLRequestFromNum





//#region NTT54
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
  

//#endregion






// const Project01 = ({
const ReferendaScreen = ({ navigation,
    style,
    onPress,
    title = "assetManage This is a Test",
    description =
    `Some sort of description for the referendum
Some sort of description for the referendum
Some sort of description for the referendum`,
    onOption,
    members = ["alpha","beta"],
    limit = 3,
    tasks = 100,
    comments = 0,
    tickets = 0,
    completedTickets = 0,
    status = "Moonbase",
}) => {
    
    
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
    
    const {wallet, scComs, scGov, updateSignerElements} = useContext(GovContext);
    

    //#region PUSH NOTIFICATIONS SET UP PERMISSIONS AND GET DEVICE TOKEN
    useEffect(() => {
        console.log(`Willl Run Queries`);
        // sendGraphQLRequestFromNum();

    },[])
    //#endregion

    
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
  
      


    //TEST
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
    //#endregion NTT54
        
    
    
    
    
    
    
    
    
    
    // const { t } = useTranslation();
    // const { colors } = useTheme();
    const { remainder, usersLimit } = useMemo(() => {
        const limitInt = parseInt(limit);
        let remainder = 0;
        let usersLimit = members;
        if (limitInt != NaN && limitInt != 0) {
            remainder = members.length - limitInt;
            usersLimit = members.slice(0, limitInt);
        }

        return {
            remainder,
            usersLimit,
        };
    }, [members, limit]);

    const percent = useMemo(() => {
        try {
            if (tickets != 0) {
                return Math.round((completedTickets / tickets) * 100);
            }
            return 0;
        } catch (error) {
            return 0;
        }
    }, [completedTickets, tickets]);

    const { statusName, statusColor } = useMemo(() => {
        switch (status) {
            case "Moonbase":
                return {
                    statusName: `${status}`, //t(status),
                    statusColor: BaseColor.blueLightColor,
                };
            case "Moonriver":
                return {
                    statusName: `${status}`, //t(status),
                    statusColor: BaseColor.blueDarkColor,
                };
            default:
                return {
                    statusName: `${status}`, //t(status),
                    statusColor: BaseColor.greenColor,
                };
        }
    }, [status]);

    return (
        <View>
         <WalletConnectExperience />

                   
        <TouchableOpacity alpha={"Angelos"} onPress={() => navigation.navigate("Referendum", {id: "Angelos2022", name:"Ntt54"})} >

        <View style={[styles.contain, style, { backgroundColor: colors.card }]}>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                        <Text title3 numberOfLines={1}>
                            {title}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        hitSlop={{ top: 10, right: 10, top: 10, left: 10 }}
                        style={{ paddingLeft: 16 }}
                        onPress={onOption}
                    >
                        <Icon name="ellipsis-h" size={14} color={colors.text}></Icon>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        paddingTop: 5,
                        paddingBottom: 10,
                    }}
                >
                    <Tag
                        light
                        textStyle={{
                            color: BaseColor.whiteColor,
                        }}
                        style={{
                            backgroundColor: statusColor,
                            paddingHorizontal: 10,
                            minWidth: 80,
                        }}
                    >
                        {statusName}
                    </Tag>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingBottom: 20,
                    }}
                >
                    <Icon name="tasks" size={14} color={colors.text} />
                    <Text
                        caption1
                        style={{
                            paddingLeft: 5,
                            paddingRight: 20,
                        }}
                    >
                        {tasks} {"tasks"}
                    </Text>

                    <Icon solid name="comment" size={14} color={colors.text} />
                    <Text
                        caption1
                        style={{
                            paddingHorizontal: 5,
                        }}
                    >
                        {comments} {"comments"}
                    </Text>
                </View>
                <Text caption2 light>
                    {description}
                </Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 20,
                    }}
                >
             
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingTop: 0,
                        paddingBottom: 5,
                        justifyContent: "space-between",
                    }}
                >
                        {/* {t("Vote Progress")} {`${percent}%`} */}
                    <Text overline>
                        {("Vote Progress")} {`${"percent100%"}%`}

                    </Text>
                
                </View>
                <ProgressBar
                    style={{ flex: 1, paddingRight: 20 }}
                    color={BaseColor.accentColor}
                    percent={percent}
                />
            </View>
        </View>

       </TouchableOpacity>

                        {/* <Button
                            title="Go to Referendum Screen"
                            onPress={() => navigation.navigate('Referendum')}
                        /> */}
        </View>
    );
};

ReferendaScreen.propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onPress: PropTypes.func,
    title: PropTypes.string,
    description: PropTypes.string,
    tasks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    completedTickets: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onOption: PropTypes.func,
};

// export default Project01;
export default ReferendaScreen;

