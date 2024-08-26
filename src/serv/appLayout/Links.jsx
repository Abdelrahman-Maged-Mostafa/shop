import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledLinks = styled.div`
  .active {
    color: var(--color-grey-500);
  }
  > a {
    font-weight: bold;
    text-transform: capitalize;
    color: var(--color-brand-500);
    &:hover {
      color: var(--color-grey-500);
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  height: 60px;
  background-color: var(--color-grey-100);
  width: calc(100% - 140px);
  border-radius: 0px 0px 99999px 99999px;
  margin: auto;
  @media screen and (max-width: 767px) {
    display: none;
  }
`;

function Links() {
  return (
    <StyledLinks>
      <NavLink to="/dashboard">dashboard</NavLink>
      <NavLink to="/users">users</NavLink>
      <NavLink to="/settings">settings</NavLink>
      <NavLink to="/account">account</NavLink>
    </StyledLinks>
  );
}

export default Links;
