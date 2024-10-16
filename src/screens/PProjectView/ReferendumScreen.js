import { default as ProductSpecGrid } from "../../components/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { default as CardReport03 } from "../../components/Report03";
import { default as CardReport04 } from "../../components/Report04";
import { default as CardReport05 } from "../../components/Report05";
import Icon from "../../components/Icon";
import Tag from "../../components/Tag";
import { BaseColor } from "../../config/theme";
import { BaseStyle } from "../../config/styles";
import { Images } from "../../config/images";
import styles from "./styles";

import React, { useEffect, useState, useContext } from "react";
import { ScrollView, TouchableOpacity, View, Button, Header, Text, TextInput, StyleSheet } from "react-native";

import { ethers } from 'ethers';  
import WalletConnectExperience from "../../../WalletConnectExperience";
import GovContext from '../../context/GovContext';


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


const PProject = [
    {
        id: 2,
        title: "assetManager.registerLocalAsset",
        description:
            "Register a new local asset No information is stored in this pallet about the local asset The reason is that we dont need to hold a mapping between the multilocation and the local asset, as this conversion is deterministic Further, we dont allow xcm fee payment in local assets ",
        tasks: 105,
        tickets: 100,
        completedTickets: 90,
        comments: 200,
        status: "Moonbase",
        statusName: "Moonbase",
        members: [
            {
                id: 1,
                name: "Stevie Grarrett",
                total: "@steave.grarrent",
                image: Images.avata1,
            },
            {
                id: 2,
                name: "Kondo leyasu",
                total: "@kondo.leyasu",
                image: Images.avata2,
            },
            {
                id: 3,
                name: "Quinten Kortum",
                total: "@quinten.kortum",
                image: Images.avata3,
            },
            {
                id: 4,
                name: "Monica Ribeiro",
                total: "@monica.ribeiro",
                image: Images.avata4,
            },
            {
                id: 5,
                name: "Steve Kute",
                total: "@steve.kute",
                image: Images.profile1,
            }
        ],
    },
    {
        id: 1,
        title: "assetManager.registerLocalAsset",
        description:
            "Register a new local asset No information is stored in this pallet about the local asset The reason is that we dont need to hold a mapping between the multilocation and the local asset, as this conversion is deterministic Further, we dont allow xcm fee payment in local assets",
        tasks: 102,
        tickets: 124,
        completedTickets: 98,
        comments: 300,
        status: "Moonriver",
        statusName: "Moonriver",
        members: [
            {
                id: 4,
                name: "Monica Ribeiro",
                total: "@monica.ribeiro",
                image: Images.avata4,
            },
            {
                id: 5,
                name: "Steve Kute",
                total: "@steve.kute",
                image: Images.profile1,
            },
            {
                id: 6,
                name: "Lakshmana Dongerkerry",
                total: "@lakshmana.dongerkerry",
                image: Images.profile2,
            },
            {
                id: 1,
                name: "Steve Grarrett",
                total: "@steave.grarrent",
                image: Images.avata1,
            },
            {
                id: 2,
                name: "Kondo leyasu",
                total: "@kondo.leyasu",
                image: Images.avata2,
            },
            {
                id: 3,
                name: "Quinten Kortum",
                total: "@quinten.kortum",
                image: Images.avata3,
            },
        ],
    },
    {
        id: 3,
        title: "system.remark",
        description: "Make some on-chain remark.",
        tasks: 102,
        tickets: 100,
        completedTickets: 100,
        comments: 300,
        status: "Moonbase",
        statusName: "Moonbase",
        members: [
            {
                id: 6,
                name: "Lakshmana Dongerkerry",
                total: "@lakshmana.dongerkerry",
                image: Images.profile2,
            },
            {
                id: 7,
                name: "Chioke Okonkwo",
                total: "@chioke.okonkwo",
                image: Images.profile3,
            },
            {
                id: 8,
                name: "Lacara Jones",
                total: "@lacara.jones",
                image: Images.profile4,
            },
            {
                id: 1,
                name: "Steve Grarrett",
                total: "@steave.grarrent",
                image: Images.avata1,
            },
            {
                id: 2,
                name: "Kondo leyasu",
                total: "@kondo.leyasu",
                image: Images.avata2,
            },
        ],
    },
    {
        id: 4,
        title: "system.remark",
        description:
            "Make some on-chain remark.",
        tasks: 50,
        tickets: 90,
        completedTickets: 40,
        comments: 200,
        status: "Moonbase",
        statusName: "Moonbase",
        members: [
            {
                id: 8,
                name: "Lacara Jones",
                total: "@lacara.jones",
                image: Images.profile4,
            },
            {
                id: 1,
                name: "Steve Grarrett",
                total: "@steave.grarrent",
                image: Images.avata1,
            },
            {
                id: 6,
                name: "Lakshmana Dongerkerry",
                total: "@lakshmana.dongerkerry",
                image: Images.profile2,
            },
            {
                id: 7,
                name: "Chioke Okonkwo",
                total: "@chioke.okonkwo",
                image: Images.profile3,
            },
            {
                id: 2,
                name: "Kondo leyasu",
                total: "@kondo.leyasu",
                image: Images.avata2,
            },
        ],
    },
];





const TAGS = [
    { id: "1", icon: "wifi", name: "HTML", checked: true },
    { id: "2", icon: "bath", name: "Bootstrap" },
    { id: "3", icon: "paw", name: "CSS3" },
    { id: "4", icon: "bus", name: "Jquery" },
];

const PProjectView = ({navigation}) => {

    // const passedParamsObject = navigation.getState().routes[1].params;
    // console.log(`==============> passedParamsObject: `,passedParamsObject);
    // console.log(` ${typeof passedParamsObject} KEYS: `,Object.keys(passedParamsObject));
    // const id = passedParamsObject.id;
    // console.log(`==============> id: `,id);

    const [refIndex, setRefIndex] = useState("");
    const [refHash, setRefHash] = useState("");
    const [refTitle, setRefTitle] = useState("");
    const [refBody, setRefBody] = useState("");
    const [refAye, setRefAye] = useState("80");
    const [refNay, setRefNay] = useState("20");
    const [percentOne, setPercentOne] = useState("80");
    const [percentTwo, setPercentTwo] = useState("20");
    const [percent, setPercent] = useState("80");
    const [voteTokens, setVoteTokens] = useState("");
    const [conviction, setConviction] = useState("");


    const {wallet, scComs, scGov, updateSignerElements} = useContext(GovContext);
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



    useEffect(() => {
        const passedParamsObject = navigation.getState().routes[1].params;
        if(passedParamsObject)
        {
            setRefIndex(passedParamsObject.refIndex);
            setRefHash(passedParamsObject.refrendumProposalHash);
            const aye = `${ethers.utils.formatUnits(passedParamsObject.refrendumTallyAye)}`;
            const nay = `${ethers.utils.formatUnits(passedParamsObject.refrendumTallyNay)}`;
            setRefTitle(`Referendum ${passedParamsObject.refIndex}`);
            setRefBody(`${passedParamsObject.description}`);
            setRefAye(aye);
            setRefNay(nay);
            // const total = Number(aye) + Number(nay);
            // if (total===0) {
            //     setPercentOne("0%");   setPercentTwo("0%"); setPercent("0"); 
            // }
            // else {
            //     const ayePercent = 100 * Number(aye) / total;
            //     setPercentOne(`${ayePercent}%`);   
            //     setPercentTwo(`${100-ayePercent}%`);   
            //     setPercent(`${ayePercent}`); 
            // }
        }
    }, [navigation]);

    return (
        <SafeAreaView
            style={[BaseStyle.safeAreaView, { flex: 1 }]}
            edges={["right", "top", "left"]}
        >
         <WalletConnectExperience />

            <ScrollView
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    <Text title3>{refTitle}</Text>
                    <Text body2 light style={{ paddingVertical: 10 }}>
                        {refBody}
                    </Text>
                    <View style={styles.specifications}>
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={"0xFaCf…B63d8e"}
                            description={"Creator"}
                            
                        />
                            {/* // description={t("Creator")} */}
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={"0x7369…000000"}
                            description={"Owner"}
                            
                        />
                            {/* // description={t("Owner")} */}
                    </View>
                    <View style={styles.specifications}>
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={"129"}
                            description={"Referenda #"}
                            
                        />
                            {/* // description={t("Referenda #")} */}
                        <ProductSpecGrid
                            style={{ flex: 1 }}
                            title={
                                <Tag
                                    light
                                    style={{
                                        backgroundColor: BaseColor.grayColor,
                                        borderRadius: 5,
                                        paddingHorizontal: 5,
                                    }}
                                    textStyle={{ color: BaseColor.whiteColor }}
                                >
                                    On Going
                                </Tag>
                            }
                            description={"status"}
                            
                        />
                    </View>
                </View>

                <Text
                    headline
                    style={{
                        paddingTop: 20,
                        paddingBottom: 5,
                        marginTop: -50 
                    }}
                >
                    {"Referenda Details"}

                </Text>
                    {/* {t("Referenda Details")} */}
                <View style={{ flexDirection: "row", marginTop: 0}}>
                    <View style={{ flex: 1, paddingRight: 7 }}>
                        <CardReport03
                            style={{ marginTop: 7 }}
                            icon="chart-line"
                            title="Remaining"
                            price="3 Days 45mins"
                            time="Time"
                            blocks="Blocks"
                            percent="21,827"
                            onPress={() => navigation.navigate("FCryptol02")}
                        />
                        <CardReport03
                            style={{ marginTop: 7 }}
                            icon="chart-line"
                            title="Activate"
                            price="4 Days 1hr"
                            time="Time"
                            blocks="Block"
                            percent="#2,923,500"
                            onPress={() => navigation.navigate("FCryptol02")}
                        />
                        {/* 5 */}
                        <CardReport05
                            style={{ marginTop: 7 }}
                            title = "Turnout"
                            price = "2.3%"
                            icon = "user-friends"
                            onPress={() => navigation.navigate("FCryptol02")}
                        />

                    </View>
                    <View style={{ flex: 1, paddingLeft: 7 }}>
                        {/* 4 */}
                        <CardReport04
                            contentStyle={{ paddingBottom: 35, marginBottom: 20, marginTop: 7 }}
                            icon="credit-card"
                            title="Status"
                            title2="Support"
                            price="412"
                            aye="Aye"
                            ayeamount= {`${refAye} DEV`}
                            nayamount=  {`${refNay} DEV`}
                            percent1= "80%"
                            nay="Nay"
                            percent2= "20%"
                            percent= "80"
                            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                            onPress={() => navigation.navigate("Dashboard4")}
                        />
                    </View>
                </View>

                <View style={newStyles.backgroundStyle}>
                    <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Nummber of DEV'  style={newStyles.inputStyle} value={voteTokens} onChangeText={(newValue) => setVoteTokens(newValue)} />
                    <TextInput autoCapitalize='none'autoCorrect={false} placeholder='Conviction (0 to 6)'  style={newStyles.inputStyle} value={conviction} onChangeText={(newValue) => setConviction(newValue)} />
                </View>



                <View style={newStyles.votingbackgroundStyle}>
                    <Button style={newStyles.voteButtonStyleAye}     title="Vote Aye" onPress={() => standardVote(refIndex, true, voteTokens, conviction) } />
                    <Button style={newStyles.voteButtonStyleUnvote}  title="Unvote"   onPress={() => removeVote(refIndex) } />
                    <Button style={newStyles.voteButtonStyleNay}     title="Vote Nay" onPress={() => standardVote(refIndex, false, voteTokens, conviction ) } />


                    {/* <Button
                        title="VOTE"
                        style={{ backgroundColor: colors.primaryLight }}
                        onPress={() => {
                        navigation.goBack();
                        }}
                    >
                        {"VOTE1"}

                    </Button>
                         */}
                </View>

                <View style={{ flex: 1, paddingLeft: 7,  marginTop: 7 }}>
                </View>

                {/* <View style={{ flex: 1, paddingLeft: 7 }}>
                    <Button
                        title="UNVOTE"
                        style={{ marginTop: 7 }}
                        onPress={() => {
                        navigation.goBack();
                        }}
                    >
                        {"UNVOTE1"}

                    </Button>
                       
                </View> */}
            </ScrollView>
        </SafeAreaView>
    );
};




const newStyles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 10,
        // backgroundColor: '#93D9FF',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'center' 

    },
    votingbackgroundStyle: {
        marginTop: 10,
        // backgroundColor: '#93D9FF',
        height: 60,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10,
        flex: 1,     
        
        // justifyContent: 'center' ,
    justifyContent: 'space-between'
        

    },
    voteButtonStyleAye: {
        borderColor: '#087CBA',
        borderWidth: 2,
        // flex: 1,     
        fontSize: 15,  //default is 14
        backgroundColor: '#D3E5DD',
        width: 85,
        alignSelf: 'center',    //center the element
        justifyContent: 'center' ,
    // justifyContent: 'space-between'
    // alignItems: 'center'

    },
    voteButtonStyleNay: {
        borderColor: '#087CBA',
        borderWidth: 2,
        // flex: 1,     
        fontSize: 15,  //default is 14
        backgroundColor: '#EA6C09',
        width: 85,
        alignSelf: 'center',    //center the element
        justifyContent: 'center' ,
        backgroundColor: '#93D9FF',

    // justifyContent: 'space-between'
    // alignItems: 'center'

    },
    voteButtonStyleUnvote: {
        borderColor: '#087CBA',
        borderWidth: 7,
        // flex: 1,     
        fontSize: 15,  //default is 14
        backgroundColor: '#D3E5DD',
        width: 85,
        alignSelf: 'center',    //center the element
        justifyContent: 'center' ,
    // justifyContent: 'space-between'
    // alignItems: 'center'

    },
    
    inputStyle: {
        borderColor: '#087CBA',
        borderWidth: 2,
        flex: 1,    
        fontSize: 15,  //default is 14
        backgroundColor: '#D3E5DD',
        width: 55,
        alignSelf: 'center',    //center the element
        justifyContent: 'center' ,

    },

})

export default PProjectView;
