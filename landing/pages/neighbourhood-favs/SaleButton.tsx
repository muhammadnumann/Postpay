import styled from 'styled-components';

const SaleButton = styled.button<SaleButton>`
  display: inline-block;
  text-align: center;
  color: #3EBBD2;
  font-size: ${props => props.fontSize ? props.fontSize : '1.875rem'};
  letter-spacing: -0.02em;
  border-radius: 15px;
  border: solid 2px #3EBBD2;
  padding: ${props => (props.padding ? props.padding : '7px')};
  margin: ${props => (props.margin ? props.margin : '7px')};
  background-color: transparent;
  cursor: pointer;
  font-family: var(--font-bold);
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : 'auto')};

  &:hover {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

export default SaleButton;
