import styled from "styled-components";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { useLogin } from "../../context/useLogin";

const DesktopNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-lg);
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
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
  background: none;
  border: none;
  color: var(--color-grey-500);
  font-size: 16px;
  font-weight: bold;

  cursor: pointer;
  &:focus {
    outline: none;
  }
  &:hover {
    color: var(--color-grey-900);
  }
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  font-weight: bold;
  color: var(--color-grey-500);
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  outline: none;
  &:focus {
    outline: none;
  }
  &:hover {
    color: var(--color-grey-900);
  }
`;

const DesktopView = ({ handleLogout, darkMode, setDarkMode }) => {
  const { login } = useLogin();
  return (
    <DesktopNav>
      <Logo />
      <NavLinks>
        <NavLink to="/dashboard">Home</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/wishList">Wishlist</NavLink>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/AboutUs">About Us</NavLink>
        <StyledLogout onClick={handleLogout}>
          {login ? "Logout" : "Login"}
        </StyledLogout>
        <StyledToggle onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <HiOutlineSun size={24} /> : <HiOutlineMoon size={24} />}
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </StyledToggle>
      </NavLinks>
    </DesktopNav>
  );
};
export default DesktopView;
