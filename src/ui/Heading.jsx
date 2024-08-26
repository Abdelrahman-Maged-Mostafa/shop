import styled from "styled-components";

const text = `text-align:center;`;
const Heading = styled.h1`
  ${(props) =>
    props.type === "h1" &&
    `  font-size: ${1 ? `3rem` : `10px`};
  font-weight: 600;
  ${1 && text}
  `}
  ${(props) =>
    props.as === "h2" &&
    `  font-size: ${1 ? `2rem` : `10px`};
  font-weight: 600;
  ${1 && text}
  `}
  ${(props) =>
    props.as === "h3" &&
    `  font-size: ${1 ? `2rem` : `10px`};
  font-weight: 500;
  `}
  ${(props) =>
    props.as === "h4" &&
    `  font-size: ${1 ? `3rem` : `10px`};
  font-weight: 600;
  text-align:center;
  `}
`;
export default Heading;
