import './MyInfo.css';
import React from "react";

function MyInfoBox(){
    return(
        <div className={"myInfoBox"}>
            <div id={"myInfoUserName"}>이혜린 님</div>
            <div className={"mypageBar"}></div>
            <div id={"myInfoUserReportNum"}>제보 글 수 3</div>
        </div>
    )
}

export default MyInfoBox;