import styled from "styled-components";
import Logo from "./Logo";
import LinksFooter from "./LinksFooter";
import Subscribe from "./Subscribe";

const StyledFooter = styled.div`
  background-color: var(--color-grey-0);
  padding: 20px 40px 20px;
  text-align: center;
`;
const StyledNum = styled.p`
  text-transform: capitalize;
  margin-top: 20px;
  a {
    color: var(--color-brand-500);
    cursor: pointer;
  }
`;
function Footer() {
  return (
    <StyledFooter>
      <Logo />
      <Subscribe />
      <LinksFooter />
      <StyledNum>Help Line Number : +20 102 0198 197</StyledNum>
      <StyledNum>
        © 2024 All Rights Reserved. Design by{" "}
        <a
          href="https://www.facebook.com/podapoda.gans?mibextid=ZbWKwL"
          target="blank"
        >
          Abdelrahman
        </a>
      </StyledNum>
    </StyledFooter>
  );
}

export default Footer;
