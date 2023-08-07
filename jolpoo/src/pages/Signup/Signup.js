import './Signup.css';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
// import Input from './../../component/Input/Input';
import Footer from './../../component/Footer/Footer';
import MainLogo from './../../img/SmuNaviLogo2.png';
// import Button from './../../component/Button/Button';
import Modal from './../../component/Modal/Modal';
import SignupInput from './../../component/Input/SignupInput';
function Signup(){
    //페이지 이동을 위한 navigate 설정
    const navigate = useNavigate();

    // 정규식 검사
    const [password, setPassword] = React.useState("");
    const [passwordChk, setPasswordChk] = React.useState("");
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/


    return(
        <div className={"signupWrap"}>
            <img src={MainLogo} className={"signupWrapMainLogo"}/>
            <SignupInput />
            <Footer />
        </div>
    )
}

export default Signup;