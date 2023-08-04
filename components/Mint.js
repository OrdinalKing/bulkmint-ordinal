import React, { useState, useEffect } from 'react'
import { Container, Nav, Navbar, Modal, Button } from 'react-bootstrap'
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
    let receiveAddress = address;
    let files = []
    const SNSText = '1'
    files.push({
      filename: SNSText,
      dataURL: 'data:text/plain;charset=utf-8;base64,' + btoa(SNSText),
    })

    const url = '/unisat/base/inscribe/order'

    const params = {
      balance: 546,
      brand: '-',
      feeRate: 16,
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
        console.log(txid)
      } catch (e) {
        console.log(e);
      }
    }
    catch (e) {
      console.log('ordinal request fail..');
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
