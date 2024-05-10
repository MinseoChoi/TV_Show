import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import SearchBox from "./SearchBox";
import Sidebar from './Sidebar';

const Header = () => {
    const [menu, setMenu] = useState(false);

    const navigate = useNavigate();
    const handleMainClick = () => {
        navigate('/');
        setMenu(false);
    };
    const handleMenuClick = (name) => {
        navigate(`${name}`);
        setMenu(false);
    };

    useEffect(() => {
        setMenu(false);
    }, []);

    const toggleMenu = () => {
        setMenu(!menu);
    };

    return (
        <AppHeader>
            <Navibar>
                <Home onClick={handleMainClick}>
                    Min's Show
                </Home>
                <HomeLogo
                    src={process.env.PUBLIC_URL + '/assets/logo.svg'}
                    alt='로고'
                    onClick={handleMainClick}
                />
                <Menubar>
                    <p onClick={() => handleMenuClick('all')}>All Shows</p>
                    <p onClick={() => handleMenuClick('latest')}>Latest</p>
                    <p onClick={() => handleMenuClick('bygenre')}>By Genre</p>
                    <p onClick={() => handleMenuClick('favorite')}>Favorite</p>
                </Menubar>
            </Navibar>
            <Navibar>
                <SearchBox />
                <Menu 
                    src={process.env.PUBLIC_URL + '/assets/list.svg'} 
                    alt='메뉴' 
                    onClick={toggleMenu}
                />
                <Sidebar menu={menu} setMenu={setMenu} />
            </Navibar>
        </AppHeader>
    );
};

export default Header;

const AppHeader = styled.header`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #085467;
    top: 0;
    width: 100%;
    height: calc(4rem + 0.5vw);
    margin: 0;
    padding: 0;
    font-size: calc(1rem + 0.5vw);
    z-index: 10000;
`;

const Navibar = styled.div`
    display: flex;
    align-items: center;

    @media screen and (min-width: 501px) {
        justify-content: flex-start;
    }
    @media screen and (max-width: 500px) {
        justify-content: flex-end;
    }
`;

const Home = styled.p`
    cursor: pointer;
    margin: 1rem;
    width: fit-content;
    background: white;
    font-size: calc(0.8rem + 1vw);
    font-weight: bold;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

    @media screen and (max-width: 500px) {
        display: none;
    }
`;

const HomeLogo = styled.img`
    @media screen and (min-width: 501px) {
        display: none;
    }

    @media screen and (max-width: 500px) {
        align-items: center;
        margin: 20px;
        width: 2rem;
        height: 2rem;
        cursor: pointer;
    }
`;

const Menubar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    color: white;
    margin: 1rem;
    width: fit-content;
    font-size: calc(0.5rem + 0.5vw);
    gap: 1rem;

    p:hover {
        cursor: pointer;
        font-weight: bold;
        text-decoration: overline underline 1px;

        transition: all 200ms ease-out;
    }

    @media screen and (max-width: 500px) {
        display: none;
    }
`;

const Menu = styled.img`
    align-items: center;
    margin: 20px;
    width: 2rem;
    height: 2rem;
    cursor: pointer;

    @media screen and (min-width: 501px) {
        display: none;
    }
`;