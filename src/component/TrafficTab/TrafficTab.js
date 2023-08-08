import React from 'react';
import './TrafficTab.css';
import heartLike from './../../img/heartTrue.png';
import heartHate from './../../img/heartFalse.png';

function TrafficTab(props){
    return(
        <div className={"Traffic_tap_box"}
            style={{ transform: `translateX(${props.slide}px)`,
                    transition: "0.5s ease",
            }}>
            <div className={"Traffic_tap_time"}>
                <p>{props.time}</p>
            </div>
            <div className={"Traffic_tap_title"}>
                <h3>{props.title}</h3>
            </div>
            <div className={"Traffic_tap_content"}>
                <p>{props.content}</p>
            </div>
            <div className={"Traffic_tap_heart"}>
                <div id="board_heart">
                    <p>동의</p>
                    <img src={heartLike}/>
                    <span>{props.heartLike}</span>
                </div>
                <div id="board_heart2">
                    <p>반대</p>
                    <img src={heartHate} />
                    <span>{props.heartHate}</span>
                </div>
            </div>
        </div>
    )
}

export default TrafficTab;