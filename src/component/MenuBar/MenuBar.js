import React from 'react';
import './MenuBar.css';
import { Link } from 'react-router-dom';

function MenuBar() {
    return (
        <nav className="navigation-bar">
            <ul className="navigation-menu">
                <li>
                    <Link to="/" className="navigation-link">
                        대중교통지도
                    </Link>
                </li>
                <li>
                    <Link to="/report_traffic" className="navigation-link">
                        교통제보하기
                    </Link>
                </li>
                <li>
                    <Link to="/take_taxi" className="navigation-link">
                        꿀팁 보러가기
                    </Link>
                </li>
                <li>
                    <Link to="/CCTV" className="navigation-link">
                        CCTV 보러가기
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default MenuBar;
