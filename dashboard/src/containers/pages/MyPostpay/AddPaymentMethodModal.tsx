import { validateEmptyForm } from '@/helpers/myProfile';
import { createPaymentToken } from '@/lib/payment';
import { CreateCardInput } from '@/types/global';
import { useContext, useState } from 'react';
import { Button, Modal, Input } from '@/components/common';
import createPaymentMethodQuery from '@/queries/createPaymentMethod.graphql';
import { useMutation } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { CustomerContext } from '@/contexts/Customer';
import { DashboardContext } from '@/contexts/DashboardContext';
import ErrorMessage from '@/components/common/form/ErrorMessage';

export interface CreateCardFormValues {
  name?: string;
  number?: string;
  expDate?: string;
  cvc?: string;
  [key: string]: any;
}

const cardMask = [
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  '-',
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  '-',
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  '-',
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
  ' ',
  /\d/,
];

const expMask = [/\d/, ' ', /\d/, ' ', '/', ' ', /\d/, ' ', /\d/];

const cvcMask = [/\d/, ' ', /\d/, ' ', /\d/];

interface IProps {
  handleClose: Function;
  onAddCardSuccess?: Function;
}

const AddPaymentMethodModal: React.FC<IProps> = ({
  handleClose,
  onAddCardSuccess,
}) => {
  const { t } = useTranslation();
  const [addCardLoading, setAddCardLoading] = useState(false);
  const [errorForm, setErrorForm] = useState<any>({});
  const [formValues, setFormValues] = useState<CreateCardFormValues>({
    number: '',
    expDate: '',
    cvc: '',
  });
  const [error, setError] = useState('');
  const { addPaymentMethod, customer } = useContext(CustomerContext);
  const { currency } = useContext(DashboardContext);
  const [createPaymentMethodMutation] = useMutation(createPaymentMethodQuery);

  const handleChangeFormValue = (e) => {
    const { value, name } = e.target;
    setErrorForm({ ...errorForm, [name]: '' });
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmitAddCard = async () => {
    setErrorForm({});
    const [isError, errorObj] = validateEmptyForm(
      formValues,
      ['number', 'expDate', 'cvc'],
      t
    );
    if (isError) {
      return setErrorForm(errorObj);
    }
    setError('');
    setAddCardLoading(true);
    const number = formValues.number!.replace(/\s/g, '').split('-').join('');
    const expArray = formValues.expDate!.replace(/\s/g, '').split('/');
    const cvc = formValues.cvc!.replace(/\s/g, '');
    const data: CreateCardInput = {
      number,
      exp_month: Number(expArray[0]),
      exp_year: Number('20' + expArray[1]),
      cvc,
      name: customer.firstName + ' ' + customer.lastName,
    };
    let token = '';
    try {
      const response = await createPaymentToken(data, currency);
      if (response) token = response.token;
    } catch (error: any) {
      const err = error.response.data;
      const errorSubmit: any = {};
      if (err.exp_month) {
        errorSubmit.expDate = err.exp_month[0];
      }
      if (err.exp_year) {
        errorSubmit.expYear = err.exp_year[0];
      }
      if (err.number) {
        errorSubmit.number = err.number[0];
      }
      if (err._schema && err._schema.length > 0) {
        setError(err._schema[0]);
      }
      setErrorForm(errorSubmit);
      return;
    } finally {
      setAddCardLoading(false);
    }
    try {
      const result = await createPaymentMethodMutation({
        variables: {
          input: {
            token,
            type: 'card',
          },
        },
      });
      if (result) {
        const card = result.data.createPaymentMethod.paymentMethod;
        addPaymentMethod(card);
        if (onAddCardSuccess) {
          onAddCardSuccess(card, cvc);
        }
        handleClose();
      }
    } catch (error) {
      console.log(error);
      setError(t('PaymentMethodDeclided'));
    } finally {
      setAddCardLoading(false);
    }

  };

  return (
    <Modal visible handleClose={handleClose}>
      <div className="lg:p-3 p-0 lG:w-[400px] max-w-[400px]">
        <p className="text-[#4d4d4d] lg:text-[20px] text-[16px] -mb-2">
          {t('InputCard')}
        </p>
        <Input
          isMasking
          placeholder={t('CardNumber')}
          placeholderChar={'\u2000'}
          value={formValues.number}
          name="number"
          mask={cardMask}
          onChange={handleChangeFormValue}
        />
        {errorForm?.number && (
          <div className="mt-1 text-sm text-red-600">{errorForm?.number}</div>
        )}

        <div className="flex mt-4 lg:gap-[50px] flex-col lg:flex-row">
          <div className="flex-1">
            <p className="text-[#4d4d4d] lg:text-[20px] text-[16px]">
              {t('ExpiryDate')}
            </p>
            <Input
              isMasking
              placeholder="MM/YY"
              placeholderChar={'\u2000'}
              value={formValues.expDate}
              name="expDate"
              mask={expMask}
              onChange={handleChangeFormValue}
            />
            {errorForm?.expDate && (
              <div className="mt-1 text-sm text-red-600">
                {errorForm?.expDate}
              </div>
            )}
            {errorForm?.expYear && (
              <div className="mt-1 text-sm text-red-600">
                {errorForm?.expYear}
              </div>
            )}
          </div>
          <div className="flex-1 mt-6 lg:mt-0">
            <p className="text-[#4d4d4d] lg:text-[20px] text-[16px]">
              {t('CVC')}
            </p>
            <Input
              isMasking
              placeholder={t('CVC')}
              placeholderChar={'\u2000'}
              name="cvc"
              value={formValues.cvc}
              mask={cvcMask}
              onChange={handleChangeFormValue}
            />
            {errorForm?.cvc && (
              <div className="mt-1 text-sm text-red-600">{errorForm?.cvc}</div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-between mt-8">
          <Button
            className="!w-full lg:!w-40"
            disabled={addCardLoading}
            onClick={handleClose}
            type="button"
            outline
          >
            {t('Cancel')}
          </Button>
          <Button
            className="!w-full lg:!w-40 mt-2 lg:mt-0"
            disabled={addCardLoading}
            isLoading={addCardLoading}
            onClick={handleSubmitAddCard}
            type="button"
          >
            {t('Add')}
          </Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      </div>
    </Modal>
  );
};

export default AddPaymentMethodModal;
