import { motion } from "framer-motion";
import {
  HiOutlineCog,
  HiOutlineHeart,
  HiOutlineHome,
  HiOutlineMoon,
  HiOutlineShoppingCart,
  HiOutlineSun,
  HiX,
} from "react-icons/hi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const BottomNav = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  padding: 10px 0;
  z-index: 999999;
`;

const NavIcon = styled(NavLink)`
  color: var(--color-grey-900);
  font-size: 24px;
  text-align: center;
  flex: 1;
  &.active {
    color: var(--color-brand-500);
  }
`;
const NavSettingIcon = styled.div`
  color: var(--color-grey-900);
  font-size: 24px;
  text-align: center;
  flex: 1;
  &.active {
    color: var(--color-brand-500);
  }
`;

const SettingsMenu = styled(motion.div)`
  position: fixed;
  bottom: 60px;
  width: 100%;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
const StyledLogout = styled.button`
  font-weight: bold;
  background: none;
  border: none;
  color: var(--color-grey-500);
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    color: var(--color-grey-900);
  }
`;

const StyledToggle = styled.button`
  font-weight: bold;
  background: none;
  border: none;
  color: var(--color-grey-500);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  &:focus {
    outline: none;
  }
  &:hover {
    color: var(--color-grey-900);
  }
`;
const MobileView = ({
  menuOpen,
  setMenuOpen,
  handleLogout,
  darkMode,
  setDarkMode,
  login,
}) => (
  <>
    <BottomNav>
      <NavIcon to="/dashboard">
        <HiOutlineHome />
      </NavIcon>
      <NavIcon to="/cart">
        <HiOutlineShoppingCart />
      </NavIcon>
      <NavIcon to="/wishList">
        <HiOutlineHeart />
      </NavIcon>
      <NavSettingIcon
        onClick={() => setMenuOpen(!menuOpen)}
        className={menuOpen ? "active" : ""}
      >
        {menuOpen ? <HiX /> : <HiOutlineCog />}
      </NavSettingIcon>
    </BottomNav>
    {menuOpen && (
      <SettingsMenu
        initial={{ y: "100%" }}
        animate={{ y: 5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/customerServies">Customer servies</NavLink>
        <NavLink to="/AboutUs">About Us</NavLink>
        <StyledLogout onClick={handleLogout}>
          {login ? "Logout" : "Login"}
        </StyledLogout>
        <StyledToggle onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <HiOutlineSun size={24} /> : <HiOutlineMoon size={24} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </StyledToggle>
      </SettingsMenu>
    )}
  </>
);
export default MobileView;
