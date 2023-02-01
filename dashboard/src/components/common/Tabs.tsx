import { FunctionComponent, useState, ReactElement, useEffect } from 'react'
import {
  Link, useLocation, useNavigate
} from "react-router-dom";

import { useTranslation } from 'react-i18next'

import history from '@/helpers/history';
interface TabsProps {
  children?: ReactElement
}
 
const Tabs: FunctionComponent<TabsProps> = ({ children }) => {
  
  const tabs = [
    {
      tabName: 'Shopper',
      to: '/login'
    },
    {
      tabName: 'Retailer',
      to: '/r/auth/login'
    },

  ]
  const [activeTab, setActiveTabs] = useState('')
  const { pathname } = useLocation();
  useEffect(() => {
    setActiveTabs(pathname)
  }, [])

  const [t] = useTranslation()
  const navigate = useNavigate();

  const handleClick = (path) => {
    if (path === '/r/auth/login') {
      window.location.href = window.location.origin + '/r/auth/login';
    } else {
      navigate(path)
    }
  }

  return (
    <div>
      <ul className="flex items-center justify-center w-[295px] md:w-[340px] ml-auto mr-auto">
        {
          tabs.map((el, index) => (
            <li
              key={`tabs-${index}`}
              className={`cursor-pointer w-[230px] ${activeTab === el.to ? 'text-[#3ebbd2] custom-font-demi-bold' : 'text-[#4d4d4d]'}`}
              
              x-text="tab">
                <div onClick={() => handleClick(el.to)}>
                  <div className='text-[17px] p-4 text-center'>{t(el.tabName)}</div>
                  <div className={`border-b-2 rounded-lg text-[17px] ${activeTab === el.to ? 'border-b-3 border-[#3ebbd2]' : ''}`}></div>
                </div>
            </li>
          ))
        }
		  </ul>
      <div id='tabs-content' className='flex justify-center'>
        {children}
      </div>
    </div>
  );
}

export default Tabs;

 