import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

interface IProps {
  title?: string;
  headline?: string;
  imageWidth?: number;
  nameHeight?: number;
  noBorder?: boolean;
  image?: string;
}

const CustomerFeedback: React.FC<IProps> = ({ title, headline, imageWidth, image }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className='d-flex justify-content-center'>
        <div className='welcome'>
          <div className='row no-gutters'>
            <div className='col-lg-3 col-12'>
              <div className='yellow-circle' />
              <div className='inverted-container'>
                <p className='title-inverted-hollow'>
                  {t('FeedbackDescription')}
                  <span className='title-inverted'>
                    {t('FeedbackTitle')}
                  </span>
                </p>
              </div>
            </div>
            <div className='col-lg-9 col-12'>
              <div className='feedback-container-right'>
                <p className='feedback-text'>
                  <q><Trans
                    i18nKey="CustomerFeedback1"
                    components={{ underline: <span className="half-background" /> }}
                  />
                  </q>
                </p>
                <div className='d-flex pt-2 pt-sm-4'>
                  <div className='feedback-line' />
                  <p className='feedback-author'>
                    {t('CustomerFeedbackAuthor1')}
                  </p>
                </div>
              </div>
              <div className='feedback-container-left'>
                <p className='feedback-text'>
                  <q><Trans
                    i18nKey="CustomerFeedback2"
                    components={{ underline: <span className="half-background" /> }}
                  /></q>
                </p>
                <div className='d-flex pt-2 pt-sm-4'>
                  <div className='feedback-line' />
                  <p className='feedback-author'>
                    {t('CustomerFeedbackAuthor2')}
                  </p>
                </div>
              </div>
              <div className='feedback-container-right'>
                <p className='feedback-text'>
                  <q><Trans
                    i18nKey="CustomerFeedback3"
                    components={{ underline: <span className="half-background" /> }}
                  /></q>
                </p>
                <div className='d-flex pt-2 pt-sm-4'>
                  <div className='feedback-line' />
                  <p className='feedback-author'>
                    {t('CustomerFeedbackAuthor3')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`

          .welcome {
            max-width: 1400px;
            padding: 50px 65px;
            color: black;
          }

          .yellow-circle {
            border-radius: 50%;
            width: 18vw;
            height: 18vw;
            max-width: 260px;
            max-height: 260px;
            background-color: #ffe862;
          }


          .feedback-container-left {
            margin-right: 100px;
            padding: 40px 20px 40px 50px;
            //height: 250px;
            background-size: 100% 100%;
            background-image: url('/static/images/landing/feedback-background-left.png');
            background-repeat: no-repeat;
          }

          .feedback-container-right {
            margin-left: 100px;
            padding: 40px 50px 40px 30px;
            //height: 250px;
            background-image: url('/static/images/landing/feedback-background-right.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .feedback-text q {
            font-family: var(--font-regular);
            color: black;
            font-size: 1.75rem;
          }

          :global([dir='rtl']) .feedback-text q {
            font-size: 1.75rem;
            line-height: 1.85rem;
            font-family: var(--font-light);
          }

          .half-background {
            font-family: var(--font-demi-bold);
            color: black;
            font-size: 1.75rem;
            background: linear-gradient(to top, #ffe862 40%, transparent 40%);
          }

          :global([dir='rtl']) .half-background {
            font-family: var(--font-light);
            line-height: 1.85rem;
          }

          .feedback-author {
            display: flex;
            font-family: var(--font-bold);
            color: black;
            font-size: 1.5rem;
            padding-left: 15px;
          }

          :global([dir='rtl']) .feedback-author {
            font-family: var(--font-medium);
          }

          :global([dir='rtl']) .feedback-author {
            padding-left: 0;
            padding-right: 15px;
          }

          .feedback-line {
            display: flex;
            flex: 1;
            border-bottom: 1px solid black;
            margin-bottom: 25px;
          }

          .title-inverted {
            display: block;
            font-family: var(--font-bold);
            font-size: 4rem;
            color: #000000;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            line-height: 4.2rem;
          }

          .title-inverted-hollow {
            font-family: var(--font-bold);
            font-size: 4rem;
            color: transparent;
            -webkit-text-stroke: 2px #000000;
            writing-mode: vertical-rl;
            text-orientation: mixed;
            line-height: 4.2rem;
          }

          :global([dir='rtl']) .title-inverted-hollow {
            display: inline;
            font-family: var(--font-bold);
            font-size: 4.6rem;
          }

          :global([dir='rtl']) .title-inverted {
            padding-bottom: 20px;
            display: inline;
            font-size: 4.6rem;
          }

          :global([dir='rtl']) .inverted-container {
            margin-top: -120px;
            margin-right: 0;
            -webkit-transform: rotate(0deg);
            -moz-transform: rotate(0deg);
            -ms-transform: rotate(0deg);
            -o-transform: rotate(0deg);
            transform: rotate(0deg);
          }

          .inverted-container {
            -webkit-transform: rotate(180deg);
            -moz-transform: rotate(180deg);
            -ms-transform: rotate(180deg);
            -o-transform: rotate(180deg);
            transform: rotate(180deg);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: -150px;
            margin-right: 50px;
          }

          @media screen and (max-width: 1800px) {
            .welcome {
              padding: 50px 150px 0;
            }
          }


          @media screen and (max-width: 992px) {
            .welcome {
              margin-bottom: 4rem;
              padding: 40px;
            }

            .welcome-text {
              left: 20px;
              right: 20px;
              align-items: flex-end;
            }

            .feedback-text q {
              font-family: var(--font-regular);
              color: black;
              font-size: 1.2rem;
              line-height: 1.3rem;
            }

            .feedback-author {
              font-size: 1rem;
              line-height: 1.1rem;
            }

            .half-background {
              font-size: 1.2rem;
              line-height: 1.3rem;
            }

            .yellow-circle {
              width: 115px;
              height: 115px;
              position: absolute;
              right: 0;
              top: -20px;
            }

            .inverted-container {
              margin: 0;
              -webkit-transform: rotate(90deg);
              -moz-transform: rotate(180deg);
              -ms-transform: rotate(180deg);
              -o-transform: rotate(180deg);
              transform: rotate(0deg);
              padding-left: 30px;
              padding-bottom: 60px;
            }

            .inverted-container {
              padding-left: 0;
            }

            .title-inverted-hollow {
              font-size: 2rem;
              line-height: 2rem;
              writing-mode: horizontal-tb;
              text-orientation: unset;
            }

            :global([dir='rtl']) .title-inverted {
              padding-right: 20px;
              font-size: 2rem;
              line-height: 2rem;
              writing-mode: horizontal-tb;
              text-orientation: unset;
            }

            :global([dir='rtl']) .title-inverted-hollow {
              font-size: 2rem;
              line-height: 2rem;
              writing-mode: horizontal-tb;
              text-orientation: unset;
            }

            :global([dir='rtl']) .inverted-container {
              margin-top: 20px;
              margin-right: 0;
            }

            .title-inverted {
              font-size: 2rem;
              line-height: 2rem;
              writing-mode: horizontal-tb;
              text-orientation: unset;
            }

            .feedback-container-left {
              margin: 0 0 20px 0;
              padding: 20px 20px 10px 30px;
              background: #f7f7f7 none;
              border-radius: 10px;
            }

            .feedback-container-right {
              margin: 0 0 20px 0;
              padding: 20px 30px 10px 20px;
              background: #f7f7f7 none;
              border-radius: 10px;
            }

            .feedback-line {
              margin-bottom: 20px;
            }
          }

          @media screen and (max-width: 500px) {
            .welcome {
              padding: 40px 20px;
            }

            .feedback-author {
              font-size: 0.9rem;
              line-height: 0.9rem;
            }

            :global([dir='rtl']) .feedback-text q {
              font-size: 1rem;
              line-height: 0.9rem;
            }

            .half-background {
              font-size: 1rem;
              line-height: 0.9rem;
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default React.memo(CustomerFeedback);
