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
      setBarcode(responseData.barcode);
    });
  };

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