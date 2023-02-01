import { FunctionComponent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '@/assets/images/logo.webp';
import arabicLogo from '@/assets/images/svgs/arabic-logo-blue.svg';
import arabicIcon from '@/assets/images/arabicIcon.webp';
import { AuthenticationContext } from '@/contexts/AuthenticationContext';
import { useTranslation } from 'react-i18next';
import enIcon from '@/assets/images/svgs/en.svg';
import downIcon from '@/assets/images/svgs/down.svg';
import classes from './NavbarDashboard.module.scss';
import cn from 'classnames';
import BurgerMenu from './BurgerMenu';
import { DashboardContext } from '@/contexts/DashboardContext';
import Select from '@/components/common/Select';
import {optionsCurrency} from '@/constants/constants'
interface NavbarLoginProps {}

const NavbarLogin: FunctionComponent<NavbarLoginProps> = () => {
  const [extend, setExtend] = useState(false);
  const { language, changeLanguage } = useContext(AuthenticationContext);
  const { currency, setCurrency } = useContext(DashboardContext);
  const handleChangeLanguage = () => {
    const param = language === 'ar' ? 'en' : 'ar';
    changeLanguage(param);
  };
  function handleSelect(option) {
    setCurrency(option.value);
  }
  const { t } = useTranslation();

  return (
    <nav className="flex items-center justify-between w-full md:px-[29px] md:py-[20px] lg:pb-0 p-[25px]">
      <Link to="/dashboard">
        <img src={language === 'ar' ? arabicLogo : logo} alt="logo" className="w-[136px] cursor-pointer" />
      </Link>
      <div className="items-center justify-end hidden lg:flex gap-[25px]">
        <Select handleSelect={handleSelect} options={optionsCurrency} labelKey="label" idKey="value">
          <div
            className={cn(classes.navbar_item, 'flex items-center gap-[12px] ')}
          >
            <div>{t(currency)}</div> 
            <img src={downIcon} className="w-[8px]" />
          </div>
        </Select>
        <Link to="/dashboard">
          <div className={classes.navbar_item}>{t('Purchases')}</div>
        </Link>
        <Link to="/my-postpay">
          <div className={classes.navbar_item}>{t('MyPostpay')}</div>
        </Link>
        <a href={`https://postpay.io/contact-us?lang=${language}`} target="_blank">
          <div className={classes.navbar_item}>{t('Support')}</div>
        </a>
        <div className={classes.navbar_item} onClick={handleChangeLanguage}>
          {language === 'en' ? (
            <img
              src={arabicIcon}
              alt="arabicIcon"
              className="w-[21px] cursor-pointer"
            />
          ) : (
            <img
              src={enIcon}
              alt="enIcon"
              className="w-[21px] cursor-pointer"
            />
          )}
        </div>
      </div>
      <div className="flex items-center lg:hidden">
        <div className="cursor-pointer mr-[6px]">
          <Select handleSelect={handleSelect} options={optionsCurrency} labelKey="label" idKey="value">
            <div
              className={cn(classes.navbar_item, 'flex items-center gap-[12px]')}
            >
              <div>{t(currency)}</div> 
              <img alt="down" className="cursor-pointer mr-[10px]" src={downIcon} />
            </div>
          </Select>
          {/* {t(currency)} */}
        </div>
        <div className="cursor-pointer" onClick={handleChangeLanguage}>
          {language === 'en' ? (
            <img
              src={arabicIcon}
              alt="arabicIcon"
              className="w-6 cursor-pointer"
            />
          ) : (
            <img src={enIcon} alt="enIcon" className="w-6 cursor-pointer" />
          )}
        </div>
        <div
          className={`relative z-30 ${classes['hambu-container']}`}
          onClick={() => setExtend(!extend)}
        >
          <BurgerMenu isOpen={extend} />
        </div>
        <div
          className={`fixed h-[100%] w-[100vw] ${
            classes['nav-container']
          } top-0 right-0 z-20 p-4 ${
            extend ? classes['drawer-open'] : classes['drawer-close']
          }`}
        >
          <Link to="/dashboard">
            <div className="text-white">{t('Purchases')}</div>
          </Link>
          <Link to="/my-postpay">
            <div className="text-white">{t('MyPostpay')}</div>
          </Link>
          <a href={`https://postpay.io/contact-us?lang=${language}`} target="_blank">
            <div className="text-white">{t('Support')}</div>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLogin;
