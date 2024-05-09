import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const Main = () => {
    return (
        <MainContainer>
            <ShowContainer>
                <List>✨ LATEST SHOW</List>
                <ShowCarousel>
                    latest show list ...
                </ShowCarousel>
                <hr />
                <List>GENRE1 SHOW</List>
                <ShowCarousel>
                    genre 1 show list ...
                </ShowCarousel>
                <hr />
                <List>GENRE2 SHOW</List>
                <ShowCarousel>
                    genre 2 show list ...
                </ShowCarousel>
                <hr />
                <List>📺 ALL SHOW</List>
                <ShowCarousel>
                    all show list ...
                </ShowCarousel>
            </ShowContainer>
        </MainContainer>
    );
};

export default Main;

const MainContainer = styled.div`
    padding: 0.6rem;
    min-height: 100vh;;
    margin: 0;
    background: linear-gradient(to bottom, #085467, #AFA7BB, #F4C0B3);
    color: white;
`;

const ShowContainer = styled.div`
    position: relative;
    justify-content: center;
    height: fit-content;
    margin: 0.5rem;
    padding: 0.6rem;
    border-radius: 0.5rem;

    background-color: rgba(0, 0, 0, 0.5);

    hr {
        margin: 1rem 0 1rem 0;
    }
`;

const List = styled.p`
    margin: 0;
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    font-size: calc(0.6rem + 1vw);
    font-weight: bold;
`;

const ShowCarousel = styled.div`
    display: flex;
    position: relative;
    width: 100%;

    overflow-x: auto;
    overflow-y: hidden;

    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
        display: none;
    }
`;