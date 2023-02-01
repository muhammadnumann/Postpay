import styled, { css } from 'styled-components';

interface ILayoutContainerProps {
  flexDirection?: string;
  justityContent?: string;
  alignItems?: string;
  flexWrap?: string;
  children?: React.ReactNode;
}

const LayoutContainer = styled.div<ILayoutContainerProps>`
  display: flex;
  flex-direction: ${props => props.flexDirection || 'row'};
  justify-content: ${props => props.justityContent || 'flex-start'};
  align-items: ${props => props.alignItems || 'flex-start'};
  flex-wrap: ${props => props.flexWrap};
`;

interface ILayoutColumnProps {
  width?: string;
  flexGrow?: number;
  flexShrink?: number;
  children?: React.ReactNode;
  marginRight?: string;
}

const LayoutColumn = styled.div<ILayoutColumnProps>`
  display: block;
  width: ${props => props.width || '100%'};
  flex-grow: ${props => props.flexGrow};
  flex-shrink: ${props => props.flexShrink};
`;

export { LayoutContainer, LayoutColumn };
