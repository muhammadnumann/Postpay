import { FunctionComponent, useState, useRef, useEffect, ReactElement, Children } from 'react'
import { useTranslation } from 'react-i18next';
interface ISelect {
  options?: any[],
  handleSelect?: Function,
  children?: ReactElement,
  labelKey?: string,
  idKey?: string,
  className?: string
}
 
const Select: FunctionComponent<ISelect> = ({ options, handleSelect, labelKey = 'name', idKey = 'name', children, className }) => {
  const container = useRef<any>(null);
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!container?.current?.contains(event.target)) {
        if (!show) return;
        setShow(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [show, container]);
  const handleSelectOption = (e, opt) => {
    e.stopPropagation();
    setShow(false)
    handleSelect(opt)
  }
  return ( 
    <div ref={container} className={`relative flex ${className}`} onClick={() => setShow(true)}>
        {children}
        {
          show && (
            <div className='absolute right-0 transition duration-100 ease-out transform top-7 z-10'>
              <div className="py-2 origin-top-right bg-white rounded shadow-md w-18">
                {
                  options.map((el:any) => (
                  <span key={el[idKey]} onClick={(e) => handleSelectOption(e, el)} className='block px-4 hover:bg-gray-200 hover:text-gray-800 text-[18px] cursor-pointer'>
                    {t(el[labelKey])}
                  </span>
                  ))
                }
              </div>
            </div>

          )
        }
    </div>
  );
}
 
export default Select;