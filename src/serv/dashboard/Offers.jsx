// Offer.js
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useOptions } from "../../context/useOptions";

const Container = styled.div`
  position: relative;
  left: -40px;
  width: calc(100% + 80px);
  height: 300px;
  overflow: hidden;
  @media screen and (max-width: 767px) {
    height: 200px;
  }
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-position: center;
`;

const Offer = () => {
  const [current, setCurrent] = useState(0);
  const { offers } = useOptions();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === offers?.length - 1 ? 0 : prev + 1));
    }, 2000);
    return () => clearInterval(interval);
  }, [offers]);

  return (
    <Container>
      <AnimatePresence>
        {offers?.map((image, index) =>
          index === current ? (
            <Slide
              key={image}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              style={{ backgroundImage: `url(${image})` }}
            />
          ) : null
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Offer;
