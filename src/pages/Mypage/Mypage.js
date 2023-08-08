import './Mypage.css';
import React from 'react';
import MainLogo from './../../component/MainLogo/Main_Logo';
import MenuBar from './../../component/MenuBar/MenuBar';
import MyInfo from './../../component/MyInfo/MyInfo';
import MyInfoBox from './../../component/MyInfo/MyInfoBox';
import Footer from './../../component/Footer/Footer';

function Mypage(){
    return(
        <div className={"MyPageWrap"}>
            <MainLogo />
            <div className={"underBar"}></div>
            <div className={"MyPageTotalWrap"}>
                <div>
                    <MenuBar />
                </div>
                <div className={"MyPageTotalRealWrap"}>
                    <h2>마이페이지</h2>
                    <MyInfoBox />
                    <MyInfo />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Mypage;