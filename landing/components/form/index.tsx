import styled, { css } from "styled-components";
import { mobileScreenSelector, RTL } from "../../constants/style";
import { BORDER_ROUND, BORDER_ROUND_RADIUS } from "../../constants/constants";

interface IFormGroup {
  children?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  borderType?: number;
}

export const FormGroupContainer = styled.div`
  position: relative;
`;

export const FormGroup = styled.fieldset<IFormGroup>`
  min-height: 52px;
  background-color: white;
  position: relative;
  border-bottom: 2px solid #dfdfdf;

  ${props => props.disabled && css`
    background-color: #f4f4f4;
  `}

  ${props => props.error && css`
    border-color: #d46659;

    ${FormLabel} {
      color: #d46659;
    }
  `}

  ${props => props.borderType === BORDER_ROUND_RADIUS && css`
    border: 1px solid #c7d7da;
    border-radius: 100px 0 0 100px;

    ${mobileScreenSelector} {
      border-radius: 100px;
    }
  `}

  ${props => props.borderType === BORDER_ROUND_RADIUS && props.theme.rtl && css`
    border: 1px solid #3ebbd2;
    border-radius: 0 100px 100px 0;

    ${mobileScreenSelector} {
      border-radius: 100px;
    }
  `}

  ${props => props.borderType === BORDER_ROUND && css`
    border: 1px solid #3ebbd2;
    border-radius: 100px;

    ${mobileScreenSelector} {
      border-radius: 100px;
    }
  `}
`;

export const FormLabel = styled.legend`
  width: max-content;
  margin-left: 10px;
  margin-bottom: 0;
  font-size: 0.7rem;
  padding: 0 5px;
  font-weight: 500;
  text-align: left;
  color: #aaaaaa;

  ${props => props.theme.rtl && css`
    text-align: right;
    margin-right: 10px;
  `}
`;

const FormErrorContainer = styled.div`
  text-align: ${props => props.theme.rtl ? 'right' : 'left'};
  position: relative;
  margin-top: 2px;
`;

const ErrorItem = styled.div`
  margin-bottom: 5px;
  color: #d46659;
  font-size: 0.8rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const FormError = ({ error }) => (
  <FormErrorContainer>
    {false === Array.isArray(error) && <ErrorItem>{error}</ErrorItem>}
    {Array.isArray(error) && error.map(errorItem => (
      <ErrorItem>{errorItem}</ErrorItem>
    ))}
  </FormErrorContainer>
)


interface IInputProps {
  width?: string;
}

export const Input = styled.input`
  width: ${(props: IInputProps) => props.width || "100%"};
  padding: 5px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
  border: none;
  background: transparent;

  ::placeholder,
  ::-webkit-input-placeholder {
    color: #aaaaaa;
    padding-left: 10px;
  }

  :-ms-input-placeholder {
    color: #aaaaaa;
    padding-left: 10px;
  }
`;

interface ISelectProps {
  onChange?: Function;
  width?: string;
}

export const Select = styled.select<ISelectProps>`
  width: ${props => props.width || "100%"};
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 3px;
  padding: 5px;
  height: 40px;
  line-height: 40px;
  box-sizing: border-box;
`;

export const DatePickerWrapper = styled.div`
  width: 100%;

  .DayPicker {
    position: absolute;
    background: white;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.3);
  }

  .DayPickerInput {
    width: 100%;
  }
`;
