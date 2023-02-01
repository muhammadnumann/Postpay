import {
  FunctionComponent,
  memo,
  MouseEvent,
  useState,
  useContext,
} from 'react';
import { PaymentCard, Modal, Button } from '@/components/common';
import { useMutation } from '@apollo/react-hooks';
import plusIcon from '@/assets/images/icons/plusCircle.webp';
import { CustomerContext } from '@/contexts/Customer';
import deletePaymentMethodQuery from '@/queries/deletePaymentMethod.graphql';
import EditProfile from '@/queries/editProfile.graphql';
import { PaymentMethod } from '@/graphql/index';
import { useTranslation } from 'react-i18next';
import useApplePay from '@/hooks/useApplePay';
import { DashboardContext } from '@/contexts/DashboardContext';

interface PaymentMethodProps {
  handleAddCard?: MouseEvent<HTMLElement> | any;
  cards?: Array<PaymentMethod>;
}

const PaymentMethodComponent: FunctionComponent<PaymentMethodProps> = ({
  handleAddCard,
  cards,
}) => {
  const {
    removePaymentMethod,
    customer,
    setDefaultCardId,
    defaultCardId,
    addPaymentMethod,
  } = useContext(CustomerContext);
  const { currency } = useContext(DashboardContext);
  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<any>({});
  const [deletePaymentMethodMutation] = useMutation(deletePaymentMethodQuery);
  const [editProfileMutation] = useMutation(EditProfile);
  const [isSetDefault, setIsDefault] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { isApplePayAvailable, setupApplePay } = useApplePay();
  const [applePayError, setApplePayError] = useState('');

  const [t] = useTranslation();
  const handleDelete = (card) => {
    setPaymentMethod(card);
    setVisible(true);
  };

  const setDefault = (card) => {
    setPaymentMethod(card);
    setVisible(true);
    setIsDefault(true);
  };

  const handleClose = () => {
    setVisible(false);
    setIsDefault(false);
    setErrorMessage('');
  };

  const handleDeleteCard = async () => {
    setIsLoading(true);
    try {
      const result = await deletePaymentMethodMutation({
        variables: {
          input: {
            paymentMethodId: paymentMethod.id,
          },
        },
      });
      removePaymentMethod(paymentMethod.id);
      setIsLoading(false);
      setVisible(false);
    } catch (error: any) {
      if (error?.networkError) {
        const err = error?.networkError?.result[0]?.errors[0]?.message;
        setErrorMessage(err);
      } else if (error.graphQLErrors && error.graphQLErrors[0]) {
        setErrorMessage(error.graphQLErrors[0].message);
      } else {
        setErrorMessage('Something happen please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDefaultCard = async () => {
    const { dateOfBirth, email, firstName, lastName, language, ...rest }: any =
      customer;

    try {
      setIsLoading(true);
      setErrorMessage('');
      await editProfileMutation({
        variables: {
          input: {
            dateOfBirth,
            email,
            firstName,
            lastName,
            language,
            defaultPaymentMethodId: paymentMethod.id,
          },
        },
      });
      setDefaultCardId(paymentMethod.id);
      setVisible(false);
    } catch (error: any) {
      if (error?.networkError) {
        const err = error?.networkError?.result[0]?.errors[0]?.message;
        setErrorMessage(err);
      } else if (error.graphQLErrors && error.graphQLErrors[0]) {
        setErrorMessage(error.graphQLErrors[0].message);
      } else {
        setErrorMessage('Something happen please try again');
      }
    } finally {
      setIsLoading(false);
      setIsDefault(false);
    }
  };

  return (
    <>
      <div>
        <div className="text-[18px] md:text-[20px] font-extrabold py-[6px]">
          {t('ManagePaymentMethod')}
        </div>
        <div className="lg:h-[300px] overflow-auto">
          <PaymentCard
            handleDelete={handleDelete}
            cards={cards}
            setDefault={setDefault}
            defaultCardId={defaultCardId}
          />
        </div>
        <div
          className="flex items-center justify-between py-[15px] border-t border-b cursor-pointer"
          onClick={handleAddCard}
          role="presentation"
        >
          <div className="text-[18px] text-[#aaaaaa]">
            {t('AddNewCCDebitCard')}
          </div>
          <img className="h-[23px]" src={plusIcon} alt="plus" />
        </div>
      </div>
      <Modal visible={visible} handleClose={handleClose}>
        <div className="lg:w-[400px] max-w-[400p]">
          <p className="text-[#4d4d4d] lg:text-[20px] text-[16px]">
            {isSetDefault
              ? t('ConfirmSetAsDefault', {
                  number: paymentMethod?.lastFourDigits,
                })
              : t('ConfirmDelete', { number: paymentMethod?.lastFourDigits })}
          </p>
          <p className="text-red-500">{errorMessage}</p>
          <div className="flex flex-wrap justify-between mt-10">
            <Button
              className="!w-full lg:!w-40"
              onClick={handleClose}
              disabled={isLoading}
              type="button"
              outline
            >
              {t('Cancel')}
            </Button>
            <Button
              className="!w-full lg:!w-40 mt-2 lg:mt-0"
              isLoading={isLoading}
              disabled={isLoading}
              onClick={isSetDefault ? handleDefaultCard : handleDeleteCard}
              type="button"
            >
              {isSetDefault && !isLoading
                ? t('SetAsDefault')
                : isLoading
                ? t('Saving..')
                : t('Delete')}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default memo(PaymentMethodComponent);
