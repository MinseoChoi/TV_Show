import { styled } from "styled-components";

const Actor = (person) => {
    return (
        <ActorContainer>
            <Name>{person.person.person.name}</Name>
            <ActorImage src={person.person.person.image?.original ? person.person.person.image?.original : process.env.PUBLIC_URL + '/assets/personError.svg'} />
            <Name><b>{person.person.character.name}</b> 역</Name>
        </ActorContainer>
    );
};

export default Actor;

const ActorContainer = styled.div`
    display: flex;;
    flex-direction: column;
    align-itmes: center;
    text-align: center;
    width: fit-content;
`;

const Name = styled.p`
    width: calc(3rem + 2vw);
    height: calc(1.5rem + 1vw);
    text-wrap: balance;
    font-size: calc(0.3rem + 0.5vw);
`;

const ActorImage = styled.img`
    width: calc(3rem + 2vw);
    aspect-ratio: 1;
    border-radius: 50%;
    object-fit: cover;
`;