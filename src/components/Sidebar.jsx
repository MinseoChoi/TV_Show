import { styled } from 'styled-components';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({menu, setMenu}) => {
    const navigate = useNavigate();
    const handleMenuClick = (name) => {
        navigate(`${name}`);
        setMenu(false);
    };
    
    return (
        <ControlBox className={menu ? 'open' : 'close'}>
            <List>Popular</List>
            <List onClick={() => handleMenuClick('all')}>All Shows</List>
            <List onClick={() => handleMenuClick('latest')}>Latest</List>
            <List onClick={() => handleMenuClick('bygenre')}>By Genre</List>
            <List onClick={() => handleMenuClick('favorite')}>Favorite</List>
        </ControlBox>
    );
};

export default Sidebar;

const ControlBox = styled.div`
    @media screen and (min-width: 501px) {
        display: none;
    }

    @media screen and (max-width: 500px) {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: calc(3.5rem + 1vw);
        padding: 0.2rem;
        width: 8rem;
        background: #085467;
        color: white;
        text-align: center;
        font-size: calc(0.8rem + 0.5vw);
        border-radius: 0 0 0 20%;
        transition: right 0.5s ease-out;

        &.open {
            right: 0;
        }

        &.close {
            right: -8.5rem;
        }
    }
`;

const List = styled.p`
    margin: 8px;

    &:hover {
        font-weight: bold;
        cursor: pointer;
    }
`;