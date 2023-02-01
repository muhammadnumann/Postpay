import React, { useEffect, useState } from "react";
import { Portal } from "react-portal";
import styled from "styled-components";

import { tabletScreenSelector } from "../../constants/style";

import glowGradientImage from "../../static/images/glow-gradient.png";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 10002;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000000;
  width: 100%;
  max-width: 70%;
  height: 75vh;
  border-radius: 5px;
  z-index: 99999;
  background-image: url(${glowGradientImage});
  background-repeat: no-repeat;
  background-position: bottom;
  background-attachment: fixed;

  ${tabletScreenSelector} {
    max-width: 95%;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
`;

const LeftSideWrapper = styled.div`
  & > h1 {
    color: #ffffff;
    font-size: 50px;
    font-weight: 300;
    line-height: 120%;
    margin: 40px 0px;

    ${tabletScreenSelector} {
      font-size: 36px;
    }
  }

  ${tabletScreenSelector} {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const RightSideWrapper = styled.div`
  height: 70%;
  margin-left: 40px;

  ${tabletScreenSelector} {
    display: none;
  }
`;

const GradientButtonWrapper = styled.div`
  border-radius: 150px;
  padding: 2.5px;
  background-image: linear-gradient(
    to right,
    #00ffc1,
    #00bcff 26%,
    #a63aff 65%,
    #ff3dbe
  );
  cursor: pointer;
  width: 212px;
  height: 40px;
`;

const GradientButton = styled.div`
  background-color: #000000;
  width: 100%;
  height: 100%;
  border-radius: 150px;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  border: none;
  padding: 4px 0;
  font-weight: 600;

  &:hover {
    background-color: transparent;
  }

  & > a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 600;
  }
`;

const LogoImage = styled.img`
  ${tabletScreenSelector} {
    height: 96px;
  }
`;

const OneModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => setIsOpenModal(true), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleClose = () => {
    setIsOpenModal(false);
  };

  if (!isOpenModal) return null;

  return (
    <Portal>
      <Container>
        <Backdrop onClick={handleClose} />
        <Content>
          <ContentWrapper>
            <img
              src="/static/images/close.png"
              alt="Close"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                cursor: "pointer",
                margin: 8,
              }}
              onClick={handleClose}
            />
            <LeftSideWrapper>
              <LogoImage src="/static/images/one-logo.png" alt="Postpay One" />
              <h1>
                The GCC's first <br />
                express checkout
              </h1>
              <a href="https://one.postpay.io" target="_blank">
                <GradientButtonWrapper>
                  <GradientButton>Learn more</GradientButton>
                </GradientButtonWrapper>
              </a>
            </LeftSideWrapper>
            <RightSideWrapper>
              <img
                src="/static/images/buy-with-one.png"
                alt="Buy with One"
                style={{ width: "100%", height: "100%" }}
              />
            </RightSideWrapper>
          </ContentWrapper>
        </Content>
      </Container>
    </Portal>
  );
};

export default OneModal;
