import { useEffect, useState } from "react";
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

const ColorSizeForm = ({ item, setProperties }) => {
  const [choose, setChoose] = useState(
    item?.properties?.colors?.length
      ? "Color"
      : item?.properties?.colorsAndSize?.length
      ? "Color&Size"
      : item?.properties?.sizes?.length
      ? "Size"
      : "NoOne"
  );
  const [sizes, setSizes] = useState(item?.properties?.sizes || []);
  const [colors, setColors] = useState(item?.properties?.colors || []);
  const [colorsAndSize, setColorsAndSize] = useState(
    item?.properties?.colorsAndSize || []
  );
  useEffect(
    function () {
      if (choose === "NoOne") {
        setProperties({});
      }
      if (choose === "Size") {
        setProperties({ sizes });
      }
      if (choose === "Color") {
        setProperties({ colors });
      }
      if (choose === "Color&Size") {
        setProperties({ colorsAndSize });
      }
    },
    [choose, setProperties, colorsAndSize, colors, sizes]
  );
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
      {choose === "Size" && <SizeForm size={sizes} setSize={setSizes} />}
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
