// src/context/CurrencyContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currencyPair, setCurrencyPair] = useState('BTC/USD');
  const [currencyData, setCurrencyData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [baseCurrency, quoteCurrency] = currencyPair.split('/');
      const response = await fetch(
        `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${baseCurrency}&tsyms=${quoteCurrency}&api_key=YOUR_API_KEY`
      );
      const result = await response.json();
      if (result.DISPLAY && result.DISPLAY[baseCurrency] && result.DISPLAY[baseCurrency][quoteCurrency]) {
        setCurrencyData(result.DISPLAY[baseCurrency][quoteCurrency]);
      }
    };

    fetchData();
  }, [currencyPair]);

  return (
    <CurrencyContext.Provider value={{ currencyPair, setCurrencyPair, currencyData }}>
      {children}
    </CurrencyContext.Provider>
  );
};
