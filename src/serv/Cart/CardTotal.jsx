import { Link } from "react-router-dom";
import styled from "styled-components";

const TotalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;
  width: 100%;
  max-width: 800px;
`;

const TotalText = styled.h3`
  margin: 0;
  font-size: 1.5em;
`;

const CheckoutButton = styled.button`
  background-color: var(--color-brand-700);
  color: var(--color-grey-100);
  border: none;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: var(--color-brand-500);
  }
`;

function CardTotal({ priceItems, numItems, cartIems }) {
  function handleCheckOut() {
    localStorage.setItem("itemsCheckOut", JSON.stringify(cartIems));
  }
  return (
    <TotalCard>
      <TotalText>Total: ${priceItems}</TotalText>
      <TotalText>Items: {numItems}</TotalText>
      <Link to="/check-out" onClick={handleCheckOut}>
        <CheckoutButton>Checkout</CheckoutButton>
      </Link>
    </TotalCard>
  );
}

export default CardTotal;
