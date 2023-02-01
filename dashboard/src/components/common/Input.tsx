import { FunctionComponent, FormEvent, useState, useRef, useEffect, ReactElement } from 'react'
import { AiFillCaretDown } from 'react-icons/ai'
import phoneIcon from '@/assets/images/phoneIcon.webp'
import MaskedInput from 'react-text-mask'
interface InputProps {
  type?: string
  input?: object
  onChange?: FormEvent<HTMLInputElement> | any
  placeholder?: string
  label?: string
  value?: string | number
  name?: string
  id?: string
  field?: object
  hasPrefix?: boolean
  prefix?: ReactElement
  listprefix?: Object[]
  prefixValue?: any
  handleChangePrefix?: Function
  mask?: Array<string | RegExp>;
  isMasking?: boolean,
  placeholderChar?: string | any
  prefixDisabled?: boolean
  disabled?: boolean
  autoComplete?: string
  customPlaceholder?: ReactElement
  hasCustomPlaceholder?: boolean
  onKeyDown?: FormEvent<HTMLInputElement> | any
  dir?: string
}
 
const Input: FunctionComponent<InputProps> = ({ 
  type, 
  onChange, 
  input, 
  placeholder, 
  label, 
  value, 
  name, 
  id = '', 
  field,
  hasPrefix, 
  prefix,  
  listprefix = [], 
  prefixValue,
  handleChangePrefix = () => {},
  isMasking,
  mask,
  placeholderChar,
  prefixDisabled,
  disabled,
  autoComplete,
  customPlaceholder,
  hasCustomPlaceholder,
  onKeyDown,
  dir
}) => {
  const [show, setShow] = useState(false);
  const container = useRef<any>(null);
  const inputRef = useRef<any>(null);

  const handleFocus = () => {
    const input = document.getElementById(id)
    if (input) {
      input.focus()
    }
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!container?.current?.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };

    inputRef?.current?.focus()
    handleFocus()
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [show, container, inputRef]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (!show) return;

      if (event.key === 'Escape') {
        setShow(false);
      }
    };

    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [show]);
  
  const handleClickPrefix = (selectedPrefix: any) => {
    handleChangePrefix(selectedPrefix)
    setShow(false)
  }
  return ( 
    <>
      <label htmlFor="website-admin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</label>
      <div className={`flex border-b-[2px] border-[#dfdfdf] input-common ${disabled ? 'bg-slate-50 cursor-not-allowed' : '' }`} dir={dir}>
        {
          hasPrefix ? !prefix ? (
            <div ref={container} className='relative flex'>
              <img src={phoneIcon} alt='phone-icon' className="w-[15px] h-6 mt-[14px]" />
              <button disabled={prefixDisabled} className="inline-flex items-center px-2 space-x-3 text-sm text-gray-900 lg:px-3" type="button" onClick={() => setShow(!show)}>
                <span className='text-[18px] lg:text-[16px]'>
                {prefixValue?.name}
                </span>
                {!prefixDisabled && <AiFillCaretDown color='#aaaaaa' />}
              </button>
              {
                show && (
                  <div className='absolute z-10 transition duration-100 ease-out transform left-3 top-9'>
                    <div className="px-3 py-2 origin-top-right bg-white rounded shadow-md w-18">
                      {
                        listprefix.map((el:any) => (
                        <span key={el?.name} onClick={() => handleClickPrefix(el)} className='block px-2 hover:bg-gray-200 hover:text-gray-800 text-[18px] lg:text-[20px] cursor-pointer'>
                          {el?.name}
                        </span>
                        ))
                      }
                    </div>
                  </div>

                )
              }
            </div>

          ) : (
           <>{ prefix }</> 
          ) : null
        }

        {
          isMasking ? (
            <MaskedInput
              type={type} 
              onChange={onChange}
              onKeyDown={onKeyDown}
              {...field}
              {...input} 
              id={id} 
              className="border-0 focus:outline-none hover:outline-none active:outline-none text-gray-900 block flex-1 min-w-0 w-full p-2.5 text-[18px] lg:text-[17px] disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed" 
              placeholder={placeholder} 
              value={value}
              name={name}
              mask={mask}
              placeholderChar={placeholderChar}
              disabled={disabled}
              autoComplete={autoComplete}
            />
          ) : (
            <input 
              type={type} 
              onChange={onChange}
              onKeyDown={onKeyDown}
              {...field}
              {...input} 
              id={id} 
              className="border-0 focus:outline-none hover:outline-none active:outline-none text-gray-900 block flex-1 min-w-0 w-full p-2.5 text-[18px] lg:text-[17px] disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none disabled:cursor-not-allowed" 
              placeholder={placeholder} 
              ref={inputRef}
              value={value}
              name={name}
              disabled={disabled}
              autoComplete={autoComplete}
            />
          )
        }
        {
          hasCustomPlaceholder && customPlaceholder
        }
        
      </div>
    </>
  );
}
 
export default Input;