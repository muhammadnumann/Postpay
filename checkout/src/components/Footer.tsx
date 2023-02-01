import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled, { css } from 'styled-components';
import LinkModal from '@/components/LinkModal';
import { LayoutContext } from '@/contexts/Layout';
import {
  EMPTY_HREF,
  PRIVACY_ROUTE,
  SUPPORT_ROUTE,
  TERMS_ROUTE,
} from '@/constants/routes';

const Container = styled.div`
  height: 30px;
  width: 100%;

  ${props =>
    props.theme.isMobile &&
    css`
      height: auto;
      margin-bottom: 5px;
    `}
`;

const Content = styled.div`
  margin: 0 auto;
  width: 1200px;
  max-width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  ${props =>
    props.theme.isMobile &&
    css`
      justify-content: center;
    `}
`;

const ListOfLink = styled.div`
  display: flex;
`;

const Link = styled.a`
  font-size: 0.76rem;
  margin-right: 10px;
  text-decoration: none;
  color: #575756;

  &:last-child {
    margin-right: 0;
  }

  ${props =>
    props.theme.rtl &&
    css`
      margin-left: 10px;
      margin-right: 0;
    `}
`;

const Copyright = styled.div`
  font-size: 0.76rem;

  ${props =>
    props.theme.isMobile &&
    css`
      display: none;
    `}
`;

const Footer = () => {
  const { t } = useTranslation();
  const { isMobile } = useContext(LayoutContext);
  const [selectedSource, setSelectedSource] = useState('');

  function openSource(
    event: React.MouseEvent<HTMLAnchorElement>,
    source: string
  ) {
    if (isMobile) {
      event.preventDefault();
      setSelectedSource(source);
    }
  }

  return (
    <Container>
      <Content>
        {selectedSource !== '' && (
          <LinkModal
            source={selectedSource}
            onClose={() => setSelectedSource('')}
          />
        )}
        <ListOfLink>
          <Link
            onClick={event => openSource(event, TERMS_ROUTE)}
            href={!isMobile ? TERMS_ROUTE : EMPTY_HREF}
            target={!isMobile ? '_blank' : ''}
            rel="noopener noreferrer"
          >
            {t('Terms')}
          </Link>
          <Link
            onClick={event => openSource(event, PRIVACY_ROUTE)}
            href={!isMobile ? PRIVACY_ROUTE : EMPTY_HREF}
            target={!isMobile ? '_blank' : ''}
            rel="noopener noreferrer"
          >
            {t('Privacy')}
          </Link>
          <Link
            onClick={event => openSource(event, SUPPORT_ROUTE)}
            href={!isMobile ? SUPPORT_ROUTE : EMPTY_HREF}
            target={!isMobile ? '_blank' : ''}
            rel="noopener noreferrer"
          >
            {t('Support')}
          </Link>
        </ListOfLink>
        <Copyright>{t('CopyrightText')}</Copyright>
      </Content>
    </Container>
  );
};

export default Footer;
