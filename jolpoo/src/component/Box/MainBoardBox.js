import styled from 'styled-components';
import React, { useState, useEffect, useParams } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainBoxCheckDemon from './../Box/MainBox_CheckDemon';
import MainBoxDemo from './../Box/MainBox_Demo';

const MainBox = styled.div`
  width: 90%;
  height: 200px;
  border-radius: 15px;
  border: 1px solid #98BF9C;
  padding: 20px 15px;
  box-sizing: border-box;
  margin: 10px auto 20px auto;
`

const MainTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const MainBoxTitle = styled.h3`
  margin: 0;
  font-size: 20px;
`

const MainBoxMore = styled.p`
  cursor: pointer;
  
`
export default function MainBoardBox({ content }){

    const navigate = useNavigate();
    const handleMoreClick = () => {
        if (content === '시위확인하기') {
            navigate('/map_main');
        } else {
            navigate('/report_traffic');
        }
    };
    return(
        <MainBox>
            <MainTitle>
                <MainBoxTitle>{content}</MainBoxTitle>
                <MainBoxMore onClick={handleMoreClick}>더보기 ></MainBoxMore>
            </MainTitle>
            { content == '시위확인하기' ? <MainBoxCheckDemon/> : <MainBoxDemo/> }
        </MainBox>
    )
}