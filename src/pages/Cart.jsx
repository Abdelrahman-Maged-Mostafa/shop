import styled from "styled-components";
import CartItems from "../serv/Cart/CartItem";
import CardTotal from "../serv/Cart/CardTotal";
import Empty from "../ui/Empty";
const fakeCartItems = [
  {
    name: "Man T-shirt",
    price: 30,
    currency: "$",
    photo: "/images/tshirt-img2.png",
    quantity: 1,
  },
  {
    name: "Man drees",
    price: 80,
    currency: "$",
    photo: "/images/dress-shirt-img.png",
    quantity: 2,
  },
  {
    name: "computer core-i9",
    price: 180,
    currency: "$",
    photo: "/images/computer-img.png",
    quantity: 1,
  },
];
const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

function Cart() {
  const cartIems = fakeCartItems;
  const numItems = cartIems.reduce((cur, el) => cur + el.quantity, 0);
  const priceItems = cartIems.reduce(
    (cur, el) => cur + el.quantity * el.price,
    0
  );
  if (!cartIems || cartIems.length === 0) return <Empty resource={"cart"} />;
  return (
    <CartContainer>
      {cartIems.map((el, i) => (
        <CartItems item={el} key={i} />
      ))}
      {/* Add more CartItem components as needed */}
      <CardTotal numItems={numItems} priceItems={priceItems} />
    </CartContainer>
  );
}

export default Cart;
