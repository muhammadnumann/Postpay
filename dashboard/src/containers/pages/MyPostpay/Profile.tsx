import { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/layouts';
import { Button } from '@/components/common';
import { AuthenticationContext } from '@/contexts/AuthenticationContext';

import { CustomerContext } from '@/contexts/Customer';
import { useNavigate } from 'react-router-dom';

import ProfileData from './ProfileData';
import ContactUs from './ContactUs';
import PaymentMethod from './PaymentMethod';
import { useTranslation } from 'react-i18next';
import { BiError } from 'react-icons/bi';

import Spinner from '@/components/common/Spinner';
import './profile.scss';
import AddPaymentMethodModal from './AddPaymentMethodModal';

interface ProfileProps {}

export interface CreateCardFormValues {
  name?: string;
  number?: string;
  expDate?: string;
  cvc?: string;
  [key: string]: any;
}

const Profile: FunctionComponent<ProfileProps> = () => {
  const { logout } = useContext(AuthenticationContext);
  const [t] = useTranslation();
  const {
    paymentMethods,
    customer,
    fetchCustomerData,
    isLoading,
    errorMessage,
  } = useContext(CustomerContext);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const doLogout = (navigator) => {
    logout(navigator);
  };

  const availablePaymentMethods = useMemo(() => {
    return paymentMethods.filter(item => item.__typename === 'Card');
  }, [paymentMethods]);

  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : !isLoading && errorMessage ? (
        <div className="flex flex-col items-center justify-center h-screen text-base text-red-500 lg:text-2xl">
          <div className="mb-5">
            <BiError fontSize={40} />
          </div>
          {errorMessage}
        </div>
      ) : (
        <DashboardLayout className="profile">
          <div className="p-7 lg:p-0 lg:pl-0 lg:mb-0">
            <h2 className="text-[35px] font-extrabold">{t('MyPostpay')}</h2>
            <div className="flex flex-col lg:flex-row mt-[35px] gap-8 lg:gap-24">
              <div className="lg:mr-20 lg:w-4/12">
                {customer && <ProfileData customer={customer} />}
                <div className="hidden mt-8 lg:block">
                  <Button
                    type="button"
                    onClick={() => doLogout(navigate)}
                    className="text-[18px] w-[auto] px-12 py-[4px]"
                  >
                    {t('Logout')}
                  </Button>
                </div>
              </div>
              <div className="lg:w-4/12">
                <PaymentMethod
                  cards={availablePaymentMethods}
                  handleAddCard={() => setVisible(true)}
                />
                <div>
                  <ContactUs />
                </div>
              </div>
            </div>
            <div className="block mt-8 lg:hidden">
              <Button type="button" onClick={() => doLogout(navigate)} className='py-1'>
                {t('Logout')}
              </Button>
            </div>
            {visible && (
              <AddPaymentMethodModal handleClose={() => setVisible(false)} />
            )}
          </div>
        </DashboardLayout>
      )}
    </>
  );
};

export default Profile;
