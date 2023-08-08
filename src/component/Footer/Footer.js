import React from 'react';
import smuLogo from './../../img/smuLogo.png';
import './Footer.css';

export default function Footer() {
    return(
        <div className={"Footer_wrap"}>
            <img src={smuLogo} />
        </div>
    )
}