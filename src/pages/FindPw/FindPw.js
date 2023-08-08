import './FindPw.css';
import React from 'react';
import {Link} from 'react-router-dom';
import Input from '../../component/Input/Input';
import Footer from '../../component/Footer/Footer';
import MainLogo from '../../img/SmuNaviLogo2.png';
import Button from '../../component/Button/Button';

function FindPw(){
    return(
        <div className={"signupWrap"}>
            <img src={MainLogo} className={"signupWrapMainLogo"}/>
            <div className={"signupBox"}>
                <div className={"signupInputBoxWrap"}>
                    <p className={"signupInputName"}>학번</p>
                    <div className={"signupMailInputBox"}>
                        <Input type="text" id="mailSignupInput"/>
                        <p style={{margin: 'auto 5px auto 5px'}}>@</p>
                        <Input type="text" id="mailSignupInput"/>
                        <Button name="전송" id="sameNameCheckBt"/>
                    </div>
                </div>
                <div className={"signupInputBoxWrap"}>
                    <p className={"signupInputName"}>인증번호 입력</p>
                    <div>
                        <Input type="text" id="certifyNumInput"/>
                        <Button name="확인" id="sameNameCheckBt"/>
                    </div>
                    <p id={"redNumTitle"}>잘못된 인증번호입니다.</p>
                </div>
                <div className={"signupInputBoxWrap"}>
                    <p className={"signupInputName"}>새 비밀번호</p>
                    <div>
                        <Input type="text" id="pwSignupInput"/>
                    </div>
                </div>
                <div className={"signupInputBoxWrap"}>
                    <p className={"signupInputName"}>새 비밀번호 재확인</p>
                    <div>
                        <Input type="text" id="pwSignupInput"/>
                        <p id={"redPwTitle"}>비밀번호가 일치하지 않습니다.</p>
                    </div>
                </div>
                <Button name="비밀번호 변경하기" id="signupBt"/>
            </div>
            <Footer />
        </div>
    )
}

export default FindPw;