import React, { useState, useRef, useEffect, memo } from "react";
import styled, { css } from "styled-components";
import { FormGroup, FormLabel, FormError, FormGroupContainer } from ".";
import chevronDown from "../../static/svgs/benefits/dropdown-merchant.svg";

interface ISelectProps {
  onChange: Function;
  options: Array<ISelectOption>;
  value: string | number;
  placeholder: string;
  label: string;
  error?: string | Array<string>;
  icon?: string;
  iconHeight?: number;
  iconWidth?: number;
}

interface ISelectOption {
  label: string;
  value: string;
}

const SelectContainer = styled.div`
  width: 100%;
  background-color: transparent;
  border-radius: 3px;
  padding: 3px 10px 0 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.4rem;
`;

const SelectedOption = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const IconInput = styled.img`
  display: block;
`;

const IconInputContainer = styled.div`
  padding-right: 10px;
  justify-content: center;
  display: flex;
  ${(props) =>
    props.theme.rtl &&
    css`
      padding-right: 5px;
      padding-left: 10px;
    `}
`;

const SelectLabel = styled.div`
  color: #9b9b9b;
  font-size: 1.4rem;
  font-family: var(--font-light);
  text-align: ${(props) => (props.theme.rtl ? "right" : "left")};
`;

const DropdownContainer = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 100;
  transform: translateY(8px);
  background: white;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  overflow: auto;
  max-height: 200px;
  width: 100%;
`;

interface IChevronIconProps {
  flip: boolean;
}

const ChevronIcon = styled.img<IChevronIconProps>`
  transition: all 0.3s ease;
  ${(props) => props.flip && `transform: rotate(180deg);`}
`;

interface IDropdownOptionProps {
  selected: boolean;
}

const DropdownOption = styled.div<IDropdownOptionProps>`
  cursor: pointer;
  padding: 8px 15px;
  border-bottom: 1px solid #d5d5d5;
  height: 43px;

  &:hover {
    background-color: #f8f8f8;
  }

  &:last-child {
    border-bottom: none;
  }

  ${(props) =>
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
  icon,
  iconHeight,
  iconWidth,
  label,
  error,
}) => {
  const containerRef = useRef(null);
  const selectedOption = options.find((option) => option.value === value);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  function handleDocumentClick(e: MouseEvent) {
    if (
      containerRef.current &&
      containerRef.current.contains(e.target) === false
    ) {
      setShowDropdown(false);
    }
  }

  function toggleDropdown() {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }

  function selectItem(item) {
    onChange(item);
    setShowDropdown(false);
  }

  return (
    <FormGroupContainer>
      <FormGroup error={!!error}>
        <SelectContainer
          tabIndex={0}
          onClick={toggleDropdown}
          ref={containerRef}
        >
          {icon && (
            <IconInputContainer>
              <IconInput src={icon} height={iconHeight} width={iconWidth} />
            </IconInputContainer>
          )}
          <SelectedOption>
            {selectedOption ? (
              <SelectLabel>{selectedOption.label}</SelectLabel>
            ) : (
              <SelectLabel>{placeholder}</SelectLabel>
            )}
            <ChevronIcon
              src={chevronDown}
              flip={showDropdown}
              alt="show dropdown"
            />
          </SelectedOption>
        </SelectContainer>
        {showDropdown && (
          <DropdownContainer>
            {options.map((item) => (
              <DropdownOption
                key={item.label}
                selected={selectedOption && item.value === selectedOption.value}
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

export default memo(Select);
