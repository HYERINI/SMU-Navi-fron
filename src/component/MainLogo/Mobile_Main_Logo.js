import React, { useState } from 'react';
import styled from 'styled-components';
import listBt from './../../img/hamburger.svg';
import clickedHam from './../../img/clickedHam.svg';
import logo from './../../img/mobileLogo.svg';
import { useNavigate } from 'react-router-dom';
import profile from './../../img/profile.svg';

const Container = styled.div`
  width: 100%;
  height: auto;
  margin: 0;
  padding: 10px 10px 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
`;

const ListImage = styled.img`
  width: 50px;
  height: auto;
  cursor: pointer;
`;

const LogoImage = styled.img`
  width: 110px;
  height: 60px;
  cursor: pointer;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const NavContainer = styled.div`
  position: absolute;
  top: 60px;
  left: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 100%;
  height: calc(100% - 60px);
  background-color: #0B097A;
  transition: left 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  z-index: 1;
`;

const NavLink = styled.div`
  font-size: 25px;
  font-weight: bolder;
  padding: 20px 10px;
  color: white;
`;

const NavLine = styled.div`
  width: 70%;
  background-color: white;
  height: 2px;
`;

const Mobile_Main_Logo = () => {
    const navigate = useNavigate();
    const [isNavOpen, setIsNavOpen] = useState(false);
    const onLogin = (e) => {
        navigate('/login');
    }
    const handleListImageClick = () => {
        setIsNavOpen((prev) => !prev);
    };

    const handleLogoClick = () => {
        setIsNavOpen(false);
    };

    return (
        <Container>
            <ListImage
                src={isNavOpen ? clickedHam : listBt}
                onClick={handleListImageClick}
            />
            <LogoImage src={logo} onClick={handleLogoClick} />
            <ProfileImage src={profile} onClick={onLogin}/>
            {/* 스르륵 열리는 내비게이션 바 */}
            <NavContainer isOpen={isNavOpen}>
                <NavLink>시위 확인하기</NavLink>
                <NavLine></NavLine>
                <NavLink>교통 제보하기</NavLink>
                <NavLine></NavLine>
                <NavLink>꿀팁 확인하기</NavLink>
                <NavLine></NavLine>
                <NavLink>CCTV 확인하기</NavLink>
            </NavContainer>
        </Container>
    );
};

export default Mobile_Main_Logo;
