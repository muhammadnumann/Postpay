import {
  FunctionComponent,
  ReactChild,
  ReactElement,
  memo,
  MouseEvent,
} from 'react';
import ReactDom from 'react-dom';
import crossIcon from '@/assets/images/icons/cross.webp';
import './modal.scss';
interface DashboardLayoutProps {
  children: ReactElement | ReactChild;
  className?: String;
  visible?: Boolean;
  handleClose?: MouseEvent<HTMLElement> | any;
}

const Modal: FunctionComponent<DashboardLayoutProps> = ({
  children,
  className,
  visible,
  handleClose = () => {},
}) => {
  if (!visible) {
    return null;
  }
  const modalRoot = document.getElementById('modal-root');
  return modalRoot ? (
    ReactDom.createPortal(
      <>
        <div
          className={`fixed top-0 left-0 bg-[rgba(0,0,0,.3)] h-screen w-screen overflow-y-scroll p-10 ${className} flex justify-center items-center z-30`}
        >
          <div className="p-5 bg-white rounded-xl">
            <div>
              <img
                className="h-[16px] ml-auto cursor-pointer"
                onClick={handleClose}
                src={crossIcon}
                alt="close"
              />
            </div>
            <div className="p-2 lg:p-5">{children}</div>
          </div>
        </div>
      </>,
      modalRoot
    )
  ) : (
    <div />
  );
};

export default memo(Modal);
