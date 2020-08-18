import React, { useState, useEffect } from 'react';
import Barcode from 'react-barcode';
import './BarcodeComponent.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const BarcodeComponent = (props) => {
  //Creating and initializing states for barcode and countdown time
  const [countDownTimer, setCountDownTimer] = useState('');
  const [barcode, setBarcode] = useState(' ');

  //Introducing side effects after render cycle to avoid blocking of component rendering. Passing empty array to avoid unnecessary re-rendering.
  useEffect(() => {
    fetchBarcodeHandler();
  },[]);

  //Function to call generate-barcode API using javascript Fetch API
  const fetchBarcodeHandler = () => {
    fetch('https://jet-gull-7204.twil.io/generate-barcode').then(response => 
      response.json()
    ).then(responseData => {
      setBarcode(responseData.barcode.toString());
      //Coverting UTC ISO Date string to localized Date string
      let timerCountdown = new Date(new Date(responseData.expiresAt).getTime());
      setCountDownTimer(timerCountdown);
    });
  };

  //Function to calculate and return remaining time for expiry
  const getExpiryTime = () => {
    const timeRemaining = new Date(countDownTimer) - new Date();
    let timeLeft = {};
    if(timeRemaining > 0) {
      timeLeft = {
        days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeRemaining / (1000 * 60 * 60)) % 24), 
        minutes: Math.floor((timeRemaining / 1000 / 60) % 60),
        seconds: Math.floor((timeRemaining / 1000) % 60)
      }
    }
    return timeLeft;
  }
  //State to manage expiry time
  const [expiryTime, setExpiryTime] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setExpiryTime(getExpiryTime());
    },1000);
  });
  
  return (
    <Auxiliary>
      <h1>Barcode</h1>
      <Barcode value={barcode}/>
      <p>Placeholder for timer</p>
      <button className="ButtonStyle" onClick = {fetchBarcodeHandler}>Fetch Barcode</button>
    </Auxiliary>
  );
};

export default BarcodeComponent;