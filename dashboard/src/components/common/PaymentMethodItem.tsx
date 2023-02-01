import { PaymentMethod } from '@/graphql/index';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BsCheckCircle } from 'react-icons/bs';
import cx from 'classnames';
import CardLogo from './CardLogo';
import Radio from './form/Radio';
import CardInfo from './CardInfo';

interface IProps {
  paymentMethod: PaymentMethod;
  handleSelect?: Function;
  isSelected?: boolean;
  handleDelete?: Function;
  requireCvc?: boolean;
  setDefault?: Function;
  isDefault?: boolean;
  first?: boolean;
  setCvc?: Function;
}

const PaymentMethodItem: FC<IProps> = ({
  paymentMethod,
  handleSelect,
  isSelected,
  handleDelete,
  requireCvc,
  setDefault,
  isDefault,
  first,
  setCvc,
}) => {
  const [cvc, changeCvc] = useState('');
  const { t } = useTranslation();
  return (
    <div className="pb-[5px] pt-[4px]">
      <div className="flex items-center flex-start gap-[5px] ">
        {handleSelect && (
          <div className="flex">
            <Radio
              name={'select-card' + paymentMethod.id}
              label=""
              checked={isSelected}
              onChange={() => {
                if (setCvc) {
                  setCvc('');
                }
                changeCvc('');
                handleSelect(paymentMethod, '');
              }}
            />
          </div>
        )}
        <div className={cx('flex flex-1 pt-0 gap-[22px]')}>
          <CardInfo card={paymentMethod} className="flex-1" />

          <div className="flex flex-col items-end justify-between">
            {setDefault && !isDefault && (
              <div
                role="presentation"
                onClick={() => setDefault(paymentMethod)}
                className="text-[16px] text-[#60bb9e] cursor-pointer float-right"
              >
                {t('SetAsDefault')}
              </div>
            )}
            {setDefault && isDefault && (
              <div className="flex items-center justify-between text-[16px] text-[#60bb9e] float-right gap-2">
                {t('Default')}
                <BsCheckCircle className="text-[#60bb9e]" />
              </div>
            )}
            {handleDelete && !paymentMethod.assigned && !isDefault && (
              <div
                role="presentation"
                onClick={() => handleDelete(paymentMethod)}
                className="text-[16px] text-[#d2554b] cursor-pointer"
              >
                {t('Delete')}
              </div>
            )}
          </div>
        </div>
      </div>
      {requireCvc && isSelected && (
        <div className="flex align-top gap-[8px] pl-[26px] pt-[10px] rtl:pl-0 rtl:pr-[26px]">
          <div className="custom-font-medium rtl:custom-font-regular text-[16px] text-[#252524]">
            CVC
          </div>
          <input
            onChange={(e) => {
              if (setCvc) {
                setCvc(e.target.value);
              }
              changeCvc(e.target.value);
            }}
            className="border-0 border-b-[1px] border-b-[#aaaaaa] p-0 custom-font-light text-[#252524] w-[50px] h-[30px]"
            autoFocus
            type="number"
          />
        </div>
      )}
    </div>
  );
};

export default PaymentMethodItem;
