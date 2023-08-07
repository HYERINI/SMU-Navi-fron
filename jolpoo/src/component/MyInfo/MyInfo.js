import './MyInfo.css';
import React from 'react';
import Button from './../Button/Button';
import heart from './../../img/heart.png';
import heartBreak from './../../img/heartBreak.png';
import gold from './../../img/gold.png';
import silver from './../../img/silver.png';
import bronze from './../../img/bronze.png';

function MyInfo(){
    return(
        <div className={"MypageComponent"}>
            <div className={"MypageMenu"}>
                <h3>나의 정보</h3>
                <h3>나의 교통정보</h3>
                <h3>나의 택시타기</h3>
            </div>
            <div className={"MypageContent"}>
                <div className={"MypageLevel"}>
                    <div className={"MypageMedalInfo"}>
                        <div className={"MyMedal"}>
                            <img src={silver} />
                        </div>
                        <div className={"MyLevel"}>
                            <h3>나의 등급은 실버 입니다.</h3>
                            <div className={"MyheartNumber"}>
                                <img src={heart}/>
                                <p>3</p>
                                <img id={"heartBreak"} src={heartBreak}/>
                                <p>3</p>
                            </div>
                        </div>
                    </div>
                    <div className={"MypageInfo"}>
                        <div className={"myFirstInfo"}>
                            <p>202010904@sangmyung.kr</p>
                            <Button name={"로그아웃"} id={"logoutBtn"}/>
                        </div>
                        <div className={"mySecondInfo"}>
                            <p>이혜린</p>
                            <div className={"mySecondInfoBtnWrap"}>
                                <Button name={"닉네임 변경"} id={"nameChangeBtn"}/>
                                <div className={"rightBar"}></div>
                                <Button name={"비밀번호 변경"} id={"pwChangeBtn"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"medalContentWrap"}>
                    <div className={"medalColorWrap"}>
                        <div>
                            <img src={bronze} />
                            <div>
                                <p className={"medalName"}>브론즈</p>
                                <p>선호도 0-5</p>
                            </div>
                        </div>
                        <div>
                            <img src={silver} />
                            <div>
                                <p className={"medalName"}>실버</p>
                                <p>선호도 6-10</p>
                            </div>
                        </div>
                        <div>
                            <img src={gold} />
                            <div>
                                <p className={"medalName"}>골드</p>
                                <p>선호도 11 이상</p>
                            </div>
                        </div>
                    </div>
                    <div className={"medalLike"}>
                        * 선호도 :
                        <img src={heart} id={"mypageMedalLike"}/>
                        -
                        <img src={heartBreak} id={"mypageMedalDislike"}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyInfo;