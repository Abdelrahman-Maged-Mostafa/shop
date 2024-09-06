import styled from "styled-components";

const CardStyle = styled.div`
  background: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  width: 100%;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Photo = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
  @media (max-width: 600px) {
    margin-right: 0;
    margin-bottom: 16px;
  }
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 600px) {
    align-items: center;
  }
`;

const Name = styled.h2`
  font-size: 1.5em;
  margin-bottom: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 600px) {
    justify-content: center;
  }
`;

const Button = styled.button`
  color: var(--color-brand-100);
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  flex: 1;
`;

const EditButton = styled(Button)`
  background-color: var(--color-brand-500);

  &:hover {
    background-color: var(--color-brand-700);
  }
`;

const DeleteButton = styled(Button)`
  background-color: var(--color-red-700);

  &:hover {
    background-color: var(--color-red-800);
  }
`;

function Card({ item }) {
  return (
    <CardStyle>
      <Photo src={item.imageCover} alt={item.name} />
      <Info>
        <Name>{item.name}</Name>
        <ButtonContainer>
          <EditButton>Edit</EditButton>
          <DeleteButton>Delete</DeleteButton>
        </ButtonContainer>
      </Info>
    </CardStyle>
  );
}

export default Card;
