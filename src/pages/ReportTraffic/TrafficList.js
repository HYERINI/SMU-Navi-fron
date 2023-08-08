import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Board_list2 from '../../component/Board_list/Board_list2';
import React, { useState, useEffect, useParams } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ReportTraffic.css';

function TrafficList(){

    const navigate = useNavigate();
    const [content, setContent] = useState([]);
    const [contentId, setContentId] = useState([]);

    useEffect( () => {
        axios({
            method: 'get',
            url: 'http://smu-navi.ap-northeast-2.elasticbeanstalk.com/api/info',
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res) => {
            setContent(res.data.data);
            console.log(content);
        }).catch((error) => {
            alert("글을 확인할 수 없습니다. 관리자에게 문의하세요.");
        });
    }, [])

    function onMoveWriteReport(){
        navigate('/write_traffic');
    }

    function onMoveTrafficDetail(props){
        navigate('/detail_traffic/' + props);
    }
    return(
        <div>
            <MainLogo />
            <MenuBar />
            <div className={"Report_big_wrap"}>
                <h2>교통 제보하기</h2>
                <p>당일 교통 제보를 제공합니다. 허위 사실 제보는 페널티를 받을 수 있습니다. 교통 제보에 동의 하시면 동의하기를, 제보 관련
                    사건이 종료되었거나 발생하지 않은 제보라면 반대하기를 눌러주세요</p>
                <div className={"Report_search_wrap"}>
                    <input type={"text"} id="searchPlace" placeholder={"검색어를 입력하세요"}/>
                    <div className={"Report_search"}>
                        <select>
                            <option>최신순</option>
                            <option>동의량순</option>
                        </select>
                        <button type={"button"} onClick={onMoveWriteReport}>제보하기</button>
                    </div>
                </div>
                <div className={"Report_list_wrap"}>
                    <ul>
                        {content != ''
                            ? content.map((content, index) => (
                                <li id={content.id} key={index} onClick={e =>onMoveTrafficDetail(content.id)} >
                                    <Board_list2 num={index} title={content.title} posttime={content.regDate.substr(0,10)} heartLike={content.likes} heartHate={content.hates}/ >
                                </li>
                            ))
                            : "등록된 글이 없습니다"}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TrafficList;