import React, {useState, useEffect} from 'react';
import './Search_Box.css';
import axios, {head} from 'axios';
import styled from 'styled-components';
const { kakao } = window;
var polylines = [];

// var pos1 = new kakao.maps.LatLng(37.6044854, 126.8918506);  //sw
// var pos2 = new kakao.maps.LatLng(37.5911303, 126.8799154);  //ne

var pos1 = new kakao.maps.LatLng(37.6744854, 127.0818506);  //ne
var pos2 = new kakao.maps.LatLng(37.5211303, 126.7799154);  //sw
var bounds = new kakao.maps.LatLngBounds(pos1, pos2);

// var selectTitle = "";   //선택한 위치 title 저장


function Search_Box () {
    const baseUrl = "http://localhost:8080/api/route/";
    const [ways, setWays] = useState([0]);
    const transfer = [];
    let point = [{La: "", Ma: ""}];
    let linePath = [];
    const [transferName, setTransferName] = useState([]);
    const [wayTime, setWayTime]= useState([]);
    const [map, setMap] = useState();
    const [route, setRoute] = useState([0]);
    let [position,setposition] = useState([]);

    let [mysCnt, setMySCnt] = useState(5);

    let prePathCnt = 0;
    let preSubPathCnt = 0;

    //영원히 안변할 변수
    const imageSize = new kakao.maps.Size(20, 25);
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    let myCnt = 5;
    //~영원히 안변할 변수
    
    const [showInfo, setShowInfo] = useState([false, false, false, false, false]);


    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }
    const polyOption = {
        strokeWeight: 4, // 선의 두께
        strokeColor: 'red', // 선의 색깔
        strokeOpacity: 1, // 선의 불투명도  (0에 가까울수록 투명)
        strokeStyle: 'solid' // 선의 스타일
    };

    for(let i=0; i<5; i++){
        polylines = polylines.concat(new kakao.maps.Polyline(polyOption));
    }

    async function getRoute() {
        await axios.get("http://localhost:8080/api/route")
            .then((response) => {
                for (let k = 0; k < response.data.length; k++) {
                    position[k] = {
                        Id: response.data[k].startStationId,
                        title : response.data[k].startStationName,
                        x: response.data[k].x,
                        y: response.data[k].y,
                        latlng: new kakao.maps.LatLng(response.data[k].y, response.data[k].x),
                    };
                    // setposition(position);
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }

     useEffect( async () => {
         await getRoute();

        const mapContainer = document.getElementById('map'), // 지도를 표시할 div
            mapOption = {
                center: new kakao.maps.LatLng(37.596826, 126.9586567),
                level: 8 // 지도의 확대 레벨

            };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption);
        map.setMaxLevel(8);
        setMap(map);

         var constrainBounds = function() {
             var center = map.getCenter();

             var clipLat, clipLng, sw, ne;

             if (!bounds.contain(center)) {

                 sw = bounds.getSouthWest();
                 ne = bounds.getNorthEast();

                 clipLat = Math.min(Math.max(sw.getLat(), center.getLat()), ne.getLat());
                 clipLng = Math.min(Math.max(sw.getLng(), center.getLng()), ne.getLng());

                 map.setCenter(new kakao.maps.LatLng(clipLat, clipLng));
             }
         };

         kakao.maps.event.addListener( map, 'drag', constrainBounds);
         kakao.maps.event.addListener( map, 'zoom_changed', constrainBounds);
        position.map((p, idx) => {

            var marker = new kakao.maps.Marker({
                map: map,
                position: p.latlng,
                title: p.title,
                image: markerImage,
                clickable: true
            });
            marker.setMap(map);
            // setTransferName(null);


            kakao.maps.event.addListener(marker, 'click', async function Click ()  {
                // selectTitle = p.title;
                resetInfoState();
                getRemove();
                await axios
                    .get(baseUrl + p.Id)
                    .then((response) => {
                        let newWays = [];
                        let newTransferName = [];
                        let newWayTime = [];

                        prePathCnt = response.data.pathInfoCnt;

                        for(var i = 0; i < response.data.pathInfoCnt; i++) {
                            newWays[i] = response.data.pathInfoList[i];
                        }
                        transferName.length = response.data.pathInfoList.length;
                        wayTime.length = response.data.pathInfoList.length;


                        newWays.forEach(function(item1,k){
                            newTransferName[k] = [];
                            item1.subPathList.forEach(function(item2){
                                newTransferName[k] = newTransferName[k].concat(item2);
                                console.log(item2);
                            })
                            newWayTime[k] = item1.time;
                        })
                        setWays(newWays);
                        setTransferName(newTransferName);
                        setWayTime(newWayTime);
                        preSubPathCnt = newWays[0].subPathList.length;
                        for (var i = 0; i < polylines.length; i++) {
                            polylines[i].setPath([]);
                            polylines[i].setMap(null);
                        }

                        console.log(newWays)
                        newWays[0].subPathList.forEach(function(item1,i){
                            point = []
                            item1.gpsDetail.forEach(function(item2,j){
                                point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                            });
                            transfer[i] = item1;

                            linePath = [];

                            point.map((item, index) => {
                                linePath[index] = new kakao.maps.LatLng(item.Ma, item.La);
                            })

                            console.log(linePath)
                            polylines[i].setPath(linePath);
                            myCnt++;
                        });

                        for (let k = 0; k < preSubPathCnt; k++) {
                            polylines[k].setMap(map);
                        }

                    })
                    .catch((error) => {
                        console.log(error);
                    })
            });
        });

    }, []);



    async function getData(p) {
        getRemove();

        await axios
            .get(baseUrl + p)
            .then((response) => {

                let newWays = [];
                let newTransferName = [];
                let newWayTime = [];

                prePathCnt = response.data.pathInfoCnt;

                for(var i = 0; i < response.data.pathInfoCnt; i++) {
                    newWays[i] = response.data.pathInfoList[i];
                }


                newWays.forEach(function(item1,k){
                    newTransferName[k] = [];
                    item1.subPathList.forEach(function(item2){
                        newTransferName[k] = newTransferName[k].concat(item2);
                        console.log(item2);
                    })
                    newWayTime[k] = item1.time;
                })
                setWays(newWays);
                setTransferName(newTransferName);
                setWayTime(newWayTime);

                preSubPathCnt = newWays[0].subPathList.length;

                for (var i = 0; i < polylines.length; i++) {
                    polylines[i].setPath([]);
                    polylines[i].setMap(null);
                }

                console.log(newWays)
                newWays[0].subPathList.forEach(function(item1,i){
                    point = []
                    item1.gpsDetail.forEach(function(item2,j){
                        point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                    });
                    transfer[i] = item1;

                    linePath = [];

                    point.map((item, index) => {
                        linePath[index] = new kakao.maps.LatLng(item.Ma, item.La);
                    })

                    console.log(linePath)
                    polylines[i].setPath(linePath);
                    myCnt++;
                });

                for (let k = 0; k < preSubPathCnt; k++) {
                    polylines[k].setMap(map);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getRemove() {
        for (var i = 0; i < polylines.length; i++) {
            polylines[i].setPath([]);
            polylines[i].setMap(null);
        }
    }


    function drawPoly(w) {
        mysCnt = ways[w].subPathList.length;
        for (var i = 0; i < ways[w].subPathList.length; i++) {
            transfer[i] = ways[w].subPathList[i];

            linePath = []
            transfer[i].gpsDetail.map((item, index) => {
                linePath[index] = new kakao.maps.LatLng(item.gpsY, item.gpsX);
            })
            polylines[i].setPath(linePath);
        }

        for (var k = 0; k < mysCnt; k++) {
            polylines[k].setMap(map);
        }
    }

    async function handleOnClick (e, i) {
        getRemove();
        drawPoly(i);
    }

    function buttonColor(index) {
        for(var i = 0; i < position.length; i++) {
            document.getElementById("locBtn"+i).style.backgroundColor= "white";
            document.getElementById("locBtn"+i).style.color= "black";
        }
        document.getElementById("locBtn"+index).style.backgroundColor = "#879B6D";
        document.getElementById("locBtn"+index).style.color= "white";
    }


    function resetInfoState() {
        showInfo.forEach(function(item,k){
            item = false;
        })
        setShowInfo(showInfo);
    }

    function buttonSelect(e, i){
        resetInfoState();
        // selectTitle = position[i].title;
        const startPoint = position[i].Id;
        getRemove();
        getData(startPoint);
        buttonColor(i);
    }

    //progressBar component 따로 생성, {이용수단 type, 이용시간, 환승횟수, 도보시간} 전달
    //map으로 환승할 때마다 그리게 해서 겹치게 만들기
    //환승회차에 따라 시간 비율 정해서 transform: translate로 x좌표 늘려주기.

    const ProgressBar = styled.div`
      transform: translate(1vh, 50%);
      background-color: #D9D9D9;
      width:25vh;
      height: 2vh;
    `

    function info(){
        return(
            <div id="ways-list-wrapper">
                <div id="ways-list">
                    {wayTime.map((data, index) => (
                        <div key={index}>
                            <div onClick={e => handleOnClick(e, index)}>
                                {bestWay(index)}
                                <p id={"time"}>{data}분</p>
                                <ProgressBar></ProgressBar>
                                {infoDetail(index)}
                                {showInfoDetail(index)}
                                <hr/>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
    
    function bestWay(index) {
        if(index == 0)
            return(
                <p id={"bestWay"}>최적 경로</p>
            ) 
    }

    function infoDetail(index) {
        if(showInfo[index] == false) {
            return (
                <>
                    {transferName[index].map((obj, index2) => (
                        <div key={index2}>
                            <div id={"wayDetail"}>
                                <h6 >{obj.laneName}</h6>
                                <h6>하차 {obj.to}</h6>
                            </div>
                        </div>
                    ))}
                </>
            )
        }
        else{
            console.log(position[index]);
            return (
                <>
                    {transferName[index].map((obj, index2) => (
                        <div key={index2}>
                            <div id={"wayDetail"}>
                                {/*<h6>출발 {selectTitle}</h6>*/}
                                <h6>승차 {obj.from}</h6>
                                <h6>{obj.laneName}</h6>
                                <h6>하차 {obj.to}</h6>
                            </div>
                        </div>
                    ))}
                </>
            )
        }
    }

    function showInfoDetail(index) {
        if(showInfo[index] == false) {
            return(
                <>
                    <p id={"showInfo"} onClick={e => changeInfoState(e, index)}>상세보기</p>
                </>
            )
        }
        else
        {
            return(
                <>
                    <p id={"showInfo"} onClick={e => changeInfoState(e, index)}>접기</p>
                </>
            )
        }
        
    }

    function changeInfoState(e, index){
        if(showInfo[index] == false)
            var newShowInfo = showInfo.map((item , idx) =>
                idx === index ? true : item,
            );
        else
            newShowInfo = showInfo.map((item , idx) =>
                idx === index ? false : item,
            );
        setShowInfo(newShowInfo);
    }
    

    return(
    <div>
        <div className={"search-wrapper"}>
            <div id={"Search_box_title"}><h3>상세경로</h3></div>
            <div id={"underBar"}/>
            {info()}
        </div>
        <div id={"button_list"} >
            {position.map((obj, index) => (
                <div key={index}>
                    <button id={"locBtn"+index} onClick={e => buttonSelect(e, index)}>{obj.title}</button>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Search_Box