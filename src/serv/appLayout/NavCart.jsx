import { NavLink } from "react-router-dom";
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiShoppingCart,
  HiUser,
} from "react-icons/hi";
import styled from "styled-components";
import { useDarkMode } from "../../context/useDarkMode";
import { useEffect, useState } from "react";
import { useLogin } from "../../context/UseLogin";
import Popup from "./Popup";
import { IoMdSettings } from "react-icons/io";

const StyledCart = styled.div`
  .account {
    .ico {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 20px;
  font-weight: bold;
  a,
  div {
    font-size: 16px;
    cursor: pointer;
    @media screen and (max-width: 420px) {
      span {
        display: none;
      }
    }
  }
  a:hover,
  a.active,
  div:hover,
  div.active {
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
  const { login } = useLogin();
  const { darkMode, setDarkMode } = useDarkMode();
  const [showPopup, setShowPopup] = useState("false");

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
      {login ? (
        <div className="account">
          <div className="ico">
            <IoMdSettings onClick={() => setShowPopup("true")} />
            <span onClick={() => setShowPopup("true")}>Settings</span>
          </div>
          <Popup show={showPopup} onClose={() => setShowPopup("false")} />
        </div>
      ) : (
        <NavLink to="/login">
          <HiUser />
          <span>Login</span>
        </NavLink>
      )}
    </StyledCart>
  );
}

export default Cart;
