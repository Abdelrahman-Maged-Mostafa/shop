import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLogin } from "../../context/useLogin";
import { addToCart, handleWishListApi } from "../../api/cart";
import SpinnerMini from "../../ui/SpinnerMini";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { getMe } from "../../api/user";

const StyledCard = styled(motion.div)`
  cursor: pointer;
  display: grid;
  position: relative;
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
    /* padding: 10px; */
    width: 100%;
    height: auto;
    /* height: 300px; */
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
    font-weight: bold;
  }

  .button {
    min-height: 40px;
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
  .out-stock {
    background-color: var(--color-grey-400);
    &:hover {
      background-color: var(--color-grey-600);
    }
  }
`;
const isStockAvailable = (data) => {
  if (data.properties.colorsAndSize.length > 0) {
    return data.properties.colorsAndSize.some((color) =>
      color.sizes.some((size) => size.stock > 0)
    );
  } else if (data.properties.sizes.length > 0) {
    return data.properties.sizes.some((size) => size.stock > 0);
  } else if (data.properties.colors.length > 0) {
    return data.properties.colors.some((color) => color.stock > 0);
  } else {
    return data.stock > 0;
  }
};

function CardProduct({ data, index }) {
  const [isLoading, setIsLoading] = useState(false);
  const { cookies } = useLogin();
  const navigate = useNavigate();
  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(cookies.jwt),
  });

  const user = userData?.data?.doc;
  const queryClint = useQueryClient();
  const { isLoading: isAdded, mutate } = useMutation({
    mutationFn: ({ body, token }) => addToCart(body, token),
    onSuccess: (val) => {
      queryClint.invalidateQueries({ queryKey: ["user"] });
      if (val) navigate("/cart");
      if (!val) {
        localStorage.setItem(
          "cartItem",
          JSON.stringify({ item: data.id, properties: { price: data.price } })
        );
        navigate("/login");
      }
    },
  });
  const { isLoading: isLoadWishList, mutate: handleList } = useMutation({
    mutationFn: ({ id, token }) => handleWishListApi(id, token),
    onSuccess: (val) => {
      toast.success("Item successfully changed in your wishlist");
      queryClint.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  function handelAddToCart(e) {
    e.stopPropagation();
    setIsLoading(true);
    mutate({
      body: { item: data.id, properties: { price: data.price } },
      token: cookies.jwt,
    });
    setIsLoading(false);
  }
  function handleWishList(e) {
    e.stopPropagation();
    handleList({
      id: data.id,
      token: cookies.jwt,
    });
  }
  return (
    <StyledCard
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: index / 3 }}
      onClick={() => navigate(`/dashboard/${data.id}`)}
    >
      {
        <FaHeart
          onClick={handleWishList}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: isLoadWishList
              ? "black"
              : user?.wishList?.includes(data.id)
              ? "var(--color-red-700)"
              : "var(--color-grey-500)",
            fontSize: "24px",
            cursor: "pointer",
            zIndex: 9999,
          }}
        />
      }
      <div className="product-image">
        <img src={data.imageCover} alt="Product" />
      </div>
      <div className="product-details">
        <h2 className="product-title">{data.name}</h2>
        <p className="product-description">{data.shortDescription}</p>
        <div className="product-price">
          $
          {data?.properties?.colors?.[0]?.price ||
            data?.properties?.sizes?.[0]?.price ||
            data?.properties?.colorsAndSize?.[0]?.sizes?.[0]?.price ||
            data?.price}
        </div>
        {Object.values(data?.properties)?.find((el) => el?.length > 0)?.length >
          0 || !isStockAvailable(data) ? (
          <Link to={`/dashboard/${data.id}`}>
            <button
              className={isStockAvailable(data) ? "button" : "button out-stock"}
            >
              {isStockAvailable(data) ? "More Details" : "Out of stock"}
            </button>
          </Link>
        ) : (
          <div>
            <button
              className="button cart"
              onClick={handelAddToCart}
              disabled={isLoading || isAdded}
            >
              {isLoading || isAdded ? <SpinnerMini /> : "Add to Cart"}
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
