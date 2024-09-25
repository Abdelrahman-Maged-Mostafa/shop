import { useState } from "react";
import { HiX } from "react-icons/hi";
import { HiMiniBars3 } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled.div`
  > svg {
    cursor: pointer;
    font-size: 20px;
    &:hover {
      color: var(--color-brand-600);
    }
  }
`;
const StyledLinks = styled.ul`
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  background-color: var(--color-grey-100);
  color: var(--color-brand-500);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 20px;
  padding: 10px 0 0 25px;
  height: 100%;
  width: 0;
  z-index: 99999;
  overflow: hidden;
  transition: 0.3s;
  a {
    text-transform: capitalize;
    transition: 0.3s;
  }
  a.active,
  a:hover {
    color: var(--color-grey-400);
    padding-left: 10px;
  }
  > svg {
    margin-left: calc(100% - 30px);
    cursor: pointer;
    font-size: 20px;
    &:hover {
      color: var(--color-grey-400);
    }
  }
`;
function Menu() {
  const [open, setOpen] = useState(false);
  return (
    <StyledMenu>
      <HiMiniBars3 onClick={() => setOpen(true)} />
      <StyledLinks
        style={{ width: open ? "200px" : "0", padding: open ? "" : "0" }}
      >
        <HiX onClick={() => setOpen(false)} />
        <NavLink to="/dashboard">home</NavLink>
        <NavLink to="/cart">cart</NavLink>
        <NavLink to="/wishList">wishlist</NavLink>
        <NavLink to="/account">account</NavLink>
        <NavLink to="/aboutUs">AboutUs</NavLink>
      </StyledLinks>
    </StyledMenu>
  );
}

export default Menu;
