import styled from "styled-components";
import StarRating from "../../ui/StarRating";
import { HiMiniPlusCircle } from "react-icons/hi2";
import { HiMinusCircle } from "react-icons/hi";
import { useState } from "react";
import { addToCart } from "../../api/cart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useLogin } from "../../context/useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledDetails = styled.div`
  > * {
    margin-bottom: 20px;
  }
`;
const StyledAddCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  > div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    svg {
      cursor: pointer;
      font-size: 25px;
    }
    p {
      font-size: 25px;
    }
  }
  button {
    width: 110px;
    background-color: var(--color-brand-500);
    color: var(--color-grey-100);
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: var(--color-brand-700);
  }
`;
function DetailsItem({ curItem }) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { cookies } = useLogin();
  const navigate = useNavigate();
  async function handelAddToCart() {
    setIsLoading(true);
    const added = await addToCart(curItem.id, cookies.jwt);
    if (added) navigate("/cart");
    setIsLoading(false);
  }

  return (
    <StyledDetails>
      <h1>{curItem?.name}</h1>
      <StarRating
        size={20}
        defaultRating={curItem?.ratingsAverage}
        color={"var(--color-yellow-700)"}
      />
      <h1>${curItem?.price}</h1>
      <p>{curItem?.shortDescription}</p>
      <p>Stock:{curItem?.stock}</p>
      <StyledAddCard>
        <div>
          <HiMinusCircle
            onClick={() => setQuantity((el) => (el > 1 ? el - 1 : el))}
          />
          <p>{quantity}</p>
          <HiMiniPlusCircle
            onClick={() => setQuantity((el) => (el < 5 ? el + 1 : el))}
          />
        </div>
        <button onClick={handelAddToCart} disabled={isLoading}>
          {isLoading ? <SpinnerMini /> : "Add to Cart"}
        </button>
      </StyledAddCard>
    </StyledDetails>
  );
}

export default DetailsItem;
