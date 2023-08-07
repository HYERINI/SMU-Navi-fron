import React from 'react';
import './Nav_Bar.css';
import { useNavigate } from 'react-router-dom';

export default function Nav_Bar() {
    const navigate = useNavigate();

    const onCheckDemon = (e) => {
        navigate('/check_demon');
    }

    const onReportTraffic = (e) => {
        navigate('/report_traffic');
    }

    const onTakeTaxi = (e) => {
        navigate('/take_taxi');
    }

    const onNotice = (e) => {
        navigate('/notice');
    }

    return(
        <div className={"Nav_bar_wrap"}>
            <div onClick={onCheckDemon}>시위 확인하기</div>
            <div onClick={onReportTraffic}>교통 제보하기</div>
            <div onClick={onTakeTaxi}>택시 같이타기</div>
            <div onClick={onNotice}>공지사항</div>
        </div>
    )
}