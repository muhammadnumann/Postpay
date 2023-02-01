import { memo, FunctionComponent } from 'react';
import logoWhite from '@/assets/images/logo_white.png';
import arabicLogoWhite from '@/assets/images/svgs/postpay_logo_arabic.svg';
import facebook from '@/assets/images/svgs/facebook.svg';
import instagram from '@/assets/images/svgs/instagram.svg';
import linkedin from '@/assets/images/svgs/linkedin.svg';
import twitter from '@/assets/images/svgs/twitter.svg';
import { useTranslation } from 'react-i18next';

interface FooterDashboardProps {}

const FooterDashboard: FunctionComponent<FooterDashboardProps> = () => {
  const [t, I18n2] = useTranslation();
  return (
    <footer className="text-center text-white bg-[#3ebbd2] lg:text-left lg:mt-10 mt-10 bottom-0 right-0 left-0">
      <div className="lg:pt-[116px] lg:pl-[202px] lg:pr-[195px] p-[40px] text-center lg:text-left">
        <div className="lg:flex lg:px-0">
          <div className="lg:mb-0 mb-7 w-fit"> {
            I18n2.language === 'ar' ? (
              <img className="h-[38px]" src={arabicLogoWhite} alt="postpay" />
              ) : (
              <img className="h-[38px]" src={logoWhite} alt="postpay" />
              )
            }
            
            <div className="flex justify-between mt-[20px]">
              <a href="https://www.facebook.com/postpay.io">
                <img src={facebook} alt="facebook" width="24" height="24" />
              </a>
              <a href="https://www.instagram.com/postpayofficial/">
                <img src={instagram} alt="instagram" width="24" height="24" />
              </a>
              <a href="https://www.linkedin.com/company/postpayofficial/">
                <img src={linkedin} alt="linkedin" width="24" height="24" />
              </a>
              <a href="https://twitter.com/postpayofficial">
                <img src={twitter} alt="twitter" width="24" height="24" />
              </a>
            </div>
          </div>
          <div className={`flex-1 lg:flex lg:relative lg:-top-1.5 xl:justify-end 2xl:justify-end ${I18n2.language === 'ar' ? 'lg:mr-[150px]' : 'lg:ml-24' }`}>
            <div className={`${I18n2.language === 'ar' ? '2xl:ml-[65px]' : 'lg:w-[130px] 2xl:w-[160px]'} lg:mb-0 mb-5`}>
              <h6 className="text-[16px] flex mb-3 capitalize lg:mb-4 lg:justify-start custom-font-demi-bold">
                {t('Postpay')}
              </h6>
              <p className={`mb-2 text-[16px] custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <a href="https://postpay.io/about-us/about">{t('AboutUs')}</a>
              </p>
              <p className={`mb-2 text-[16px] custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <a href="https://postpay.io/about-us/pci-dss">{t('PCI DSS')}</a>
              </p>
              <p className={`mb-2 text-[16px] custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <a href="https://postpay.io/about-us/investors">
                  {t('Investors')}
                </a>
              </p>
            </div>
            <div className={`${I18n2.language === 'ar' ? 'lg:w-[180px] 2xl:w-[200px]' : 'lg:w-[230px] 2xl:w-[250px]' } lg:mb-0 mb-5`}>
              <h6 className="text-[16px] flex mb-3 font-semibold capitalize lg:mb-4 lg:justify-start custom-font-demi-bold">
                {t('ForCustomer')}
              </h6>
              <p className={`mb-2 text-[16px] custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <a href="https://postpay.io/how-it-works">{t('HowItWorks')}</a>
              </p>
              <p className={`mb-2 text-[16px] custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <a href="https://postpay.io/about-us/responsible-spending">
                  {t('ResponsibleSpending')}
                </a>
              </p>
            </div>
            <div className="lg:w-[290px] lg:mb-0 mb-5">
              <h6 className="text-[16px] flex mb-3 font-semibold capitalize lg:mb-4 lg:justify-start custom-font-demi-bold">
                {t('ForBusiness')}
              </h6>
              <p className={`mb-2 text-[16px] custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <a href="https://postpay.io/business">{t('Benefits')}</a>
              </p>
              <p className={`mb-2 text-[16px] custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <a href="https://postpay.io/join-postpay">
                  {t('AddPostpayto')}
                </a>
              </p>
              <p className={`mb-2 text-[16px] custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <a href="https://postpay.io/join-postpay">
                  {t('ForDevelopers')}
                </a>
              </p>
            </div>
            <div className="mb-5 lg:ml-3 lg:mb-0">
              <h6 className="text-[16px] flex mb-3 font-bold lg:mb-4 lg:justify-start custom-font-demi-bold">
                {t('Support')}
              </h6>
              <p className={`mb-2 text-[16px] custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <a href={`https://postpay.io/contact-us${I18n2.language === 'ar' ? '?lang=ar' : '?lang=en'}`}>{t('Faqs')}</a>
              </p>
              <p className={`mb-2 text-[16px] custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
                <a href={`https://postpay.io/contact-us#contact-form${I18n2.language === 'ar' ? '?lang=ar' : '?lang=en'}`}>
                  {t('ContactUs')}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className='flex-1 lg:flex mt-16 lg:relative lg:-top-1.5 justify-end'>
          <h6 className="text-[16px] sm:inline-block lg:flex mb-3 capitalize lg:mb-4 lg:justify-start custom-font-light">
            {t('Copyright')}
          </h6>
          <p className={`mx-2.5 lg:text-[16px] inline-block lg:block custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
            <a href="https://postpay.io/terms">{t('Terms')}</a>
          </p>
          <p className={`mx-2.5 lg:text-[16px] inline-block lg:block custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
            <a href="https://postpay.io/privacy">{t('Privacy')}</a>
          </p>
          <p className={`mx-2.5 lg:text-[16px] inline-block lg:block custom-font-light ${I18n2.language === 'ar' ? 'text-right' : 'text-left'}`}>
            <a href={`https://postpay.io/contact-us?lang=${I18n2.language}`}>
              {t('Support')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default memo(FooterDashboard);
