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
  constructor(props) {
    super(props)
    this.state = {
      balance: 10000,
      coinData: [
        {
          name: 'Bitcoin',
          ticker: 'BTC',
          price: 9999.99
        },
        {
          name: "Etherium",
          ticker: "ETH",
          price: 299.99
        },
        {
          name: "Tether",
          ticker: "USDT",
          price: 1.0
        },
        {
          name: "Ripple",
          ticker: "XRP",
          price: 0.2
        },
        {
          name: "Bitcoin Cash",
          ticker: "BCH",
          price: 298.99
        }
      ]
    }
  }

  render() {

    return (
      <Div className="App">
        <Header />
        <AccountBalance amount={this.state.balance} />
        <CoinList coinData={this.state.coinData} />
      </Div>
    );
  }


}
export default App
