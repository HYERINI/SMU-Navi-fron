import React from 'react';
import styled from 'styled-components';
import MainLogo from '../../component/MainLogo/Mobile_Main_Logo';
import MenuBar from '../../component/MenuBar/MobileMenuBar';
import NumberInfoButton from '../../component/Button/NumberInfoButton';
import MainBoardBox from '../../component/Box/MainBoardBox';

const NumberButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  box-sizing: border-box;
`

const BoardWrap = styled.div`

`

function MobileMain(){
    return(
        <div>
            <MainLogo />
            <MenuBar />
            <NumberButtonWrap>
                <NumberInfoButton content="현재 발생 시위" number="0"/>
                <NumberInfoButton content="현재 발생 사고" number="0"/>
            </NumberButtonWrap>
            <BoardWrap>
                <MainBoardBox content="시위확인하기" />
                <MainBoardBox content="실시간 인기제보" />
            </BoardWrap>
        </div>
    )
}

export default MobileMain;
