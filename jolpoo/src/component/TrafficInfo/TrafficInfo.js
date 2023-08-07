import React, {useEffect, useState} from 'react';
import MainLogo from '../../component/MainLogo/Main_Logo';
import './TrafficInfo.css';
import pngwing from '../../img/pngwing.png';
import axios from 'axios';

const TrafficInfo = ({traffic_data}) => {   //traffic_data = 받아 올 시위 정보
    const [info, setInfo] = useState([0]);
    const [station, setStation] = useState([0]);
    useEffect(() => {
        async function fetchData() {
            await axios
                .get("http://smu-navi.ap-northeast-2.elasticbeanstalk.com/api/accidents")
                .then((response) => {
                    console.log(response.data.data[0].station.stationName)
                    let newInfo = [];
                    let newStation = [];

                    for(var i = 0; i < response.data.data.length; i++) {
                        newInfo[i] = response.data.data[i];
                        newStation[i] = response.data.data[i].station;
                    }
                    setInfo(newInfo);
                    setStation(newStation);

                })
                .catch((error) => {
                    console.log(error);
                })
        }
        fetchData();
    }, []);
    console.log(info)
    console.log(info[0].station)

    function isTraffic(){
        if(info != 0){
            return(
                <>
                    <div id={'infoWrapper'} >
                        {info.map((item, index) => (
                            <div key={index}>
                                <h5 id={"infoData"}>{item.kind}</h5>
                            </div>
                        ))}
                    </div>
                </>
            )
        }
    }
        return (
       <div>
           <div id={"traffic"}>
               <span><img id={"pngwing"} src={pngwing} /></span>
               <h5 id={"traffic_title"}>교통정보</h5>
               {isTraffic()}
           </div>

       </div>
    );
}
export default TrafficInfo