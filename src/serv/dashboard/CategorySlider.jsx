import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Container = styled.div`
  position: relative;
  margin-bottom: 40px;
`;
const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
`;

const Slider = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled(motion.div)`
  position: relative;
  min-width: 300px;
  max-width: 300px;
  height: 200px;
  margin: 10px;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, filter 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
    filter: brightness(1.2) contrast(1.1);
  }

  @media (max-width: 768px) {
    min-width: 200px;
    max-width: 200px;
    height: 150px;
  }

  @media (max-width: 480px) {
    min-width: 100%;
    max-width: 100%;
    height: 300px;
  }
`;

const SlideContent = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  color: white;
  background-color: Rgba(0, 0, 0, 0.5);
  padding: 5px 10px;
  border-radius: 5px;
`;

const Arrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  background-color: Rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }

  @media (max-width: 768px) {
    width: 20px;
    height: 20px;
  }

  @media (max-width: 480px) {
    width: 15px;
    height: 15px;
  }
`;

const Dots = styled.div`
  position: absolute;
  bottom: -10px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: ${(props) =>
    props.active === "true"
      ? "var(--color-grey-900)"
      : "var(--color-grey-400)"};
  border-radius: 50%;
  cursor: pointer;
`;

const CategorySlider = ({ categories }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [touchStart, setTouchStart] = React.useState(null);
  const [touchMove, setTouchMove] = React.useState(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const slideRef = useRef(null);
  useEffect(() => {
    if (slideRef.current) {
      setSlideWidth(slideRef.current.offsetWidth + 20); // 20 is the margin
    }
  }, [slideRef]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart && touchMove) {
      const diff = touchMove - touchStart;
      if (diff > 50) {
        setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (diff < -50) {
        setActiveIndex((prevIndex) =>
          Math.min(prevIndex + 1, categories.length - 1)
        );
      }
    }
    setTouchStart(null);
    setTouchMove(null);
  };

  const handleWheel = (e) => {
    if (e.deltaY > 0) {
      setActiveIndex((prevIndex) =>
        Math.min(prevIndex + 1, categories.length - 1)
      );
    } else {
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    }
  };

  return (
    <Container>
      <SliderContainer>
        <Slider
          initial={{ x: 0 }}
          animate={{ x: -activeIndex * slideWidth }}
          transition={{ duration: 0.5 }}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {categories?.map((category, index) => (
            <Link key={category._id} to={`/dashboard/filter/${category.name}`}>
              <Slide
                ref={index === 0 ? slideRef : null}
                style={{
                  backgroundImage: `url(${category.image})`,
                  filter: `grayscale(${index === activeIndex ? 0 : 0.5})`,
                }}
              >
                <img
                  src={category.photo}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <SlideContent>
                  <h2 style={{ textTransform: "capitalize" }}>
                    {category.name}
                  </h2>
                </SlideContent>
              </Slide>
            </Link>
          ))}
        </Slider>

        <Arrow
          className="left"
          onClick={() =>
            setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0))
          }
        >
          <FaArrowLeft />
        </Arrow>

        <Arrow
          className="right"
          onClick={() =>
            setActiveIndex((prevIndex) =>
              Math.min(prevIndex + 1, categories.length - 1)
            )
          }
        >
          <FaArrowRight />
        </Arrow>
      </SliderContainer>
      <Dots>
        {categories?.map((_, index) => (
          <Dot
            key={index}
            active={index === activeIndex ? "true" : "false"}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </Dots>
    </Container>
  );
};

export default CategorySlider;
