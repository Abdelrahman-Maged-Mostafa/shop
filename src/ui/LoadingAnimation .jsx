import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: white;
`;

const Text = styled(motion.span)`
  font-size: 5rem;
  color: black;
  display: inline-block;
`;

const letterAnimation = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
    },
  }),
};

const LoadingAnimation = () => {
  const text = "Shop Now".split("");

  return (
    <Container>
      {text.map((letter, index) => (
        <Text
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={letterAnimation}
        >
          {letter}
        </Text>
      ))}
    </Container>
  );
};

export default LoadingAnimation;
