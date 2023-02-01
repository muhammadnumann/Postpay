import { FunctionComponent, useContext, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import CustomRouter from './customRouter';
import Login from '@/containers/pages/Login';
import RetailerLogin from '@/containers/pages/LoginRetailer';
import PurchaseList from '@/containers/pages/PurchaseList';
import MyPostpay from '@/containers/pages/MyPostpay';
import PaymentLink from '@/containers/pages/PaymentLink';
import { AuthenticationContext } from '@/contexts/AuthenticationContext';
import PurchaseDetails from '@/containers/pages/PurchaseDetails';

import history from '@/helpers/history';
import SecureCheckoutCallback from '../pages/SecureCheckoutCallback';

const AppRoute: FunctionComponent = () => {
  const { language } = useContext(AuthenticationContext);
  useEffect(() => {
    if (language === 'ar') {
      document.body.classList.add('postpay-locale-ar');
      document.body.classList.remove('postpay-locale-en');
      document.dir = 'rtl';
    } else {
      document.body.classList.add('postpay-locale-en');
      document.body.classList.remove('postpay-locale-ar');
      document.dir = 'ltr';
    }
  }, [language]);
  return (
    <CustomRouter history={history}>
      <div>
        <Routes>
          <Route path="pay/:token" element={<PaymentLink />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="/r/auth/login" element={<RetailerLogin />} />
          <Route path="instalment-plans" element={<PurchaseList />} />
          <Route
            path="instalment-plans/:instalmentPlanId"
            element={<PurchaseDetails />}
          />
          <Route path="login" element={<Login />} />
          <Route path="dashboard" element={<PurchaseList />} />
          <Route path="my-postpay" element={<MyPostpay />} />
          <Route path="payment-link" element={<PaymentLink />} />
          <Route path="3ds-callback" element={<SecureCheckoutCallback />} />
          <Route path="*" element={<div>Not found </div>} />
        </Routes>
      </div>
    </CustomRouter>
  );
};

export default AppRoute;
