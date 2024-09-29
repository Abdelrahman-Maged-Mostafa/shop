import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import Input from "../../ui/Input";
import { useMediaQuery } from "react-responsive";
import React, { useEffect } from "react";
import { useSearchContext } from "../../context/useSearchBlog";
import { useDarkMode } from "../../context/useDarkMode";
import { useLogin } from "../../context/useLogin";
import DesktopView from "./ViewDesktopToDesign4";
import MobileView from "./ViewPhoneforDesign4";

const StyledContainer = styled.div``;
const StyledForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: var(--color-grey-0);
  padding: 10px;
  box-shadow: var(--shadow-md);
`;

const Design4 = () => {
  const { removeCookie, setLogin, checkLogin, login } = useLogin();
  const { setBlog } = useSearchContext();
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({ query: "(min-width: 768px)" });
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { darkMode, setDarkMode } = useDarkMode();

  useEffect(() => {
    if (darkMode) {
      document.querySelector("html").classList.remove("light-mode");
      document.querySelector("html").classList.add("dark-mode");
    } else {
      document.querySelector("html").classList.add("light-mode");
      document.querySelector("html").classList.remove("dark-mode");
    }
  }, [darkMode]);

  const handleLogout = async () => {
    if (login) {
      await removeCookie("jwt", { path: "/" });
      await checkLogin();
      setLogin(false);
    }
    if (!login) navigate("login");
  };

  return (
    <StyledContainer>
      {isDesktop ? (
        <DesktopView
          handleLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      ) : (
        <MobileView
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          handleLogout={handleLogout}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          login={login}
        />
      )}
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

export default Design4;
