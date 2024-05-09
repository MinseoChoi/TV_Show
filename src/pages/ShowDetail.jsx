import styled from 'styled-components';
import React, { useState } from 'react';

const ShowDetail = () => {
    return (
        <ShowContainer>
            <ShowWrapper>
                <Show>
                    <Image src={process.env.PUBLIC_URL + '/assets/imageError.svg'} width='28%' height='41vw' />
                    <ShowContent width='72%' height='41vw'>
                        <ShowName rem={0.7}>
                            SHOW NAME
                        </ShowName>
                        <GenreGroup>
                                GENRE
                            </GenreGroup>
                        <Detail>
                            RATING / AVERAGE RUNTIME
                        </Detail>
                        <Summary size='0.3rem + 1vw'>SUMMARY</Summary>
                    </ShowContent>
                </Show>
            </ShowWrapper>
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