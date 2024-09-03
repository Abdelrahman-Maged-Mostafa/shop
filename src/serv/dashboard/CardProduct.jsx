import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../../context/useLogin";
import { addToCart } from "../../api/cart";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledCard = styled.div`
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

  async function handelAddToCart() {
    setIsLoading(true);
    const added = await addToCart(data.id, cookies.jwt);
    if (added) navigate("/cart");
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
        <button
          className="button cart"
          onClick={handelAddToCart}
          disabled={isLoading}
        >
          {isLoading ? <SpinnerMini /> : "Add to Cart"}
        </button>
        <Link to={`/dashboard/${data.id}`}>
          <button className="button">Details</button>
        </Link>
      </div>
    </StyledCard>
  );
}

export default CardProduct;
