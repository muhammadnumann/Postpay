import React, { useState, useRef, useEffect } from 'react';
import { FONTS, COLORS } from '../constants/style';
import cx from 'classnames';

interface IProps {
  headline?: string;
  benefits: Array<BenefitExplanation>;
  imageWidth?: number;
  itemTitleColor?: string;
}

const Benefits: React.FC<IProps> = ({
  itemTitleColor,
  headline,
  benefits,
  imageWidth
}) => {
  const [shouldAnimateBenefitList, setShouldAnimateBenefitList] = useState(false);
  const benefitListRef = useRef(null);

  useEffect(() => {
    document.addEventListener('scroll', detectElementInView)
    return window.removeEventListener('scroll', detectElementInView);
  }, []);

  function detectElementInView() {
    if (shouldAnimateBenefitList === false && benefitListRef && benefitListRef.current) {
      const bounds = benefitListRef!.current!.getBoundingClientRect();
      if (window.scrollY >= bounds.top - 100) {
        setShouldAnimateBenefitList(true);
      }
    }
  }

  return (
    <>
      <div className='benefits-container'>
        {headline && <div className='paragraph'>{headline}</div>}
        <div className='row no-gutters'>
          {benefits.map((benefit, benefitIndex) => (
            <div className='col-lg-4 col-md-6 col-12' key={String(benefit.name)}>
              <div className='benefit-item-wrapper'>
                <div
                  className={`benefit-item ${shouldAnimateBenefitList ? 'animate' : ''}`}
                  style={{
                    animationDelay: (benefitIndex * 500).toString() + 'ms',
                  }}
                >
                  {benefit.image &&
                  <div className='benefit-image-container'>
                    <img
                      className='benefit-image'
                      src={benefit.image}
                      alt={String(benefit.name)}
                      style={{
                        width: imageWidth,
                        height: imageWidth,
                      }}
                    />
                  </div>
                  }
                  <h3 className='benefit-name'>{benefit.name}</h3>
                  <h4 className='benefit-description'>{benefit.description}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .benefits-container {
          max-width: 1400px;
          padding: 60px 65px 0;
          margin: 0 auto;
        }

        .paragraph {
          font-size: 25px;
          margin-bottom: 40px;
        }

        .title {
          font-size: 35px;
          font-family: var(--font-bold);
          margin-bottom: 60px;
          font-weight: bold;
          color: #252524;
          text-align: left;
        }

        .benefit-list {
          display: flex;
          justify-content: flex-start;

        }

        .benefit-item-wrapper {
          position: relative;
          padding: 10px 0;
        }

        .benefit-item-wrapper:last-child:after {
          display: none;
        }

        .benefit-item-wrapper.no-border:after {
          display: none;
        }

        .benefit-item-wrapper:after {
          content: '';
          position: absolute;
          height: 100%;
          width: 1px;
          right: 0;
          top: 0;
          background: #707070;
          opacity: 0.5;
        }

        :global([dir='rtl']) .benefit-item-wrapper:after {
          right: auto;
          left: 0;
        }

        .benefit-item {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          padding-right: 40px;
          margin: 0;
          opacity: 1;
          text-align: left;
        }

        :global([dir='rtl']) .benefit-item {
          padding-right: 0;
          padding-left: 40px;
        }

        .benefit-image-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .benefit-image {
          width: 100%;
          margin-bottom: 20px;
          max-width: 280px;
        }

        .benefit-name {
          font-size: 1.75rem;
          font-family: var(--font-medium);
          margin-bottom: 20px;
          color: ${itemTitleColor ? itemTitleColor : '#000000'};
          text-align: left;
        }

        .benefit-description {
          color: #000000;
          font-size: 1.5rem;
          font-family: var(--font-light);
        }

        :global([dir='rtl']) .benefit-description {
          line-height: 1.8rem;
        }

        @keyframes howItWorksAnimation {
          from {
            opacity: 0;
            transform: scale3d(1, 1, 1);
          }

          50% {
            opacity: 0.8;
            transform: scale3d(1.1, 1.1, 1.1);
          }

          to {
            opacity: 1;
            transform: scale3d(1, 1, 1);
          }
        }

        @media screen and (max-width: 1400px) {
          .how-it-works {
            padding: 50px 65px;
          }

          .title {
            margin-bottom: 30px;
            font-size: 30px;
          }

          .benefit-list {
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .benefit-item-wrapper {
            width: 100%;
          }

          .benefit-item-wrapper:after {
            display: none;
          }

          .benefit-item {
            width: 100%;
            opacity: 1;
            margin-bottom: 20px;
          }

          .benefit-item.animate {
            animation: none;
          }

          .benefit-item:not(:last-child) {
            margin-bottom: 40px;
          }

          .benefit-image {
            width: 250px;
          }

          .benefit-name {
            height: auto;
            margin-bottom: 10px;
          }

        }

        @media screen and (max-width: 1800px) {
          .benefits-container {
            padding: 60px 150px 0;
          }
        }


        @media screen and (max-width: 900px) {
          .benefits-container {
            padding: 40px;
          }
        }

        @media screen and (max-width: 500px) {
          .benefits-container {
            padding: 30px 20px 0 20px;
          }

          .benefits-item {
            padding-right: 0;
          }

          .benefit-name {
            height: auto;
            font-size: 1.25rem;
            margin-bottom: 10px;
          }

          .benefit-description {
            font-size: 1.1rem;
          }

        }

      `}</style>
    </>
  );
};

export default Benefits;
