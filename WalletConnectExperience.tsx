import * as React from "react";
// import React, {useState} from 'react';
import {useState, useEffect, useContext} from 'react';

import GovContext from "./src/context/GovContext";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { ethers } from 'ethers';  
import WalletConnectProvider from '@walletconnect/web3-provider';
import { useWalletConnect } from "@walletconnect/react-native-dapp";

// import TextScreen from "./src/screens/TextScreen";

//Smart Contracts
import ang_raw from './src/Abis/ang.json';     
const angAddress  = "0xfbA2D41e8bE28228Ff53faf41Fe9fc0CCC506561";

const precompil_democracy_address = "0x0000000000000000000000000000000000000803";
import democracy_raw from './src/Abis/democracy.json';     


 


const shortenAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length
  )}`;
};

function Button({ onPress, label }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function WalletConnectExperience() {

  const {wallet, scComs, scGov, updateSignerElements} = useContext(GovContext);


  const connector = useWalletConnect();
  
  const updateSigner = async (_connector) => {

    const provider = new WalletConnectProvider({
      rpc: {
        1287: 'https://moonbeam-alpha.api.onfinality.io/public',
      },
      chainId: 1287,
      connector: _connector,
      qrcode: false,
    });

    await provider.enable();
    const ethers_provider = new ethers.providers.Web3Provider(provider);
    const newSigner = ethers_provider.getSigner();
    console.log(`*********** newSigner ***********`);
    const signerBalanceWEI = await newSigner.getBalance();
    const signerBalance = ethers.utils.formatUnits(signerBalanceWEI,18);
    console.log(`newSigner.getAddress: ${JSON.stringify(newSigner.getAddress())} newSigner.getBalance: ${signerBalance}`);
    console.log(`*********** newSigner ***********`);

    const sc_ang =  new ethers.Contract( angAddress, ang_raw.abi, newSigner);
    const sc_democracy =  new ethers.Contract( precompil_democracy_address, democracy_raw.abi, newSigner);

    
    updateSignerElements(newSigner, sc_ang, sc_democracy)

    //#region Old
    // const ang_number = (await sc_ang.retrieve()).toString();
    // console.log(`ang_number: ${ang_number} `,ang_number );

    // // const tx3 = await sc_ang.store(1111);
    // const tx3 = await sc_ang.store(Number(ang_number) + 1);

    // tx3.wait().then( async reslveMsg => {
    //   console.log(`tx3 for transfer is mined resolveMsg : `,reslveMsg);
    // });
    //#endregion Old


  }


  useEffect(() => {
    if (connector.connected)
    {
      console.log(`***> connector is connected connector.accounts[0]: `,connector.accounts[0],`connector.chainId: `,connector.chainId);
      updateSigner(connector);
    }
    else 
    {
      // Close provider session
      // await provider.disconnect()
      console.log(`Connector is Not Connected`);
    }
  },[connector])



  const connectWallet = React.useCallback(() => {
    return connector.connect();
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  return (
    <View style={styles.container}>
      {!connector.connected ? (
        <Button onPress={connectWallet} label="Connect a wallet" />
      ) : (
        <>
          <Text style={styles.accountText}>Account: {shortenAddress(connector.accounts[0])}</Text>
          <Button onPress={killSession} label="Log out" />
          {/* <TextScreen /> */}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#5A45FF",
    color: "#FFFFFF",
    // borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  container: {
    flexDirection: "row",
    alignItems: "center"
  },
  accountText: {
    flex:4,
    alignSelf: "center",
    backgroundColor: "#0879C2",
    color: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  }
});
