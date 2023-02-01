import React from "react";
import { useTranslation } from "react-i18next";
import styled, { css } from "styled-components";
import { universalLink } from "../constants/constants";
import Button from "./form/Button";
import Modal from "./Modal";

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  color: #4d4d4d;
  margin-bottom: 26px;

  ${(props) =>
    props.theme.rtl &&
    css`
      text-align: right;
    `}
`;

const LineWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 14px;

  &:last-child {
    margin-bottom: 31px;
  }
`;

const Number = styled.div`
  border-radius: 50%;
  border: 1px solid #3ebbd2;
  color: #3ebbd2;
  text-align: center;
  min-width: 22.5px;
  min-height: 22.5px;
  width: 22.5px;
  height: 22.5px;
  margin-right: 19px;
  margin-top: 3px;
  font-family: GreycliffCF-Bold;
  padding-top: 0.5px;

  ${(props) =>
    props.theme.rtl &&
    css`
      margin-right: 0;
      margin-left: 19px;
      line-height: 19px;
    `}
`;

const Text = styled.div`
  font-size: 20px;
  line-height: 25px;
  text-align: left;
  color: #4d4d4d;
  font-family: var(--font-light);

  ${(props) =>
    props.theme.rtl &&
    css`
      text-align: right;
    `}
`;

const ButtonWrapper = styled.div`
  text-align: center;
`;

//@ts-ignore
const StyledButton = styled(Button)`
  padding: 0;
  height: 33px;
  font-family: var(--font-demi-bold);
  font-size: 18px;
  line-height: 27px;
  width: 244px;
`;

interface IProps {
  onClose: Function;
}

const PostpayCardPopup: React.FC<IProps> = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <Modal onClose={onClose}>
      <>
        <Title>{t("HowToUsePostpayAtThisStore")}</Title>
        <div>
          <LineWrapper>
            <Number>1</Number>
            <Text>{t("DownloadPostpayAndSignUpOrSignIn")}</Text>
          </LineWrapper>
          <LineWrapper>
            <Number>2</Number>
            <Text>{t("CreateYourPostpayCardInTheApp")}</Text>
          </LineWrapper>
          <LineWrapper>
            <Number>3</Number>
            <Text>{t("SelectDebitCreditCardInputPostpayCardDetails")}</Text>
          </LineWrapper>
        </div>
        <ButtonWrapper>
          <StyledButton primary as="a" href={universalLink}>
            {t("GetTheApp")}
          </StyledButton>
        </ButtonWrapper>
      </>
    </Modal>
  );
};

export default PostpayCardPopup;
