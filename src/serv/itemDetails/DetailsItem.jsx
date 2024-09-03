import styled from "styled-components";
import StarRating from "../../ui/StarRating";
import { useState } from "react";
import { addToCart } from "../../api/cart";
import { useNavigate } from "react-router";
import { useLogin } from "../../context/useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const StyledDetails = styled.div`
  > * {
    margin-bottom: 20px;
  }
`;
const StyledAddCard = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
  const [isLoading, setIsLoading] = useState(false);
  const { cookies } = useLogin();
  const navigate = useNavigate();
  const queryClint = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: ({ id, token }) => addToCart(id, token),
    onSuccess: (val) => {
      queryClint.invalidateQueries({ queryKey: ["user"] });
      if (val) navigate("/cart");
      if(!val){
        localStorage.setItem('cartId',JSON.stringify(curItem.id))
        navigate("/login")
      }
    },
  });

  function handelAddToCart() {
    setIsLoading(true);
    mutate({ id: curItem.id, token: cookies.jwt });
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
        <button onClick={handelAddToCart} disabled={isLoading || isDeleting}>
          {isLoading || isDeleting ? <SpinnerMini /> : "Add to Cart"}
        </button>
      </StyledAddCard>
    </StyledDetails>
  );
}

export default DetailsItem;
