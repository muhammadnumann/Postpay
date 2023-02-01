import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import range from 'lodash/range';
import { Maybe } from '@/graphql';
import { SCREENSIZES } from '@/constants/styles';
import { formatNumber } from '@/helpers/helpers';

interface IProps {
  onChange?: Function;
  onComplete: Function;
  length: number;
  className?: string;
  handleFocus?: Function;
  code?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;

  ${SCREENSIZES.mobile} {
    padding: 0 4px;
  }
`;

interface ISingleCodeInput {
  isActive: boolean;
}

const SingleCodeInput = styled.div<ISingleCodeInput>`
  width: 56px;
  height: 56px;
  border-radius: 1px;
  line-height: 56px;
  text-align: center;
  background: none;
  border: 1px solid lightgray;
  font-family: var(--font-regular);

  ${props =>
    props.isActive &&
    css`
      outline: 1px auto rgb(77, 144, 254);
      box-shadow: 0px 0px 5px rgb(77, 144, 254);
    `}

  ${SCREENSIZES.mobile} {
    width: 56px;
    height: 56px;
    line-height: 56px;
  }
`;

const HiddenOptInput = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
`;

const StaticLineContainer = styled.div`
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #c4c4c4;

  ${SCREENSIZES.mobile} {
    width: 15px;
    height: 56px;
  }
`;

const ConfirmCodeInput: React.FC<IProps> = ({
  code,
  onChange,
  onComplete,
  length,
  className,
  handleFocus,
}) => {
  const containerRef = useRef<HTMLElement>(null) as React.MutableRefObject<
    HTMLDivElement
  >;
  const inputRef = useRef<HTMLElement>(null) as React.MutableRefObject<
    HTMLInputElement
  >;
  const [values, setValues] = useState<Array<string>>(['', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showTextInputs, setShowTextInputs] = useState(true);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }

    if (code) {
      const codeArray = code.split('');
      setValues(codeArray);
      onComplete(code);
    }

    if (handleFocus) {
      handleFocus(() => {
        setShowTextInputs(false);
        setValues(['', '', '', '']);
        setTimeout(() => {
          setShowTextInputs(true);
          inputRef.current.focus();
          setActiveIndex(0);
        }, 30);
      });
    }
  }, []);

  function onInputChange(e: React.KeyboardEvent) {
    if (/^[0-9\b]+$/.test(e.key) === false) {
      e.preventDefault();
      return false;
    }

    const value = e.key;
    const number = formatNumber(value);
    values[activeIndex] = number;
    setValues([...values]);

    if (number !== '' && isNaN(Number(number)) === false) {
      if (activeIndex === length - 1) {
        const result = values.join('');
        onComplete(result);
      } else {
        setTimeout(() => {
          setActiveIndex(activeIndex + 1);
        }, 50);
      }
    }
  }

  function detectAutofill(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value && value.length === 4) {
      const valueArray = value.split('');
      setValues(valueArray);
      onComplete(value);
    }
  }

  function onInputFocus(inputIndex: number) {
    setActiveIndex(inputIndex);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }

  return (
    <Container ref={containerRef} className={className}>
      <HiddenOptInput
        autoComplete="one-time-code"
        type="text"
        inputMode="decimal"
        ref={inputRef}
        onChange={detectAutofill}
        onKeyDown={onInputChange}
      />
      {showTextInputs &&
        range(length).map(number => (
          <React.Fragment key={number}>
            <SingleCodeInput
              role="button"
              tabIndex={0}
              className="code-input"
              onFocus={() => onInputFocus(number)}
              isActive={activeIndex === number}
            >
              {values[number]}
            </SingleCodeInput>
            {number !== length - 1 && (
              <StaticLineContainer>-</StaticLineContainer>
            )}
          </React.Fragment>
        ))}
    </Container>
  );
};

export default ConfirmCodeInput;
