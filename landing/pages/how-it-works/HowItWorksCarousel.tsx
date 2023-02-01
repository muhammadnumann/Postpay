import React, { useMemo, useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
import PhoneCarousel from "./PhoneCarousel";
import TextCarousel from "./TextCarousel";
import arrowLeft from "../../static/svgs/landing/arrow-left.svg";
import arrowRight from "../../static/svgs/landing/arrow-right.svg";
import { mobileScreenSelector } from "../../constants/style";

interface ISlide {
  backgroundImage: string;
  image: string;
  title: string;
  description: string;
  content?: React.ReactElement;
}

interface IProps {
  slides: Array<ISlide>;
  className?: string;
}

const update = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 1;
  }
`;

const enter = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 1;
  }
`;

const LeftImage = styled.img<{ toggle: boolean }>`
  width: 70%;
  animation: ${({ toggle }) =>
    toggle
      ? css`
          ${update} 0.7s linear forwards
        `
      : css`
          ${enter} 0.7s linear forwards
        `};
`;

const NavigationButton = styled.img`
  margin-left: 25px;
  cursor: pointer;
  width: 25px;

  ${mobileScreenSelector} {
    width: 15px;
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      transform: rotate(180deg);
    `}
`;

const HowItWorksCarousel: React.FC<IProps> = ({ slides, className }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [toggle, setToggle] = useState(false);
  const images = useMemo(
    () => (slides ? slides.map((slide) => slide.image) : []),
    [slides]
  );
  const textList = useMemo(
    () =>
      slides
        ? slides.map((slide) => ({
            title: slide.title,
            description: slide.description,
            content: slide.content,
          }))
        : [],
    [slides]
  );

  const backgroundImage = useMemo(
    () =>
      slides && slides[currentPage] ? slides[currentPage].backgroundImage : "",
    [currentPage, slides]
  );

  useEffect(() => {
    setToggle(!toggle);
  }, [currentPage]);

  function moveRight() {
    const nextPage = currentPage < images.length - 1 ? currentPage + 1 : 0;
    setCurrentPage(nextPage);
  }

  function moveLeft() {
    const nextPage = currentPage !== 0 ? currentPage - 1 : images.length - 1;
    setCurrentPage(nextPage);
  }

  return (
    <div className={`row no-gutters pt-5 ${className}`}>
      <div className="col-6">
        <LeftImage
          className="left-image"
          src={backgroundImage}
          toggle={toggle}
        />
        <PhoneCarousel
          images={images}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="col-6">
        <TextCarousel currentPage={currentPage} textList={textList} />
        <div className="navigation-container">
          <NavigationButton
            src={arrowLeft}
            onClick={moveLeft}
            alt={"arrow-left"}
          />
          <NavigationButton
            src={arrowRight}
            onClick={moveRight}
            alt={"arrow-right"}
          />
        </div>
      </div>
    </div>
  );
};

HowItWorksCarousel.defaultProps = {
  className: "",
  slides: [],
};

export default HowItWorksCarousel;
