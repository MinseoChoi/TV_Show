import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import SearchBox from "./SearchBox";

const Header = () => {
    const navigate = useNavigate();
    const handleMainClick = () => {
        navigate('/');
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
                    <p>All Shows</p>
                    <p>Latest</p>
                    <p>By Genre</p>
                    <p>Favorite</p>
                </Menubar>
            </Navibar>
            <Navibar>
                <SearchBox />
                <Menu 
                    src={process.env.PUBLIC_URL + '/assets/list.svg'} 
                    alt='메뉴' 
                />
            </Navibar>
        </AppHeader>
    );
};

export default Header;

const AppHeader = styled.header`
    position: sticky;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #085467;
    top: 0;
    width: 100%;
    height: calc(4rem + 0.5vw);
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