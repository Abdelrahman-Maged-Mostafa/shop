import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import CartItems from "../serv/Cart/CartItem";
import CardTotal from "../serv/Cart/CardTotal";
import Empty from "../ui/Empty";
import { useLogin } from "../context/useLogin";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/user";
import Spinner from "../ui/Spinner";
import { getAllItems } from "../api/items";

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;
const StyledP = styled.p`
  text-align: center;
`;

function Cart() {
  const [cartIems, setCartItems] = useState([]);
  const { login, cookies } = useLogin();
  const { data: itemsIds, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(cookies.jwt),
  });
  const { data: items, isLoading: isGotten } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });

  const realCartIems = useCallback(() => {
    return itemsIds?.data?.doc?.cartItems?.map((item) => {
      return {
        ...item,
        item: items?.data?.find((el) => el.id === item?.item),
        properties: { ...item.properties, quantity: 1 },
      };
    });
  }, [items?.data, itemsIds]);

  useEffect(() => {
    setCartItems(realCartIems);
  }, [realCartIems]);

  const numItems = cartIems?.reduce(
    (cur, el) => cur + el?.properties?.quantity,
    0
  );
  const priceItems = cartIems?.reduce(
    (cur, el) => cur + el?.properties?.quantity * el?.properties?.price,
    0
  );

  if (isLoading || isGotten) return <Spinner />;
  if (!login || !itemsIds?.data?.doc)
    return <StyledP>Please Login to see your cart items.</StyledP>;
  if (!cartIems || cartIems.length === 0) return <Empty resource={"cart"} />;
  return (
    <CartContainer>
      {cartIems.map((el, i) => (
        <CartItems item={el} key={i} setCartItems={setCartItems} index={i} />
      ))}
      {/* Add more CartItem components as needed */}
      <CardTotal
        numItems={numItems}
        priceItems={priceItems}
        cartIems={cartIems}
      />
    </CartContainer>
  );
}

export default Cart;
