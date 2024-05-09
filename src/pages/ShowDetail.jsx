import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

const ShowDetail = () => {
    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState({});

    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${params.id}`)
        .then(response => response.json())
        .then(json => setShow(json));

        setTimeout(() => setLoading(false), 1500);
    }, []);

    const removeTag = (text) => {
        return text.replace(/(<([^>]+)>)/gi, '');
    };

    return (
        <ShowContainer>
            {loading ? (
                <Loader />
            ) : (
                <ShowWrapper>
                    <Show>
                        <Image src={show.image?.original} width='28%' height='41vw' />
                        <ShowContent width='72%' height='41vw'>
                            <ShowName rem={0.7}>
                                {show.name}
                            </ShowName>
                            <GenreGroup>
                                {show.genres.map((genre, index) => (
                                    <Genre key={index}>{genre} </Genre>
                                ))}
                            </GenreGroup>
                            <Detail>
                                {show.rating.average && 
                                    (
                                        <>
                                            <Detail>⭐ {show.rating.average}점</Detail>
                                            <span> / </span>
                                        </>
                                    )
                                }
                                <Detail>평균 {show.averageRuntime}분</Detail>
                            </Detail>
                            {show.summary &&
                                <Summary size='0.3rem + 1vw'>{removeTag(show.summary)}</Summary>
                            }
                        </ShowContent>
                    </Show>
                </ShowWrapper>
            )}
        </ShowContainer>
    );
};

export default ShowDetail;

const ShowContainer = styled.div`
    height: fit-content;
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(to bottom, #085467, #AFA7BB, #F4C0B3);
    color: white;
`;

const ShowWrapper = styled.div`
    margin: 0;
    padding: 0;
`;

const Show = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 1rem;
    gap: 0.5rem;
`;

const Image = styled.img`
    @media screen and (min-width: 501px) {
        width: ${({width}) => width};
        height: ${({height}) => height};
        border-radius: 1rem;

        &:hover {
            transform: scale(1.01);
            transition: transform 0.5s ease-out;
        }
    }
    
    @media screen and (max-width: 500px) {
        align-items: center;
        width: ${({width}) => width};
        height: ${({height}) => height};
        border-radius: 1rem;
    }
`;

const ShowContent = styled.div`
    display: flex;
    flex-flow: column;
    padding: 0 0.5rem 0 0.5rem;
    width: ${({width}) => width};
    height: ${({height}) => height};
    border-radius: 1rem;
    background-color: rgba(0, 0, 0, 0.5);

    &.selected {
        min-height: ${({height}) => height};
        height: fit-content;
        transition: height 0.4s ease-out;
    }
`;

const ShowName = styled.p`
    font-weight: bold;
    font-size: calc(${({rem}) => rem}rem + 1vw);
    margin: 0;
    padding-top: 0.5rem;
    padding-left: 0;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const GenreGroup = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 0.3rem;
    font-size: calc(0.1rem + 0.8vw);
    margin: 0;
`;

const Genre = styled.p`
    padding: 0.3rem;
    border: 1px solid white;
    border-radius: 20px;
`;

const Detail = styled.span`
    margin: 0;
    padding: 0.1rem 0 0.3rem 0;
    font-size: calc(0.5rem + 0.5vw);
`;

const Summary = styled.div`
    margin: 0;
    padding: 0 0.1rem 0.5rem 0;
    color: darkgray;
    font-size: calc(${({size}) => size});
    line-height: 135%;
    text-wrap: balance;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;

    @media screen and (min-width: 501px) {
        height: 45%;
        -webkit-line-clamp: 7;
    }

    @media screen and (max-width: 500px) {
        height: 29%;
        -webkit-line-clamp: 4;
    }
`;