import { Link } from "react-router-dom";
import styled from "styled-components";

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;
  @media screen and (max-width: 650px) {
    gap: 0px;
  }
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  flex-grow: 1;
  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
  > * {
    min-width: 80px;
  }
`;

const ItemName = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

const ItemPrice = styled.span`
  color: var(--color-grey-600);
  font-weight: bold;
  font-size: 18px;
`;

const ItemColor = styled.span`
  color: var(--color-grey-600);
  display: flex;
  gap: 10px;
  align-items: center;
  span {
    display: block;
    border: 3px solid var(--color-grey-900);
    width: 40px;
    height: 20px;
  }
`;

const ItemSize = styled.span`
  color: var(--color-grey-600);
  span {
    text-transform: uppercase;
  }
`;

const ItemQuantity = styled.div`
  display: flex;
  align-items: start;
  justify-content: center;
  gap: 5px;
  user-select: none;
  span {
    vertical-align: text-top;
    font-size: 20px;
    user-select: none;
  }
`;

function CardItemsOrder({ item }) {
  return (
    <Link to={`/dashboard/${item?.itemId}`}>
      <CartItem>
        <ItemQuantity>
          <span>{item?.quantity} X </span>
        </ItemQuantity>
        <ItemImage src={item?.imageCover} alt="Product" />
        <ItemDetails>
          <ItemName>{item?.name}</ItemName>
          <ItemPrice>${item?.price}</ItemPrice>
          {item?.color && (
            <ItemColor>
              Color : <span style={{ background: item.color }}></span>
            </ItemColor>
          )}
          {item?.size && (
            <ItemSize>
              Size : <span>{item.size}</span>
            </ItemSize>
          )}
        </ItemDetails>
      </CartItem>
    </Link>
  );
}

export default CardItemsOrder;
