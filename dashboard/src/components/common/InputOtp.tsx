import { memo } from 'react';
import OtpInput from 'react-otp-input';

interface IInputOtp {
  field?: any;
  PrefixInput?: any,
  numInputs?: number
  disabled?: boolean
}

const InputOtp: React.FC<IInputOtp> = ({field, disabled, PrefixInput,numInputs, ...rest} : any) => {

  const handleChange = (e) => {
    rest?.form?.setFieldValue(field.name, e)
  }
  return <div className='w-full border-t border-b p-[15px] flex items-center'>
    <PrefixInput/>
    <OtpInput
      className='text-[35px]'
      focusStyle="border-none outline-none"
      separator={<span className=' text-[#aaaaaa] mx-[15px] w-[8px] h-[1px] mt-[5px] bg-[#707070]'></span>}
      numInputs={numInputs}
      {...rest}
      value={field.value}
      onChange={handleChange}
      isDisabled={disabled}
      shouldAutoFocus
      isInputNum
      type="number"
    />
  </div>
};

export default memo(InputOtp);
