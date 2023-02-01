   
import { FunctionComponent, useContext } from "react";
import {
  Link
} from "react-router-dom";
import logo from "@/assets/images/logo.webp";
import arabicLogo from '@/assets/images/svgs/arabic-logo-blue.svg';
import enIcon from "@/assets/images/svgs/en.svg";
import arabicIcon from "@/assets/images/arabicIcon.webp";
import { AuthenticationContext } from '@/contexts/AuthenticationContext'

interface NavbarLoginProps {}

const NavbarLogin: FunctionComponent<NavbarLoginProps> = () => {
  const { language, changeLanguage } = useContext(AuthenticationContext)
  const handleChangeLanguage = () => {
    const param = language === 'ar' ? 'en' : 'ar'
    changeLanguage(param)
  }
  return (
    <nav className="flex items-center justify-between w-full md:p-[55px] md:pb-0 p-9 nav-bar-container">
      <Link to='/'>
        <img src={language === 'ar' ? arabicLogo : logo} alt="logo" className="w-32 cursor-pointer" />
      </Link>
      <div role='presentation' onClick={handleChangeLanguage}>
        {
          language === 'en' ? (
            <img src={arabicIcon} alt="arabicIcon" className="w-6 cursor-pointer" />
          ) : (
            <img src={enIcon} alt="arabicIcon" className="w-6 cursor-pointer" />
          )
        }
      </div>
    </nav>
  );
};

export default NavbarLogin;