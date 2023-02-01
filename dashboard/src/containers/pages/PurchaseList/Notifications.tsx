import React, { useState, useEffect, useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import getUnpaidInstalmentPlansQuery from '@/queries/getUnpaidInstalmentPlans.graphql';
import { CustomerContext } from '@/contexts/Customer';
import { Card, InstalmentPlan, Maybe } from '@/graphql/index';
import PayInstalmentModal from '../PurchaseDetails/PayInstalmentModal';
import { PayType } from '@/constants/enums';
import Notifications from '@/components/PurchaseList/Notifications';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext } from '@/contexts/AuthenticationContext';

export interface IMessages {
  description: string;
  title: string;
  onClick: Function;
  index: number;
  visible: boolean;
}

export interface IDataCard {
  card?: Card;
  instalmentPlan: InstalmentPlan;
  messageIndex: number;
}

interface IUnpaidNotificationContainer {
  refresh: Function;
}

const NotificationsContainer: React.FC<IUnpaidNotificationContainer> = ({
  refresh,
}) => {
  const { t } = useTranslation();
  const { language } = useContext(AuthenticationContext);
  const {
    data: unpaidInstalmentPlansData,
    refetch: refectUnpaidInstalmentPlansData,
    loading: isLoadingUnpaidInstalments,
  } = useQuery(getUnpaidInstalmentPlansQuery);
  const [messages, setMessages] = useState<Array<IMessages>>([]);
  const { paymentMethods, fetchPaymentMethods } = useContext(CustomerContext);
  const [editInstalmentPlan, setEditInstalmentPlan] =
    useState<Maybe<InstalmentPlan>>();
  const navigate = useNavigate();
  const [messageIndex, setMessageIndex] = useState<Maybe<number>>(null);

  async function payUnpaid(
    instalmentPlan: InstalmentPlan,
    messageIndex: number
  ) {
    setEditInstalmentPlan(instalmentPlan);
    setMessageIndex(messageIndex);
  }

  function closeUpdatePaymentMethodModal() {
    setEditInstalmentPlan(null);
  }

  function clearMessage(index: number) {
    setEditInstalmentPlan(null);
    setMessages(messages.map(item => {
      if (item.index === index) {
        item.visible = false;
      }
      return item;
    }));
  }

  function loadData() {
    refectUnpaidInstalmentPlansData();
    fetchPaymentMethods();
  }

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const messagesArray: Array<IMessages> = [];
    let index = 0;
    if (isLoadingUnpaidInstalments) return;

    if (
      unpaidInstalmentPlansData &&
      unpaidInstalmentPlansData.instalmentPlans &&
      unpaidInstalmentPlansData.instalmentPlans.edges.length > 0
    ) {
      const messagesInstalmentPlans: Array<IMessages> =
        unpaidInstalmentPlansData.instalmentPlans.edges.map((edge: any) => {
          index++;
          let itemIndex = index;
          return {
            index: itemIndex,
            description: t('UnpaidInstalmentMessage', {
              merchant: edge.node.order.merchant.name,
              number: edge.node.paymentMethod.lastFourDigits,
            }),
            title: t('Oops!'),
            onClick: () => payUnpaid(edge.node, itemIndex),
            visible: true,
          };
        });
      messagesArray.push(...messagesInstalmentPlans);
    }

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;

    const hasValidPaymentMethod = paymentMethods.find(
      (paymentMethod: Card) =>
        Dayjs(`${paymentMethod.expYear}-${paymentMethod.expMonth}`).diff(
          Dayjs(`${year}-${month}`),
          'month'
        ) > 1
    );

    if (hasValidPaymentMethod) {
      paymentMethods.forEach((paymentMethod: Card) => {
        index++;
        let itemIndex = index;
        const monthDiff = Dayjs(
          `${paymentMethod.expYear}-${paymentMethod.expMonth}`
        ).diff(Dayjs(`${year}-${month}`), 'month');

        if (paymentMethod.assigned && monthDiff <= 1) {
          let description = '';
          if (monthDiff === 1) {
            description = t('YourCardAboutToExpire', {
              number: paymentMethod.lastFourDigits,
            });
          } else {
            description = t('YourCardIsExpired', {
              number: paymentMethod.lastFourDigits,
            });
          }

          messagesArray.push({
            index: itemIndex,
            description,
            title: t('UpdateCard'),
            onClick: () => navigate('/my-postpay'),
            visible: true,
          });
        }
      });
    }

    setMessages([...messagesArray]);
  }, [paymentMethods, unpaidInstalmentPlansData, language]);

  return messages.length > 0 ? (
    <div>
      <Notifications items={messages} closeFn={clearMessage} />

      {editInstalmentPlan && (
        <PayInstalmentModal
          refetch={refresh}
          payType={PayType.PayInFull}
          closeModalFn={closeUpdatePaymentMethodModal}
          instalmentPlan={editInstalmentPlan}
          onPaymentSuccess={() => {
            clearMessage(messageIndex);
          }}
        />
      )}
    </div>
  ) : null;
};

export default NotificationsContainer;
