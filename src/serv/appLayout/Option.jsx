import { useState } from "react";
import styled from "styled-components";

const StyledOption = styled.div`
  position: relative;
  display: inline-block;
  select {
    &:focus {
      outline: none;
    }
    display: inline-block;
    position: relative;
    padding-left: 30px;
    background-repeat: no-repeat;
    background-position: 2px;
    background-size: 20px;
    background-color: transparent;
    outline: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
    option {
      background-color: var(--color-grey-100);
      font-weight: bold;
    }
  }
`;

function Option() {
  const [flag, setFlag] = useState(
    `url(http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg)`
  );
  function changeFlag(e) {
    if (e.target.value === "english")
      setFlag(
        `url(http://purecatamphetamine.github.io/country-flag-icons/3x2/US.svg)`
      );
    if (e.target.value === "french")
      setFlag(
        `url(https://upload.wikimedia.org/wikipedia/commons/3/34/Flag_of_France_%281958%E2%80%931976%29.svg)`
      );
    if (e.target.value === "Deutsche")
      setFlag(
        `url(https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/2560px-Flag_of_Germany.svg.png)`
      );
  }
  return (
    <StyledOption>
      <select
        name="lang"
        style={{
          backgroundImage: flag,
        }}
        onChange={changeFlag}
      >
        <option value="english">English</option>
        <option value="french">French</option>
        <option value="Deutsche">Deutsche </option>
      </select>
    </StyledOption>
  );
}

export default Option;
