import React, {useState, useEffect} from 'react';
import './Search_Box.css';
import axios from 'axios';

const { kakao } = window;
function Search_Box () {
    const baseUrl = "http://localhost:8080/api/route/";
    const [ways, setWays] = useState([0]);
    const transfer = [];
    const point = [{La: "", Ma: ""}];
    const linePath = [];
    const [transferName, setTransferName] = useState([null]);
    const [wayTime, setWayTime]= useState([]);
    const [map, setMap] = useState();
    const [route, setRoute] = useState([0]);
    let [position,setposition] = useState([]);

    let [mysCnt, setMySCnt] = useState(5);

    //영원히 안변할 변수
    const imageSize = new kakao.maps.Size(20, 25);
    const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
    const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
    let myCnt = 5;
    //~영원히 안변할 변수

    var polylines = [];

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
                // setposition([]);
                for (let k = 0; k < response.data.length; k++) {
                    position[k] = {
                        Id: response.data[k].startStationId,
                        title : response.data[k].startStationName,
                        x: response.data[k].x,
                        y: response.data[k].y,
                        latlng: new kakao.maps.LatLng(response.data[k].y, response.data[k].x),
                    };
                    setposition(position);
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
                center: new kakao.maps.LatLng(37.566826, 126.9786567),
                level: 7 // 지도의 확대 레벨
            };

        // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
        const map = new kakao.maps.Map(mapContainer, mapOption);
        setMap(map);

        position.map((p, idx) => {

            var marker = new kakao.maps.Marker({
                map: map,
                position: p.latlng,
                title: p.title,
                image: markerImage,
                clickable: true
            });
            marker.setMap(map);
            setTransferName(null);

            kakao.maps.event.addListener(marker, 'click', async function Click ()  {
                getRemove();
                await axios
                    .get(baseUrl + p.Id)
                    .then((response) => {

                        console.log(response.data);
                        for (var i = 0; i < response.data.pathInfoCnt; i++) {
                            ways[i] = [];
                            transferName[i] = [];
                            wayTime[i] = [];
                            console.log("초기화");

                        }
                        for(var i = 0; i < response.data.pathInfoCnt; i++) {
                            ways[i] = response.data.pathInfoList[i];
                        }
                        console.log(ways)
                        // ways.length = response.data.pathInfoList.length;
                        // transferName.length = response.data.pathInfoList.length;
                        // wayTime.length = response.data.pathInfoList.length;
                        ways.forEach(function(item1,k){
                            console.log(item1)
                            item1.subPathList.forEach(function(item2){
                                transferName[k] = item2;
                            })
                            wayTime[k] =  item1.time;
                        })
                        setWays(ways);

                        ways[0].subPathList.forEach(function(item1,i){

                            item1.stationList.forEach(function(item2,j){
                                point[j] = {La: item2.gpsX, Ma: item2.gpsY}
                            });
                            transfer[i] = item1;

                            point.map((item, index) => {
                                linePath[index] = new kakao.maps.LatLng(item.Ma, item.La);
                            })

                            polylines[i].setPath(linePath);
                            myCnt++;
                        });
                        for (let k = 0; k < myCnt; k++) {
                            polylines[k].setMap(map);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            });
        });

    }, []);



    async function getData(startPoint) {
        await axios
            .get(baseUrl + startPoint)
            .then((response) => {
                for (var i = 0; i < response.data.pathInfoCnt; i++) {
                    ways[i] = [];
                    transferName[i] = [];
                    wayTime[i] = [];
                    console.log("문자열")

                }
                // ways.length = response.data.pathInfoList.length;
                // transferName.length = response.data.pathInfoList.length;
                // wayTime.length = response.data.pathInfoList.length;
                ways.forEach(function(item1,k){
                    item1 = response.data.pathInfoList[k];
                    console.log("문자열")
                    console.log(item1)
                    item1.subPathList.forEach(function(item2,j){
                        transferName[k] = item2;
                    })
                    wayTime[k] =  item1.time;
                })

                drawPoly(0);
                setWays(ways);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function getRemove() {
        for (var i = 0; i < myCnt; i++) {
            polylines[i].setMap(null);
        }
        myCnt = 0;
    }


    function drawPoly(w) {
        mysCnt = ways[w].subPathList.length;
        for (var i = 0; i < ways[w].subPathList.length; i++) {
            transfer.length = ways[w].subPathList.length;
            transfer[i] = ways[w].subPathList[i];

            for (var j = 0; j < transfer[i].stationList.length; j++) {
                point.length = transfer[i].stationList.length;
                point[j] = {La: transfer[i].stationList[j].gpsX, Ma: transfer[i].stationList[j].gpsY}
            }

            linePath.length = point.length;
            const elements = point.map((item, index) => {
                linePath[index] = new kakao.maps.LatLng(item.Ma, item.La);
            })
            polylines[i].setPath(linePath);
            mysCnt++;
        }


        for (var k = 0; k < mysCnt; k++) {
            polylines[k].setMap(map);
        }
    }

    async function handleOnClick (e, i) {
        getRemove();
        drawPoly(i);

    }

    function buttonSelect(e, i){
        getRemove();
        const startPoint = position[i].Id;
        getData(startPoint);

    }

    return(
    <div>
        <div className={"search-wrapper"}>
            <div id={"Search_box_title"}><h3>상세경로</h3></div>
            <div id={"underBar"}/>
            <div id="ways-list-wrapper">
                <div id="ways-list">
                    {/*<div>{wayTime.toString()}</div>*/}
                    {/*{wayTime.map((data, index) => (*/}
                    {/*    // <div key={index}>{index}</div>*/}
                    {/*    <div key={index}>*/}
                    {/*        <div onClick={e => handleOnClick(e, index)}>*/}
                    {/*            <h5> . </h5>*/}
                    {/*            {transferName[index].map((obj, index) => (*/}
                    {/*                <div key={index}>*/}
                    {/*                <h5>  {obj.type} : {obj.laneName} &nbsp;소요시간: {obj.sectionTime}분</h5>*/}
                    {/*                </div>*/}
                    {/*                    ))}*/}
                    {/*            <h5>총소요시간 : {data}분</h5>*/}
                    {/*            <hr/>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                </div>
            </div>
        </div>
        <div id={"button_list"}>
            {position.map((obj, index) => (
                <div key={index}>
                    <button onClick={e => buttonSelect(e, index)}>{obj.title}</button>
                </div>
            ))}
        </div>
    </div>
    )
}

export default Search_Box