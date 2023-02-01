import { memo, FC, ReactNode, MouseEvent } from 'react';
import classname from 'classnames';
import { RiLoader2Line } from 'react-icons/ri';
interface IButton {
  children: ReactNode | React.ReactChild;
  onClick?: MouseEvent<HTMLElement> | any;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  id?: string;
  disabled?: boolean;
  outline?: boolean;
  isLoading?: boolean;
}

const buttonPrimary = 'w-[132px] px-4 rounded-full bg-[#3ebbd2] text-white';
const buttonOutline = 'text-[#3ebbd2] bg-transparent border-2 border-[#3ebbd2]';

const Button: FC<IButton> = ({
  children,
  className,
  type,
  id,
  disabled,
  onClick,
  outline,
  isLoading,
}) => {
  const classNames = classname(buttonPrimary, className, {
    [buttonOutline]: outline,
    'opacity-50 cursor-not-allowed': disabled,
  });
  return (
    <>
      <button
        className={`relative ${classNames}`}
        type={type}
        id={id}
        disabled={disabled}
        onClick={onClick}
      >
        {isLoading && (
          <div className="absolute mt-1">
            <RiLoader2Line className="cursor-pointer top-1 animate-spin" />
          </div>
        )}
        {children}
      </button>
    </>
  );
};

export default memo(Button);
