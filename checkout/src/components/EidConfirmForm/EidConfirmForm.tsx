import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Button from '@/components/commonV2/Button';
import MaskedInput from '@/components/commonV2/MaskedInput';
import emirateIdCardImage from '@/assets/svgs/emirate-id-card.svg';
import { Paragraph } from '../common/Typography';
import { SCREENSIZES } from '@/constants/styles';
import ErrorMessage from '../common/form/ErrorMessage';
import { useTranslation } from 'react-i18next';
import { CountryType } from '@/constants/enums';
import {
  EmirateIdMaskPattern,
  EmiratesIdRegexPattern,
  SaudiIdMaskPattern,
  SaudiIdRegexPattern,
} from '@/constants';
import CheckoutLayoutContent from '../CheckoutLayoutContent';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 350px;

  ${SCREENSIZES.mobile} {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 152px;
  margin: 30px auto;

  ${SCREENSIZES.mobile} {
    width: 130px;
    margin: 20px auto;
  }
`;

//@ts-ignore
const StyledParagraph = styled(Paragraph)`
  text-align: center;
  margin-bottom: 20px;
  color: #575756;
`;

const StyledInput = styled(MaskedInput)`
  margin-bottom: 14px;
`;

interface IProps {
  idVerifyApi: Function;
  country: CountryType;
}

const EidConfirmForm: React.FC<IProps> = ({ idVerifyApi, country }) => {
  const { t } = useTranslation();
  const buttonRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLButtonElement
  >;
  const [eid, setEid] = useState('');
  const [formError, setFormError] = useState('');
  const [apiError, setApiError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const mask =
    country === CountryType.UAE ? EmirateIdMaskPattern : SaudiIdMaskPattern;

  async function callIdVerify() {
    if (!eid) {
      return setFormError(t('ThisFieldIsRequired'));
    } else if (
      country === CountryType.UAE &&
      EmiratesIdRegexPattern.test(eid) === false
    ) {
      return setFormError(t('InvalidEmiratesIdNumber'));
    } else if (
      country === CountryType.KSA &&
      SaudiIdRegexPattern.test(eid) === false
    ) {
      return setFormError(t('InvalidKsaIdNumber'));
    }

    try {
      setFormError('');
      setApiError('');
      setIsVerifying(true);
      await idVerifyApi(eid);
      setIsVerifying(false);
    } catch (error) {
      const e: any = error;
      setIsVerifying(false);
      const graphQlError = e.graphQLErrors && e.graphQLErrors[0];
      if (graphQlError) {
        setFormError(graphQlError.message);
      } else {
        const message =
          country === CountryType.UAE
            ? t('UnableVerifyEmiratesIdNumber')
            : t('UnableVerifyKsaIdNumber');
        setApiError(t(message));
      }
    }
  }

  function onEidChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setEid(value);
    if (value.length === mask.length && value[mask.length - 1] !== '_') {
      buttonRef.current.focus();
    }
  }

  return (
    <CheckoutLayoutContent
      footerElement={
        <>
          <Button
            ref={buttonRef}
            primary
            onClick={callIdVerify}
            disabled={isVerifying}
          >
            {isVerifying ? t('PleaseWait') : t('Verify')}
          </Button>
          {apiError && <ErrorMessage>{apiError}</ErrorMessage>}
        </>
      }
    >
      <Container>
        <Image src={emirateIdCardImage} />
        <StyledParagraph>
          {country === CountryType.UAE
            ? t('EidVerifyMessage')
            : t('KsaVerifyMessage')}
        </StyledParagraph>
        <FormContainer>
          <StyledInput
            mask={mask}
            placeholder={
              country === CountryType.UAE
                ? t('EmiratesIDnumber')
                : t('KsaIDnumber')
            }
            onChange={onEidChange}
            error={formError}
            inputProps={{
              type: 'tel',
            }}
          />
        </FormContainer>
      </Container>
    </CheckoutLayoutContent>
  );
};

export default EidConfirmForm;
