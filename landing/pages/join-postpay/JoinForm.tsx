import React, { useState, useRef, useContext } from "react";
import Select from "../../components/form/Select";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import ThankYouBanner from "./ThankYouBanner";
import countryListEn from "../../constants/countryListEn";
import countryListAr from "../../constants/countryListAr";
import { sendLead } from "../../services/api";
import { FormError } from "../../components/form";
import { validateEmail, validateUrl } from "../../helpers/form";
import { PageContext } from "../../contexts/PageContext";
import { useTranslation } from "react-i18next";
import {
  revenueOptions,
  basketSizeOptions,
  countryCodeOptions,
  BORDER_ROUND_RADIUS,
} from "../../constants/constants";
import personIcon from "../../static/svgs/faq/person.svg";
import emailIcon from "../../static/svgs/faq/email.svg";
import locationIcon from "../../static/svgs/benefits/location.svg";
import mobileIcon from "../../static/svgs/landing/mobile.svg";

const JoinForm = () => {
  const { language } = useContext(PageContext);
  const { t } = useTranslation();
  const countryList = language === "ar" ? countryListAr : countryListEn;
  const buttonRef =
    useRef<HTMLElement>() as React.MutableRefObject<HTMLButtonElement>;
  const [formValues, setFormValues] = useState<SaleLead>({
    name: "",
    email: "",
    countryCode: "971",
    phone: "",
    country: "",
    company_name: "",
    category: "",
    website: "",
    platform: "",
    monthly_revenue: "",
    basket_size: "",
  });
  const [formErrors, setFormErrors] = useState<SaleLead>({});
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

  function validateFormValues(values: SaleLead) {
    const errors: SaleLead = {};
    Object.keys(values).forEach((key) => {
      if (!values[key] && key !== "monthly_revenue" && key !== "basket_size") {
        errors[key] = t("ThisFieldIsRequired");
      }
    });
    if (values.phone && false === /^\d+$/.test(values.phone)) {
      errors.phone = t("MustBeAValidPhoneNumber");
    }
    if (values.email && false === validateEmail(values.email)) {
      errors.email = t("MustBeAValidEmail");
    }
    if (values.website && false === validateUrl("https://" + values.website)) {
      errors.website = t("MustBeAValidUrl");
    }
    return errors;
  }

  async function submitForm(e: React.SyntheticEvent) {
    e.preventDefault();

    const errors = validateFormValues(formValues);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      setFormErrors({});
      setSubmitSuccess(false);
      setRequestError(false);
      setIsSubmitingForm(true);
      const { countryCode, ...rest } = formValues;
      await sendLead({
        ...rest,
        website: "https://" + formValues.website,
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

  const platformOptions = [
    {
      label: "3DCart",
      value: "3DCart",
    },
    {
      label: "BigCommerce",
      value: "BigCommerce",
    },
    {
      label: "Drupal Commerce",
      value: "Drupal Commerce",
    },
    {
      label: "Magento",
      value: "Magento",
    },
    {
      label: "Magento 2",
      value: "Magento 2",
    },
    {
      label: "OpenCart",
      value: "OpenCart",
    },
    {
      label: "Salesforce Commerce Cloud",
      value: "Salesforce Commerce Cloud",
    },
    {
      label: "Shopify",
      value: "Shopify",
    },
    {
      label: "WooCommerce",
      value: "WooCommerce",
    },
    {
      label: t("PlatformOther"),
      value: "Other",
    },
  ];

  const categoryOptions = [
    {
      label: t("PlatformFashion"),
      value: "Fashion",
    },
    {
      label: t("PlatformMothersAndChildren"),
      value: "Mothers and children",
    },
    {
      label: t("PlatformBeautyCare"),
      value: "Beauty care",
    },
    {
      label: t("PlatformJewellery"),
      value: "Jewellery and accessories",
    },
    {
      label: t("PlatformSports"),
      value: "Sports",
    },
    {
      label: t("PlatformElectronics"),
      value: "Electronics",
    },
    {
      label: t("PlatformServices"),
      value: "Services",
    },
    {
      label: t("PlatformOther"),
      value: "Other",
    },
  ];

  return (
    <>
      <div className="join-postpay">
        {!submitSuccess && (
          <>
            <h3 className="title">{t("JoinPostpayFormTitle")}</h3>
            <div className="description">{t("JoinPostpayFormDescription")}</div>
            <form id="join-form">
              {/*<div className='form-notice'>{t('JoinPostpayFormNotice')}</div>*/}
              <div className="form-container">
                <div className="row">
                  <div className="col-md-5 col-sm-12 spacing-join-form-right">
                    <Input
                      icon={personIcon}
                      type="text"
                      name="name"
                      placeholder={t("FullNameAsterisk")}
                      onChange={(e) => setFieldValue("name", e.target.value)}
                      label={t("Name")}
                      value={formValues.name}
                      error={formErrors.name}
                      iconHeight={25.4}
                      iconWidth={25.4}
                    />
                  </div>
                  <div className="col-md-5 col-sm-12 spacing-join-form">
                    <Input
                      icon={emailIcon}
                      type="email"
                      name="email"
                      placeholder={t("EmailAsterisk")}
                      onChange={(e) => setFieldValue("email", e.target.value)}
                      label={t("Email")}
                      value={formValues.email}
                      error={formErrors.email}
                      iconHeight={18}
                      iconWidth={25}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5 col-sm-12 spacing-join-form-right">
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
                    />
                  </div>
                  <div className="col-md-5 col-sm-12 spacing-join-form">
                    <Select
                      icon={locationIcon}
                      label={t("Select")}
                      options={countryList}
                      onChange={(item) => setFieldValue("country", item.value)}
                      value={formValues.country}
                      placeholder={t("Country")}
                      error={formErrors.country}
                      iconHeight={25}
                      iconWidth={19}
                    />
                  </div>
                </div>
                <div className="row pt-0 pt-md-4">
                  <div className="col-md-5 col-sm-12 spacing-join-form-right">
                    <Input
                      type="text"
                      name="company_name"
                      autocomplete="organization"
                      placeholder={t("CompanyNameAsterisk")}
                      onChange={(e) =>
                        setFieldValue("company_name", e.target.value)
                      }
                      label={t("CompanyName")}
                      value={formValues.company_name}
                      error={formErrors.company_name}
                    />
                  </div>
                  <div className="col-md-5 col-sm-12 spacing-join-form">
                    <Select
                      options={categoryOptions}
                      onChange={(item) => setFieldValue("category", item.value)}
                      value={formValues.category}
                      placeholder={t("Category")}
                      label={t("Select")}
                      error={formErrors.category}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5 col-sm-12 spacing-join-form-right">
                    <Input
                      type="text"
                      name="website"
                      onChange={(e) => setFieldValue("website", e.target.value)}
                      label={t("WebsiteUrl")}
                      placeholder={t("WebsiteUrl")}
                      value={formValues.website}
                      error={formErrors.website}
                      prefix="https://"
                    />
                  </div>
                  <div className="col-md-5 col-sm-12 spacing-join-form">
                    <Select
                      options={platformOptions}
                      onChange={(item) => {
                        setFieldValue("platform", item.value);
                        buttonRef.current.focus();
                      }}
                      value={formValues.platform}
                      placeholder={t("Platform")}
                      label={t("Select")}
                      error={formErrors.platform}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5 col-sm-12 spacing-join-form-right">
                    <Select
                      options={revenueOptions}
                      onChange={(item) => {
                        setFieldValue("monthly_revenue", item.value);
                        buttonRef.current.focus();
                      }}
                      value={formValues.monthly_revenue}
                      placeholder={t("ApproxMonthlyRevenue")}
                      label={t("Select")}
                      error={formErrors.monthly_revenue}
                    />
                  </div>
                  <div className="col-md-5 col-sm-12 spacing-join-form">
                    <Select
                      options={basketSizeOptions}
                      onChange={(item) => {
                        setFieldValue("basket_size", item.value);
                        buttonRef.current.focus();
                      }}
                      value={formValues.basket_size}
                      placeholder={t("ApproxBasketSize")}
                      label={t("Select")}
                      error={formErrors.basket_size}
                    />
                  </div>
                </div>
                <div className="submit-button-wrapper row">
                  <Button
                    primary
                    disabled={isSubmitingForm}
                    onClick={submitForm}
                    padding="12px"
                    ref={buttonRef}
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
            title={t("ThankYouJoinPostpay")}
            paragraph={t("AnAgentWillContactYouShortly")}
          />
        )}
      </div>
      <style jsx>{`
        .join-postpay {
          padding: 80px 0;
        }

        .benefit-container {
        }

        .title {
          font-size: 3.1rem;
          line-height: 1.3;
          font-family: var(--font-bold);
          color: #000000;
        }

        .spacing-join-form {
          padding-left: 40px;
        }

        .spacing-join-form-right {
          padding-right: 40px;
        }

        :global([dir="rtl"]) .spacing-join-form-right {
          padding-right: 0;
          padding-left: 40px;
        }

        :global([dir="rtl"]) .spacing-join-form {
          padding-left: 0;
          padding-right: 40px;
        }

        .description {
          font-size: 1.5rem;
          font-family: var(--font-light);
          color: #000000;
          margin-bottom: 50px;
        }

        #join-form p {
          font-size: 0.9rem;
          color: #aaaaaa;
        }

        .form-notice {
          font-style: italic;
          margin-bottom: 10px;
          font-size: 0.8rem;
          color: #aaaaaa;
        }

        .submit-button-wrapper {
          margin-top: 30px;
          width: 200px;
          margin-left: 0;
        }

        .row {
          margin-bottom: 10px;
        }

        @media screen and (max-width: 900px) {
          .spacing-join-form {
            padding-left: 0;
          }

          .spacing-join-form-right {
            padding-right: 40px;
          }
        }

        @media screen and (max-width: 500px) {
          .join-postpay {
            padding: 50px 0;
          }

          .title {
            font-size: 2rem;
          }

          .spacing-join-form {
            padding: 0 20px;
          }

          :global([dir="rtl"]) .spacing-join-form {
            padding: 0 20px;
          }

          .spacing-join-form-right {
            padding: 0 20px;
          }

          :global([dir="rtl"]) .spacing-join-form-right {
            padding: 0 20px;
          }

          .description {
            font-size: 1.3rem;
            margin-bottom: 20px;
          }

          .submit-button-wrapper {
            margin-top: 20px;
            width: 100%;
          }
        }
      `}</style>
    </>
  );
};

export default JoinForm;
