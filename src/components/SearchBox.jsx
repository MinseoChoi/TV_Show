import { styled } from "styled-components";
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

const apiURL = 'https://api.tvmaze.com/search/shows?q=';

const SearchBox = () => {
    const [click, setClick] = useState(false);
    const [keyword, setKeyword] = useState('')
    const [searchresult, setSearchresult] = useState([]);

    const onChangeKeyword = e => {
        setKeyword(e.target.value);
        
        fetch(`${apiURL}${e.target.value}`)
        .then(response => response.json())
        .then(json => setSearchresult(json));
    };

    const navigate = useNavigate();
    const handleShowClick = (id) => {
        navigate(`/show/${id}`);
        setKeyword('');
    };

    return (
        <>
            <Search className='labtop'>
                <SearchImg src={process.env.PUBLIC_URL + '/assets/searchBlack.svg'} alt="검색" />
                <SearchInput placeholder="영화 이름을 입력해주세요." value={keyword} onChange={onChangeKeyword} />
            </Search>
            <Search className={'mobile' + (click ? ' open' : ' close')}>
                <SearchIcon src={process.env.PUBLIC_URL + '/assets/searchWhite.svg'} onClick={() => setClick(!click)} alt="검색" />
                <SearchInput placeholder="영화 이름을 입력해주세요." value={keyword} className={click ? 'open' : 'close'} onChange={onChangeKeyword} />
            </Search>
            {keyword && (
                <SearchWrapper>
                    {searchresult && searchresult.map(result =>
                        <li key={result.show.id} onClick={() => handleShowClick(result.show.id)}>{result.show.name}</li>
                    )}
                </SearchWrapper>
            )}
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

const SearchWrapper = styled.ul`
    @media screen and (min-width: 501px) {
        position: absolute;
        z-index: 99;
        width: 30%;
        top: 35px;
        right: 1rem;
        height: fit-content;
        border-radius: 0.5rem;
        border: 1px solid darkgray;
        padding: 0.5rem 0.5rem;
        background: white;
        list-style: none;
        box-sizing: border-box;
        line-height: 160%;
        font-size: calc(0.3rem + 0.8vw);

        li {
            &:hover {
                cursor: pointer;
                font-weight: bold;
            }
        }
    }

    @media screen and (max-width: 500px) {
        position: absolute;
        z-index: 99;
        width: 26.5%;
        top: 35px;
        right: 4.5rem;
        height: fit-content;
        border-radius: 0.5rem;
        border: 1px solid darkgray;
        padding: 0.5rem 0.5rem;
        background: white;
        list-style: none;
        box-sizing: border-box;
        line-height: 160%;
        font-size: calc(0.3rem + 0.8vw);

        li {
            &:hover {
                cursor: pointer;
                font-weight: bold;
            }
        }
    }
`;