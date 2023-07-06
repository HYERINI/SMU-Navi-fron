import React, { useState, useEffect } from 'react';
import './ReportTraffic.css';
import MainLogo from '../../component/MainLogo/Main_Logo';
import MenuBar from '../../component/MenuBar/MenuBar';
import Catebory_btn from '../../component/Category_btn/Catebory_btn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Write_traffic() {
    const [subwayList, setSubwayList] = useState([]);
    const [busList, setBusList] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("http://smu-navi.ap-northeast-2.elasticbeanstalk.com/api/info/button");
                const subwayInfos = response.data.find(info => info.transitType === '지하철');
                const subwayStations = subwayInfos ? subwayInfos.locationInfos.map(station => station.stationName) : [];
                setSubwayList(subwayStations);

                const busInfos = response.data.find(info => info.transitType === '버스');
                const busStations = busInfos ? busInfos.locationInfos.map(station => station.stationName) : [];
                setBusList(busStations);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    const navigate = useNavigate();
    const [trafficTitle, setTrafficTitle] = useState("");
    const [trafficContent, setTrafficContent] = useState("");

    const onTrafficTitleHandler = (event) => {
        setTrafficTitle(event.currentTarget.value);
    }

    const onTrafficContentHandler = (event) => {
        setTrafficContent(event.currentTarget.value);
    }

    const onSubmitTraffic = (event) => {
        event.preventDefault();
        axios({
            method: "post",
            url: "http://smu-navi.ap-northeast-2.elasticbeanstalk.com/api/info",
            headers: {
                "Content-Type": `application/json`,
            },
            data: {
                "transitType": "BUS",
                "kind": 1,
                "stationId": "100000021",
                "title": "ㅜew",
                "content": "This is a sample content."
            },
        })
            .then((res) => {
                alert('교통 제보 완료');
                navigate('/report_traffic');
            })
            .catch((error) => {
                alert('교통 제보 실패');
            });
    }

    const accidentArr = ['시위', '사고', '버스만석', '우회', '그외'];
    const subwayArr = ['지하철', '버스'];

    const [selectedAccident, setSelectedAccident] = useState('');
    const [selectedSubway, setSelectedSubway] = useState('');

    const accidentCategoryClick = idx => {
        setSelectedAccident(
            idx === 0 ? '시위' : idx === 1 ? '사고' : idx === 2 ? '버스만석' : idx === 3 ? '우회' : idx === 4 ? '그외' : '',
        );
    }

    const subwayCategoryClick = idx => {
        setSelectedSubway(
            idx === 0 ? '지하철' : '버스'
        );
    }

    const handleSubwayClick = (station) => {
        setSelectedSubway(station);
    };

    const handleBusClick = (station) => {
        setSelectedSubway(station);
    };

    return (
        <div>
            <MainLogo />
            <MenuBar />
            <div className={"Report_big_wrap"}>
                <h2>제보하기</h2>
                <div>
                    <div className={"Notice_write_title_wrap"}>
                        <input type={"text"} placeholder="제목을 입력하세요" onChange={onTrafficTitleHandler} />
                    </div>
                    <div className={"Traffic_category_wrap"}>
                        <p>종류</p>
                        {accidentArr.map((elm, index) => (
                            <Catebory_btn
                                key={index}
                                isSelected={selectedAccident === elm}
                                handleClick={accidentCategoryClick}
                                elementIndex={index}
                                content={elm}
                                backColor="#FFB800"
                            />
                        ))}
                    </div>
                    <div className={"Location_category_wrap"}>
                        <p>위치</p>
                        {subwayArr.map((elm, index) => (
                            <Catebory_btn
                                key={index}
                                isSelected={selectedSubway === elm}
                                handleClick={subwayCategoryClick}
                                elementIndex={index}
                                content={elm}
                                backColor="#89B8FF"
                            />
                        ))}
                    </div>
                    <div className={"picture_category_wrap"}>
                        <p>위치</p>
                        {selectedSubway === '지하철' ? (
                            subwayList.map((elm, index) => (
                                <Catebory_btn
                                    key={index}
                                    isSelected={selectedSubway === elm}
                                    handleClick={() => handleSubwayClick(elm)}
                                    elementIndex={index}
                                    content={elm}
                                    backColor="#89B8FF"
                                />
                            ))
                        ) : (
                            busList.map((elm, index) => (
                                <Catebory_btn
                                    key={index}
                                    isSelected={selectedSubway === elm}
                                    handleClick={() => handleBusClick(elm)}
                                    elementIndex={index}
                                    content={elm}
                                    backColor="#89B8FF"
                                />
                            ))
                        )}
                    </div>
                    <div className={"content_category_wrap"}>
                        <p>내용</p>
                        <textarea
                            type="text"
                            placeholder="허위 제보가 누락되면 강제 탈퇴당할 수 있습니다"
                            onChange={onTrafficContentHandler}
                        ></textarea>
                    </div>
                </div>
                <div className={"submitTrafficBtWrap"}>
                    <button type={"button"} onClick={onSubmitTraffic}>등록하기</button>
                </div>
            </div>
        </div>
    );
}

export default Write_traffic;
