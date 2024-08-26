import { useParams } from "react-router-dom";
import data from "../fakeItemsData";
import styled from "styled-components";
import Photos from "../serv/itemDetails/Photos";
import DetailsItem from "../serv/itemDetails/DetailsItem";
import { useState } from "react";
import Rating from "../serv/itemDetails/Rating";
const ProductCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;
const ProductRating = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Bar = styled.div`
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  gap: 10px;
  > p {
    cursor: pointer;
    color: var(--color-grey-500);
    border-bottom: 1px solid var(--color-grey-500);
    font-weight: bold;
    &:hover,
    &.active {
      color: var(--color-grey-900);
      border-bottom-color: var(--color-grey-900);
    }
  }
`;
function ItemDetails() {
  const [active, setActive] = useState("product");
  const { itemId } = useParams();
  const curItem = data.find((el) => `${el.id}` === itemId);
  return (
    <>
      <ProductCard>
        <Photos curItem={curItem} />
        <DetailsItem curItem={curItem} />
      </ProductCard>
      <Bar>
        <p
          className={active === "product" ? "active" : ""}
          onClick={() => setActive("product")}
        >
          Product Details
        </p>
        <p
          className={active === "rating" ? "active" : ""}
          onClick={() => setActive("rating")}
        >
          Rating & Reviews
        </p>
      </Bar>
      <ProductRating>
        {active === "product" && <p>{curItem.longDescription}</p>}
        {active === "rating" && <Rating />}
      </ProductRating>
    </>
  );
}

export default ItemDetails;
