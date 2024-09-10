import { useState } from "react";
import styled from "styled-components";
import SizeForm from "./SizeForm";
import AddColorAndSize from "./AddColorAndSize";
import ColorForm from "./ColorForm";

const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  > p {
    text-align: center;
    border-radius: 6px;
    background-color: var(--color-grey-100);
    padding: 6px 9px;
    cursor: pointer;
    color: var(--color-grey-900);
    &.active {
      color: var(--color-grey-900);
      background-color: var(--color-brand-500);
    }
  }
  @media screen and (max-width: 500px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    > p {
      font-size: 14px;
    }
  }
  @media screen and (max-width: 400px) {
    > p {
      font-size: 12px;
    }
  }
`;

const ColorSizeForm = ({ register }) => {
  const [choose, setChoose] = useState("NoOne");
  const [size, setSize] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorsAndSize, setColorsAndSize] = useState([]);
  console.log(colorsAndSize, size, colors);
  return (
    <>
      <StyledBar>
        <p
          className={choose === "Color&Size" ? "active" : ""}
          onClick={() => setChoose("Color&Size")}
        >
          Color & Size
        </p>
        <p
          className={choose === "Color" ? "active" : ""}
          onClick={() => setChoose("Color")}
        >
          Color
        </p>
        <p
          className={choose === "Size" ? "active" : ""}
          onClick={() => setChoose("Size")}
        >
          Size
        </p>
        <p
          className={choose === "NoOne" ? "active" : ""}
          onClick={() => setChoose("NoOne")}
        >
          No one
        </p>
      </StyledBar>
      {choose === "Size" && <SizeForm size={size} setSize={setSize} />}
      {choose === "Color" && (
        <ColorForm colors={colors} setColors={setColors} />
      )}
      {choose === "Color&Size" && (
        <AddColorAndSize colors={colorsAndSize} setColors={setColorsAndSize} />
      )}
    </>
  );
};

export default ColorSizeForm;
