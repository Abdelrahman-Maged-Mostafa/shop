import styled from "styled-components";
import StarRating from "../../ui/StarRating";
import { useEffect, useState } from "react";
import { addToCart } from "../../api/cart";
import { useNavigate } from "react-router";
import { useLogin } from "../../context/useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ColorsAndSizes from "./ColorsAndSizes";

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
    if (curItem?.properties?.colors?.length) {
      setPrice(curItem?.properties?.colors?.[curColor]?.price);
      setStock(curItem?.properties.colors?.[curColor]?.stock);
    } else if (curItem?.properties?.colorsAndSize?.length) {
      setPrice(
        curItem?.properties?.colorsAndSize?.[curColor]?.sizes?.[curSize]?.price
      );
      setStock(
        curItem?.properties.colorsAndSize?.[curColor]?.sizes?.[curSize]?.stock
      );
    } else if (curItem?.properties?.sizes?.length) {
      setPrice(curItem?.properties?.sizes?.[curSize]?.price);
      setStock(curItem?.properties.sizes?.[curSize]?.stock);
    } else {
      setPrice(curItem?.price);
      setStock(curItem?.stock);
    }
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
      {Object.values(curItem?.properties)?.find((el) => el?.length > 0)
        ?.length > 0 && (
        <ColorsAndSizes
          data={curItem?.properties}
          setCurColor={setCurColor}
          setCurSize={setCurSize}
          curColor={curColor}
          curSize={curSize}
        />
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
