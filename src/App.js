import React, { useState, useEffect } from 'react';
import AccountBalance from './components/AccountBalance/AccountBalance.jsx';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header';
import styled from 'styled-components';
import axios from 'axios';

//import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/flatly/bootstrap.min.css';

import '@fortawesome/fontawesome-free/js/all';

const Div = styled.div`
    text-align: center;
    background-color: rgb(113, 113, 199);
    color: #cccccc;
`;

const COIN_COUNT = 10;
const coinsUrl = 'https://api.coinpaprika.com/v1/coins';
const tickerUrl = 'https://api.coinpaprika.com/v1/tickers/';
const formatPrice = price => parseFloat(Number(price).toFixed(4));



function App(props) {

  const [balance, setBalance] = useState(10000);
  const [showBalance, setShowBalance] = useState(false);
  const [coinData, setCoinData] = useState([]);

  const componentDidMount = async () => {
    const response = await axios.get(coinsUrl);
    const coinIds = response.data.slice(0, COIN_COUNT).map(coin => coin.id);
    const promises = coinIds.map(id => axios.get(tickerUrl + id));
    const coinData = await Promise.all(promises);
    const coinPriceData = coinData.map(function (response) {
      const coin = response.data;
      return {
        key: coin.id,
        name: coin.name,
        ticker: coin.symbol,
        balance: 0,
        price: formatPrice(coin.quotes['USD'].price),
      };
    })
    //Retrieve the prices
    setCoinData(coinPriceData);
  };

  useEffect(function () {
    if (coinData.length === 0) {
      componentDidMount();

    }
  });

  const handleTransaction = (isBuy, valueChangeId) => {
    var balanceChange = isBuy ? 1 : -1
    const newCoinData = coinData.map(function (values) {
      let newValues = { ...values };
      if (valueChangeId === values.key) {
        newValues.balance += balanceChange
        setBalance(oldBalance => oldBalance - balanceChange * newValues.price);
      }
      return newValues;
    })
    setCoinData(newCoinData);
  }

  const handleRefresh = async (valueChangeId) => {
    const tickerUrl = `https://api.coinpaprika.com/v1/tickers/${valueChangeId}`;
    const response = await axios.get(tickerUrl);
    debugger;
    const newPrice = formatPrice(response.data.quotes.USD.price);
    const newCoinData = coinData.map(function (values) {
      let newValues = { ...values };
      if (valueChangeId === values.key) {

        newValues.price = newPrice;
      };
      return newValues;

    });
    setCoinData(newCoinData);
  }
  const handleToggleShowBalance = () => {
    setShowBalance(oldValue => !oldValue);
  }
  const handleAirDrop = () => {
    setBalance(balance => balance + 1200)
  }

  return (
    <Div>
      <Header />
      <AccountBalance
        amount={balance}
        showBalance={showBalance}
        handleToggleShowBalance={handleToggleShowBalance}
        handleAirDrop={handleAirDrop} />
      <CoinList
        coinData={coinData}
        handleTransaction={handleTransaction}
        handleRefresh={handleRefresh}
        showBalance={showBalance} />
    </Div>
  );

}


export default App
