import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { FormGroup, FormLabel, FormError, FormGroupContainer } from '.';
import chevronDown from '@/assets/svgs/select-chevron.svg';
import { ISelectOption } from 'types/custom';

interface ISelectProps {
  onChange?: Function;
  options: Array<ISelectOption>;
  value: string | number;
  placeholder: string;
  label: string;
  error?: string | Array<string>;
  disabled?: boolean;
}

interface ISelectContainer {
  disabled?: boolean;
}

const SelectContainer = styled.div<ISelectContainer>`
  width: 100%;
  background-color: transparent;
  border-radius: 3px;
  padding: 0 12px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      ${SelectedValue} {
        color: #aaaaaa;
      }
    `}
`;

const SelectedOption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  margin-top: -7px;
  line-height: 50px;

  ${props =>
    props.theme.rtl &&
    css`
      margin-top: -13px;
    `}
`;

const SelectLabel = styled.div`
  color: #575756;
  font-family: var(--font-regular);
  opacity: 0.5;
`;

const SelectedValue = styled.div`
  color: #575756;
  font-family: var(--font-regular);
  opacity: 0.5;
`;

const DropdownContainer = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 100;
  transform: translateY(3px);
  background: white;
  border: 1px solid #d5d5d5;
  border-radius: 3px;
  overflow-y: auto;
  max-height: 200px;
  width: 100%;
`;

interface IChevronIconProps {
  flip: boolean;
}

const ChevronIcon = styled.img<IChevronIconProps>`
  width: 11px;
  transition: all 0.3s ease;
  opacity: 0.5;
  ${props => props.flip && `transform: rotate(180deg);`}
`;

interface IDropdownOptionProps {
  selected: boolean;
}

const DropdownOption = styled.div<IDropdownOptionProps>`
  font-family: var(--font-regular);
  cursor: pointer;
  padding: 8px 15px;
  border-bottom: 1px solid #d5d5d5;
  height: 100%;
  &:hover {
    background-color: #f8f8f8;
  }
  &:last-child {
    border-bottom: none;
  }
  ${props =>
    props.selected &&
    css`
      background-color: #f8f8f8;
    `}
`;

const Select: React.FC<ISelectProps> = ({
  onChange,
  options,
  value,
  placeholder,
  label,
  error,
  disabled,
}) => {
  const containerRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLInputElement
  >;
  const selectedOption = options.find(option => option.value === value);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('click', handleDocumentClick);
  }, []);

  function handleDocumentClick(e: MouseEvent) {
    if (
      containerRef.current &&
      containerRef.current!.contains(e.target as Node) === false
    ) {
      setShowDropdown(false);
    }
  }

  function toggleDropdown() {
    if (disabled) return;
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }

  function selectItem(item: ISelectOption) {
    if (onChange && !disabled) {
      onChange(item);
    }
    setShowDropdown(false);
  }

  return (
    <FormGroupContainer>
      <FormGroup error={!!error} disabled={disabled}>
        <FormLabel>{label}</FormLabel>
        <SelectContainer
          onClick={toggleDropdown}
          ref={containerRef}
          disabled={disabled}
        >
          <SelectedOption>
            {selectedOption ? (
              <SelectedValue>{selectedOption.label}</SelectedValue>
            ) : (
              <SelectLabel>{placeholder}</SelectLabel>
            )}
            {!disabled && <ChevronIcon src={chevronDown} flip={showDropdown} />}
          </SelectedOption>
        </SelectContainer>
        {showDropdown && (
          <DropdownContainer>
            {options.map(item => (
              <DropdownOption
                key={item.label}
                selected={
                  selectedOption && item.value === selectedOption.value
                    ? true
                    : false
                }
                onClick={() => selectItem(item)}
              >
                {item.label}
              </DropdownOption>
            ))}
          </DropdownContainer>
        )}
      </FormGroup>

      {error && <FormError error={error} />}
    </FormGroupContainer>
  );
};

export default Select;
