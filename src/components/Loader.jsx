import styled from 'styled-components';
import React from 'react';

const Loader = () => {
    return (
        <LoaderContainer>
            <Dot></Dot>
            <Dot></Dot>
            <Dot></Dot>
        </LoaderContainer>
    );
};

export default Loader;

const LoaderContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 100%;
    height: 100vh;
    gap: 0.25rem;
`;

const Dot = styled.div`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #121212;

    animation: bounce 0.5s infinite alternate;

    @keyframes bounce {
        to {
            translate: 0 -0.25rem;
        }
    }

    &:nth-child(2) {
        animation-delay: 100ms;
    }
    &:nth-child(3) {
        animation-delay: 200ms;
    }
`;