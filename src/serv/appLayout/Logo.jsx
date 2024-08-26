import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled.div`
  width: 120px;
  height: 70px;
  margin: 15px auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Link to="/">
        <img src="/Logo.png" alt="Logo" />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
