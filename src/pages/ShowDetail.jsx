import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Actor from '../components/Actor';

const ShowDetail = () => {
    const params = useParams();

    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState({});
    const [cast, setCast] = useState([]);
    const [season, setSeason] = useState([]);
    const [episodes, setEpisodes] = useState([]);
    const [click, setClick] = useState('');

    const [isExpand, setIsExpand] = useState(false);
    const [selected, setSelected] = useState(1);

    useEffect(() => {
        fetch(`https://api.tvmaze.com/shows/${params.id}`)
        .then(response => response.json())
        .then(json => setShow(json));

        fetch(`https://api.tvmaze.com/shows/${params.id}/seasons`)
        .then(response => response.json())
        .then(json => setSeason(json));

        fetch(`https://api.tvmaze.com/shows/${params.id}/cast`)
        .then(response => response.json())
        .then(json => setCast(json));

        fetch(`https://api.tvmaze.com/shows/${params.id}/episodes`)
        .then(response => response.json())
        .then(json => setEpisodes(json));

        setTimeout(() => setLoading(false), 1500);
    }, [params.id]);

    const removeTag = (text) => {
        return text.replace(/(<([^>]+)>)/gi, '');
    };

    const optionList = () => {
        const list = [];

        for (let i = 1; i <= Object.values(episodes)[episodes.length - 1].season; i++) {
            list.push(
                <option key={i} value={i}>
                    시즌 {i}
                </option>
            )
        }

        return list;
    };

    const seasonList = () => {
        const list = [];

        for (let i = 1; i <= Object.values(episodes)[episodes.length - 1].season; i++) {
            list.push(
                <li key={i}>
                    <button
                        buttonid={i}
                        type="button"
                        onClick={() => {
                            setSelected(i);
                            setIsExpand(false);
                        }}
                        className={selected === i ? "selected" : ""}
                    >
                        시즌 {i}
                    </button>
                </li>
            )
        };

        return list;
    };

    const handleMouseDown = e => {
        e.preventDefault();

        if (e.target.matches(':focus')) {
            setIsExpand(prev => !prev);
        } else {
            e.target.focus();
            setIsExpand(true);
        }

        return false;
    }

    const toggleSummary = (index) => {
        if (click === index) setClick('');
        else setClick(index);
    };

    return (
        <ShowContainer>
            {loading ? (
                <Loader />
            ) : (
                <ShowWrapper>
                    <Show>
                        <Image src={show.image?.original} className='poster' />
                        <ShowContent className='poster'>
                            <ShowName size='0.7rem + 1vw'>
                                {show.name}
                            </ShowName>
                            <GenreGroup>
                                {show.genres.map((genre, index) => (
                                    <Genre key={index}>{genre} </Genre>
                                ))}
                            </GenreGroup>
                            <Detail size='0.5rem + 0.5vw'>
                                {show.rating.average && 
                                    <>
                                        <Detail>⭐ {show.rating.average}점</Detail>
                                        <span> / </span>
                                    </>
                                }
                                <Detail>평균 {show.averageRuntime}분</Detail>
                            </Detail>
                            {show.summary &&
                                <Summary className='poster' size='0.3rem + 1vw'>{removeTag(show.summary)}</Summary>
                            }
                        </ShowContent>
                    </Show>
                    <hr />
                    {cast.length > 0 &&
                        <>
                            <ActorContainer>
                                <b>Cast</b>
                                <ActorCarousel>
                                    {cast.map((person, index) => (
                                        <Actor key={index} person={person} />
                                    ))}
                                </ActorCarousel>
                            </ActorContainer>
                        </>
                    }
                    <hr />
                    {episodes &&
                        <Episodes>
                            <Season
                                onBlur={() => setIsExpand(false)}
                                onMouseDown={(e) => handleMouseDown(e)}
                            >
                                <>
                                    <Arrow className={`${isExpand ? "is-expanded" : ""}`}></Arrow>
                                    <Select
                                        name="select"
                                        value={selected}
                                        onChange={(e) => setSelected(e.target.value)}
                                    >
                                        {optionList()}
                                    </Select>
                                </>
                                {isExpand && (
                                    <UL>
                                        {seasonList()}
                                    </UL>
                                )}
                            </Season>
                            <EpisodeWrapper>
                                {episodes
                                .filter(episode => episode.season === selected)
                                .map((episode, index) => (
                                    <Episode key={episode.id}>
                                        <Image src={episode.image?.original ? episode.image?.original : process.env.PUBLIC_URL + '/assets/imageError.svg'} className='episode' />
                                        <ShowContent className={'episode ' + (click === index ? 'selected' : '')} onClick={() => toggleSummary(index)}>
                                            <ShowName size='0.3rem + 1vw'>{episode.name ? episode.name : episode._links.show.name}</ShowName>
                                            <Detail size='0.2rem + 0.5vw'>
                                                <Detail>시즌 {episode.season} - {episode.number}화</Detail>
                                                <span> / </span>
                                                {episode.rating.average &&
                                                    <>
                                                        <Detail>⭐ {episode.rating.average}점</Detail>
                                                        <span> / </span>
                                                    </>
                                                }
                                                <Detail>{episode.runtime}분</Detail>
                                            </Detail>
                                            {episode.summary &&
                                                <Summary className={'episode ' + (click === index ? 'selected' : '')} size='0.5rem + 0.5vw'>{removeTag(episode.summary)}</Summary>
                                            }
                                        </ShowContent>
                                    </Episode>
                                ))}
                            </EpisodeWrapper>
                        </Episodes>
                    }
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

    hr {
        margin: 1rem 0.5rem 1rem 0.5rem;
    }
`;

const Show = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin: 0;
    padding: 0;
    gap: 0.1rem;

    @media screen and (max-width: 500px) {
        flex-direction: column;
        align-items: center;
    }
`;

const Image = styled.img`
    @media screen and (min-width: 501px) {
        &.poster {
            margin: 1rem 0 0 1rem;
            width: calc(5rem + 18vw);
            aspect-ratio: 1 / 1.4;
            border-radius: 1rem;

            &:hover {
                transform: scale(1.01);
                transition: transform 0.5s ease-out;
            }
        }

        &.episode {
            width: calc(11rem + 9vw);
            height: calc(3rem + 9vw);
            border-radius: 1rem;
        }
    }
    
    @media screen and (max-width: 500px) {
        &.poster {
            margin: 1rem 1rem 0 1rem;
            width: calc(100% - 2rem);
            aspect-ratio: 1 / 1.4;
            border-radius: 1rem;
        }

        &.episode {
            width: calc(11rem + 9vw);
            height: calc(3rem + 9vw);
            border-radius: 1rem;
        }
    }
`;

const ShowContent = styled.div`
    @media screen and (min-width: 501px) {
        display: flex;
        flex-flow: column;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;

        &.poster {
            margin: 1rem 1rem 0 1rem;
            padding: 1rem;
            height: calc((5rem + 20vw) * 1.5);
        }

        &.episode {
            padding: 0.5rem;
            height: calc(2rem + 9vw);
        }

        &.selected {
            padding: 0.5rem;
            min-height: calc(2rem + 9vw);
            height: fit-content;
            transition: height 0.4s ease-out;
        }
    }

    @media screen and (max-width: 500px) {
        display: flex;
        flex-flow: column;
        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.5);

        &.poster {
            margin: 1rem 1rem 0 1rem;
            padding: 1rem;
            width: calc(100% - 4rem);
            height: fit-content;
        }

        &.episode {
            padding: 0.5rem;
            height: calc(2rem + 9vw);
        }

        &.selected {
            padding: 0.5rem;
            min-height: calc(2rem + 9vw);
            height: fit-content;
            transition: height 0.4s ease-out;
        }
    }
`;

const ShowName = styled.p`
    font-weight: bold;
    font-size: calc(${({size}) => size});
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 10px;
`;

const GenreGroup = styled.div`
    display: flex;
    justify-content: left;
    align-items: center;
    gap: 0.3rem;
    font-size: calc(0.3rem + 0.8vw);
    margin: 0;
    padding: 0;
`;

const Genre = styled.p`
    padding: 0.4rem;
    border: 1px solid white;
    border-radius: 20px;
`;

const Detail = styled.span`
    margin: 0;
    padding: 0;
    font-size: calc(${({size}) => size});
`;

const Summary = styled.div`
    margin: 0;
    color: darkgray;
    font-size: calc(${({size}) => size});
    line-height: 135%;
    text-wrap: balance;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;

    @media screen and (min-width: 501px) {
        &.poster {
            padding: 0.5rem 0 0 0;
            height: 70%;
            -webkit-line-clamp: 13;
        }

        &.episode {
            padding: 0;
            opacity: 0;
        }

        &.selected {
            padding: 0;
            opacity: 1;
            -webkit-line-clamp: 4;
            transition: opacity 0.4s ease-out;
        }
    }

    @media screen and (max-width: 500px) {
        &.poster {
            padding: 0.5rem 0 0 0;
        }
        
        &.episode {
            padding: 0;
            opacity: 0;
        }

        &.selected {
            padding: 0;
            opacity: 1;
            -webkit-line-clamp: 3;
            transition: opacity 0.4s ease-out;
        }
    }
`;

const ActorContainer = styled.div`
    position: relative;
    width: 100%;
    margin: 0;

    b {
        margin-left: 1rem;
    }
`;

const ActorCarousel = styled.div`
    display: flex;
    flex-direction: row;
    position: relative;
    width: calc(100% - 2rem);
    gap: 0.6rem;
    margin: 1rem 1rem 0 1rem;
    padding: 0;

    overflow-x: auto;
    overflow-y: hidden;

    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Episodes = styled.div`
    position: relative;
    width: 100%;
    margin: 0;
`;

const EpisodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    margin: 0.5rem;
    
    overflow-x: auto;
    overflow-y: hidden;

    scroll-snap-type: x mandatory;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Episode = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    margin: 10px;
    gap: 0.5rem;
`;

const Season = styled.div`
    display: block;
    position: relative;
    width: calc(6rem + 1vw);
    margin: 0.5rem 0 0.5rem 1rem;
    font-size: calc(0.6rem + 0.5vw);

    div {
        border-radius: 0.5rem;
        position: relative;
    }
`;

const Select = styled.select`
    -moz-appearance: none;
    -webkit-appearance: none;
    -o-appearance: none;
    -ms-appearance: none;
    appearance: none;
    border-radius: 0;
    background: none transparent;
    vertical-align: middle;
    font-size: inherit;
    font-weight: bold;
    color: inherit;
    box-sizing: content-box;
    margin: 0;
    width: 120px;
    border-radius: 0.5rem;
    padding: 0.75rem 2.5rem 0.65rem 0.75rem;
    box-shadow: none;
    box-sizing: border-box;
    display: block;
    width: 100%;
    border: 2px solid #ddd;
    line-height: 1.06;
`;

const UL = styled.ul`
    position: absolute;
    z-index: 99;
    width: 100%;
    top: 1rem;
    margin-top: 1.7rem;
    border-radius: 0.5rem;
    border: 2px solid black;
    padding: 0.5rem 0.5rem;
    background: white;
    list-style: none;
    box-sizing: border-box;

    button {
        display: block;
        width: 100%;
        text-align: left;
        transition: all 0.3s;
        padding: 0.5rem;
        border-radius: 0.5rem;
        border: 0;
        outline: 0;
        background: none;

        &:hover {
            background: #eee;
        }

        &:active {
            background: #aaa;
        }

        &.selected {
            background: #000;
            color: #fff;
        }
    }
`;

const Arrow = styled.span`
    width: 20px;
    height: 20px;
    background: #000;
    display: block;
    position: absolute;
    right: 0.5rem;
    top: 10px;
    border-radius: 0.25rem;
    pointer-events: none;

    &:before,
    &:after {
        content: "";
        background-color: transparent;
        width: 2px;
        height: 12px;
        background: yellow;
        border-bottom: 7px solid white;
        display: block;
        position: absolute;
        background: none;
        box-sizing: border-box;
        transform: rotate(0);
        transform-origin: center;
        top: 2px;
        left: 9px;
        transition: all 0.3s;
    }

    &.is-expanded {
        &:before,
        &:after {
            top: 6px;
        }
        &:before {
            transform: rotate(135deg);
        }
        &:after {
            transform: rotate(-135deg);
        }
    }

    &:before {
        transform: rotate(45deg);
    }

    &:after {
        transform: rotate(-45deg);
    }
`;