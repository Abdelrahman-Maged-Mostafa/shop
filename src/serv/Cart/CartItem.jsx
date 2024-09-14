import { HiMinusCircle, HiOutlineTrash } from "react-icons/hi";
import { HiMiniPlusCircle } from "react-icons/hi2";
import styled from "styled-components";
import { useLogin } from "../../context/useLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeFromCart } from "../../api/cart";
import SpinnerMini from "../../ui/SpinnerMini";

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
  const CurItem = item.item;
  function handlePlus() {
    if (item.properties.quantity > 4) return;
    setCartItems((cartItems) => {
      const newItems = [...cartItems];
      newItems[index].properties.quantity += 1;
      return newItems;
    });
  }
  function handleMinus() {
    if (item.properties.quantity < 2) return;
    setCartItems((cartItems) => {
      const newItems = [...cartItems];
      newItems[index].properties.quantity -= 1;
      return newItems;
    });
  }
  //remove item
  const { cookies } = useLogin();
  const queryClint = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: ({ id, token }) => removeFromCart(id, token),
    onSuccess: () => {
      queryClint.invalidateQueries({ queryKey: ["user"] });
    },
  });

  function handleRemoveFromCart() {
    mutate({ id: item._id, token: cookies.jwt });
  }
  return (
    <CartItem>
      <ItemImage src={CurItem?.imageCover} alt="Product" />
      <ItemDetails>
        <ItemName>{CurItem?.name}</ItemName>
        <ItemPrice>${item?.properties?.price}</ItemPrice>
        {item?.properties?.color && (
          <ItemColor>
            Color : <span style={{ background: item.properties.color }}></span>
          </ItemColor>
        )}
        {item.properties.size && (
          <ItemSize>
            Size : <span>{item.properties.size}</span>
          </ItemSize>
        )}
        <ItemQuantity>
          <QuantityButton onClick={handleMinus}>
            <HiMinusCircle />
          </QuantityButton>
          <span>{item.properties.quantity}</span>
          <QuantityButton onClick={handlePlus}>
            <HiMiniPlusCircle />
          </QuantityButton>
        </ItemQuantity>
      </ItemDetails>
      <RemoveButton onClick={handleRemoveFromCart}>
        {isDeleting ? <SpinnerMini /> : <HiOutlineTrash />}
      </RemoveButton>
    </CartItem>
  );
}

export default CartItems;
