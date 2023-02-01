import React, { ChangeEvent, memo } from "react";
import { FormGroupContainer, FormGroup, FormLabel, FormError } from ".";
import dropIcon from "../../static/svgs/landing/drop-down.svg";
import styled, { css } from "styled-components";
import { BORDER_ROUND, BORDER_ROUND_RADIUS } from "../../constants/constants";

interface IOptions {
  value: string;
  label: string;
}

interface IInputProps {
  id?: string;
  name?: string;
  icon?: string;
  iconHeight?: number;
  iconWidth?: number;
  type?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  disabled?: boolean;
  label: string;
  error?: string | Array<string>;
  prefix?: string;
  autocomplete?: string;
  borderType?: number;
  options?: Array<IOptions>;
  onChangeOption?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

interface IInputWrapper {
  borderType: number;
}

const InputWrapper = styled.div<IInputWrapper>`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  padding: 0 10px 0 0;

  ${(props) =>
    props.borderType === BORDER_ROUND_RADIUS &&
    css`
      padding-left: 15px;
    `}

  ${(props) =>
    props.borderType === BORDER_ROUND &&
    css`
      padding-left: 15px;
    `}
`;

const InputPrefix = styled.span`
  color: #000000;
  font-size: 1.4rem;
`;

const IconInput = styled.img`
  display: block;
`;

const IconInputContainer = styled.div`
  padding-right: 10px;
  display: flex;
  justify-content: center;
  ${(props) =>
    props.theme.rtl &&
    css`
      padding-right: 5px;
      padding-left: 10px;
    `}
`;

const InputSelect = styled.select`
  border: none;
  font-family: var(--font-regular);
  font-size: 1.4rem;
  color: #9b9b9b;
  background: white;
  -webkit-appearance: none;
  padding-right: 10px;
`;

const DropDownIcon = styled.img`
  height: 6px;
  width: 6px;
  margin-left: -5px;
  margin-right: 10px;
`;

const InputControl = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: transparent;
  background: transparent;
  font-size: 1.4rem;
  font-family: var(--font-regular);
  color: #000000;

  ${(props) =>
    props.theme.rtl &&
    css`
      font-family: var(--font-light);
    `}
  ::placeholder,
  ::-webkit-input-placeholder {
    font-family: var(--font-light);
    color: #9b9b9b;
  }

  :focus {
    outline: 0 none;
  }

  :-ms-input-placeholder {
    color: #9b9b9b;
  }
`;

const Input: React.FC<IInputProps> = ({
  id,
  name,
  icon,
  iconHeight,
  iconWidth,
  type,
  onChange,
  value,
  placeholder,
  disabled,
  label,
  error,
  prefix,
  autocomplete,
  borderType,
  options,
  onChangeOption,
}) => (
  <FormGroupContainer>
    <FormGroup
      error={!!error}
      disabled={disabled}
      borderType={borderType}
      className="form-group"
    >
      {/*<FormLabel>{label}</FormLabel>*/}
      <InputWrapper borderType={borderType}>
        {icon && (
          <IconInputContainer className="icon-input-container">
            <IconInput src={icon} height={iconHeight} width={iconWidth} />
          </IconInputContainer>
        )}
        {options.length > 0 && (
          <InputSelect onChange={onChangeOption} className="input-select">
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </InputSelect>
        )}
        {options.length > 0 && (
          <DropDownIcon src={dropIcon} className="dropdown-icon" />
        )}
        {prefix && <InputPrefix>{prefix}</InputPrefix>}
        <InputControl
          id={id}
          name={name}
          type={type}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autocomplete}
        />
      </InputWrapper>
    </FormGroup>
    {error && <FormError error={error} />}
  </FormGroupContainer>
);

Input.defaultProps = {
  options: [],
};

export default memo(Input);
