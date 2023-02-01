import { FunctionComponent } from 'react'
import { Tabs } from '@/components/common'
import { LoginLayout } from '@/components/layouts'
interface LoginRetailerProps {
  
}
 
const LoginRetailer: FunctionComponent<LoginRetailerProps> = () => {
  return ( 
    <LoginLayout className='login-container'>
      <div className='content'>
        <Tabs>
          <div className='w-[340px]'>
            <h1 className='mt-8 mb-[32px] text-[#aaaaaa] font-bold text-[25px]'>
              Welcome.
            </h1>
            <p className='text-[17px] text-[#4d4d4d] mb-10'>Please verify your mobile number to login and manage your payments.</p>
          </div>
        </Tabs>
      </div>
    </LoginLayout>
   );
}
 
export default LoginRetailer;