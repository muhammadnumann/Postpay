import { Portal } from 'react-portal';
import cx from 'classnames';
import cardIcon from '@/assets/images/idCardIcon.webp';
import closeIcon from '@/assets/images/close-modal.svg';
interface INotification {
  index: number;
  title: string;
  description: string;
  onClick: Function;
  visible: boolean;
}

interface IProps {
  items: Array<INotification>;
  closeFn: Function;
}

const Notifications: React.FC<IProps> = ({ items, closeFn }) => (
  <Portal>
    <div className="absolute top-[154px] right-[103px] h-fit overflow-y-auto z-1">
      {items.map((item, index) => (
        <div
          className={cx(
            'relative w-[452px] px-[23px] py-[15px] rounded-[10px] bg-[#f2f2f2] mb-[30px] last:mb-0 transition opacity-100',
            { hidden: !item.visible }
          )}
          key={index}
        >
          <img
            src={closeIcon}
            className="w-[13px] absolute top-[15px] right-[15px] cursor-pointer"
            onClick={() => closeFn(item.index)}
          />
          <div
            className="flex items-center gap-[24px] text-[#000000] cursor-pointer"
            onClick={() => item.onClick(index)}
          >
            <img src={cardIcon} width="31.9" />
            <div>
              <div className="custom-font-demi-bold text-[18px] mb-[5px]">
                {item.title}
              </div>
              <div className="custom-font-regular">{item.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Portal>
);

export default Notifications;
