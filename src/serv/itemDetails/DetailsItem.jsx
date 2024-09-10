import styled from "styled-components";
import StarRating from "../../ui/StarRating";
import { useEffect, useState } from "react";
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

const StyledColors = styled.div`
  display: flex;
  gap: 10px;
  > p {
    width: 28px;
    height: 28px;
    padding: 4px;
    border-radius: 50%;
    cursor: pointer;
    background: var(--color-grey-0);
    &.active {
      background: var(--color-grey-400);
    }
    > span {
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
  }
`;

const StyledSizes = styled.div`
  display: flex;
  gap: 10px;
  > p {
    width: 28px;
    height: 28px;
    padding: 4px;
    cursor: pointer;
    background: var(--color-grey-0);
    text-align: center;
    &.active {
      background: var(--color-grey-400);
    }

    > span {
      text-transform: uppercase;
      display: block;
      width: 20px;
      height: 20px;
    }
  }
`;

function DetailsItem({ curItem }) {
  const [isLoading, setIsLoading] = useState(false);
  const [curColor, setCurColor] = useState(0);
  const [curSize, setCurSize] = useState(0);
  const [price, setPrice] = useState(
    curItem?.color?.[0]?.size?.[0]?.price || curItem?.price
  );
  const [stock, setStock] = useState(
    curItem?.color?.[0]?.size?.[0]?.stock || curItem?.stock
  );
  console.log(curItem, curItem?.color?.[curColor]?.size?.length);
  const { cookies } = useLogin();
  const navigate = useNavigate();
  const queryClint = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: ({ id, token }) => addToCart(id, token),
    onSuccess: (val) => {
      queryClint.invalidateQueries({ queryKey: ["user"] });
      if (val) navigate("/cart");
      if (!val) {
        localStorage.setItem("cartId", JSON.stringify(curItem.id));
        navigate("/login");
      }
    },
  });

  function handelAddToCart() {
    setIsLoading(true);
    mutate({ id: curItem.id, token: cookies.jwt });
    setIsLoading(false);
  }
  useEffect(() => {
    setPrice(
      curItem?.color?.[curColor]?.size?.[curSize]?.price || curItem?.price
    );
    setStock(
      curItem?.color?.[curColor]?.size?.[curSize]?.stock || curItem?.stock
    );
  }, [curColor, curSize, curItem]);
  return (
    <StyledDetails>
      <h1>{curItem?.name}</h1>
      <StarRating
        size={20}
        defaultRating={curItem?.ratingsAverage}
        color={"var(--color-yellow-700)"}
      />
      <h1>${price}</h1>
      <p>{curItem?.shortDescription}</p>
      {curItem?.color?.length !== 0 && (
        <StyledColors>
          {curItem?.color.map((color, i) => (
            <p
              key={i}
              className={i === curColor ? "active" : ""}
              onClick={() => {
                setCurColor(i);
                setCurSize(0);
              }}
            >
              <span style={{ backgroundColor: color.color }}></span>
            </p>
          ))}
        </StyledColors>
      )}
      {curItem?.size?.length !== 0 && (
        <StyledSizes>
          {curItem?.size.map((size, i) => (
            <p key={i}>{size.size}</p>
          ))}
        </StyledSizes>
      )}
      {curItem?.color?.[curColor]?.size?.length !== 0 && (
        <StyledSizes>
          {curItem?.color[curColor]?.size.map((size, i) => (
            <p
              key={i}
              className={i === curSize ? "active" : ""}
              onClick={() => setCurSize(i)}
            >
              <span>{size.size}</span>
            </p>
          ))}
        </StyledSizes>
      )}
      <p>Stock: {stock}</p>
      <StyledAddCard>
        <button onClick={handelAddToCart} disabled={isLoading || isDeleting}>
          {isLoading || isDeleting ? <SpinnerMini /> : "Add to Cart"}
        </button>
      </StyledAddCard>
    </StyledDetails>
  );
}

export default DetailsItem;
