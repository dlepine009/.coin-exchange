import React from 'react'
import Coin from '../Coin/Coin';
import styled from 'styled-components';





const Table = styled.table`
margin: 50px auto 50px auto;
display: inline - block;
font - size: 1.4rem;
`


export default function CoinList(props) {

    const balance = props.showBalance ?
        <th>Balance</th> : null;
    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th> Name </th>
                        <th> Ticker </th>
                        <th> Price </th>
                        {balance}
                        <th> Actions </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.coinData.map(({ key, name, ticker, price, balance, tickerId }) =>
                            <Coin key={key}
                                handleRefresh={props.handleRefresh}
                                name={name}
                                ticker={ticker}
                                balance={balance}
                                showBalance={props.showBalance}
                                price={price}
                                tickerId={key} />)
                    }


                </tbody>
            </Table>
        </div>
    )
}
