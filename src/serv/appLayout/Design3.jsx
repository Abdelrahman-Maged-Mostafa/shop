import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { HiOutlineSun, HiOutlineMoon, HiX, HiSearch } from "react-icons/hi";
import { HiMiniBars3 } from "react-icons/hi2";
import Logo from "./Logo";
import Input from "../../ui/Input";
import { useMediaQuery } from "react-responsive";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useSearchContext } from "../../context/useSearchBlog";
import { useDarkMode } from "../../context/useDarkMode";
import { useLogin } from "../../context/useLogin";

const StyledContainer = styled.div`
  padding: 20px;
  background: linear-gradient(
    135deg,
    var(--color-grey-300),
    var(--color-grey-0)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledNav = styled(motion.nav)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: var(--color-background);
  box-shadow: var(--shadow-md);
  border-radius: 10px;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    flex-direction: row-reverse;
    align-items: flex-start;
  }
`;

const StyledLinks = styled.div`
  display: flex;
  gap: 20px;

  a {
    font-weight: bold;
    text-transform: capitalize;
    color: var(--color-grey-500);
    cursor: pointer;
    &:hover,
    &.active {
      color: var(--color-grey-900);
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    a {
      padding: 10px 0;
      width: 100%;
      text-align: left;
    }
  }
`;

const StyledMenuButton = styled.div`
  display: none;
  cursor: pointer;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MenuContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--color-grey-0);
  padding: 20px;
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  position: absolute;
  top: 70px;
  left: 20px;
  right: 20px;
  z-index: 999999;
  a {
    font-weight: bold;
    text-transform: capitalize;
    color: var(--color-grey-500);
    cursor: pointer;
    &:hover,
    &.active {
      color: var(--color-grey-900);
    }
  }
`;

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--color-grey-0);
  padding: 10px;
  border-radius: 10px;
  box-shadow: var(--shadow-md);
`;

const StyledToggle = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  gap: 10px;
  color: var(--color-grey-800);
  margin-left: 10px;
`;

const StyledLogout = styled.div`
  cursor: pointer;
  color: var(--color-grey-500);
  &:hover {
    color: var(--color-grey-900);
  }
`;

const Design3 = () => {
  const { removeCookie, setLogin, checkLogin, login } = useLogin();
  const { setBlog } = useSearchContext();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const [menuOpen, setMenuOpen] = React.useState(false);
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

  const handleLogout = async () => {
    if (login) {
      await removeCookie("jwt", { path: "/" });
      await checkLogin();
      setLogin(() => false);
    }
    if (!login) navigate("login");
  };

  return (
    <StyledContainer>
      <StyledNav
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {isDesktop && <Logo />}
        {isDesktop ? (
          <StyledLinks>
            <NavLink to="/dashboard">home</NavLink>
            <NavLink to="/cart">cart</NavLink>
            <NavLink to="/wishList">wishlist</NavLink>
            <NavLink to="/account">account</NavLink>
            <NavLink to="/customerServies">Customer servies</NavLink>
            <NavLink to="/AboutUs">AboutUs</NavLink>
            <StyledLogout onClick={handleLogout}>
              {login ? "Logout" : "Login"}
            </StyledLogout>
          </StyledLinks>
        ) : (
          <>
            <StyledMenuButton onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <HiX size={24} /> : <HiMiniBars3 size={24} />}
            </StyledMenuButton>
            {menuOpen && (
              <MenuContent
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <NavLink to="/dashboard">home</NavLink>
                <NavLink to="/cart">cart</NavLink>
                <NavLink to="/wishList">wishlist</NavLink>
                <NavLink to="/account">account</NavLink>
                <NavLink to="/customerServies">Customer servies</NavLink>
                <NavLink to="/AboutUs">AboutUs</NavLink>
                <StyledLogout onClick={handleLogout}>
                  {login ? "Logout" : "Login"}
                </StyledLogout>
              </MenuContent>
            )}
          </>
        )}
        <StyledToggle onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <HiOutlineSun size={24} /> : <HiOutlineMoon size={24} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </StyledToggle>
      </StyledNav>
      <StyledForm>
        <Input
          type="text"
          placeholder="Search this blog"
          onChange={(e) => setBlog(e.target.value)}
        />
        <HiSearch />
      </StyledForm>
    </StyledContainer>
  );
};

export default Design3;
