// import React from 'react';
// import './Notice.css';
// import MainLogo from '../../component/MainLogo/Main_Logo';
// import MenuBar from '../../component/MenuBar/MenuBar';
// import Board_list from '../../component/Board_list/Board_list';
// import { useState, useEffect, useParams } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
//
// function Notice(){
//
//     const navigate = useNavigate();
//     const [content, setContent] = useState([]);
//     const [contentId, setContentId] = useState([]);
//
//     // setContent(){
//     //      "data": [
//     //          {
//     //              "id": 1,
//     //              "regDate": "2023-05-03T01:48:22.07845",
//     //              "updateDate": "2023-05-03T01:48:25.651558",
//     //              "increaseCount": 0,
//     //              "title": "공지",
//     //              "content": "내용"
//     //          }
//     //      ],
//     //      "count": 1
//     //  }
//     useEffect( () => {
//         axios({
//             method: 'get',
//             url: 'http://localhost:8080/api/notice',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         }).then((res) => {
//             setContent(res.data.data);
//             console.log(content);
//         }).catch((error) => {
//             alert("글을 확인할 수 없습니다. 관리자에게 문의하세요.");
//         });
//     }, [])
//
//     function onMoveNoticeDetail(props){
//         navigate('/detail_notice/' + props);
//     }
//
//     function onWriteNotice(){
//         navigate('/write_notice');
//     }
//
//     return(
//         <div className={"Notice_big_wrap"}>
//             <MainLogo />
//             <MenuBar />
//             <div className={"Notice_wrap"}>
//                 <h2>공지사항</h2>
//                 <input type={"text"} id={"noticeInput"} placeholder={"검색어를 입력하세요"}/>
//                 <div className={"Notice_list_wrap"}>
//                     <ul>
//                         {content != ''
//                             ? content.map((content, index) => (
//                                 <li id={content.id} key={index} onClick={e =>onMoveNoticeDetail(content.id)} >
//                                     <Board_list num={index} title={content.index.title} posttime={content.index.regDate}/ >
//                                 </li>
//                             ))
//                             : <p>등록된 글이 없습니다</p>}
//                     </ul>
//                 </div>
//                 <div className={"Notice_write_button_wrap"}>
//                     <button type="button" onClick={onWriteNotice}>작성하기</button>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Notice;
