import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../../context/useLogin";
import { addToCart } from "../../api/cart";
import SpinnerMini from "../../ui/SpinnerMini";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const StyledCard = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  width: 100%;
  border: 1px solid var(--color-grey-100);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  .product-image img {
    width: 100%;
    height: auto;
    height: 300px;
  }

  .product-details {
    padding: 15px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-title {
    font-size: 1.5em;
    margin: 10px 0;
  }

  .product-description {
    font-size: 0.9em;
    color: var(--color-grey-600);
    margin: 10px 0;
  }

  .product-price {
    font-size: 1.2em;
    color: var(--color-grey-900);
    margin: 10px 0;
  }
  .cart {
    width: 110px;
    height: 40px;
  }
  .button {
    height: 40px;
    background-color: var(--color-brand-500);
    color: var(--color-grey-100);
    border: none;
    padding: 6px 12px;
    border-radius: 5px;
    cursor: pointer;
    margin: 10px;
    transition: background-color 0.3s;
  }

  .button:hover {
    background-color: var(--color-brand-700);
  }
`;

function CardProduct({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const { cookies } = useLogin();
  const navigate = useNavigate();
  const queryClint = useQueryClient();
  const { isLoading: isDeleting, mutate } = useMutation({
    mutationFn: ({ body, token }) => addToCart(body, token),
    onSuccess: (val) => {
      queryClint.invalidateQueries({ queryKey: ["user"] });
      if (val) navigate("/cart");
      if (!val) {
        localStorage.setItem("cartId", JSON.stringify(data.id));
        navigate("/login");
      }
    },
  });

  function handelAddToCart() {
    setIsLoading(true);
    mutate({
      body: { item: data.id, properties: { price: data.price } },
      token: cookies.jwt,
    });
    setIsLoading(false);
  }

  return (
    <StyledCard>
      <div className="product-image">
        <img src={data.imageCover} alt="Product" />
      </div>
      <div className="product-details">
        <h2 className="product-title">{data.name}</h2>
        <p className="product-description">{data.shortDescription}</p>
        <div className="product-price">${data.price}</div>
        {Object.values(data?.properties)?.find((el) => el?.length > 0)?.length >
        0 ? (
          <Link to={`/dashboard/${data.id}`}>
            <button className="button">More Details</button>
          </Link>
        ) : (
          <div>
            <button
              className="button cart"
              onClick={handelAddToCart}
              disabled={isLoading || isDeleting}
            >
              {isLoading || isDeleting ? <SpinnerMini /> : "Add to Cart"}
            </button>
            <Link to={`/dashboard/${data.id}`}>
              <button className="button">Details</button>
            </Link>
          </div>
        )}
      </div>
    </StyledCard>
  );
}

export default CardProduct;
