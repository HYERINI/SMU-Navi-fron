import React from 'react';
import './Notice.css';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Board_list from '../../component/Board_list/Board_list';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Write_notice(){

    const navigate = useNavigate();
    const [noticeTitle, setNoticeTitle] = useState("");
    const [noticeContent, setNoticeContent] = useState("");

    const onNoticeTitleHandler = (event) => {
        setNoticeTitle(event.currentTarget.value);
    }
    const onNoticeContentHandler = (event) => {
        setNoticeContent(event.currentTarget.value);
    }

    const onSubmitNotice = (event) => {
        // 버튼만 누르면 리로드 되는것을 막아줌
        event.preventDefault();

        // POST 요청으로 로그인
        axios({
            method: "post",
            url: "http://localhost:8080/api/notice",
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                "title": noticeTitle,
                "content": noticeContent,
            },

        })
            .then((res) => {
                alert('공지사항 작성 완료');
                navigate('/notice');
            })
            .catch((error) => {
                alert('공지사항 작성 실패');
            });
        }


    return(
        <div>
            <MainLogo />
            <MenuBar />
            <div className={"Notice_wrap"}>
                <h2>공지사항</h2>
                <div className={"Notice_write_wrap"}>
                    <div className={"Notice_write_title_wrap"}>
                        <input type={"text"} placeholder="제목을 입력하세요" onChange={onNoticeTitleHandler} />
                    </div>
                    <div className={"Notice_write_content_wrap"}>
                        <textarea type={"text"} placeholder="내용을 입력하세요" onChange={onNoticeContentHandler} ></textarea>
                    </div>
                </div>
                <div className={"noticeSubmitBtWrap"}>
                    <button type={"button"} id={"noticeSubmitBt"} onClick={onSubmitNotice}>작성하기</button>
                </div>
            </div>
        </div>
    )
}

export default Write_notice;