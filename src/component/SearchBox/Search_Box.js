import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Search_Box.css';
import axios, {head} from 'axios';
import styled from 'styled-components';

const { kakao } = window;
var polylines = [];
var verColor = 'black';
var transitImg = '';


// var pos1 = new kakao.maps.LatLng(37.6044854, 126.8918506);  //sw
// var pos2 = new kakao.maps.LatLng(37.5911303, 126.8799154);  //ne

var pos1 = new kakao.maps.LatLng(37.6744854, 127.0818506);  //ne
var pos2 = new kakao.maps.LatLng(37.5211303, 126.7799154);  //sw
var bounds = new kakao.maps.LatLngBounds(pos1, pos2);

// var selectTitle = "";   //선택한 위치 title 저장


function Search_Box () {
    const baseUrl = "http://smu-navi.ap-northeast-2.elasticbeanstalk.com/api/route/";
    const [ways, setWays] = useState([0]);
    const transfer = [];
    let point = [{La: "", Ma: ""}];
    let linePath = [];
    const [transferName, setTransferName] = useState([]);
    const [wayTime, setWayTime]= useState([]);
    const [map, setMap] = useState();
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
        await axios.get("http://smu-navi.ap-northeast-2.elasticbeanstalk.com/api/route")
            .then((response) => {
                for (let k = 0; k < response.data.length; k++) {
                    position[k] = {
                        Id: response.data[k].id,
                        title : response.data[k].placeName,
                        x: response.data[k].gpsX,
                        y: response.data[k].gpxY,
                        latlng: new kakao.maps.LatLng(response.data[k].gpsY, response.data[k].gpsX),
                    };
                    // setposition(position);
                }

            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(  () => {
        async function fetchData() {
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
                    buttonColor(idx);
                    resetInfoState();
                    getRemove();
                    await axios
                        .get(baseUrl + p.Id)
                        .then((response) => {
                            console.log(response)
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
                            newWays[0].subPathList.forEach(function(item1,i){
                                point = []
                                if(item1.transitType === "WALK"){
                                    item1.stationList.forEach(function(item2,j){
                                        point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                                    });
                                }
                                else{
                                    item1.gpsDetail.forEach(function(item2,j){
                                        point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                                    });
                                }
                                transfer[i] = item1;

                                linePath = [];

                                point.map((item, index) => {
                                    linePath[index] = new kakao.maps.LatLng(item.Ma, item.La);
                                })
                                polylines[i].setPath(null);
                                polylines[i].setPath(linePath);
                                myCnt++;
                            });

                            for (let k = 0; k < preSubPathCnt; k++) {
                                var newColor = colorSelector(newWays[0].subPathList[k].transitType,newWays[0].subPathList[k].busType,newWays[0].subPathList[k].lineName)
                                if(newWays[0].subPathList[k].transitType === "WALK"){
                                    polylines[k].setOptions({
                                        strokeColor: newColor,
                                        strokeStyle: 'dashed',
                                        strokeWeight: 2,
                                    });
                                }
                                else {
                                    polylines[k].setOptions({
                                        strokeColor: newColor,
                                        strokeStyle: 'solid',
                                        strokeWeight: 4,
                                    });
                                }
                                polylines[k].setMap(map);
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                });
            });
        }
        fetchData();

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

                newWays[0].subPathList.forEach(function(item1,i){
                    point = []
                    if(item1.transitType === "WALK"){
                        item1.stationList.forEach(function(item2,j){
                            point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                        });
                    }
                    else{
                        item1.gpsDetail.forEach(function(item2,j){
                            point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                        });
                    }
                    transfer[i] = item1;

                    linePath = [];

                    point.map((item, index) => {
                        linePath[index] = new kakao.maps.LatLng(item.Ma, item.La);
                    })

                    polylines[i].setPath(linePath);
                    myCnt++;
                });

                for (let k = 0; k < preSubPathCnt; k++) {
                    var newColor = colorSelector(newWays[0].subPathList[k].transitType,newWays[0].subPathList[k].busType,newWays[0].subPathList[k].lineName);
                    if(newWays[0].subPathList[k].transitType === "WALK"){
                        polylines[k].setOptions({
                            strokeColor: newColor,
                            strokeStyle: 'dashed',
                            strokeWeight: 2,
                        });
                    }
                    else{
                        polylines[k].setOptions({
                            strokeColor: newColor,
                            strokeStyle: 'solid',
                            strokeWeight: 4,
                        });
                    }
                    polylines[k].setMap(map);
                }
                console.log(linePath)
                console.log(point)
                console.log(polylines)
                console.log(ways)
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
            var newColor = colorSelector(ways[w].subPathList[i].transitType,ways[w].subPathList[i].busType,ways[w].subPathList[i].lineName);
            if(ways[w].subPathList[i].transitType === "WALK"){
                transfer[i].stationList.map((item,idx) => {
                    linePath[idx] = new kakao.maps.LatLng(item.gpsY, item.gpsX);
                })
            }
            else{
                transfer[i].gpsDetail.map((item, index) => {
                    linePath[index] = new kakao.maps.LatLng(item.gpsY, item.gpsX);
                })
            }
            if(ways[w].subPathList[i].transitType === "WALK"){
                polylines[i].setOptions({
                    strokeColor: newColor,
                    strokeStyle: 'dashed',
                    strokeWeight: 2,
                });
            }
            else{
                polylines[i].setOptions({
                    strokeColor: newColor,
                    strokeStyle: 'solid',
                    strokeWeight: 4,
                });
            }
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

        var resetShowInfo = showInfo.map((item, idx) => //상세보기&접기 초기화
            item = false
        )
        setShowInfo(resetShowInfo);
    }

    //progressBar component 따로 생성, {이용수단 type, 이용시간, 환승횟수, 도보시간} 전달
    //map으로 환승할 때마다 그리게 해서 겹치게 만들기
    //환승회차에 따라 시간 비율 정해서 transform: translate로 x좌표 늘려주기.


    //교통수단 이미지 선택함수
    function imgSelector(type, busType, lineName) {
        if(type === 'WALK')
            transitImg = 'WALK_COLOR';
        else if(type === 'BUS'){
            if(busType === '간선')
                transitImg = 'busgan';
            else if(busType === '지선')
                transitImg = 'busji';
            else if(busType === '마을버스')
                transitImg = 'busma';
        }
        else if(type === 'SUBWAY'){
            if(lineName === '1')
                transitImg = 'sub1';
            else if(lineName === '3')
                transitImg = 'sub3';
            else if(lineName === '4')
                transitImg = 'sub4';
            else if(lineName === '6')
                transitImg = 'sub6';
        }
        return(transitImg)
    }

    //교통수단 색깔 선택함수
    function colorSelector(type, busType, lineName){
        if(type === 'WALK')
            verColor = '#D9D9D9';
        else if(type === 'BUS'){
            if(busType === '간선')
                verColor = '#1E7BDB';
            else if(busType === '지선')
                verColor ='#59BE0A';
            else if(busType === '마을버스')
                verColor = '#E43506';
        }
        else if(type === 'SUBWAY'){
            if(lineName === '1')
                verColor = '#0052A4';
            else if(lineName === '3')
                verColor = '#EF7C1C';
            else if(lineName === '4')
                verColor = '#00A5DE';
            else if(lineName === '6')
                verColor = '#CD7C2F';
        }
        return(verColor)
    }
    function progress(index) {
        var subPathCnt = ways[index].subPathCnt;
        var time = ways[index].time;
        return(
            <div id = {"progress"}>
                {transferName[index].map((obj, index3) => (
                    <span id={"wayProgress"} key={index3}>
                        <span id= {'progressDetail'} style={{width:((obj.sectionTime/29*10 + (time-obj.sectionTime)%10/3 + (time-obj.sectionTime)/10 + subPathCnt/2 )/time*90)+"%" , backgroundColor: colorSelector(ways[index].subPathList[index3].transitType, ways[index].subPathList[index3].busType, ways[index].subPathList[index3].lineName)}}><span><img  id={"icon"} src={require(`../../img/${imgSelector(ways[index].subPathList[index3].transitType, ways[index].subPathList[index3].busType, ways[index].subPathList[index3].lineName )}.png`)} /></span><span id={"busdiv"}><p id={"min"}>{obj.sectionTime}분</p></span> </span>
                    </span>
                ))}
            </div>
        )
    }

    function Info(){
        return(
            <div id="ways-list-wrapper">
                <div id="ways-list">
                    {wayTime.map((data, index) => (
                        <div key={index}>
                            <div onClick={e => handleOnClick(e, index)}>
                                {bestWay(index)}
                                <p id={"time"}>{data}분</p>
                                {isTraffic(index)}
                                {progress(index)}
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

    function isTraffic(index) {
        if(ways[index].accidents != 0){
            return(
                <p id={"isTraffic"}>{ways[index].accidents[0].station.stationName} {ways[index].accidents[0].kind}</p>
            )
        }
    }

    function bestWay(index) {
        if(index == 0)
            return(
                <p id={"bestWay"}>최적 경로</p>
            )
    }
    
    function subwayInfo(index){
        if(transferName[index][0].transitType === 'SUBWAY')
            return(<span>호선</span>)
        else if(transferName[index][0].transitType === 'WALK')
            return(<span>도보</span>)
    }

    function infoDetail(index) {
        if(showInfo[index] === false) {
            return (
                <>
                    <div id={'first'}><span><img id={"firstIcon"} src={require(`../../img/${ways[index].subPathList[0].transitType}.png`)} /></span><span id={'firstInfo'} style={{backgroundColor: colorSelector(ways[index].subPathList[0].transitType,ways[index].subPathList[0].busType,ways[index].subPathList[0].lineName)}}>{transferName[index][0].lineName}{subwayInfo(index)}</span> </div>
                    <div>하차 {transferName[index][0].to}</div>
                </>
            )
        }
        else{
            return (
                <>
                    {transferName[index].map((obj, index2) => (
                        <div key={index2}>
                            <div id={"wayDetail"}>
                                <p id={'takePoint'}>출발 {obj.from}</p>
                                <div id={"infoDetail"}>
                                    <h6 id={"detailMin"}>{obj.sectionTime}분</h6>
                                    <span id={'verProgress'} style={{backgroundColor: colorSelector(obj.transitType, obj.busType, obj.lineName)}}></span>
                                    <span id={"icon_line"}><img  id={"detailIcon"} src={require(`../../img/${imgSelector(obj.transitType, obj.busType, obj.lineName )}.png`)} /></span>
                                    {lineName(index, index2)}
                                </div>
                                <p id={'offPoint'}>도착 {obj.to}</p>
                            </div>
                        </div>

                    ))}
                    <div id={'finalPoint'}><img id={"flag"} src={require('../../img/flag.png')} /> 상명대 정문 </div>
                </>
            )
        }
    }

    function lineName(index1, index2) {
        if(transferName[index1][index2].transitType === "SUBWAY"){
            return(
                <span id={'typeDetail'}>{transferName[index1][index2].lineName}호선</span>
            )
        }else if(transferName[index1][index2].transitType === "BUS"){
            return(
                <span id={'typeDetail'}>{transferName[index1][index2].lineName}번</span>
            )
        }
        if(transferName[index1][index2].transitType === "WALK"){
            return(
                <span id={'typeDetail'}>도보</span>
            )
        }
    }

    function showInfoDetail(index) {
        if(showInfo[index] === false) {
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
        if(showInfo[index] === false)
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
        <>
                <div style={{height: '0px'}}>
                    <div className={"search-wrapper"}>
                        <div id={"Search_box_title"}><p id={"Search_titile"}>상세경로</p></div>
                        {Info()}
                    </div>
                    <div id={"button_list"} >
                        {position.map((obj, index) => (
                            <div key={index}>
                                <button id={"locBtn"+index} onClick={e => buttonSelect(e, index)}>{obj.title}</button>
                            </div>
                        ))}
                    </div>

                </div>
        </>
       
    )
}

export default Search_Box