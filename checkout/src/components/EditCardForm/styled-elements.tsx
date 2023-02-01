import styled, { css } from 'styled-components';
import { Paragraph } from '../common/Typography';
import { SCREENSIZES } from '@/constants/styles';
import { LayoutContainer } from '../common/Layout';
import PriceText from '../common/PriceText';

export const Container = styled.div`
  padding-top: 40px;
  ${props => props.theme.isAbTesting && `padding-top: 25px`};
`;

export const FormContainer = styled.div`
  padding: 0;
`;

//@ts-ignore
export const StyledParagraph = styled(Paragraph)`
  text-align: left;
  margin-bottom: 25px;

  ${props =>
    props.theme.rtl &&
    css`
      text-align: right;
    `}
`;

export const EnterCardText = styled(StyledParagraph)`
  margin-bottom: 12px;
  margin-top: 0px
  font-size: 18px;
`;

export const Instruction = styled(Paragraph)`
  font-size: 0.9rem;
  margin-bottom: 15px;

  ${SCREENSIZES.mobile} {
    margin-bottom: 8px;
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 30px;
`;

export const InputLabel = styled.div`
  font-family: var(--font-regular);
  font-size: 16px;
  margin-bottom: 30px;
  color: #4d4d4d;
  text-align: left;

  ${props =>
    props.theme.rtl &&
    css`
      text-align: right;
    `}
`;

export const CheckboxWrapper = styled.div`
  margin: 15px 0;
  font-size: 0.9rem;

  ${SCREENSIZES.mobile} {
    margin: 8px 0;
  }
`;

export const PurchasingConditionContainer = styled.div`
  padding: 20px 10px;
  width: 100%;
  background-color: #ededed;
  font-family: var(--font-regular);
  margin-bottom: 10px;
  border-radius: 3px;
`;

export const PurchasingConditionTitle = styled.div`
  font-family: var(--font-bold);
  font-weight: bold;
  margin-bottom: 5px;
  color: #575756;
  font-size: 0.9rem;
`;

export const PurchasingConditionContent = styled.div`
  max-height: 300px;
  overflow-y: auto;
  font-size: 0.9rem;

  ul {
    margin: 0;
  }
`;

export const CvcContainer = styled(LayoutContainer)`
  margin-bottom: 20px;
  justify-content: space-between;
`;

export const SmallCreditCardImage = styled.img`
  min-width: 30px;
  min-height: 20px;
  position: absolute;
  right: 8px;

  ${props =>
    props.theme.rtl &&
    css`
      left: 8px;
      right: auto;
    `}
`;

export const ButtonText = styled(LayoutContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 10px;
  white-space: pre-wrap;

  > div {
    margin: 0 3px;
  }
`;

export const SelectPaymentOptionWrapper = styled.div`
  margin-bottom: 25px;
`;

export const PaymentOptionText = styled.div`
  font-family: var(--font-regular);
  color: #4d4d4d;
  margin-bottom: 20px;
  font-size: 18px;
  ${props => props.theme.rtl && 'text-align: right'};
`;

export const SubmitButtonWrapper = styled.div`
  padding: 0;
  width: 100%;
`;

export const PaymentScheduleWrapper = styled.div<{ noBorderBottom?: boolean }>`
  padding-bottom: 25px;
  border-bottom: 1px solid #888888;
  margin-bottom: 25px;

  ${props => props.noBorderBottom && 'border-bottom: none'};
`;

export const AgreeTermText = styled.div`
  font-size: 12px;
`;

export const PaymentMethodText = styled.div`
  font-size: 20px;
  font-family: var(--font-family);
  margin-bottom: 14px;
`;
