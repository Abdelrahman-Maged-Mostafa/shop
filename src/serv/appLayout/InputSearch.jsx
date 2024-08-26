import { useState } from "react";
import { HiSearch } from "react-icons/hi";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding-left: 10px;
  border-radius: var(--border-radius-sm);
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
const StyledForm = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  svg {
    position: absolute;
    right: 0;
    user-select: none;
    cursor: pointer;
    font-size: 28px;
    &:hover {
      color: var(--color-brand-600);
    }
  }
`;
function InputSearch() {
  const [blog, setBlog] = useState("");
  function handelSearch(e) {
    e.preventDefault();
    console.log(blog);
  }
  return (
    <StyledForm onSubmit={handelSearch}>
      <StyledInput
        type="text"
        placeholder="Search this blog"
        onChange={(e) => setBlog(e.target.value)}
      />
      <HiSearch onClick={handelSearch} />
    </StyledForm>
  );
}

export default InputSearch;
