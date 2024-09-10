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

const StyledInputColor = styled.div`
  display: flex;
  gap: 20px;
  > svg {
    font-size: 25px;
    color: var(--color-red-700);
    cursor: pointer;
    margin: auto;
    &:hover {
      color: var(--color-red-800);
    }
  }
`;

const AddColorAndSize = ({ colors, setColors }) => {
  const handleAddColor = () => {
    setColors([...colors, { name: "", sizes: [] }]);
  };
  const handleRemoveColor = (colorIndex) => {
    setColors(colors.filter((_, index) => index !== colorIndex));
  };

  const handleAddSize = (colorIndex) => {
    setColors(
      colors.map((color, index) => {
        if (index === colorIndex) {
          return {
            ...color,
            sizes: [...color.sizes, { name: "", stock: "", price: "" }],
          };
        }
        return color;
      })
    );
  };
  const handleRemoveSize = (colorIndex, sizeIndex) => {
    setColors(
      colors.map((color, index) => {
        if (index === colorIndex) {
          return {
            ...color,
            sizes: color.sizes.filter((_, sIndex) => sIndex !== sizeIndex),
          };
        }
        return color;
      })
    );
  };

  const handleColorChange = (event, colorIndex) => {
    setColors(
      colors.map((color, index) => {
        if (index === colorIndex) {
          return { ...color, name: event.target.value };
        }
        return color;
      })
    );
  };

  const handleSizeChange = (event, colorIndex, sizeIndex) => {
    setColors(
      colors.map((color, index) => {
        if (index === colorIndex) {
          return {
            ...color,
            sizes: color.sizes.map((size, sIndex) => {
              if (sIndex === sizeIndex) {
                return { ...size, [event.target.name]: event.target.value };
              }
              return size;
            }),
          };
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
          <StyledInputColor>
            <input
              style={{ display: "block", width: "100%", margin: "20px 0" }}
              placeholder="Color"
              type="Color"
              value={color.name}
              onChange={(event) => handleColorChange(event, colorIndex)}
            />
            <HiTrash onClick={() => handleRemoveColor(colorIndex)} />
          </StyledInputColor>
          <ButtonMore type="button" onClick={() => handleAddSize(colorIndex)}>
            Add Size
          </ButtonMore>
          {color.sizes.map((size, sizeIndex) => (
            <StyledSet key={sizeIndex}>
              <Input
                placeholder="Size"
                type="text"
                name="name"
                value={size.name}
                onChange={(event) =>
                  handleSizeChange(event, colorIndex, sizeIndex)
                }
              />
              <Input
                placeholder="Stock"
                type="text"
                name="stock"
                value={size.stock}
                onChange={(event) =>
                  handleSizeChange(event, colorIndex, sizeIndex)
                }
              />
              <Input
                placeholder="Price"
                type="text"
                name="price"
                value={size.price}
                onChange={(event) =>
                  handleSizeChange(event, colorIndex, sizeIndex)
                }
              />
              <HiTrash
                onClick={() => handleRemoveSize(colorIndex, sizeIndex)}
              />
            </StyledSet>
          ))}
        </div>
      ))}
    </>
  );
};

export default AddColorAndSize;
