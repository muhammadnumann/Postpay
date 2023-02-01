import styled from 'styled-components';

const ErrorMessage = styled.div`
  color: #d46659;
  text-align: ${props => (props.theme.rtl ? 'right' : 'left')};
`;

export default ErrorMessage;
