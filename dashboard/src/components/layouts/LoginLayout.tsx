import { FunctionComponent, ReactElement } from 'react'
import { NavbarLogin, FooterLogin } from '@/components/common'
import Slider from '@/components/Slider'
interface LoginLayoutProps {
  children: ReactElement;
  className?: string
}
 
const LoginLayout: FunctionComponent<LoginLayoutProps> = ({  children, className }) => {
  return ( 
    <div className={`min-w-full min-h-screen bg-white ${className}`}>
      <div className='flex'>
        <div className='flex-1 w-full'>
          <div className='flex flex-col justify-between h-full'>
            <NavbarLogin />
            <div>
              { children }
            </div>
            <FooterLogin />
          </div>
        </div>
        <div className='flex-1 w-full min-h-screen bg-white slider-container'>
          <div className='flex items-center justify-end h-full text-lg'>
            <div className='w-[50vw] h-full'>
              <Slider />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default LoginLayout;