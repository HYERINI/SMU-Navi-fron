import './Signup.css';
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
// import Input from './../../component/Input/Input';
import Footer from './../../component/Footer/Footer';
import MainLogo from '../../component/MainLogo/Mobile_Main_Logo';
// import Button from './../../component/Button/Button';
import Modal from './../../component/Modal/Modal';
import SignupInput from './../../component/Input/SignupInput';
function MobileSignup(){
    //페이지 이동을 위한 navigate 설정
    const navigate = useNavigate();

    // 정규식 검사
    const [password, setPassword] = React.useState("");
    const [passwordChk, setPasswordChk] = React.useState("");
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/


    return(
        <div className={"MobileSignupWrap"}>
            <MainLogo />
            <h2 className={"singupTitle"}>회원가입</h2>
            <div className={"MobileSignupInputWrap"}>
                <SignupInput />
            </div>
        </div>
    )
}

export default MobileSignup;