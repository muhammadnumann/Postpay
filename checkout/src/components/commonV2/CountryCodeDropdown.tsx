import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import chevronDown from '@/assets/svgs/dropdown-caret.svg';

interface ICountryCodeDropdownProps {
  onChange?: Function;
  codes: Array<string>;
  value: string | number;
  disabled?: boolean;
}

interface ISelectContainer {
  disabled?: boolean;
}

const Container = styled.div`
  position: relative;
`;

const Wrapper = styled.div``;

const SelectContainer = styled.div<ISelectContainer>`
  width: 100%;
  background-color: transparent;
  border-radius: 3px;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;

  ${props =>
    props.disabled &&
    css`
      ${SelectedValue} {
        cursor: not-allowed;
      }
    `}
`;

const SelectedOption = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: GreycliffCF-Regular;

  ${props =>
    props.theme.rtl &&
    css`
      flex-direction: row-reverse;
    `}
`;

const SelectedValue = styled.div`
  color: #000000;
  font-family: GreycliffCF-Regular;
  font-size: 24px;
  margin-right: 5px;
  letter-spacing: 4px;
  padding: 0 7px;
  direction: ltr;

  ${props =>
    props.theme.rtl &&
    css`
      margin-right: 0;
      margin-left: 7px;
    `}
`;

const DropdownContainer = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  z-index: 100;
  transform: translateY(11px);
  background: white;
  border-radius: 3px;
  overflow-y: auto;
  max-height: 200px;
  width: 78px;
`;

interface IChevronIconProps {
  flip: boolean;
}

const ChevronIcon = styled.img<IChevronIconProps>`
  width: 8.4px;
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
  padding: 8px 0;
  height: 100%;

  &:hover {
    background-color: #f8f8f8;
  }

  &:last-child {
    border-bottom: 1px solid #aaaaaa;
  }

  ${props =>
    props.selected &&
    css`
      background-color: #f8f8f8;
    `}
`;

const CountryCodeDropdown: React.FC<ICountryCodeDropdownProps> = ({
  onChange,
  codes,
  value,
  disabled,
}) => {
  const containerRef = useRef<HTMLElement>() as React.MutableRefObject<
    HTMLInputElement
  >;
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

  function selectItem(item: string) {
    if (onChange && !disabled) {
      onChange(item);
    }
    setShowDropdown(false);
  }

  return (
    <Container>
      <Wrapper>
        <SelectContainer
          onClick={toggleDropdown}
          ref={containerRef}
          disabled={disabled}
        >
          <SelectedOption>
            <SelectedValue>{value}</SelectedValue>
            {!disabled && <ChevronIcon src={chevronDown} flip={showDropdown} />}
          </SelectedOption>
        </SelectContainer>
        {showDropdown && (
          <DropdownContainer>
            {codes
              .filter(code => code !== value)
              .map(code => (
                <DropdownOption
                  key={code}
                  selected={code === value}
                  onClick={() => selectItem(code)}
                >
                  <SelectedValue>{code}</SelectedValue>
                </DropdownOption>
              ))}
          </DropdownContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default CountryCodeDropdown;
