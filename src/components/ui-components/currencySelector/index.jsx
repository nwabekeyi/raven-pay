// src/components/CurrencySelector.js
import React, { useContext } from 'react';
import Dropdown from '../dropdown/index';
import { CurrencyContext } from '../../context/currencyContext';
import './currencySelector.css';

const CurrencySelector = () => {
  const { setCurrencyPair } = useContext(CurrencyContext);
  const currencyPairs = ['BTC/USD', 'ETH/USD', 'BTC/ETH'];

  return (
    <div className="currency-selector">
      <label className="currency-selector__label">Select Currency Pair:</label>
      <Dropdown options={currencyPairs} onSelect={setCurrencyPair} />
    </div>
  );
};

export default CurrencySelector;
