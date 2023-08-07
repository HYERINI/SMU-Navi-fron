import './Input.css';
import React from "react";
import axios from 'axios';
import $ from 'jquery';
import Button from './../Button/Button.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignupInput(){
    const navigate = useNavigate();

    //비밀번호 백엔드로 보내기
    const [userName, isUserName] = useState('');
    const [sendPw, isSendPw] = useState('');

    // 비밀번호, 비밀번호 확인 정규식 검사
    const [passwordError, setPasswordError] = React.useState("");
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

    // 비밀번호, 비밀번호 확인 에러메시지
    const [password, setPassword] = React.useState("");
    const [passwordChk, setPasswordChk] = React.useState("");

    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{4,16}$/;
    const passwordCheck = (e) => {
        const value = e.target.value;
        const pwChangeValue = e.currentTarget.value;
        setPassword(value);
        isSendPw(pwChangeValue);
        if (!passwordRegEx.test(value)) {
            setPasswordError('비밀번호는 영문자 + 숫자 조합이며 특수문자 하나를 포함해야 합니다.(4~12자리)');
        } else {
            setPasswordError('');
        }
    }
    const passwordDoubleCheck = (e) => {
        const value = e.target.value;
        setPasswordChk(value);
        if (value !== password) {
            setConfirmPasswordError('비밀번호와 비밀번호 확인 값이 일치하지 않습니다.');
        } else {
            setConfirmPasswordError('');
        }
    }

    const userNameCheck = (e) =>{
        isUserName(e.currentTarget.value);
    }

    function signUpSubmit(){
        axios({
            method: 'post',
            url: 'http://localhost:8093/api/user/signup',
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                'email' : userName,
                'password' : password
            }
        }).then((res) => {
            alert('회원가입 완료');
            navigate('/login');
        })
            .catch((error) => {
                alert('회원가입 실패');
            });
    }

    return(
        <div className={"signupBox"}>
            <div className={"signupInputBoxWrap"}>
                <p className={"signupInputName"}>닉네임</p>
                <div className={"signupInputNameBox"}>
                    <input type="text" onChange={userNameCheck} id="nameSignupInput"/>
                    <Button name="중복확인" id="sameNameCheckBt"/>
                    <p id={"redNameTitle"}>이미 등록된 닉네임입니다.</p>
                </div>
            </div>
            <div className={"signupInputBoxWrap"}>
                <p className={"signupInputName"}>비밀번호</p>
                <div>
                    <input type="password" id="pwSignupInput"
                           value={password}
                           onChange={passwordCheck}/>
                </div>
                <p id="redPwTitle">{passwordError}</p>
            </div>
            <div className={"signupInputBoxWrap"}>
                <p className={"signupInputName"}>비밀번호 재확인</p>
                <div>
                    <input type="password" id="pwSignupInput"
                           value={passwordChk}
                           onChange={passwordDoubleCheck}/>
                    <p id={"redPwTitle"}>{confirmPasswordError}</p>

                </div>
            </div>
            <div className={"signupInputBoxWrap"}>
                <p className={"signupInputName"}>학번</p>
                <div className={"signupMailInputBox"}>
                    <input type="text" id="mailSignupInput"/>
                    <p style={{margin: 'auto 5px auto 5px'}}>@</p>
                    <input type="text" id="mailSignupInput" value={"sangmyung.kr"}/>
                    <Button name="전송" id="sameNameCheckBt"/>
                </div>
            </div>
            <div className={"signupInputBoxWrap"}>
                <p className={"signupInputName"}>인증번호 입력</p>
                <div>
                    <input type="text" id="certifyNumInput"/>
                    <Button name="확인" id="sameNameCheckBt"/>
                </div>
                <p id={"redNumTitle"}>잘못된 인증번호입니다.</p>
            </div>
            <button id="signupBt" onClick={signUpSubmit}>가입하기</button>
        </div>
    )
}

export default SignupInput;