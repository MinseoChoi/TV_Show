import { styled } from "styled-components";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const UserFavorite = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const data = localStorage.getItem('favorite');

        if (data) {
            setUser(JSON.parse(data));
        }

        setTimeout(() => setLoading(false), 1500);
    }, []);

    const navigate = useNavigate();
    const handleMainClick = (id) => {
        navigate(`/show/${id}`);
    };

    return (
        <MainContainer>
            {loading ? (
                <Loader />
            ) : (
                <ShowContainer>
                    <List>❤️ FAVORITE SHOW</List>
                    {user.length > 0 ? (
                        <ShowCarousel>
                            {user.map(show => (
                                <Image key={show.id} onClick={() => handleMainClick(show.id)} src={show.image.original} />
                            ))}
                        </ShowCarousel>
                    ) : (
                        <Text>아직 찜한 작품이 없습니다...</Text>
                    )}
                </ShowContainer>
            )}
        </MainContainer>
    );
};

export default UserFavorite;

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
    display: block;
    height: calc(100% - (3.5rem + 0.5vw));
    margin: 0.5rem;
    padding: 0;
    overflow-y: auto;

    &::-webkit-scrollbar {
        display: none;
    }
`;

const Image = styled.img`
    @media screen and (min-width: 501px) {
        position: relative;
        margin: 0 0.5rem 0.5rem 0;
        width: calc(10rem + 2vw);
        aspect-ratio: 1 / 1.5;
        border-radius: 1rem;
        
        &:hover {
            cursor: pointer;
            transform: scale(1.01);
            transition: transform 0.5s ease-out;
        }
    }
    
    @media screen and (max-width: 500px) {
        position: relative;
        margin: 0 0.5rem 0.5rem 0;
        width: calc(8rem + 2vw);
        aspect-ratio: 1 / 1.5;
        border-radius: 1rem;
    }
`;

const Text = styled.p`
    position: relative;
    margin: 0;
    padding: 0.5rem;
    color: darkgray;
`;