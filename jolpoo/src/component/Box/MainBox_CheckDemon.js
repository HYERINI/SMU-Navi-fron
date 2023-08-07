import React, { useState, useEffect, useParams } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import heartLike from '../../img/heartTrue.png';
import heartHate from '../../img/heartFalse.png';

export default function MainBox_CheckDemon(){
    const [content, setContent] = useState([]);
    const navigate = useNavigate();

    useEffect( (e) => {
        async function fetchData(){
            const result = await axios({
                method: 'get',
                url: 'http://smu-navi.ap-northeast-2.elasticbeanstalk.com/api/info',
                headers: {
                    "Content-Type": "application/json"
                },
            }).then((res) => {
                var data = res.data.data;
                setContent(data);
                console.log(content);
            }).catch((error) => {
                alert("글을 확인할 수 없습니다. 관리자에게 문의하세요.");
            });
        }
        fetchData();
    },[]);

    const MainBox = styled.div`
      width: 100%;
      display: flex;
      flex-direction: row;
      padding: 10px 0;
      box-sizing: border-box;
      margin-top: 10px;
    `

    const MainButton = styled.div`
      background-color: #D9D9D9;
      width: 80px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bolder;
      font-size: 13px;
      border-radius: 20px;
      margin-right: 10px;
    `

    const MainContent = styled.p`
      margin-top: 15px;
      font-size: 13px;
    `

    const MainLikeHateWrap = styled.div`
      float: right;
      display: flex;
      flex-display: row;
      justify-content: space-between;
    `

    const MainLikeHate = styled.div`
      display: flex;
      align-items: center;
      margin-top: 30px;
    `

    const MainLikeHateP = styled.p`
      font-size: 15px;
      margin: 0 5px 0 10px;
      font-weight: bolder;
    `

    const MainLikeHateImg = styled.img`
      width: 18px;
      height: 18px;
      margin-right: 3px;
    `

    const MainLikeHateNum = styled.p`
      font-weight: bolder;
    `
    return(
        <>
            {/*{content = '' ? '아직까지 제보된 글이 없습니다.' :*/}
            <MainBox>
                <MainButton>경복궁역</MainButton>
                <MainButton>버스우회</MainButton>
                <MainButton>시위</MainButton>
            </MainBox>
            <MainContent>
                경복궁역 앞에 도로에서 시위한ㄷㅏ.. 버스돌아간다....
            </MainContent>
            <MainLikeHateWrap>
                <MainLikeHate>
                    <MainLikeHateP>동의하기</MainLikeHateP>
                    <MainLikeHateImg src={heartLike}/>
                    <MainLikeHateNum>3</MainLikeHateNum>
                </MainLikeHate>
                <MainLikeHate>
                    <MainLikeHateP>반대하기</MainLikeHateP>
                    <MainLikeHateImg src={heartHate}/>
                    <MainLikeHateNum>3</MainLikeHateNum>
                </MainLikeHate>
            </MainLikeHateWrap>
        </>
    )
}