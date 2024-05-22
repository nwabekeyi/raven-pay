// src/components/OrderBook.js
import React, { useState, useEffect } from 'react';
import './orderBook.css';

const OrderBook = () => {
  const [currencyPair, setCurrencyPair] = useState('BTC/USD');
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);

  useEffect(() => {
    const fetchOrderBook = async () => {
      try {
        const baseUrl = 'https://min-api.cryptocompare.com/data/ob/l1/top';
        const apiKey = '647441855f285b6154b8efeb5a51fb054d52930df233197c7daec3270cf815f8';
        const url = `${baseUrl}?fsyms=BTC,ETH&tsyms=USD,EUR&e=coinbase&api_key=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "Success") {
          const baseCurrency = Object.keys(data.Data.RAW);
          const quoteCurrency = Object.keys(data.Data.RAW[baseCurrency[0]]);

          // Update bids and asks states
          setBids([data.Data.RAW[baseCurrency[0]][quoteCurrency[0]].BID]);
          setAsks([data.Data.RAW[baseCurrency[0]][quoteCurrency[0]].ASK]);
        } else {
          console.error('Error in API response:', data.Message);
        }
      } catch (error) {
        console.error('Error fetching order book data:', error);
      }
    };

    fetchOrderBook();
  }, [currencyPair]);

  return (
    <div className="order-book">
      <h3>Order Book</h3>
      <div className="order-book__section">
        <h4>Bids</h4>
        <ul>
          {bids.map((bid, index) => (
            <li key={index}>Price: {bid}</li>
          ))}
        </ul>
      </div>
      <div className="order-book__section">
        <h4>Asks</h4>
        <ul>
          {asks.map((ask, index) => (
            <li key={index}>Price: {ask}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderBook;
