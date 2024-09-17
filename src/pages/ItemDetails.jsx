import { useParams } from "react-router-dom";
import styled from "styled-components";
import Photos from "../serv/itemDetails/Photos";
import DetailsItem from "../serv/itemDetails/DetailsItem";
import { useState } from "react";
import Rating from "../serv/itemDetails/Rating";
import { useQuery } from "@tanstack/react-query";
import { getAllItems } from "../api/items";
import Spinner from "../ui/Spinner";

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
const StyledP = styled.p`
  text-align: center;
`;
const ProductRating = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;
const Bar = styled.div`
  margin-top: 60px;
  margin-bottom: 20px;
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

const StyledLongDetail = styled.pre`
  white-space: pre-wrap;
`;

function ItemDetails() {
  const { itemId } = useParams();
  const { data: items, isLoading } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });

  const [active, setActive] = useState("product");
  const curItem = items?.data?.find((item) => `${item._id}` === `${itemId}`);
  if (!curItem) return <StyledP>No item by this id.</StyledP>;
  if (isLoading) return <Spinner />;
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
        {active === "product" && (
          <StyledLongDetail>{curItem?.longDescription}</StyledLongDetail>
        )}
        {active === "rating" && <Rating reviews={curItem?.reviews} />}
      </ProductRating>
    </>
  );
}

export default ItemDetails;
