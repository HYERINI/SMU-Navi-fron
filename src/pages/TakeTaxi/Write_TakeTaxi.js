import React from 'react';
import './../Notice/Notice.css';
import './TakeTaxi.css';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Board_list from '../../component/Board_list/Board_list';
import Catebory_btn from '../../component/Category_btn/Catebory_btn';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Write_TakeTaxi(){


    const navigate = useNavigate();
    const [noticeTitle, setNoticeTitle] = useState("");
    const [noticeContent, setNoticeContent] = useState("");

    // const onNoticeTitleHandler = (event) => {
    //     setNoticeTitle(event.currentTarget.value);
    // }
    // const onNoticeContentHandler = (event) => {
    //     setNoticeContent(event.currentTarget.value);
    // }

    // const onSubmitNotice = (event) => {
    //     // 버튼만 누르면 리로드 되는것을 막아줌
    //     event.preventDefault();
    //
    //     // POST 요청으로 로그인
    //     axios({
    //         method: "post",
    //         url: "http://localhost:8080/api/notice",
    //         headers: {
    //             "Content-Type": `application/json`,
    //         },
    //         data: {
    //             "title": noticeTitle,
    //             "content": noticeContent,
    //         },
    //
    //     }).then((res) => {
    //             alert('공지사항 작성 완료');
    //             navigate('/notice');
    //         })
    //         .catch((error) => {
    //             alert('공지사항 작성 실패');
    //         });
    // }


    return(
        <div>
            <MainLogo />
            <MenuBar />
            <div className={"Report_big_wrap"}>
                <h2>택시 같이타기</h2>
                <p>택시 같이 탈 멤버를 구하는 공간입니다! 택시비 아끼자 ~~</p>
                <div className={"Taxi_big_wrap"}>
                    <div className={"Notice_write_title_wrap"}>
                        <input type={"text"} placeholder="제목을 입력하세요" />
                    </div>
                    <div className={"Traffic_category_wrap"}>
                        <p>위치</p>
                        <div>
                            <select name="languages" id="lang">
                                <option value="">경복궁역</option>
                                <option value="">광화문역</option>
                                <option value="">시청역</option>
                                <option value="">불광역</option>
                                <option value="">홍제역</option>
                                <option value="">숙대입구역</option>
                            </select>
                        </div>
                    </div>
                    <div className={"Location_category_wrap"}>
                        <p>위치</p>

                    </div>
                    <div className={"picture_category_wrap"}>

                    </div>
                    <div className={"content_category_wrap"}>
                        <p>내용</p>
                        <textarea type={"text"} placeholder={"허위 제보가 누락되면 강제 탈퇴당할 수 있습니다"}></textarea>
                    </div>
                </div>
                <div className={"submitTrafficBtWrap"}>
                    <button type={"button"}ㄴ>등록하기</button>
                </div>
            </div>
        </div>
    )
}

export default Write_TakeTaxi;