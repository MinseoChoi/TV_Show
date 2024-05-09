import styled from 'styled-components';
import React from 'react';

const Sidebar = ({menu, setMenu}) => {
    return (
        <ControlBox className={menu ? 'open' : 'close'}>
            <List>Popular</List>
            <List>All Shows</List>
            <List>Latest</List>
            <List>By Genre</List>
            <List>Favorite</List>
        </ControlBox>
    );
};

export default Sidebar;

const ControlBox = styled.div`
    @media screen and (min-width: 501px) {
        display: none;
    }

    @media screen and (max-width: 500px) {
        &.open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: calc(3.5rem + 1vw);
            right: 0;
            padding: 0.2rem;
            width: 120px;
            background: #085467;
            color: white;
            text-align: center;
            font-size: calc(0.8rem + 0.5vw);
            border-radius: 0 0 0 20%;
            animation: open 1s linear 1;

            @keyframes open {
                0% {
                    transform: translateX(120px);
                }
                100% {
                    transform: translateX(0);
                }
            }
        }

        &.close {
            display: none;
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