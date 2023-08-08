import React from 'react';
import ReactDOM from 'react-dom/client';
import { useMediaQuery } from 'react-responsive';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CookieProvider } from "react-cookie";
import './index.css';

//member page
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import FindPw from "./pages/FindPw/FindPw";
import Mypage from "./pages/Mypage/Mypage";

//Sub page
import CheckDemon from "./pages/CheckDemon/CheckDemon";

import ReportTraffic from "./pages/ReportTraffic/ReportTraffic";
import TrafficList from "./pages/ReportTraffic/TrafficList";
import Write_ReportTraffic from "./pages/ReportTraffic/Write_traffic";
import Detail_traffic from "./pages/ReportTraffic/Detail_traffic";

import TakeTaxi from "./pages/TakeTaxi/TakeTaxi";
import Write_TakeTaxi from './pages/TakeTaxi/Write_TakeTaxi';

import CCTV from './pages/CCTV/CCTV';
import Notice from "./pages/Notice/Notice";
import Write_Notice from './pages/Notice/Write_notice';
import Detail_Notice from './pages/Notice/Detail_notice';

//mobile pages
import MobileMain from './pages/MapMain/MobileMain';
import MobileLogin from './pages/Login/MobileLogin';
import MobileSignup from './pages/Signup/MobileSignup';

//map page
import MapMain from "./pages/MapMain/Map_Main";
document.cookie = "crossCookie=bar; SameSite=None; Secure";

export const Mobile = ({children}) => {
    const isMobile = useMediaQuery({
        query : "(max-width:768px)"
    });

    return (
        <>
            {isMobile && children}
        </>
    );
}

export const PC = ({children}) => {
    const isPc = useMediaQuery({
        query : "(min-width:769px)"
    });

    return (
        <>
            {isPc && children}
        </>
    );
}

function App(){
    return(<>
            <Mobile>
                <Router>
                    <Routes>
                        <Route path="/main" element={<MobileMain />}></Route>
                        <Route path="/login" element={<MobileLogin />}></Route>
                        <Route path="/signup" element={<MobileSignup />}></Route>
                        <Route path="/" element={<MapMain />}></Route>
                    </Routes>
                </Router>
            </Mobile>
            <PC>
                <Router>
                    <Routes>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                        <Route path="/findpw" element={<FindPw />}></Route>
                        <Route path="/mypage" element={<Mypage />}></Route>

                        <Route path="/" element={<MapMain />}></Route>

                        <Route path="/check_demon" element={<CheckDemon />}></Route>

                        <Route path="/report_traffic" element={<ReportTraffic />}></Route>
                        <Route path="/list_traffic" element={<TrafficList />}></Route>
                        <Route path="/write_traffic" element={<Write_ReportTraffic />}></Route>
                        <Route path="/detail_traffic/:id" element={<Detail_traffic />}></Route>

                        <Route path="/take_taxi" element={<TakeTaxi />}></Route>
                        <Route path="/write_takeTaxi" element={<Write_TakeTaxi />}></Route>

                        <Route path="/write_notice" element={<Write_Notice />}></Route>
                        <Route path="/detail_notice/:id" element={<Detail_Notice />}></Route>

                        <Route path="/CCTV" element={<CCTV />}></Route>

                    </Routes>
                </Router>
            </PC>
        </>
    )
}

export default App;