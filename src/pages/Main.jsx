import styled from 'styled-components';
import React, { useState, useEffect } from 'react';

const Main = () => {
    const [shows, setShows] = useState([]);

    useEffect(() => {
        fetch('https://api.tvmaze.com/shows')
        .then(response => response.json())
        .then(json => {
            setShows(json);
        });
    }, []);

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
                    {shows.map(show => (
                        <Show key={show.id}>
                            <Image src={show.image.original} />
                            <ShowContent>
                                <ShowName>{show.name}</ShowName>
                                {show.rating.average && 
                                    <Detail>⭐ {show.rating.average}점</Detail>
                                }
                            </ShowContent>
                        </Show>
                    ))}
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

const Show = styled.div`
    position: relative;
    margin: 0.3rem;
`;

const Image = styled.img`
    @media screen and (min-width: 501px) {
        flex: 0 0 100%;
        width: calc(10rem + 1vw);
        aspect-ratio: 1 / 1.5;
        border-radius: 1rem;
    }
    
    @media screen and (max-width: 500px) {
        align-items: center;
        width: calc(6rem + 1vw);
        aspect-ratio: 1 / 1.5;
        border-radius: 1rem;
    }
`;

const ShowContent = styled.div`
    @media screen and (min-width: 501px) {
        position: absolute;
        bottom: 0;
        padding-bottom: 0.5rem;
        border-radius: 1rem;
        display: flex;
        flex-flow: column;
        width: calc(10rem + 1vw);
        aspect-ratio: 1 / 1.5;
        justify-content: flex-end;
        background-image: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 1));
        opacity: 0;
        text-align: center;

        &:hover {
            opacity: 1;
            transition: opacity 0.4s ease-out;
        }
    }
    
    @media screen and (max-width: 500px) {
        display: none;
    }
`;

const ShowName = styled.p`
    margin: 0.8rem;
    font-size: calc(0.2rem + 1vw);
    font-weight: bold;
`;

const Detail = styled.span`
    margin: 0;
    padding: 0.1rem 0 0.1rem 0;
    font-size: calc(0.5rem + 0.5vw);
    color: darkgray;
`;