import { NavLink } from "react-router-dom";
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiShoppingCart,
  HiUser,
} from "react-icons/hi";
import styled from "styled-components";
import { useDarkMode } from "../../context/useDarkMode";
import { useEffect } from "react";

const StyledCart = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
  font-weight: bold;
  a {
    @media screen and (max-width: 420px) {
      span {
        display: none;
      }
    }
  }
  a:hover,
  a.active {
    color: var(--color-brand-600);
  }
  div {
    svg {
      font-size: 20px;
      &:hover {
        color: var(--color-brand-600);
      }
    }
  }
`;

function Cart() {
  const { darkMode, setDarkMode } = useDarkMode();
  useEffect(
    function () {
      if (darkMode) {
        document.querySelector("html").classList.remove("light-mode");
        document.querySelector("html").classList.add("dark-mode");
      } else {
        document.querySelector("html").classList.add("light-mode");
        document.querySelector("html").classList.remove("dark-mode");
      }
    },
    [darkMode]
  );

  return (
    <StyledCart>
      <div onClick={() => setDarkMode((darkMode) => !darkMode)}>
        {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
      </div>
      <NavLink to="/cart">
        <HiShoppingCart />
        <span>Cart</span>
      </NavLink>
      <NavLink to="/account">
        <HiUser />
        <span>Account</span>
      </NavLink>
    </StyledCart>
  );
}

export default Cart;
