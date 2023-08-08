import React, {useEffect, useState} from 'react';
import MainLogo from '../../component/MainLogo/Main_Logo';
import SearchBox from '../../component/SearchBox/Search_Box';
import M_Search_Box from "../../component/SearchBox/M_Search_Box";
import './Map_Main.css';
import Line from '../../component/Line/Line';
import Footer from "../../component/Footer/Footer";
import M_Main_Logo from "../../component/MainLogo/Mobile_Main_Logo";
import MenuBar from "../../component/MenuBar/MenuBar";
import TrafficInfo from "../../component/TrafficInfo/TrafficInfo";
import {MEDIA_QUERIES, Wrapper} from "../../component/MEDIA_QUERIES/MEDIA_QUERIES";
import Media from "react-media";
const Map_Main = ({linePath}) => {

    const PcMode = () => (
        <>
            <MainLogo className={"mainlogo"}/>
            <Line/>
            <MenuBar/>
            <TrafficInfo />
            <div id='map' ></div>
            <SearchBox />
            <Footer />

        </>
    )


    const MobileMode = () => (
        <>
            <Wrapper>
                <M_Main_Logo className={"mainlogo"}/>
                <M_Search_Box />

            </Wrapper>
        </>
    )


    return (
        <div className={"Main_wrap"}>
            <Media queries={MEDIA_QUERIES}>
                {matches => {
                    return(
                        <>
                            {matches.pc && <PcMode />}
                            {matches.mobile && <MobileMode />}
                        </>
                    )
                }}
            </Media>
        </div>
    );
}
export default Map_Main