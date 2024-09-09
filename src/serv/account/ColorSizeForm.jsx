import { useState } from "react";
import styled from "styled-components";
import SizeForm from "./SizeForm";

const StyledAdd = styled.div`
  background-color: var(--color-grey-500);
  color: var(--color-grey-0);
  border: none;
  width: 100px;
  padding: 6px 9px;
  margin-top: 10px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  &:hover {
    background-color: var(--color-grey-700);
  }
`;

const StyledSet = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

const Label = styled.label`
  margin-bottom: 10px;
  font-weight: bold;
`;

const ButtonMore = styled.div`
  margin: 0 auto;
  background-color: var(--color-grey-400);
  padding: 6px 9px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-brand-500);
  }
`;

const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  > p {
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
  }
`;

const ColorSizeForm = ({ register }) => {
  const [choose, setChoose] = useState("NoOne");
  const [numSizes, setNumSizes] = useState([0]);
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
      {choose === "Size" && (
        <>
          {numSizes.map((el, index) => (
            <SizeForm key={el} index={index} setNumSizes={setNumSizes} />
          ))}
          <ButtonMore
            onClick={() => setNumSizes((num) => [...num, Date.now()])}
          >
            More size
          </ButtonMore>
        </>
      )}
    </>
  );
};

export default ColorSizeForm;
