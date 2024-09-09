import { useState } from "react";
import { HiTrash } from "react-icons/hi2";
import styled from "styled-components";

const StyledSet = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
  svg {
    font-size: 60px;
    color: var(--color-red-700);
    cursor: pointer;
    &:hover {
      color: var(--color-red-800);
    }
  }
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-bottom: 1px solid var(--color-grey-400);
  border-radius: 4px;
  width: 100%;
  background-color: var(--color-grey-0);
`;

function SizeForm({ setNumSizes, index }) {
  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  return (
    <StyledSet>
      <Input
        type="text"
        placeholder="Size"
        value={size}
        onChange={(e) => setSize(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />
      <HiTrash
        onClick={() => {
          setNumSizes((prevNumSizes) =>
            prevNumSizes.filter((_, i) => i !== index)
          );
        }}
      />
    </StyledSet>
  );
}

export default SizeForm;
