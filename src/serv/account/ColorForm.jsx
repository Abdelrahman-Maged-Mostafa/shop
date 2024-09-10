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
    @media screen and (max-width: 500px) {
      font-size: 80px;
    }
    &:hover {
      color: var(--color-red-800);
    }
  }
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

const ButtonMore = styled.div`
  margin: 0 auto;
  width: fit-content;
  background-color: var(--color-grey-400);
  padding: 6px 9px;
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-brand-500);
  }
`;

const ColorForm = ({ colors, setColors }) => {
  const handleAddColor = () => {
    setColors([...colors, { name: "black", price: "", stock: "" }]);
  };
  const handleRemoveColor = (colorIndex) => {
    setColors(colors.filter((_, index) => index !== colorIndex));
  };

  const handleColorChange = (event, colorIndex) => {
    setColors(
      colors.map((color, index) => {
        if (index === colorIndex) {
          return { ...color, [event.target.name]: event.target.value };
        }
        return color;
      })
    );
  };

  return (
    <>
      <div>
        <ButtonMore type="button" onClick={handleAddColor}>
          Add Color
        </ButtonMore>
      </div>
      {colors.map((color, colorIndex) => (
        <div key={colorIndex}>
          <StyledSet key={colorIndex}>
            <input
              style={{ display: "block", width: "100%", margin: "20px 0" }}
              placeholder="Color"
              name="name"
              type="Color"
              value={color.name}
              onChange={(event) => handleColorChange(event, colorIndex)}
            />
            <Input
              placeholder="Stock"
              type="text"
              name="stock"
              value={color.stock}
              onChange={(event) => handleColorChange(event, colorIndex)}
            />
            <Input
              placeholder="Price"
              type="text"
              name="price"
              value={color.price}
              onChange={(event) => handleColorChange(event, colorIndex)}
            />
            <HiTrash onClick={() => handleRemoveColor(colorIndex)} />
          </StyledSet>
        </div>
      ))}
    </>
  );
};

export default ColorForm;
