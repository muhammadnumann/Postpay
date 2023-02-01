import React, { useState } from "react";
import styled, { css } from "styled-components";
import { FONTS, mobileScreenSelector } from "../../constants/style";
import Button from "../../components/form/Button";
import { FormError } from "../../components/form";
import { validateEmail } from "../../helpers/form";
import { addWishList } from "../../services/api";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 350px;
  background: #efefef;

  ${mobileScreenSelector} {
    padding: 0 20px;
    height: 400px;
  }
`;

const Title = styled.div`
  font-family: var(--font-bold);
  font-size: 25px;
  margin-bottom: 10px;
`;

const Message = styled.div`
  font-size: 18px;
  margin-bottom: 30px;
`;

const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;

  ${mobileScreenSelector} {
    flex-direction: column;
    width: 100%;
  }
`;

const InputWrapper = styled.div`
  width: 200px;
  margin-right: 8px;

  ${(props) =>
    props.theme.rtl &&
    css`
      margin-right: 0;
      margin-left: 8px;
    `}

  ${mobileScreenSelector} {
    width: 100%;
    margin-bottom: 10px;
    margin-right: 0;
  }
`;

const Input = styled.input`
  background: white;
  padding: 5px 8px;
  height: 45px;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  width: 100%;

  &::placeholder {
    color: #d0d0d0;
  }
`;

const SubmitButtonWrapper = styled.div`
  width: 150px;
  line-height: 45px;
  padding: 0;

  ${mobileScreenSelector} {
    width: 100%;
  }
`;

const ThankMessage = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

interface IFormData {
  email?: string;
  wishlist?: string;
}

const AddRetailerForm = () => {
  const { t } = useTranslation();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IFormData>({});
  const [formErrors, setFormErrors] = useState<IFormData>({});

  async function submitForm() {
    const errors = validateForm(formData);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setIsSubmitting(true);
    try {
      await addWishList({
        email: formData.email,
        wishlist: formData.wishlist,
      });
      setIsSubmitting(false);
      setSubmitSuccess(true);
    } catch (e) {
      console.log("e", e);
      setIsSubmitting(false);
    }
  }

  function validateForm(newFormData: IFormData) {
    const errors: IFormData = {};
    if (!newFormData.wishlist) {
      errors.wishlist = t("ThisFieldIsRequired");
    }
    if (!newFormData.email) {
      errors.email = t("ThisFieldIsRequired");
    }
    if (newFormData.email && !validateEmail(newFormData.email)) {
      errors.email = t("MustBeAValidEmail");
    }
    return errors;
  }

  function onFieldChange(fieldName, value) {
    const form: IFormData = {
      ...formData,
      [fieldName]: value,
    };
    setFormData(form);
    const _errors = validateForm(form);
    if (Object.keys(formErrors).length > 0) {
      setFormErrors(_errors);
    }
  }
  return (
    <Container>
      <Title>{t("AddRetailerFormTitle")}</Title>
      <Message>{t("AddRetailerFormDescription")}</Message>
      <FormWrapper>
        {!submitSuccess && (
          <>
            <InputWrapper>
              <Input
                type="text"
                placeholder={t("ShopName")}
                onChange={(e) => onFieldChange("wishlist", e.target.value)}
              />
              {formErrors.wishlist && <FormError error={formErrors.wishlist} />}
            </InputWrapper>
            <InputWrapper>
              <Input
                type="email"
                placeholder={t("YourEmail")}
                onChange={(e) => onFieldChange("email", e.target.value)}
              />
              {formErrors.email && <FormError error={formErrors.email} />}
            </InputWrapper>
            <SubmitButtonWrapper>
              <Button
                blackStyle
                height="45px"
                padding="0"
                onClick={submitForm}
                disabled={isSubmitting}
              >
                {isSubmitting ? t("PleaseWait") : t("Submit")}
              </Button>
            </SubmitButtonWrapper>
          </>
        )}
        {submitSuccess && (
          <ThankMessage>{t("AddRetailerFormThankYouMessage")}</ThankMessage>
        )}
      </FormWrapper>
    </Container>
  );
};

export default AddRetailerForm;
