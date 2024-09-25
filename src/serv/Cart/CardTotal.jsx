import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import toast from "react-hot-toast";
import { getAllItems } from "../../api/items";
import SpinnerMini from "../../ui/SpinnerMini";

const TotalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid var(--color-grey-200);
  border-radius: 5px;
  width: 100%;
  max-width: 800px;
`;

const TotalText = styled.h3`
  margin: 0;
  font-size: 1.5em;
`;

const CheckoutButton = styled.button`
  text-align: center;
  background-color: var(--color-brand-700);
  color: var(--color-grey-100);
  border: none;
  font-weight: bold;
  padding: 6px 9px;
  border-radius: 5px;
  width: 100px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: var(--color-brand-500);
  }
`;

function CardTotal({ priceItems, numItems, cartIems }) {
  const [enabled, setEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { refetch } = useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
    enabled: enabled, // The query will not execute until `enabled` is true
  });

  // Check stock and proceed with the order
  async function handleCheckOut() {
    setEnabled(true); // Enable the query
    setIsLoading(true);
    const {
      data: { data },
    } = await refetch(); // Fetch the latest data
    // Check stock for each item in the cart
    const isStockAvailable = cartIems.every((cartItem) => {
      const product = data?.find((item) => item._id === cartItem.item.id);
      if (!product) return false;

      if (product.properties.colorsAndSize.length > 0) {
        const color = product.properties.colorsAndSize.find(
          (c) => c.name === cartItem.properties.color
        );
        if (!color) return false;

        const size = color.sizes.find(
          (s) => s.name === cartItem.properties.size
        );
        if (!size) return false;

        return size.stock >= cartItem.properties.quantity;
      } else if (product.properties.sizes.length > 0) {
        const size = product.properties.sizes.find(
          (s) => s.name === cartItem.properties.size
        );
        if (!size) return false;

        return size.stock >= cartItem.properties.quantity;
      } else if (product.properties.colors.length > 0) {
        const color = product.properties.colors.find(
          (c) => c.name === cartItem.properties.color
        );
        if (!color) return false;

        return color.stock >= cartItem.properties.quantity;
      } else {
        return product.stock >= cartItem.properties.quantity;
      }
    });

    if (isStockAvailable) {
      // Proceed with the order
      localStorage.setItem("itemsCheckOut", JSON.stringify(cartIems));
      navigate("/check-out");
    } else {
      // Handle out of stock scenario
      toast.error("Some items are out of stock");
    }
    // end check

    setIsLoading(false);
  }

  return (
    <TotalCard>
      <TotalText>Total: ${priceItems}</TotalText>
      <TotalText>Items: {numItems}</TotalText>
      <CheckoutButton disabled={isLoading} onClick={handleCheckOut}>
        {isLoading ? <SpinnerMini /> : "Checkout"}
      </CheckoutButton>
    </TotalCard>
  );
}

export default CardTotal;
