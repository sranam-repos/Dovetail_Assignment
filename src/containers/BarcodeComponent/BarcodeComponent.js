import React, { useState, useEffect } from 'react';
import Countdown from 'react-countdown';
import Barcode from 'react-barcode';
import './BarcodeComponent.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Loader from '../../components/UI/Loader/Loader';

const BarcodeComponent = (props) => {
  //Creating and initializing states for barcode and countdown time
  const [countDownTimer, setCountDownTimer] = useState('');
  const [barcode, setBarcode] = useState('');
  const [showLoader, setShowLoader] = useState(false);

  //Introducing side effects after render cycle to avoid blocking of component rendering. Passing empty array to avoid unnecessary re-rendering.
  useEffect(() => {
    fetchBarcodeHandler();
  },[]);

  //Function to call generate-barcode API using javascript Fetch API
  const fetchBarcodeHandler = () => {
    setBarcode('');
    setCountDownTimer('');
    setShowLoader(true);
    fetch('https://jet-gull-7204.twil.io/generate-barcode').then(response => 
      response.json()
    ).then(responseData => {
      setBarcode(responseData.barcode.toString());
      //Coverting UTC ISO Date string to localized Date string
      const timerCountdown = responseData.expiresAt.toString();
      setCountDownTimer(timerCountdown);
      setShowLoader(false);
    }).catch((err) => {
      //Any error logic goes here
      console.log(err);
    });
  };
  
  const rendererHandler = ({ minutes, seconds, completed }) => {
    if (completed) {
      return <button className='ButtonStyle' onClick={fetchBarcodeHandler}>Fetch Barcode</button>;
    } else {
      return (
        <p className="TimerWrapper">
          {minutes}:{seconds}
        </p>
      );
    }
  };

  return (
    <Auxiliary>
      <h1>Barcode</h1>
      {showLoader? <Loader></Loader> : ''}
      {barcode.length ? (
          <div key="timer" className = "ComponentWrapper">
            <Barcode key="barcode" value={barcode}/>
            <Countdown date={new Date(countDownTimer)} renderer={rendererHandler}/>
          </div>) : ''}
    </Auxiliary>
  );
};

export default BarcodeComponent;