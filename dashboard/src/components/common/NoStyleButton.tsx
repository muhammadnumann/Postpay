import styled from 'styled-components';

export default styled.button`
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;
