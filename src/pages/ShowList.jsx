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
        <MainContainer $minheight={window.innerHeight}>
            {loading ? (
                <Loader />
            ) : (
                <ShowContainer $minheight={window.innerHeight}>
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
    @media screen and (min-width: 501px) {
        padding: 0.6rem;
        min-height: calc(${($minheight) => $minheight}px - (7.2rem + 1vw));
        margin: calc(4rem + 0.5vw) 0 0 0;
        background: linear-gradient(to bottom, #085467, #AFA7BB, #F4C0B3);
        color: white;
    }

    @media screen and (max-width: 500px) {
        padding: 0.6rem;
        min-height: calc(${($minheight) => $minheight}px - (7.3rem + 1vw));
        margin: calc(4rem + 0.5vw) 0 0 0;
        background: linear-gradient(to bottom, #085467, #AFA7BB, #F4C0B3);
        color: white;
    }
`;

const ShowContainer = styled.div`
    @media screen and (min-width: 501px) {
        position: relative;
        justify-content: center;
        min-height: calc(${($minheight) => $minheight}px - (7.2rem + 1vw));
        margin: 0.5rem;
        padding: 0.6rem;
        border-radius: 0.5rem;

        background-color: rgba(0, 0, 0, 0.5);
    }

    @media screen and (max-width: 500px) {
        position: relative;
        justify-content: center;
        min-height: calc(${($minheight) => $minheight}px - (7.28rem + 1vw));
        margin: 0.5rem;
        padding: 0.6rem;
        border-radius: 0.5rem;
    
        background-color: rgba(0, 0, 0, 0.5);
    }
`;

const List = styled.p`
    margin: 0;
    padding: 0.5rem 0.5rem 1.5rem 0.5rem;
    font-size: calc(0.8rem + 1vw);
    font-weight: bold;
`;

const ShowCarousel = styled.div`
    display: flex;
    position: relative;
    flex-wrap: wrap;
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