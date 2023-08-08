import React from 'react';
import './Notice.css';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Board_list from '../../component/Board_list/Board_list';
import { useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Line from '../../component/Line/Line'

function Detail_notice(){
    const { id } = useParams();
    const navigate = useNavigate();
    const [content, setContent] = useState([]);

    useEffect( () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/api/notice/' + id,
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {
            setContent(res.data);
            console.log(content);
        }).catch((error) => {
            alert("글을 확인할 수 없습니다. 관리자에게 문의하세요.");
        });
    }, [])

    function Delete_Notice(){
        axios({
            method: 'delete',
            url: 'http://localhost:8080/api/notice' + id,
            headers:{
                "Content-Type": "application/json"
            },
        }).then((res) => {
            alert('공지사항을 삭제하였습니다.');
        }).catch((error) => {
            alert('공지사항을 삭제하지 못했습니다.');
        })
    }

    let date = content.regDate + '';
    return(
        <div className={"Notice_wrap"}>
            <MainLogo />
            <Line/>
            <MenuBar />
            <div className={"Notice_title_wrap"}>
                <h2>공지사항</h2>
            </div>
            <div className={"Notice_real_wrap"}>
                <div className={"Notice_wrap_title"}>
                    <h3>{content.title}</h3>
                    <div>
                        <p>작성자 : 깐따삐아</p>
                        <p>작성일 : {date.substr(0,10)}</p>
                    </div>
                </div>
                <div className={"Notice_wrap_content"}>
                    <p>{content.content}</p>
                </div>
            </div>
            <div className={"Notice_delete_btn_wrap"}>
                <button type="button" onClick={Delete_Notice}>삭제하기</button>
            </div>
        </div>
    )
}

export default Detail_notice;
