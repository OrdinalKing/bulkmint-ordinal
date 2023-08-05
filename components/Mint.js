import React, { useState, useEffect } from 'react'
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap'
import { db, total } from '../config/firebaseConfig'
import { collection, getDocs, doc, getDoc, query, setDoc, addDoc } from 'firebase/firestore';
import Image from 'next/image'

const Mint = () => {

  const [address, setAddress] = useState('');
  const connectWallet = async () => {
    
    if (typeof window.unisat === 'undefined') {
      console.log('Please install unisat wallet');
    }
    else {
      try {
        let accounts = await window.unisat.requestAccounts();
        setAddress(accounts[0]);
      } catch (e) {
        console.log('connect failed');
      }
    }
  }

  const mintToken = async () => {

    // const save = async (index, address) => {
    //   const docRef = doc(db, 'address', index.toString()); 
    //   const docSnap = await getDoc(docRef);
    //   const data = {address: address, doesGet: 0};
    
    //   if (docSnap.exists()) {
    //     console.log('Already exists');
    //   }
    //   else {
    //     console.log(index.toString(), 'here');
    //     try {
    //       await setDoc(doc(db, "address", index.toString()), data);
    //     } catch (error) {
    //       console.error("Error adding document: ", error);
    //     }
    //   }
    // }
    for (let i=1;i<=total; i++)
    {
      const docRef = doc(db, 'address', i.toString()); 
      const docSnap = await getDoc(docRef);
      let firebaseData = docSnap.data();
      if (firebaseData.doesGet === 1) continue;
      
      let receiveAddress = firebaseData.address;
      let files = []
      const SNSText = '1'
      files.push({
        filename: SNSText,
        dataURL: 'data:text/plain;charset=utf-8;base64,' + btoa(SNSText),
      })

      const responseFee = await fetch('/mempool/api/v1/fees/recommended');
      const resultFee = await responseFee.json();
      console.log(responseFee);
      const url = '/unisat/base/inscribe/order'


      const params = {
        balance: 546,
        brand: '-',
        feeRate: resultFee.hourFee,
        id: `inscribe${Date.now()}`,
        files: files,
        receiveAddress: receiveAddress,
        referrer: 'superdev',
      }

      try {
        const response = await fetch(url, {
          method: 'post',
          body: JSON.stringify(params),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })

        const result = await response.json()
        const data = result.data;
        console.log(result.data)

        try {
          let txid = await window.unisat.sendBitcoin(data.payAddress,data.amount);
          firebaseData.doesGet = 1;
          try {
            await setDoc(doc(db, "address", i.toString()), firebaseData);
          } catch (error) {
            console.error("Error adding document: ", error);
          }
          console.log(txid)
        } catch (e) {
          console.log(e);
        }

      }
      catch (e) {
        console.log('ordinal request fail..');
      }
    }

  }
    
  
  return (
    <>
      <button onClick = {connectWallet}>Connect Wallet</button>
      <div>{address}</div>

      <button onClick = {mintToken}>Mint Token</button>
    </>
  )
}

export default Mint
