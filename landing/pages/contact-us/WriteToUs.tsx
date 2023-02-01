import React, { useState } from "react";
import Input from "../../components/form/Input";
import TextArea from "../../components/form/TextArea";
import Button from "../../components/form/Button";
import ThankYouBanner from "../join-postpay/ThankYouBanner";
import { sendContact } from "../../services/api";
import { FormError } from "../../components/form";
import { validateEmail } from "../../helpers/form";
import { useTranslation } from "react-i18next";
import personIcon from "../../static/images/person.png";
import emailIcon from "../../static/svgs/faq/email.svg";
import mobileIcon from "../../static/svgs/landing/mobile.svg";
import { countryCodeOptions } from "../../constants/constants";

const WriteToUs = () => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState<ContactFormData>({
    name: "",
    email: "",
    countryCode: "971",
    phone: "",
    subject: "",
    description: "",
  });
  const [formErrors, setFormErrors] = useState<ContactFormData>({});
  const [isSubmitingForm, setIsSubmitingForm] = useState(false);
  const [requestError, setRequestError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  function setFieldValue(fieldName: string, value: string) {
    const newFormValues = {
      ...formValues,
      [fieldName]: value,
    };
    setFormValues(newFormValues);
    if (Object.keys(formErrors).length > 0) {
      const errors = validateFormValues(newFormValues);
      if (!errors[fieldName]) {
        setFormErrors({
          ...formErrors,
          [fieldName]: null,
        });
      } else {
        setFormErrors({
          ...formErrors,
          [fieldName]: errors[fieldName],
        });
      }
    }
  }

  function validateFormValues(values: ContactFormData) {
    const errors: ContactFormData = {};
    Object.keys(values).forEach((key) => {
      if (!values[key]) {
        errors[key] = t("ThisFieldIsRequired");
      }
    });
    if (values.email && validateEmail(values.email) === false) {
      errors.email = t("MustBeAValidEmail");
    }
    if (values.phone && false === /^\d+$/.test(values.phone)) {
      errors.phone = t("MustBeAValidPhoneNumber");
    }
    if (values.description && values.description.length > 300) {
      errors.description = "Maximum 300 characters";
    }
    return errors;
  }

  async function submitForm(e: React.SyntheticEvent) {
    e.preventDefault();
    const errors = validateFormValues(formValues);
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      setSubmitSuccess(false);
      setRequestError(false);
      setIsSubmitingForm(true);
      const { countryCode, ...rest } = formValues;
      await sendContact({
        ...rest,
        phone: "+" + formValues.countryCode + formValues.phone,
      });
      setIsSubmitingForm(false);
      setSubmitSuccess(true);
    } catch (e) {
      setIsSubmitingForm(false);
      if (e.response && e.response.data) {
        setFormErrors(e.response.data);
      } else {
        setRequestError(true);
      }
    }
  }

  return (
    <>
      <div className="write-to-us" id="form">
        {!submitSuccess && (
          <>
            <form id="contact-form">
              <div className="form-container">
                <div className="row">
                  <div className="col-md-6 col-lg-5 col-sm-12 no-padding-right">
                    <Input
                      icon={personIcon}
                      iconHeight={25}
                      iconWidth={25}
                      type="text"
                      name="name"
                      placeholder={t("FullNameAsterisk")}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                      label={t("full name")}
                      value={formValues.name}
                      error={formErrors.name}
                    />
                  </div>
                  <div className="col-lg-1 d-lg-block d-none" />
                  <div className="col-md-6 col-sm-12 email-column">
                    <Input
                      icon={emailIcon}
                      iconHeight={25}
                      iconWidth={25}
                      type="email"
                      name="mobile number"
                      placeholder={t("EmailAsterisk")}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      label={t("Email")}
                      value={formValues.email}
                      error={formErrors.email}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-5 col-sm-12 no-padding-right">
                    <Input
                      icon={mobileIcon}
                      placeholder={t("PhoneNumberAsterisk")}
                      label={""}
                      type="text"
                      name="number"
                      value={formValues.phone}
                      options={countryCodeOptions}
                      onChange={(e) => setFieldValue("phone", e.target.value)}
                      onChangeOption={(e) =>
                        setFieldValue("countryCode", e.target.value)
                      }
                      iconHeight={26}
                      iconWidth={16}
                      error={formErrors.phone}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <Input
                      type="text"
                      name="subject"
                      onChange={(e) => setFieldValue("subject", e.target.value)}
                      placeholder={t("SubjectAsterisk")}
                      label={t("subject")}
                      value={formValues.subject}
                      error={formErrors.subject}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 col-sm-12">
                    <TextArea
                      name="description"
                      onChange={(e) =>
                        setFieldValue("description", e.target.value)
                      }
                      placeholder={t("MessageAsterisk")}
                      label={""}
                      value={formValues.description}
                      error={formErrors.description}
                      rows={5}
                    />
                  </div>
                </div>
                <div className="submit-button-wrapper">
                  <Button
                    primary
                    disabled={isSubmitingForm}
                    onClick={submitForm}
                  >
                    {isSubmitingForm ? t("PleaseWait") : t("Submit")}
                  </Button>
                </div>

                {requestError && <FormError error="Unable to submit form." />}
              </div>
            </form>
          </>
        )}

        {submitSuccess && (
          <ThankYouBanner
            title={t("YourMessageHasBeenSent")}
            paragraph={t("AnAgentWillContactYouShortly")}
          />
        )}
      </div>
      <style jsx>{`
        .write-to-us {
          padding: 80px 0;
        }

        .benefit-container {
        }

        .title {
          font-size: 30px;
          font-family: var(--font-bold);
          color: #252524;
        }

        .description {
          margin-bottom: 30px;
        }

        #contact-form {
          width: 100%;
          max-width: 1400px;
        }

        .no-padding-right {
          padding-right: 0;
        }

        .email-column {
          padding-left: 8px;
        }

        #contact-form p {
          display: flex;
          font-size: 0.8rem;
          font-style: italic;
          color: #aaaaaa;
          margin-bottom: 5px;
        }

        .submit-button-wrapper {
          margin-top: 25px;
          width: 200px;
        }

        @media screen and (max-width: 500px) {
          .write-to-us {
            padding: 0;
          }

          .title {
            font-size: 2.1rem;
            margin: 30px 0;
          }

          .no-padding-right {
            padding-right: 15px;
            margin-bottom: 10px;
          }

          .email-column {
            padding-left: 15px;
          }

          .row {
            margin-bottom: 10px;
          }

          .submit-button-wrapper {
            margin-top: 18px;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default WriteToUs;
