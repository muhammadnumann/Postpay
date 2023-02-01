import { Portal } from 'react-portal';
import closeModalSvg from '@/assets/images/close-modal.svg';
import { useEffect } from 'react';

interface IProps {
  title?: string;
  closeModal?: Function;
  hideCloseButton?: boolean;
  width?: number;
  children: React.ReactChildren | React.ReactNode;
  show?: boolean;
}

const Modal: React.FC<IProps> = ({
  title,
  closeModal,
  width,
  children,
  hideCloseButton,
}) => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <Portal>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-100">
        <div
          className="bg-[#000000] opacity-30 absolute top-0 left-0 right-0 bottom-0"
          onClick={() => closeModal()}
        />
        <div
          className={`absolute bottom-0 lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 p-[22.5px] bg-white md:w-[500px] h-fit lg:mb-0 sm:bottom-0 w-full md:rounded-[10px] rounded-[5px] rounded-b-none`}
        >
          <div className="relative z-50">
            <div
              className="flex justify-between items-center cursor-pointer md:pb-[10px]"
              onClick={() => closeModal()}
            >
              <div className="text-[25px]">{title}</div>
              {!hideCloseButton && (
                <img
                  className="hidden cursor-pointer lg:block"
                  src={closeModalSvg}
                  width={12.5}
                  height={12.5}
                />
              )}
            </div>
            <div className="mt-[8px]">{children}</div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

Modal.defaultProps = {
  width: 600,
};

export default Modal;
