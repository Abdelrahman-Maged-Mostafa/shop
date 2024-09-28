import styled from "styled-components";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useOptions } from "../../context/useOptions";

const Container = styled.div`
  position: sticky;
  left: -40px;
  width: 130%;
  overflow: hidden;
  background-color: var(--color-grey-0);
  height: 60px;
  margin: 50px 0 0 0;
  padding: 10px 0;
  position: relative;
`;

const Marquee = styled(motion.div)`
  display: flex;
  white-space: nowrap;
  position: absolute;
  will-change: transform;
`;

const Message = styled.div`
  display: inline-block;
  padding: 0 50px;
  font-size: 1.5em;
  font-weight: bold;
  color: var(--color-grey-900);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(
    45deg,
    var(--color-grey-300),
    var(--color-grey-0)
  );
  border-radius: 10px;
  box-shadow: var(--shadow-md);
  margin: 0 10px;
`;

const OffersLine = () => {
  const marqueeRef = useRef(null);
  const [marqueeWidth, setMarqueeWidth] = useState(0);
  const { offersLine } = useOptions();

  const repeatedMessages = [...offersLine, ...offersLine, ...offersLine];
  useEffect(() => {
    const calculateWidth = () => {
      if (marqueeRef.current) {
        setMarqueeWidth(window.innerWidth);
      }
    };

    calculateWidth();
    window.addEventListener("resize", calculateWidth);

    return () => {
      window.removeEventListener("resize", calculateWidth);
    };
  }, []);
  const animation1 = {
    x: [
      marqueeWidth > 1500 ? "70%" : marqueeWidth > 700 ? "40%" : "25%",
      marqueeWidth > 1500 ? "-230%" : marqueeWidth > 700 ? "-260%" : "-275%",
    ],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 45,
        ease: "linear",
      },
    },
  };

  const animation2 = {
    x: [
      marqueeWidth > 1500 ? "70%" : marqueeWidth > 700 ? "40%" : "25%",
      marqueeWidth > 1500 ? "-230%" : marqueeWidth > 700 ? "-260%" : "-275%",
    ],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 45,
        ease: "linear",
        delay: 15,
      },
    },
  };
  const animation3 = {
    x: [
      marqueeWidth > 1500 ? "70%" : marqueeWidth > 700 ? "40%" : "25%",
      marqueeWidth > 1500 ? "-230%" : marqueeWidth > 700 ? "-260%" : "-275%",
    ],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 45,
        ease: "linear",
        delay: 30,
      },
    },
  };

  return (
    <Container>
      <Marquee ref={marqueeRef} animate={animation1}>
        {repeatedMessages.map((msg, index) => (
          <Message key={index}>{msg}</Message>
        ))}
      </Marquee>
      <Marquee animate={animation2}>
        {repeatedMessages.map((msg, index) => (
          <Message key={index}>{msg}</Message>
        ))}
      </Marquee>
      <Marquee animate={animation3}>
        {repeatedMessages.map((msg, index) => (
          <Message key={index}>{msg}</Message>
        ))}
      </Marquee>
    </Container>
  );
};

export default OffersLine;
