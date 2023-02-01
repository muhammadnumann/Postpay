import { FC, useState } from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

interface IProps {
  onChange: (name: string) => void;
}

const Tab: FC<IProps> = ({ onChange }) => {
  const [activeTab, setActiveTab] = useState('OnGoing');
  const { t } = useTranslation();
  const tabs = ['OnGoing', 'Completed', 'Cancelled'];
  return (
    <div className="flex items-center justify-between lg:mt-[30px] lg:mb-[34px] mb-[24px] capitalize">
      {tabs.map((tab) => {
        const active = tab === activeTab;
        return (
          <div
            key={tab}
            className={classnames(
              'text-center py-[16px] flex-grow cursor-pointer lg:text-[16px] text-[14px] text-[#4d4d4d] custom-font-medium rtl:custom-font-regular',
              {
                'border-solid border-b-[2px] border-b-[#3ebbd2] text-[#3ebbd2]':
                  active,
              }
            )}
            onClick={() => {
              onChange(tab);
              setActiveTab(tab);
            }}
          >
            {t(tab)}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
