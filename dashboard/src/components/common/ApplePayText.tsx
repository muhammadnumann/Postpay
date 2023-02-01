import { Trans } from 'react-i18next';
import applePayIcon from '@/assets/images/apple-pay-white.svg';

interface IProps {
  i18nKey: string;
}

const ApplePayText: React.FC<IProps> = ({ i18nKey }) => (
  <Trans
    i18nKey={i18nKey}
    components={[<img src={applePayIcon} width={12} className="inline-block mb-[5px]" />]}
  />
);

export default ApplePayText;
