import { Link } from "react-router-dom";
import styled from "styled-components";
import { useOptions } from "../../context/useOptions";

const StyledLogo = styled.div`
  width: 120px;
  height: 70px;
  margin: 15px auto;
`;

function Logo() {
  const { logo } = useOptions();
  return (
    <StyledLogo>
      <Link to="/">
        <img src={logo} alt="Logo" />
      </Link>
    </StyledLogo>
  );
}

export default Logo;
