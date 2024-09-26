import { Outlet } from "react-router";
import styled from "styled-components";
import Links from "../serv/appLayout/Links";
import Cart from "../serv/appLayout/NavCart";
import Menu from "../serv/appLayout/Menu";
import InputSearch from "../serv/appLayout/InputSearch";
import Footer from "../serv/appLayout/Footer";
import SearchContextProvider from "../context/SearchContext";
import { useLogin } from "../context/useLogin";
import { useEffect, useState } from "react";
import { useOptions } from "../context/useOptions";
import LoadingAnimation from "../ui/LoadingAnimation ";

//Styled bg
const StyledContainer = styled.div`
  padding: 1px 40px 20px;
  background: linear-gradient(var(--color-grey-0), var(--color-grey-100));
`;
//style links
const StyledNav = styled.div`
  width: 100%;
  margin: 10px auto 0;
  @media screen and (min-width: 767px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-around;
  }
`;
const StyledBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;
const StyledSearch = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PageContainer = styled.div`
  min-height: 400px;
  background-color: var(--color-grey-100);
  padding: 25px 40px;
  overflow: hidden;
  width: 100%;
`;
function AppLayout() {
  const [isFixed, setIsFixed] = useState("false");

  const { checkLogin } = useLogin();
  const { isLoading } = useOptions();
  useEffect(() => {
    checkLogin();
  }, [checkLogin]);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsFixed("true");
      } else {
        setIsFixed("false");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isLoading) return <LoadingAnimation />;
  return (
    <div>
      <SearchContextProvider>
        <StyledContainer>
          <Links />
          <StyledNav
            style={{
              top: isFixed === "true" ? "0" : "auto",
              left: isFixed === "true" ? "0" : "auto",
              position: isFixed === "true" ? "fixed" : "static",
              backgroundColor: isFixed === "true" && "var(--color-grey-0)",
              zIndex: isFixed === "true" && "999999",
              padding: isFixed === "true" && "10px 9px",
              margin: isFixed === "true" ? "0" : "10px auto 0",
            }}
          >
            <StyledBar>
              <Cart />
            </StyledBar>
            <StyledSearch>
              <Menu />
              <InputSearch />
            </StyledSearch>
          </StyledNav>
        </StyledContainer>
        <PageContainer>
          <Outlet />
        </PageContainer>
        <Footer />
      </SearchContextProvider>
    </div>
  );
}

export default AppLayout;
