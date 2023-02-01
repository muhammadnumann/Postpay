import React, { useContext, useState, memo } from "react";
// import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import Image from "next/image";
import { mobileScreenSelector, tabletScreenSelector } from "../constants/style";
import { PageContext } from "../contexts/PageContext";
import bold from "../helpers/bold";
import { isNumberString } from "../helpers/form";
import { ASSETS_URL } from "../helpers/url";
import PostpayCardPopup from "./PostpayCardPopup";
import useTracking from "../helpers/hooks/useTracking";

interface IContainer {
  isFirst: boolean;
  isExclusive?: boolean;
  isLast?: boolean;
  marginBottom?: boolean;
}

const Container = styled.a<IContainer>`
  position: relative;
  height: 100%;
  padding: 3px 50px 0 0;
  display: inline-block;

  img {
    border-radius: 10px;
    width: 170px;
  }

  ${(props) =>
    props.marginBottom &&
    css`
      margin-bottom: 10px;
    `}

  ${(props) =>
    props.isExclusive &&
    css`
      padding: 3px 60px 0 0;

      img {
        border-radius: 10px;
        width: 100%;
      }
    `}

  ${(props) =>
    props.theme.rtl &&
    css`
      padding: 3px 12px 0 24px;
      @media screen and (max-width: 1366px) {
        padding: 3px 0 0 24px;
      }
      @media (min-width: 1360px) and (min-height: 1080px) {
        padding-right: 12px;
      }
    `}

  ${mobileScreenSelector} {
    width: 100%;
    padding: 3px 24px 0 0;

    img {
      width: 100%;
    }

    ${(props) =>
      props.isExclusive &&
      css`
        padding: 3px 30px 0 0;

        img {
          width: 100%;
          border-radius: 10px;
        }
      `}
    ${(props) =>
      props.theme.rtl &&
      css`
        padding: 3px 0 0 24px;
      `}
  }

  &:hover {
    transition: all 0.5s ease;
    transform: translateY(-3px);
    opacity: 1;

    &:after {
      opacity: 0;
    }
  }
`;

const Title = styled.p<{ bold?: boolean }>`
  padding-top: 10px;
  font-size: 20px;
  color: #000000;
  font-family: var(--font-light);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${(props) => props.bold && `font-family: var(--font-bold);`}

  ${mobileScreenSelector} {
    font-size: 1rem;
  }
`;

const ImageWrapper = styled.div<{
  width?: number;
  height?: number;
  isDiscover?: boolean;
}>`
  position: relative;
  width: ${(props) => (props.width ? props.width : 170)}px;
  height: ${(props) => (props.height ? props.height : 170)}px;

  ${mobileScreenSelector} {
    width: ${(props) => (props.width ? 138 : 88)}px;
    height: ${(props) => (props.height ? 138 : 88)}px;
  }

  ${tabletScreenSelector} {
    width: ${(props) =>
      props.isDiscover && props.width ? 150 : props.width ? 130 : 100}px;
    height: ${(props) =>
      props.isDiscover && props.height ? 150 : props.height ? 130 : 100}px;
  }
`;

const DealAmount = styled.h4<{ large: boolean }>`
  padding-top: 10px;
  font-size: ${(props) => (props.large ? 38 : 36.5)}px;
  color: #ffffff;
  position: absolute;
  bottom: 5px;
  left: 10px;
  font-family: var(--font-extra-bold);
  white-space: nowrap;

  ${(props) =>
    props.theme.rtl &&
    css`
      right: 10px;
      left: auto;
    `}
  ${tabletScreenSelector} {
    font-size: 50px;
  }
  ${mobileScreenSelector} {
    font-size: 40px;
    left: 5px;
    ${(props) =>
      props.theme.rtl &&
      css`
        left: auto;
        right: 5px;
      `}
  }
`;

const Description = styled.div`
  font-size: 20px;
  line-height: 20px;
  color: #000000;
  font-family: var(--font-light);
  margin-top: -8px;

  strong {
    font-family: var(--font-demi-bold);
    font-size: inherit;
    line-height: inherit;
    color: #000000;
  }

  ${mobileScreenSelector} {
    font-size: 1rem;
  }
`;

interface ITag {
  grey: boolean;
  width: number;
}

const Tag = styled.div<ITag>`
  position: absolute;
  right: 0;
  top: 0;
  width: ${(props) => props.width}px;
  height: 24px;
  border-radius: 0 10px 0 10px;
  font-size: 12px;
  background: #3ebbd2bd;
  color: white;
  text-align: center;
  padding: 2px 10px;

  ${(props) =>
    props.grey &&
    css`
      background: rgba(0, 0, 0, 0.5);
    `}
`;

interface IBrandItem {
  partner: IPartner;
  isFirst?: boolean;
  isExclusive?: boolean;
  isLast?: boolean;
  className?: string;
  showDescription?: boolean;
  width?: number;
  height?: number;
  isDiscover?: boolean;
}

const BrandItem: React.FC<IBrandItem> = ({
  partner,
  isFirst,
  isExclusive,
  isLast,
  className,
  showDescription,
  height,
  width,
  isDiscover,
}) => {
  const { language } = useContext(PageContext);
  const [showPostpayCardAppPopup, setShowPostpayCardAppPopup] = useState(false);

  const { trackMerchantClick } = useTracking();

  const toggleShowPostpayCardApp = () =>
    setShowPostpayCardAppPopup(!showPostpayCardAppPopup);

  function handleClick(e: React.MouseEvent, partnerTitle: string) {
    trackMerchantClick(partnerTitle);

    if (partner.affiliate) {
      e.preventDefault();
      toggleShowPostpayCardApp();
      return false;
    }
  }

  const customLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      {showPostpayCardAppPopup && (
        <PostpayCardPopup onClose={toggleShowPostpayCardApp} />
      )}
      <Container
        href={partner.url}
        target="_blank"
        isFirst={isFirst}
        isExclusive={isExclusive}
        isLast={isLast}
        onClick={(e) => handleClick(e, partner.title)}
        className={className}
        marginBottom={isExclusive && !partner.description}
      >
        <ImageWrapper width={width} height={height} isDiscover={isDiscover}>
          <Image
            src={`${ASSETS_URL}${partner.slug}.jpg`}
            alt={language === "ar" ? partner.title_ar : partner.title}
            objectFit="contain"
            layout="fill"
            loader={customLoader}
          />
          {parseInt(partner.deals_amount) !== 0 && (
            <DealAmount large={isNumberString(partner.deals_amount)}>
              {partner.deals_amount}
              {isNumberString(partner.deals_amount) ? "%" : ""}
            </DealAmount>
          )}
        </ImageWrapper>

        <Title bold={!!partner.deals_amount || !!partner.description}>
          {language === "ar" ? partner.title_ar : partner.title}
        </Title>

        {showDescription && partner.description && (
          <Description
            dangerouslySetInnerHTML={{
              __html:
                language === "en"
                  ? bold(partner.description)
                  : bold(partner.description_ar),
            }}
          ></Description>
        )}
      </Container>
    </>
  );
};

export default memo(BrandItem);
