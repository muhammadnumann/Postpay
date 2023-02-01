import React from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import {
  tabletScreenSelector,
  mobileScreenSelector,
} from "../../constants/style";

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: #3EBBD2;
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1400px;
  padding: 0 150px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${tabletScreenSelector} {
    padding: 0 29px 0 44px;
  }

  ${mobileScreenSelector} {
    flex-direction: column;
    justify-content: center;
    padding: 0 29px 0 44px;
  }
`;


const RamadanDealsImageWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const RamadanDealsStars = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  left: 50%;
  top: 0;
  transform: translateX(-50%);

  ${mobileScreenSelector} {
    top: 5%;
  }
`;

const RamadanDealsPattern = styled.img`
  width: 100%;
  height: auto;
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
`;

const RamadanDealsImage = styled.img`
  width: 608px;
  filter: drop-shadow(7px 11px 32px rgba(0, 0, 0, 0.1));

  ${tabletScreenSelector} {
    width: 240px;
  }
`;

const HeroBanner = () => {
  return (
    <Container>
      <RamadanDealsStars src="/static/images/app-landing/ramadan-stars.svg" />
      <Wrapper>
        <RamadanDealsImageWrapper>
          <RamadanDealsImage src="/static/images/app-landing/ramadan-postpay.png" />
        </RamadanDealsImageWrapper>
      </Wrapper>
      <RamadanDealsPattern src="/static/images/app-landing/ramadan-pattern.svg" />
    </Container>
  );
};

export default HeroBanner;
