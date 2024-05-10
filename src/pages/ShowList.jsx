import { styled } from "styled-components";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from '../components/Loader';

const ShowList = () => {
    const location = useLocation();

    const [loading, setLoading] = useState(true);
    const [shows, setShows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                if (location.pathname === '/all') {
                    await fetch('https://api.tvmaze.com/shows')
                    .then(response => response.json())
                    .then(json => setShows(json));
                } else if (location.pathname === '/latest') {
                    await fetch('https://api.tvmaze.com/schedule/full')
                    .then(response => response.json())
                    .then(json => setShows(json));
                }

                setLoading(false);
            } catch (e) {
                console.error('Error fetching data: ', e);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();
    const handleShowClick = (id) => {
        navigate(`/show/${id}`);
    };

    return (
        <MainContainer>
            {loading ? (
                <Loader />
            ) : (
                <ShowContainer>
                    <List>{location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)} Shows</List>
                    <ShowCarousel>
                        {shows.map(s => (
                            <Show key={s.id} onClick={() => handleShowClick(s._embedded?.show.id ? s._embedded?.show.id : s.id)}>
                                <Image src={s._embedded?.show?.image?.original ? s._embedded?.show?.image?.original : s.image?.original} />
                                <ShowContent>
                                    <ShowName>{s._embedded?.show.name ? s._embedded?.show.name : s.name}</ShowName>
                                </ShowContent>
                            </Show>
                        ))}
                    </ShowCarousel>
                </ShowContainer>
            )}
        </MainContainer>
    );
};

export default ShowList;

const MainContainer = styled.div`
    position: relative;
    margin: calc(4rem + 0.5vw) 0 0 0;
    padding: 0.5rem;
    background: linear-gradient(to bottom, #085467, #AFA7BB, #F4C0B3);
    color: white;

    @media screen and (min-width: 501px) {
        height: calc(100% - (5rem + 0.5vw));
    }

    @media screen and (max-width: 500px) {
        height: calc(100% - (5rem + 0.5vw));
    }
`;

const ShowContainer = styled.div`
    position: relative;
    justify-content: center;
    height: calc(100% - 2rem);
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
`;

const List = styled.p`
    margin: 0;
    padding: 0.5rem 0.5rem 1rem 0.5rem;
    font-size: calc(0.6rem + 1vw);
    font-weight: bold;
`;

const ShowCarousel = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: calc(100% - (3.5rem + 0.5vw));
    margin: 0.5rem;
    padding: 0;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Show = styled.div`
    position: relative;
    display: flex;
    margin: 0 1rem 1rem 0;

    @media screen and (min-width: 501px) {
        width: calc(10rem + 2vw);
        aspect-ratio: 1 / 1.5;
    }

    @media screen and (max-width: 500px) {
        width: calc(8rem + 2vw);
        aspect-ratio: 1 / 1.5;
    }
`;

const Image = styled.img`
    @media screen and (min-width: 501px) {
        position: relative;
        width: calc(10rem + 2vw);
        aspect-ratio: 1 / 1.5;
        border-radius: 1rem;
        margin: 0;
        padding: 0;
        
        &:hover {
            cursor: pointer;
            transform: scale(1.01);
            transition: transform 0.5s ease-out;
        }
    }

    @media screen and (max-width: 500px) {
        position: relative;
        width: calc(8rem + 2vw);
        aspect-ratio: 1 / 1.5;
        margin: 0;
        padding: 0;
        border-radius: 1rem;
    }
`;

const ShowContent = styled.div`
    @media screen and (min-width: 501px) {
        position: absolute;
        bottom: 0;
        margin: 0;
        padding-bottom: 1rem;
        border-radius: 1rem;
        display: flex;
        flex-flow: column;
        width: calc(10rem + 2vw);
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
    font-size: calc(0.2rem + 1vw);
    font-weight: bold;
    margin: 0;
    padding: 0;
`;