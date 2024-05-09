import { styled } from "styled-components";
import React, { useEffect, useState } from 'react';

const SearchBox = () => {
    return (
        <>
            <Search className='labtop'>
                <SearchImg src={process.env.PUBLIC_URL + '/assets/searchBlack.svg'} alt="검색" />
                <SearchInput placeholder="영화 이름을 입력해주세요." />
            </Search>
            <Search className={'mobile open'}>
                <SearchIcon src={process.env.PUBLIC_URL + '/assets/searchWhite.svg'} alt="검색" />
                <SearchInput placeholder="영화 이름을 입력해주세요." />
            </Search>
        </>
    )
};

export default SearchBox;

const Search = styled.div`
    @media screen and (min-width: 501px) {
        display: flex;
        position: relative;
        width: 100%;
        height: 30%;
        margin: 1.5rem;
        background-color: white;
        border-radius: 8px;

        &.mobile {
            display: none;
        }
    }

    @media screen and (max-width: 500px) {
        display: flex;
        position: relative;
        height: 30%;

        &.labtop {
            display: none;
        }

        &.open {
            width: 80%;
            background: white;
            border: 1.5px solid white;
            border-radius: 8px;
            transition: width 0.2s ease-out;
        }
        &.close {
            width: 20%;
            padding: 2px;
            border: 1.5px solid white;
            border-radius: 50%;
            transition: width 0.2s ease-out;
        }
    }
`;

const SearchImg = styled.img`
    display: flex;
    align-items: center;
    margin: 0.1rem;
    padding: 2px;
    padding-block: var(--p-block);
    width: 0.8em;
    height: 0.8em;
`;

const SearchIcon = styled.img`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 0.2rem;
    width: 0.8em;
    height: 0.8em;
    cursor: pointer;
`;

const SearchInput = styled.input`
    border: none;
    outline: none;
    background-color: transparent;
    font-size: calc(0.3rem + 0.8vw);

    &.close {
        display: none;
    }
`;