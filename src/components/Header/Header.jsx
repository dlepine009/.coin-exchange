import React, { Component } from 'react'
import logo from './logo.svg';
import styled from 'styled-components';





const AppLogo = styled.img`
    height: 8rem;
    pointer - events: none;     
`;

const HeaderApp = styled.header`
    background - color: #282c34;
    min - height: 20vh;
    width: 100%;
    display: flex;
    flex - direction: row;
    align - items: center;
    justify - content: flex - start;
    color: white;
`;

const H1 = styled.h1`
    font - size: 3rem;
    line-height: 8rem;
    font-weight: bold;
    min-width: 300px;
`;



export default class Header extends Component {
    render() {
        return (
            <div>
                <HeaderApp>
                    <AppLogo src={logo} alt="React logo" />

                    <H1>
                        Coin Exchange
                    </H1>
                </HeaderApp>
            </div>
        )
    }
}
