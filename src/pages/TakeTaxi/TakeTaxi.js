import React from 'react';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Line from '../../component/Line/Line';
import walk from '../../img/WALK.png';
import bus from '../../img/busIcon.png';
function TakeTaxi(){
    return(
        <div>
            <MainLogo />
            <Line />
            <MenuBar />
            <div className="header">
                <p>🍯상명 네비의 꿀팁 대방출🍯</p>
                <h5>다음 꿀팁은 여러분의 소중한 의견으로 제작되었습니다.</h5>
            </div>
            <div className="body">
                <div id="chap1">
                    <p id = "case1">언덕 걸어올라가기</p>
                    <div className="ggultip1">
                        <p id ="tip">7016 대신 다른 버스(7018,1711 등) 을 타고 언덕 아래 내려 걸어오기!</p>
                    </div>
                    <img src={walk} width="200" height="200"/>
                </div>
                <div id="chap2">
                    <p id = "case2">무조건 버스타기</p>
                    <div className="ggultip2">
                        <p id ="tip">1. 7016을 남영역 또는 숙대입구에서 미리 타기!(이때 앉고싶다면 직장인 앞에서 존버하기)</p>
                        <p id ="tip">2. 7016 대신 다른 버스(7018,1711 등) 을 타고 하림각에서 내려서 종로 13번 타고 오기</p>
                    </div>
                    <img src={bus} width="200" height="200"/>
                </div>
            </div>
        </div>
    )
}

export default TakeTaxi;
