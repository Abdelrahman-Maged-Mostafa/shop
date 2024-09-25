import styled from "styled-components";
import Logo from "./Logo";
import LinksFooter from "./LinksFooter";
import { useOptions } from "../../context/useOptions";

const StyledFooter = styled.div`
  background-color: var(--color-grey-0);
  padding: 20px 40px 20px;
  text-align: center;
`;
const StyledNum = styled.p`
  margin-top: 20px;
  a {
    color: var(--color-brand-500);
    cursor: pointer;
  }
`;
function Footer() {
  const { footerInfo } = useOptions();

  return (
    <StyledFooter>
      <Logo />
      <LinksFooter />
      <StyledNum>
        Help Email :
        <a href={`mailto:${footerInfo?.email}`} style={{ marginLeft: "3px" }}>
          {footerInfo?.email}
        </a>
      </StyledNum>
      <StyledNum>Help Line Number : {footerInfo?.phone}</StyledNum>
      <StyledNum style={{ fontSize: "8px" }}>
        © 2024 All Rights Reserved. Design by
        <a
          href="https://www.facebook.com/podapoda.gans?mibextid=ZbWKwL"
          target="blank"
          style={{ marginLeft: "3px" }}
        >
          Abdelrahman
        </a>
      </StyledNum>
    </StyledFooter>
  );
}

export default Footer;
