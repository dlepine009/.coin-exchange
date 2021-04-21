import React from 'react';
import AccountBalance from './components/AccountBalance/AccountBalance.jsx';
import CoinList from './components/CoinList/CoinList';
import Header from './components/Header/Header';
import styled from 'styled-components'

const Div = styled.div`
    text-align: center;
    background-color: rgb(113, 113, 199);
    color: #cccccc;
`;


class App extends React.Component {
  state = {
    balance: 10000,
    showBalance: true,
    coinData: [
      {
        name: 'Bitcoin',
        ticker: 'BTC',
        price: 9999.99,
        balance: 0.5
      },
      {
        name: "Etherium",
        ticker: "ETH",
        price: 299.99,
        balance: 32
      },
      {
        name: "Tether",
        ticker: "USDT",
        price: 1.0,
        balance: 2000
      },
      {
        name: "Ripple",
        ticker: "XRP",
        price: 0.2,
        balance: 1000
      },
      {
        name: "Bitcoin Cash",
        ticker: "BCH",
        price: 298.99,
        balance: 0
      }
    ]
  }


  handleRefresh = (valueChangeTicker) => {
    const newCoinData = this.state.coinData.map(function (values) {
      let newValues = { ...values };
      if (valueChangeTicker === values.ticker) {
        const randomPercentage = 0.995 + Math.random() * 0.01;
        newValues.price *= randomPercentage;
      }
      return newValues;

    });

    this.setState({ coinData: newCoinData });
  }
  handleToggleShowBalance = () => {
    this.setState(function (oldState) {
      return {
        ...oldState,
        showBalance: !oldState.showBalance
      }
    });
  }
  render() {

    return (
      <Div>
        <Header />
        <AccountBalance
          amount={this.state.balance}
          showBalance={this.state.showBalance}
          handleToggleShowBalance={this.handleToggleShowBalance} />
        <CoinList
          coinData={this.state.coinData}
          handleRefresh={this.handleRefresh}
          showBalance={this.state.showBalance} />
      </Div>
    );
  }
}


export default App
