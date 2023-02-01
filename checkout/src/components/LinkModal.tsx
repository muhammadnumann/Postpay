import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '@/components/common/Modal';

const StyledModalTerms = styled(Modal)`
  .content {
    padding: 0 5px;
    width: 100%;
    max-width: 500px;
  }
`;

interface IProps {
  onClose: Function;
  source: string;
}

const LinkModal: React.FC<IProps> = ({ onClose, source }) => {
  const [contentHeight, setContentHeight] = useState(500);

  useEffect(() => {
    calculateFrameHeight();
    window.addEventListener('resize', () => {
      calculateFrameHeight();
    });
    return () => {
      window.removeEventListener('resize', () => {
        calculateFrameHeight();
      });
    };
  }, []);

  function calculateFrameHeight() {
    if (typeof window === 'undefined') return;
    const containerHeight = window.innerHeight;
    setContentHeight(containerHeight - 150);
  }

  return (
    <>
      <StyledModalTerms
        title={''}
        onSubmit={() => {}}
        onClose={onClose}
        hasActions={false}
      >
        <iframe
          src={source}
          onLoad={calculateFrameHeight}
          frameBorder={0}
          width="100%"
          height={contentHeight}
        />
      </StyledModalTerms>
    </>
  );
};

export default LinkModal;
