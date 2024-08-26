import styled from "styled-components";
import Input from "../../ui/Input";
import { useState } from "react";

const StyledForm = styled.form`
  width: 100%;
  position: relative;
  display: flex;
  span {
    position: absolute;
    right: 0;
    user-select: none;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 19px;
    &:hover {
      color: var(--color-brand-600);
    }
  }
`;

function Subscribe() {
  const [email, setEmail] = useState("");
  function handelSearch(e) {
    e.preventDefault();
    console.log(email);
  }

  return (
    <StyledForm onSubmit={handelSearch}>
      <Input
        type="text"
        placeholder="Your Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <span onClick={handelSearch}>Subscribe</span>
    </StyledForm>
  );
}

export default Subscribe;
