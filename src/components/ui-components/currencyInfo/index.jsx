// src/components/CurrencyInfo.js
import { useContext } from 'react';
import { CurrencyContext } from '../../context/currencyContext';
import './currencyInfo.css';

const CurrencyInfo = () => {
  const { currencyPair, currencyData } = useContext(CurrencyContext);

  if (!currencyData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="currency-info" style={{width: '100%'}}>
      <h2 className="currency-info__heading"> {currencyPair}</h2>
      <p className="currency-info__item">
        <span className="currency-info__label">Current Exchange Rate:</span>
        <span className="currency-info__value">{currencyData.PRICE}</span>
      </p>
      <p className="currency-info__item">
        <span className="currency-info__label">24H Change:</span>
        <span className="currency-info__value">{currencyData.CHANGE24HOUR}</span>
      </p>
      <p className="currency-info__item">
        <span className="currency-info__label">24H Low:</span>
        <span className="currency-info__value">{currencyData.LOW24HOUR}</span>
      </p>
      <p className="currency-info__item">
        <span className="currency-info__label">24H High:</span>
        <span className="currency-info__value">{currencyData.HIGH24HOUR}</span>
      </p>
      <p className="currency-info__item">
        <span className="currency-info__label">24H Volume:</span>
        <span className="currency-info__value">{currencyData.VOLUME24HOUR}</span>
      </p>
    </div>
  );
};

export default CurrencyInfo;
