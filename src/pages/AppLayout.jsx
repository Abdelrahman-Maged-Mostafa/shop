import { Outlet } from "react-router";
import styled from "styled-components";
import Option from "../serv/appLayout/Option";
import Links from "../serv/appLayout/Links";
import Logo from "../serv/appLayout/Logo";
import Cart from "../serv/appLayout/NavCart";
import Menu from "../serv/appLayout/Menu";
import InputSearch from "../serv/appLayout/InputSearch";
import Footer from "../serv/appLayout/Footer";
import SearchContextProvider from "../context/SearchContext";
import { useLogin } from "../context/useLogin";
import { useEffect } from "react";

const StyledApp = styled.div``;
//Styled bg
const StyledContainer = styled.div`
  padding: 0 40px 20px;
  background: linear-gradient(var(--color-grey-0), var(--color-grey-100));
`;
//style links
const StyledNav = styled.div`
  @media screen and (min-width: 767px) {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-around;
  }
`;
const StyledBar = styled.div`
  display: flex;
  justify-content: space-between;
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
`;
function AppLayout() {
  const { checkLogin } = useLogin();
  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <StyledApp>
      <SearchContextProvider>
        <StyledContainer>
          <Links />
          <Logo />
          <StyledNav>
            <StyledBar>
              <Option />
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
    </StyledApp>
  );
}

export default AppLayout;
