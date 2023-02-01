import { formatNumber } from '@/helpers/helpers';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Maybe } from 'types/custom';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  flex-grow: 1;
  direction: ltr;
`;

const HiddenOptInput = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
`;

const BlinkKeyframe = keyframes`
  0% {background: transparent;}
  50% {background: #aaaaaa}
  100% {background: transparent;}
`;

const CodeWrapper = styled.div<{ isActive: boolean; hasValue: boolean }>`
  position: relative;
  font-family: GreycliffCF-Regular;
  font-size: 24px;
  color: #aaaaaa;
  min-width: 8px;
  margin-right: 3px;

  ${props =>
    props.hasValue &&
    css`
      color: #000000;
    `}

  ${props =>
    props.isActive &&
    css<{ hasValue: boolean }>`
    &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 1px;
      bottom: 0;
      background-color: #aaaaaa;
      animation: ${BlinkKeyframe} .8s infinite;

      ${props =>
        props.hasValue &&
        css`
          left: auto;
          right: 0;
        `}
  `}
`;

const Separator = styled.div`
  position: relative;
  padding: 0 8px;
  margin-right: 3px;

  &:after {
    content: '';
    width: 8px;
    background: #aaaaaa;
    height: 2px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

interface ICodeInputProps {
  predefinedCode?: Maybe<string>;
  format: string;
  onComplete: Function;
  onChange?: Function;
  handleFocus?: Function;
  className?: string;
}

const CodeInput: React.FC<ICodeInputProps> = ({
  predefinedCode,
  format,
  onComplete,
  onChange,
  handleFocus,
  className,
}) => {
  const containerRef = useRef<HTMLElement>(null) as React.MutableRefObject<
    HTMLDivElement
  >;
  const inputRef = useRef<HTMLElement>(null) as React.MutableRefObject<
    HTMLInputElement
  >;
  const [values, setValues] = useState<Array<string>>(
    format.split('').map(() => '')
  );
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showTextInputs, setShowTextInputs] = useState(true);
  const [placeholderCodeArray, setPlaceholderCodeArray] = useState<
    Array<string>
  >([]);
  const maxValueLength = useMemo(
    () => format.split('').filter(code => code !== '-').length,
    [format]
  );
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    if (onChange) {
      onChange(values.join(''));
    }
  }, [values]);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }

    if (predefinedCode) {
      const codeArray = predefinedCode.split('');
      setValues(codeArray);
      onComplete(predefinedCode);
    }

    if (handleFocus) {
      handleFocus(() => {
        setTimeout(() => {
          setShowTextInputs(true);
          inputRef.current.focus();
          setActiveIndex(0);
        }, 30);
      });
    }

    document.addEventListener('paste', onPaste);

    setPlaceholderCodeArray(format.split(''));
  }, []);

  function onPaste(event: ClipboardEvent) {
    const text = event?.clipboardData?.getData('text');
    if (text) {
      setValues(text.split(''));
      onComplete(text);
    }
  }

  function onInputChange(e: React.KeyboardEvent) {
    e.stopPropagation();
    e.preventDefault();

    if ((e.ctrlKey || e.metaKey) && e.key === 'v') {
      return;
    }

    if (e.key === 'Backspace' && activeIndex > 0) {
      if (values[activeIndex] !== '') {
        values[activeIndex] = '';
      } else {
        values[activeIndex] = '';
        values[activeIndex - 1] = '';
        setActiveIndex(activeIndex - 1);
      }
      setValues([...values]);
      return;
    }

    if (/^[0-9\b]+$/.test(e.key) === false) {
      return false;
    }

    const value = e.key;
    const number = formatNumber(value);
    values[activeIndex] = number;
    setValues([...values]);

    if (number !== '' && isNaN(Number(number)) === false) {
      if (activeIndex === maxValueLength - 1) {
        const result = values.join('');
        onComplete(result);
        setActiveIndex(-1);
      } else {
        const nextIndex =
          activeIndex + 1 < maxValueLength ? activeIndex + 1 : 0;
        setActiveIndex(nextIndex);
      }
    }
  }

  function detectAutofill(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value && value.length === maxValueLength) {
      const valueArray = value.split('');
      setValues(valueArray);
      onComplete(value);
      if (inputRef && inputRef.current) {
        inputRef.current.blur();
      }
    }
  }

  function onInputFocus(inputIndex: number) {
    setActiveIndex(inputIndex);
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }

  function renderOutput() {
    let valueIndex = -1;
    return placeholderCodeArray.map((character, index) => {
      if (character !== '-') {
        valueIndex++;
        const _valueIndex = valueIndex;
        const isActive = activeIndex === _valueIndex && isFocus;
        const hasValue = !!values[_valueIndex];
        return (
          <CodeWrapper
            role="button"
            tabIndex={0}
            isActive={isActive}
            hasValue={hasValue}
            key={index}
            className={`code ${isActive ? 'active' : ''}`}
          >
            {values[valueIndex] || character}
          </CodeWrapper>
        );
      } else {
        return <Separator key={index} />;
      }
    });
  }

  function onFocus() {
    setIsFocus(true);
  }

  function onBlur() {
    setIsFocus(false);
  }

  return (
    <Container
      ref={containerRef}
      className={className}
      onClick={() => onInputFocus(0)}
    >
      <HiddenOptInput
        autoComplete="one-time-code"
        type="text"
        inputMode="decimal"
        ref={inputRef}
        onChange={detectAutofill}
        onKeyDown={onInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
        defaultValue={predefinedCode || ''}
      />
      {showTextInputs && <InputWrapper>{renderOutput()}</InputWrapper>}
    </Container>
  );
};

export default CodeInput;
