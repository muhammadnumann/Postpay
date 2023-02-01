import React from 'react';
import dividerDotImage from '../../static/svgs/landing/divider-dot.svg';
// import { mobileScreenSelector } from '../../constants/style';

const DividerDot = () => {
  return (
    <>
      <div className='section'>
        <img src={dividerDotImage} alt='black dot' />
      </div>
      <style jsx>{`
        .section {
          background: white;
          display: flex;
          justify-content: center;
          padding: 4rem 0;
        }

        .section img {
          height: 15px;
          width: 15px;
        }

        @media screen and (max-width: 500px) {
          .section {
            padding: 1rem 0;
          }
        }
      `}</style>
    </>
  );
};
export default React.memo(DividerDot);
