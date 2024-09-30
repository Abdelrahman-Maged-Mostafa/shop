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
  min-height: 60px;
  background-color: transparent;
  width: calc(100% - 140px);
  border-radius: 0px 0px 99999px 99999px;
  margin: auto;
  margin-top: 20px;
  @media screen and (max-width: 767px) {
    flex-direction: column;
  }
`;

function LinksFooter() {
  return (
    <StyledLinks>
      <NavLink to="/dashboard">home</NavLink>
      <NavLink to="/cart">cart</NavLink>
      <NavLink to="/wishlist">wishlist</NavLink>
      <NavLink to="/account">account</NavLink>
      <NavLink to="/customerServies">Customer servies</NavLink>
      <NavLink to="/aboutUs">AboutUs</NavLink>
    </StyledLinks>
  );
}

export default LinksFooter;
