import { FunctionComponent, memo } from 'react'
import { Trans } from 'react-i18next';

import { useTranslation } from 'react-i18next'
interface ContactUsProps {
}
 
const ContactUs: FunctionComponent<ContactUsProps> = ({ }) => {

  const [t] = useTranslation()
  return ( 
    <div className='bg-[#f2f2f2] p-6 rounded-lg float-right mt-[37px]'>
        <div className='text-[18px] font-extrabold mb-[15px] custom-font-demi-bold'>
         {t('NeedToMakeChanges')}
        </div>
        <div className='text-[16px] custom-font-demi-bold'>
        <Trans
            i18nKey="ContactUsAt"
            values={{
              number: '+971 (4) 2156555',
              email: 'support@postpay.io '
            }}
            components={[
              <span className='text-[#3ebbd2] whitespace-nowrap'></span>,
            ]}
          />
          
        </div>
    </div>
   );
}
 
export default memo(ContactUs);