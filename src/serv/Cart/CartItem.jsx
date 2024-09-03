import { useState } from "react";
import { HiMinusCircle, HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlusCircle } from "react-icons/hi2";
import styled from "styled-components";

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;

  /* @media (max-width: 500px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding: 15px 0;
  } */
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ItemName = styled.h3`
  margin: 0;
  font-size: 1.2em;
`;

const ItemPrice = styled.span`
  color: var(--color-grey-600);
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

const QuantityButton = styled.div`
  cursor: pointer;
  margin: 0 5px;
  font-size: 25px;
  &:hover {
    transform: scale(1.1);
  }
`;

const RemoveButton = styled.div`
  color: var(--color-red-700);
  cursor: pointer;
  font-size: 22px;

  &:hover {
    color: var(--color-red-800);
  }
`;

function CartItems({ item, setCartItems, index }) {
  const CurItem = item;
  function handlePlus() {
    if (CurItem.quantity > 4) return;
    setCartItems((cartItems) => {
      const newItems = [...cartItems];
      newItems[index].quantity = CurItem.quantity + 1;
      return newItems;
    });
    console.log(1);
  }
  function handleMinus() {
    if (CurItem.quantity < 2) return;
    setCartItems((cartItems) => {
      const newItems = [...cartItems];
      newItems[index].quantity -= 1;
      return newItems;
    });
  }

  return (
    <CartItem>
      <ItemImage src={CurItem.imageCover} alt="Product" />
      <ItemDetails>
        <ItemName>{CurItem.name}</ItemName>
        <ItemPrice>${CurItem.price}</ItemPrice>
        <ItemQuantity>
          <QuantityButton onClick={handleMinus}>
            <HiMinusCircle />
          </QuantityButton>
          <span>{CurItem.quantity}</span>
          <QuantityButton onClick={handlePlus}>
            <HiMiniPlusCircle />
          </QuantityButton>
        </ItemQuantity>
      </ItemDetails>
      <RemoveButton>
        <HiOutlineTrash />
      </RemoveButton>
    </CartItem>
  );
}

export default CartItems;
