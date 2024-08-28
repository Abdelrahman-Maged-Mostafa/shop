import styled from "styled-components";

const StyledP = styled.p`
  text-align: center;
`;
function Empty({ resource }) {
  return <StyledP>This {resource} is empty.</StyledP>;
}

export default Empty;
