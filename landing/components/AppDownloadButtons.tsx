import React from "react";
import styled, { css } from "styled-components";

import whiteAppStore from "../static/svgs/app-landing/white-app-store.svg";
import blueAppStore from "../static/svgs/app-landing/blue-app-store.svg";
import whitePlayStore from "../static/svgs/app-landing/white-play-store.svg";
import bluePlayStore from "../static/svgs/app-landing/blue-play-store.svg";
import {
  androidDownloadLink,
  iosDownloadLink,
} from "../constants/constants";
import { mobileScreenSelector, tabletScreenSelector } from "../constants/style";

const Container = styled.div`
  display: flex;
  justify-content: flex-start;

  ${mobileScreenSelector} {
    justify-content: center;
  }
`;

const Link = styled.a`
  margin-right: 16px;

  &:last-child {
    margin-right: 0;
  }

  ${props => props.theme.rtl && css`
    margin-left: 16px;
    margin-right: 0;
  `}


  ${mobileScreenSelector} {
    margin-right: 11.65px;

    ${props => props.theme.rtl && css`
      margin-left: 11.65px;
      margin-right: 0;
    `}
  }
`;

const Image = styled.img`
  width: 185px;
  height: 33px;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(0.85);
  }

  ${tabletScreenSelector} {
    width: 150px;
    height: auto;
  }

  ${mobileScreenSelector} {
    width: 130.67px;
    height: 22.3px;
  }
`;

interface IProps {
  color: "white" | "blue";
  className?: string;
}

const AppDownloadButtons: React.FC<IProps> = ({ color, className }) => {
  return (
    <Container className={`app-download-buttons ${className}`}>
      <Link href={iosDownloadLink}>
        <Image
          className="store-image"
          src={color === "white" ? whiteAppStore : blueAppStore}
        />
      </Link>
      <Link href={androidDownloadLink}>
        <Image
          className="store-image"
          src={color === 'white' ? whitePlayStore : bluePlayStore}
        />
      </Link>
    </Container>
  );
};

export default AppDownloadButtons;
