import React from 'react';
import './button.css';

const Button = ({ children, onClick, type, buy, main, buyBtc, deposit, sell, option, auth, ...props }) => {
  const buttonClass = `button
    ${buy ? 'button--buy' : ''}
    ${main ? 'button--main' : 'button--secondary'}
    ${buyBtc ? 'button--buy-btc' : ''}
    ${deposit ? 'button--deposit' : ''}
    ${sell ? 'button--sell' : ''}
    ${auth ? 'button--auth' : ''}
    ${option ? 'button--option' : ''}`;

  const buttonLabel = buy ? "Buy" :
                      sell ? "Sell" :
                      deposit ? "Deposit" :
                      buyBtc ? "Buy BTC" :
                      children;

  return (
    <button className={buttonClass} onClick={onClick} type={type} {...props}>
      {buttonLabel}
    </button>
  );
};

export default Button;
