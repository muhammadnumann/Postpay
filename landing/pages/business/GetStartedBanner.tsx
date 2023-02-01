import React from 'react';
import { useTranslation } from 'react-i18next';
import weightIcon from '../../static/svgs/benefits/weight.svg';
import growthIcon from '../../static/svgs/benefits/growth.svg';
import cycleIcon from '../../static/svgs/benefits/cycle.svg';
import returnIcon from '../../static/svgs/benefits/return.svg';
import brand1 from '../../static/images/benefits/h-and-m.png';
import brand2 from '../../static/images/benefits/footlocker.png';
import brand3 from '../../static/images/benefits/entertainer.png';

import brand4 from '../../static/images/benefits/squat-wolfpng.png';
import brand5 from '../../static/images/benefits/kcal.png';
import brand6 from '../../static/images/benefits/west-elm.png';

const GetStartedBanner = () => {
    const { t } = useTranslation();
    const imageWidth = 60;
    const brands = [{ title: 'H&M', image: brand1, width: 128, height: 85 }, {
      title: 'Footlocker',
      image: brand2,
      width: 128,
      height: 85
    }, { title: 'The Entertainer', image: brand3, width: 212, height: 64 }, {
      title: 'Squat Wolf',
      image: brand4,
      width: 212,
      height: 22
    }, { title: 'KCal', image: brand5, width: 85, height: 85 }, {
      title: 'West Elm',
      image: brand6,
      width: 170,
      height: 75
    }];
    const benefits = [
      {
        name: t('BenefitsMetric1'),
        description: t('BenefitsMetricPercentage1'),
        image: weightIcon,
      },
      {
        name: t('BenefitsMetric2'),
        description: t('BenefitsMetricPercentage2'),
        image: growthIcon,
      },
      {
        name: t('BenefitsMetric3'),
        description: t('BenefitsMetricPercentage3'),
        image: cycleIcon,
      },
      {
        name: t('BenefitsMetric4'),
        description: t('BenefitsMetricPercentage4'),
        image: returnIcon,
      }
    ]

    return (
      <>
        <div className='grow-your-business'>
          <h3 className='sub-headline'>
            {t('CheckOutBrands')}
          </h3>
          <div className='brands-container'>
            {brands.map(brand => (
              <img key={brand.title} className='brands-container-image' width={brand.width} height={brand.height}
                   src={brand.image}
                   alt={brand.title} />))}
          </div>
          <h2 className='title'>
            {t('PaymentPlanCustomers')}
          </h2>
          <h3 className='sub-headline'>
            {t('PostpayCustomerNumber')}
          </h3>
          <div className='row'>
            {benefits.map((benefit) => (
              <div className='col-lg-3 col-md-6 col-12' key={String(benefit.name)}>
                <div className='benefit-item-wrapper'>
                  <div
                    className='benefit-item'>
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
                    <div className='benefit-name'>{benefit.name}</div>
                    <div className='benefit-description'>{benefit.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <style jsx>{`
          .grow-your-business {
            padding: 100px 0 0;
          }

          .brands-container {
            margin-top: 4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            max-width: 1400px;
            direction: ltr;
          }

          .brands-container-image {
            margin-bottom: 2rem;
          }

          .title {
            font-family: var(--font-bold);
            font-size: 3.1rem;
            line-height: 4rem;
            margin-bottom: 10px;
            margin-top: 5rem;
            color: black;
            white-space: pre-line;
          }

          :global([dir="rtl"]) .title {
            font-family: var(--font-medium);
          }

          .sub-headline {
            font-family: var(--font-regular);
            font-size: 1.75rem;
            color: black;
            margin-bottom: 3.75rem;
          }

          :global([dir='rtl']) .sub-headline {
            font-family: var(--font-light);
            font-weight: 300;
            line-height: 1.43;
          }

          .benefit-item-wrapper {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
          }

          .benefit-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 0;
            max-width: 250px;
          }

          :global([dir="rtl"]) .benefit-item {
            text-align: right;
          }

          .benefit-image-container {
            height: 70px;
            width: 141px;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin-right: 30px;
          }

          :global([dir="rtl"]) .benefit-image-container {
            margin-right: 0;
            justify-content: flex-end;
            margin-left: 30px;
          }

          .benefit-image {
            width: 90px;
            height: 90px;
          }

          .benefit-content {
            display: flex;
            flex-direction: row;
          }

          .benefit-name {
            font-family: var(--font-regular);
            font-size: 1.7rem;
            line-height: 1.8rem;
            color: black;
            white-space: pre-line;
          }

          :global([dir='rtl']) .benefit-name {
            padding-top: 15px;
            font-family: var(--font-light);
          }

          .benefit-description {
            font-family: var(--font-bold);
            font-size: 3.7rem;
            line-height: 3.8rem;
            margin-top: 1rem;
            margin-bottom: 2rem;
            color: black;
          }

          :global([dir='rtl']) .benefit-description {
            font-family: var(--font-medium);
          }

          @media screen and (max-width: 1000px) {
            .brands-container {
              justify-content: flex-start;
            }

            .brands-container-image {
              margin-right: 30px;
            }
          }

          @media screen and (max-width: 500px) {
            .grow-your-business {
              padding: 20px 0;
            }

            .brands-container {
              padding: 0 20px;
              justify-content: center;
            }

            .title {
              font-size: 2rem;
              line-height: 2.4rem;
              margin: 20px 0;
            }

            .benefit-item:not(:last-child) {
              margin-bottom: 40px;
            }
          }
        `}</style>
      </>
    );
  }
;
export default GetStartedBanner;
