import styled from "styled-components";
import { NavLink } from "react-router-dom";
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiShoppingCart,
  HiUser,
  HiX,
  HiSearch,
} from "react-icons/hi";
import { HiMiniBars3 } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import Popup from "./Popup";
import Logo from "./Logo";
import Input from "../../ui/Input";
import { useLogin } from "../../context/useLogin";
import { useDarkMode } from "../../context/useDarkMode";
import { useEffect, useState } from "react";
import { useSearchContext } from "../../context/useSearchBlog";

const StyledContainer = styled.div`
  padding: 1px 40px 20px;
  background: linear-gradient(var(--color-grey-0), var(--color-grey-100));
`;

const StyledNav = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: var(--color-grey-100);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  z-index: 999999;
  .active {
    color: var(--color-grey-500);
  }
  > a {
    font-weight: bold;
    text-transform: capitalize;
    color: var(--color-brand-500);
    cursor: pointer;
    &:hover {
      color: var(--color-grey-500);
      background-color: var(--color-grey-200);
    }
  }
  @media screen and (min-width: 768px) {
    position: static;
    background-color: transparent;
    justify-content: space-between;
    padding: 0;
  }
`;

const StyledLinks = styled.div`
  .active {
    color: var(--color-grey-500);
  }
  > a {
    font-weight: bold;
    text-transform: capitalize;
    color: var(--color-brand-500);
    cursor: pointer;
    &:hover {
      color: var(--color-grey-500);
      background-color: var(--color-grey-200);
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  height: 60px;
  background-color: var(--color-grey-100);
  width: 100%;
  border-radius: 0px 0px 99999px 99999px;
  margin: auto;

  @media screen and (min-width: 768px) {
    background-color: transparent;
    width: auto;
    border-radius: 0;
  }
`;

const StyledBar = styled.div`
  flex-direction: row-reverse;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;

  @media screen and (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const StyledSearch = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;

  @media screen and (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const StyledCart = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
`;

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  cursor: pointer;
`;

const MenuContent = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: var(--color-grey-100);
  width: 200px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: ${({ open }) => (open ? "block" : "flex")};
  display: flex;
  flex-direction: column;
  gap: 15px;
  .active {
    color: var(--color-grey-500);
    transform: translateX(10px);
  }
  > a {
    transition: all 0.3s;
    font-weight: bold;
    text-transform: capitalize;
    color: var(--color-brand-500);
    cursor: pointer;
    &:hover {
      transform: translateX(10px);
      color: var(--color-grey-500);
      background-color: var(--color-grey-200);
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StyledLogo = styled.div`
  width: 70px;
  height: 70px;
  div {
    width: 70px;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

function Design2() {
  const { login } = useLogin();
  const { darkMode, setDarkMode } = useDarkMode();
  const [showPopup, setShowPopup] = useState("false");
  const [open, setOpen] = useState(false);
  const { setBlog } = useSearchContext();
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });

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
    <StyledContainer>
      {isDesktop ? (
        <StyledNav>
          <StyledLinks>
            <NavLink to="/dashboard">home</NavLink>
            <NavLink to="/cart">cart</NavLink>
            <NavLink to="/wishList">wishlist</NavLink>
            <NavLink to="/account">account</NavLink>
            <NavLink to="/customerServies">Customer servies</NavLink>
            <NavLink to="/AboutUs">AboutUs</NavLink>
          </StyledLinks>
        </StyledNav>
      ) : (
        <StyledNav>
          <NavLink to="/dashboard">home</NavLink>
          <NavLink to="/cart">cart</NavLink>
          <NavLink to="/wishList">wishlist</NavLink>
          <NavLink to="/account">account</NavLink>
          <NavLink to="/AboutUs">AboutUs</NavLink>
        </StyledNav>
      )}
      <StyledBar>
        <StyledCart>
          <div onClick={() => setDarkMode((darkMode) => !darkMode)}>
            {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
          </div>
          <NavLink to="/cart">
            <HiShoppingCart />
            <span>Cart</span>
          </NavLink>
          <NavLink to="/wishList">
            <FaHeart style={{ margin: "auto 3px auto 0" }} />
            <span>Wishlist</span>
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
        <StyledSearch>
          <StyledMenu>
            <HiMiniBars3 onClick={() => setOpen(true)} />
            <MenuContent
              open={open}
              initial={{ x: "-100%" }}
              animate={{ x: open ? "0%" : "-100%" }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <HiX
                onClick={() => setOpen(false)}
                style={{
                  right: "10px",
                  top: "10px",
                  fontSize: "18px",
                  position: "absolute",
                }}
              />
              <StyledLogo>
                <Logo />
              </StyledLogo>
              <NavLink to="/dashboard">home</NavLink>
              <NavLink to="/cart">cart</NavLink>
              <NavLink to="/wishList">wishlist</NavLink>
              <NavLink to="/account">account</NavLink>
              <NavLink to="/customerServies">Customer servies</NavLink>
              <NavLink to="/aboutUs">AboutUs</NavLink>
            </MenuContent>
          </StyledMenu>
          <StyledForm>
            <Input
              type="text"
              placeholder="Search this blog"
              onChange={(e) => setBlog(e.target.value)}
            />
            <HiSearch />
          </StyledForm>
        </StyledSearch>
      </StyledBar>
    </StyledContainer>
  );
}
export default Design2;
