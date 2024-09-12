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

const SizeForm = ({ size, setSize }) => {
  const handleAddSize = () => {
    setSize([...size, { name: "", stock: "", price: "" }]);
  };
  const handleRemoveSize = (sizeIndex) => {
    setSize(size.filter((_, index) => index !== sizeIndex));
  };

  const handleSizeChange = (event, sizeIndex) => {
    setSize(
      size.map((size, index) => {
        if (index === sizeIndex) {
          return { ...size, [event.target.name]: event.target.value };
        }
        return size;
      })
    );
  };

  return (
    <>
      <div>
        <ButtonMore type="button" onClick={() => handleAddSize()}>
          Add Size
        </ButtonMore>
      </div>

      {size.map((size, sizeIndex) => (
        <StyledSet key={sizeIndex}>
          <Input
            required
            placeholder="Size"
            type="text"
            name="name"
            value={size.name}
            onChange={(event) => handleSizeChange(event, sizeIndex)}
          />
          <Input
            required
            placeholder="Stock"
            type="text"
            name="stock"
            value={size.stock}
            onChange={(event) => handleSizeChange(event, sizeIndex)}
          />
          <Input
            required
            placeholder="Price"
            type="text"
            name="price"
            value={size.price}
            onChange={(event) => handleSizeChange(event, sizeIndex)}
          />
          <HiTrash onClick={() => handleRemoveSize(sizeIndex)} />
        </StyledSet>
      ))}
    </>
  );
};

export default SizeForm;
