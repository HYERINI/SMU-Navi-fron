import React from 'react';
import './M_Main_Logo.css';
import Logo from '../../img/mSmuNaviLogo.png';
import User from '../../img/user.png';
import navIcon from '../../img/navIcon.png'


import { useNavigate } from 'react-router-dom';


export default function M_Main_Logo(){
    const navigate = useNavigate();
    const onLogin = (e) => {
        navigate('/login');
    }

    return(
        <div className={"Main_logo_title_wrap"}>
            <div id={"MainLogo"}><img src={Logo} /></div>
            <div id={"nav"}><img src={navIcon} /></div>
            <div id={"userName"}><img src={User} onClick={onLogin}/></div>
        </div>
    )
}
