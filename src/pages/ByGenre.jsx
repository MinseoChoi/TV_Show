import { styled } from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const ByGenre = () => {
    const [loading, setLoading] = useState(true);
    const [shows, setShows] = useState([]);
    const [genreList, setGenreList] = useState([]);

    useEffect(() => {
        fetch('https:/api.tvmaze.com/shows')
        .then(response => response.json())
        .then(json => {
            setShows(json);

            const genL = [];
            json.map(show => show.genres.map(genre =>
                genL.push(genre)
                )
            );
            setGenreList([...new Set(genL)]); // 중복 제거
        });

        setTimeout(() => setLoading(false), 1500);
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
                    {genreList.map((genre, index) => (
                        <div key={index}>
                            <List>{genre.toUpperCase()}</List>
                            <ShowCarousel>
                                {shows
                                .filter(show => show.genres.includes(genre))
                                .map(filteredShow => (
                                    <Show key={filteredShow.id} onClick={() => handleShowClick(filteredShow.id)}>
                                        <Image src={filteredShow.image?.original} />
                                        <ShowContent>
                                            <ShowName>{filteredShow.name}</ShowName>
                                            {filteredShow.rating.average &&
                                                <Detail>⭐ {filteredShow.rating.average}점</Detail>
                                            }
                                        </ShowContent>
                                    </Show>
                                ))}
                            </ShowCarousel>
                            <hr />
                        </div>
                    ))}
                </ShowContainer>
            )}
        </MainContainer>
    );
};

export default ByGenre;

const MainContainer = styled.div`
    margin: 0;
    padding: 0.5rem;
    min-heigiht: 100vh;
    background: linear-gradient(to bottom, #085467, #AFA7BB, #F4C0B3);
    color: white;
`;

const ShowContainer = styled.div`
    position: relative;
    justify-content: center;
    height: fit-content;
    margin: 0.5rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);

    hr {
        margin: 1rem 0 0.5rem 0;
    }
`;

const List = styled.p`
    margin: 0;
    padding: 0.5rem;
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
        aspect-ratio: 1 / 1.4;
        border-radius: 1rem;
    }

    @media screen and (max-width: 500px) {
        align-items: center;
        width: calc(6rem + 1vw);
        aspect-ratio: 1 / 1.4;
        border-radius: 1rem;
    }
`;

const ShowContent = styled.div`
    @media screen and (min-width: 501px) {
        position: absolute;
        bottom: 0;
        padding-bottom: 0.5rem;
        display: flex;
        flex-flow: column;
        justify-content: flex-end;
        width: calc(10rem + 1vw);
        aspect-ratio: 1 / 1.4;
        background-image: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 1));
        border-radius: 1rem;
        text-align: center;
        opacity: 0;

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