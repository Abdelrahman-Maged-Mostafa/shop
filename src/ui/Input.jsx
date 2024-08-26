import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  padding-left: 10px;
  /* border-radius: var(--border-radius-sm); */
  background-color: transparent;
  border: none;
  outline: none;
  &:focus {
    outline: none;
  }
  border-bottom: 1px solid var(--color-grey-900);
  margin-left: 10px;
  &::placeholder {
    color: var(--color-grey-700);
  }
`;

export default Input;
