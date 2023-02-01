import React, { useEffect } from "react";
import styled, { css } from "styled-components";
import { range, chunk } from "lodash";
import aos from "aos";
import "aos/dist/aos.css";

import {
  mobileScreenSelector,
  tabletScreenSelector,
} from "../../constants/style";
import { useTranslation } from "react-i18next";
import {
  Description,
  Title,
  StyledButton,
  StyledPostpaySection,
} from "../../components/app-landing/styled-elements";

const StoreImageGroup = styled.div`
  display: flex;
  z-index: 100;
  justify-content: flex-end;

  ${(props) =>
    props.theme.rtl &&
    css`
      right: auto;
      left: 100px;

      ${mobileScreenSelector} {
        left: auto;
      }
    `}
`;

const StoreImageColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 19px;

  &:nth-child(2) {
    margin-top: 50px;
  }

  &:nth-child(3) {
    margin-top: -20px;
  }

  &:last-child {
    margin-right: 0;
  }

  ${mobileScreenSelector} {
    margin-right: 7.4px;

    &:nth-child(1) {
      margin-top: -25px;
    }

    &:nth-child(2) {
      margin-top: 0;
    }

    &:nth-child(3) {
      margin-top: 25px;
    }

    &:last-child {
      margin-right: 0;
    }
  }

  ${(props) =>
    props.theme.rtl &&
    css`
      margin-left: 19px;
      margin-right: 0;

      &:last-child {
        margin-left: 0;
      }

      ${mobileScreenSelector} {
        margin-left: 11.73px;
        margin-right: 0;
      }
    `}
`;

const StoreImage = styled.img`
  width: 133px;
  height: 133px;
  margin-bottom: 19px;

  &:last-child {
    margin-bottom: 0;
  }

  ${tabletScreenSelector} {
    width: 100px;
    height: 100px;
    margin-bottom: 7.4px;
  }

  ${mobileScreenSelector} {
    width: 50px;
    height: 50px;
    margin-bottom: 7.4px;
  }
`;

const FactList = styled.ul`
  margin-top: 1rem;
  padding-left: 25px;

  ${mobileScreenSelector} {
    padding-left: 20px;
  }
`;
const FactListItem = styled.li`
  font-size: 1.75rem;
  font-family: var(--font-regular);
  color: #000000;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-light);
    `}

  ${tabletScreenSelector} {
    font-size: 1.1rem;
    margin-bottom: 0;
  }
`;

const Stores = () => {
  const { t } = useTranslation();
  useEffect(() => {
    aos.init();
  }, []);
  const numberGroups = chunk(range(12), 4);
  return (
    <StyledPostpaySection>
      <div className="row no-gutters pt-5 mt-5">
        <div className="col-6 d-flex align-items-center">
          <div style={{ padding: 5 }}>
            <Title>{t("ShopOver200Stores")}</Title>
            <Description>{t("ShopOver200StoresDescription")}</Description>
            <FactList>
              <FactListItem>{t("ZeroInterest")}</FactListItem>
              <FactListItem>{t("ZeroFees")}</FactListItem>
            </FactList>

            <StyledButton primary href="https://postpay.page.link/6SuK" as="a">
              {t("GetTheApp")}
            </StyledButton>
          </div>
        </div>
        <div className="col-6">
          <StoreImageGroup>
            {numberGroups.map((numbers, groupIndex) => (
              <StoreImageColumn key={groupIndex} data-aos="fade-up">
                {numbers.map((number) => (
                  <StoreImage
                    src={`/static/images/app-landing/stores/${number + 1}.jpg`}
                    key={number + "_" + groupIndex}
                  />
                ))}
              </StoreImageColumn>
            ))}
          </StoreImageGroup>
        </div>
      </div>
    </StyledPostpaySection>
  );
};

export default Stores;
