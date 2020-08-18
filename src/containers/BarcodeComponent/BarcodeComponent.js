import React from 'react';
import Barcode from 'react-barcode';
import './BarcodeComponent.css';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

const barcodeComponent = (props) => (
    <Auxiliary>
        <h1>Barcode</h1>
        <Barcode value="Bar code number placeholder"/>
        <p>Placeholder for timer</p>
        <button>Fetch Barcode</button>
    </Auxiliary>
);

export default barcodeComponent;