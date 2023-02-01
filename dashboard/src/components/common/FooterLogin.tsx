   
import { FunctionComponent } from "react";
import { useTranslation } from 'react-i18next'

interface FooterLoginProps {}
const FooterLogin: FunctionComponent<FooterLoginProps> = () => {
  const [t, I18n2] = useTranslation()
  return (
    <footer className="flex items-center justify-center w-full px-16 py-10">
      <ul className="flex gap-6 text-[#4d4d4d] list-none text-[12px]">
        <a href="https://postpay.io/terms"  target='_blank'>
          <li className="cursor-pointer">{t('Terms')}</li>
        </a>
        <a href="https://postpay.io/privacy"  target='_blank'>
          <li className="cursor-pointer">{t('Privacy')}</li>
        </a>
        <a href={`https://postpay.io/contact-us?lang=${I18n2.language}`}  target='_blank'>
          <li className="cursor-pointer">{t('Support')}</li>
        </a>
      </ul>
    </footer>
  );
};

export default FooterLogin;
