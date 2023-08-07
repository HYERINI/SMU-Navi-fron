import React, { useState, useEffect, useParams } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import MainLogo from '../../component/MainLogo/Mobile_Main_Logo';
import MenuBar from '../../component/MenuBar/MobileMenuBar';
import NumberInfoButton from '../../component/Button/NumberInfoButton';

const NumberButtonWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px;
  box-sizing: border-box;
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
                <MainBox content="시위확인하기" />
                
            </BoardWrap>
        </div>
    )
}

export default MobileCheckDemon;
