import React, { useContext, useEffect, useState, useMemo } from 'react';
import Accordion from '../../components/Accordion';
import faqEn from '../../constants/faqEn';
import faqAr from '../../constants/faqAr';
import { useTranslation } from 'react-i18next';
import { PageContext } from '../../contexts/PageContext';
import Input from "../../components/form/Input";
import searchIcon from "../../static/svgs/shop/search.svg";
import CallMe from "./CallMe";
import WriteToUs from "./WriteToUs";
import { BORDER_ROUND } from "../../constants/constants";
import styled from "styled-components";
export interface IFaqItem {
  question: string;
  answer: React.ReactElement | string;
}

export interface IFaqListItem {
  title: string;
  data: Array<IFaqItem>;
}


// const ShopApp = styled.div`
//   .accordion-wrapper-post-pay{
//     /* width: calc(50% - 45px); */
//     @media screen and (max-width: 800px) {
//         width: 100%;
//     }
//   }
//   .accordion-list-container{
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     /* display: flex;
//     flex-wrap: wrap;
//     column-gap: 80px; */
//   }
// `

const ContainerFaqMerhe = styled.div`
    display: flex;
    column-gap: 80px;
    .content-accordion-open{
      max-height: 100%!important;
    }
    .part-2{
      margin-top: 26px;
    }
    .item-faq{
      height: fit-content;
    }
    @media screen and (max-width: 800px) {
      flex-direction: column;
      .part-2{
        margin-top: -120px;
      }
    }
`


const ShopperFAQs = () => {
  const { t } = useTranslation();
  const { language } = useContext(PageContext);
  const [keyword, setKeyword] = useState('');
  const faqData: Array<IFaqListItem> = useMemo(() => language === 'ar' ? faqAr : faqEn, [language]) 
  const [faqItems, setFaqItems] = useState(faqData);
  const [isSelectedQuestion, setSelectedQuestion] = useState('');

  useEffect(() => {
    if (language === 'ar') {
      return setFaqItems(faqAr);
    }
    setFaqItems(faqEn);
  }, [language])

  function toggleOpen(question) {
    if (isSelectedQuestion === question) {
      return setSelectedQuestion('');
    }
    setSelectedQuestion(question)
  }

  function onKeywordChange(e) {
    setKeyword(e.target.value);
  }

  useEffect(() => {
    const searchKeyword = keyword.toLowerCase();
    const searchResults = faqData.map(partner => {
      return {
        ...partner,
        data: partner.data.filter(part => part.question.toLowerCase().includes(searchKeyword) || JSON.stringify(part.answer).toLowerCase().includes(searchKeyword))
      }
    });
    if (searchResults.some(searchR => searchR.data.length > 0)) {
      return setFaqItems(searchResults);
    }
  }, [keyword])

  function renderColumn(first: number, last: number, part?:number) {
    const searchKeyword = keyword.toLowerCase();
    return faqItems.slice(first, last).map(faqItem => {
      if (faqItem.data.length > 0) {
        return <Accordion
          keyword={searchKeyword}
          key={faqItem.title}
          title={part === 2 ? '' : t(faqItem.title)}
          items={part === 1 ? 
            faqItem.data.slice(0, Math.ceil(faqItem.data.length/2)) : 
            part === 2 ? faqItem.data.slice(Math.ceil(faqItem.data.length/2), faqItem.data.length) :
            faqItem.data
          }
          toggleOpen={toggleOpen}
          isSelectedQuestion={isSelectedQuestion}
        />
      }
      return null
    })
  }
  return (
    <>
      <div>
        <h3 className="description">{t('FindAnswers')}</h3>
        <div className="search-box">
          <div className="input-wrapper">
            <Input
              icon={searchIcon}
              placeholder={t('Search')}
              label={''}
              type="email"
              name="EMAIL"
              value={keyword}
              onChange={onKeywordChange}
              borderType={BORDER_ROUND}
            />
          </div>
        </div>
        <h3 className="title">{t('FAQTitle')}</h3>
        <ContainerFaqMerhe >
          <div className='item-faq'>
            {renderColumn(0, 4)}
          </div>
          <div className='item-faq'>
            {renderColumn(4, 8)}
          </div>
        </ContainerFaqMerhe>
        {/* <ShopApp >
          {renderColumn(5, 6)}
        </ShopApp> */}
        <div id='contact-form' className='pb-2' />
        <h2 className="title-medium mb-0" id='contact-form'>{t('FindUs')}</h2>
        <h3 className="description">{t('LeaveQuestions')}</h3>
        <WriteToUs />
        <h2 className="title-medium">{t('CallMeTitle')}</h2>
        <CallMe />
      </div>
      <style jsx>{`
        .title {
          font-size: 3.1rem;
          line-height: 1.3;
          font-family: var(--font-bold);
          color: #000000;
          margin: 70px 0;
        }

        :global([dir='rtl']) .title {
          font-family: var(--font-medium);
        }

        .title-medium {
          font-size: 3.1rem;
          line-height: 1.13;
          font-family: var(--font-bold);
          color: #000000;
          margin: 70px 0;
        }

        .faq-spacing {
          padding-right: 80px;
        }

        :global([dir='rtl']) .faq-spacing {
          padding-left: 80px;
          padding-right: 0;
        }

        :global([dir='rtl']) .title-medium {
          font-family: var(--font-demi-bold);
        }

        .description {
          font-size: 1.8rem;
          font-family: var(--font-regular);
          color: #000000;
          margin: 10px 0 20px 0;
        }

        :global([dir='rtl']) .description {
          font-family: var(--font-light);
        }

        .search-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-top: 5px;
        }

        .search-box > .input-wrapper {
          flex-grow: 1;
          width: 300px;
        }

        .button-wrapper {
          width: 140px;
        }

        p:last-child {
          margin-bottom: 0;
        }

        @media screen and (max-width: 500px) {
          .faq-spacing {
            padding: 0;
          }

          .title {
            font-size: 2.1rem;
            margin: 30px 0;
          }

          .title-medium {
            font-size: 2.1rem;
            margin: 30px 0;
          }

          .description {
            margin-top: 0;
          }
        }
      `}</style>
    </>
  );
};

export default ShopperFAQs;
