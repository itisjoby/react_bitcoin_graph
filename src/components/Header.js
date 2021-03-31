import React from 'react';
import logo from '../btc.png';


function Header(){
    return (
    <div>
        <header>
            <span className="brand-logo">
            <img src={logo} className="App-logo" alt="logo" style={{width:'100px',height:'100px'}}/>
            </span>
        <span className="brand-name">BITcoin Graph</span>
        </header>
        
        Header
    </div>
    )
}

export default Header;