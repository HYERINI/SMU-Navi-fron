import React from 'react';
import './Main_Logo.css';
import Logo from '../../img/SmuNaviLogo.png';
import { useNavigate } from 'react-router-dom';


export default function Main_Logo(){
    const navigate = useNavigate();
    const onLogin = (e) => {
        navigate('/login');
    }

    return(
        <div className={"Main_logo_title_wrap"}>
            <div id={"MainLogo"}><img src={Logo} /></div>
            <div id={"userName"}><button type="button" onClick={onLogin}>로그인</button></div>
        </div>
    )
}
