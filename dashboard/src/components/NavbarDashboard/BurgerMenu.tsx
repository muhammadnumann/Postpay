import { FunctionComponent } from 'react';
import classes from './NavbarDashboard.module.scss';
interface iBurgerMenu {
  isOpen: boolean
}

const BurgerMenu: FunctionComponent<iBurgerMenu> = ({isOpen}) => {
  return (
    <div className='w-[25px] h-[20px] p-1 flex flex-col justify-between ml-[10px] cursor-pointer relative'>
      <div className={`h-[2px] bg-[#3ebbd2] rounded ${isOpen && classes['top-hambu']}`}/>
      <div className={`h-[2px] bg-[#3ebbd2] rounded ${isOpen && 'hidden'}`}/>
      <div className={`h-[2px] bg-[#3ebbd2] rounded ${isOpen && classes['bot-hambu']} `}/>
    </div>
  )
};

export default BurgerMenu;
